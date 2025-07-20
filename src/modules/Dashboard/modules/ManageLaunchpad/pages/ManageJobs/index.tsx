import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { Button, FormControl, FormLabel, Input, Textarea, Select, Badge, VStack, HStack, Divider, Text, Box, useDisclosure, useToast } from '@chakra-ui/react';
import { Eye, Hash, CheckCircle, XCircle } from 'lucide-react';
import styles from './ManageJobs.module.css';
import { getJobListings, verifyLaunchpadTask } from "../../services/api";

interface Task {
  task_id: string;
  title: string;
  description: string;
  hashtag?: string;
  is_verified?: boolean;
}

interface Job {
  id: string;
  company_id: string;
  recruiter_id: string;
  title: string;
  description?: string;
  salary_range?: string;
  location?: string;
  job_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Freelance' | null;
  domain: string;
  interest_groups: string;
  minimum_karma: number;
  experience?: string;
  skills?: string;
  opening_type?: 'General' | 'Task'; // Restricted to General or Task
  task_id?: string;
  task_description?: string;
  task_hashtag?: string;
  task_verified?: boolean;
  created_at: string;
  [key: string]: any;
}

interface StatusColorMap {
  approved: string;
  pending: string;
  rejected: string;
}

const ManageJobs = () => {
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isTaskOpen, onOpen: onTaskOpen, onClose: onTaskClose } = useDisclosure();
  const { isOpen: isTaskViewOpen, onOpen: onTaskViewOpen, onClose: onTaskViewClose } = useDisclosure();
  const [data, setData] = useState<Job[]>([]);
  const [filteredData, setFilteredData] = useState<Job[]>([]);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isTaskVerifying, setIsTaskVerifying] = useState(false);
  const [taskHashtag, setTaskHashtag] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const firstFetch = useRef(true);
  const toast = useToast();

  const columnOrder = [
    { column: 'title', Label: 'Title', isSortable: true },
    { column: 'domain', Label: 'Domain', isSortable: true },
    { column: 'salary_range', Label: 'Salary Range', isSortable: true },
    { column: 'location', Label: 'Location', isSortable: true },
    { column: 'job_type', Label: 'Job Type', isSortable: true },
    { column: 'opening_type', Label: 'Type', isSortable: true },
    { column: 'interest_groups', Label: 'Interest Groups', isSortable: true },
    { column: 'minimum_karma', Label: 'Min Karma', isSortable: true },
    { column: 'experience', Label: 'Experience', isSortable: true },
    { column: 'task_status', Label: 'Task Status', isSortable: false },
    { column: 'created_at', Label: 'Created At', isSortable: true }
  ];

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const jobs = await getJobListings();
      if (jobs && Array.isArray(jobs)) {
        setData(jobs);
        setFilteredData(jobs);
        setTotalPages(Math.ceil(jobs.length / perPage));
      } else {
        setData([]);
        setFilteredData([]);
        setTotalPages(1);
        toast({
          title: "Error",
          description: "No jobs found.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setData([]);
      setFilteredData([]);
      setTotalPages(1);
      toast({
        title: "Error",
        description: "Failed to fetch jobs. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firstFetch.current) {
      fetchJobs();
    }
    firstFetch.current = false;
  }, []);

  useEffect(() => {
    setTotalPages(Math.ceil(filteredData.length / perPage));
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [filteredData, perPage, totalPages]);

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handleSearch = (search: string) => {
    setCurrentPage(1);
    setSearchQuery(search);
    if (search.trim() === "") {
      setFilteredData(data);
    } else {
      const filtered = data.filter(item =>
        item.title?.toLowerCase().includes(search.toLowerCase()) ||
        item.domain?.toLowerCase().includes(search.toLowerCase()) ||
        item.interest_groups?.toLowerCase().includes(search.toLowerCase()) ||
        item.skills?.toLowerCase().includes(search.toLowerCase()) ||
        item.location?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleEdit = (id: string | number | boolean) => {
    const stringId = String(id);
    const job = data.find(item => item.id === stringId);
    if (job) {
      setSelectedJob(job);
      onEditModalOpen();
    }
  };

  const handleJobUpdated = async (updatedJob: Job) => {
    setIsLoading(true);
    try {
      // TODO: Implement actual API call to update job
      // await updateJob(updatedJob.id, updatedJob);
      const updatedData = data.map(job => 
        job.id === updatedJob.id ? updatedJob : job
      );
      setData(updatedData);
      setFilteredData(prev => prev.map(job => 
        job.id === updatedJob.id ? updatedJob : job
      ));
      toast({
        title: "Job Updated",
        description: "Job details have been updated successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onEditModalClose();
    } catch (error) {
      console.error("Error updating job:", error);
      toast({
        title: "Error",
        description: "Failed to update job. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string | undefined) => {
    if (!id) return;
    try {
      // TODO: Implement actual API call to delete job
      // await deleteJob(id);
      const newData = data.filter(item => item.id !== id);
      setData(newData);
      setFilteredData(newData);
      const newTotalPages = Math.ceil(newData.length / perPage);
      if (currentPage > newTotalPages && newTotalPages > 0) {
        setCurrentPage(newTotalPages);
      }
      toast({
        title: "Job Deleted",
        description: "Job has been deleted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Delete failed:", error);
      toast({
        title: "Error",
        description: "Failed to delete job. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handlePerPageNumber = (selectedValue: number) => {
    setPerPage(selectedValue);
    setCurrentPage(1);
    setTotalPages(Math.ceil(filteredData.length / selectedValue));
  };

  const handleIconClick = (column: string) => {
    const newSort = sort === column ? `-${column}` : column;
    setSort(newSort);
    const sortedData = [...filteredData].sort((a, b) => {
      const key = newSort.startsWith("-") ? newSort.slice(1) : newSort;
      let aValue = a[key as keyof Job];
      let bValue = b[key as keyof Job];
      if (aValue === null || aValue === undefined) aValue = "";
      if (bValue === null || bValue === undefined) bValue = "";
      const aStr = String(aValue).toLowerCase();
      const bStr = String(bValue).toLowerCase();
      if (newSort.startsWith("-")) {
        return bStr.localeCompare(aStr);
      }
      return aStr.localeCompare(bStr);
    });
    setFilteredData(sortedData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setSelectedJob(prev => (prev ? {
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value
    } : null));
  };

  const handleSave = () => {
    if (selectedJob) {
      handleJobUpdated(selectedJob);
    }
  };

  const handleTaskApproval = (job: Job) => {
    if (job.task_description) {
      setSelectedTask({
        task_id: job.task_id || job.id,
        title: job.title,
        description: job.task_description,
        hashtag: job.task_hashtag || '',
        is_verified: job.task_verified || false,
      });
      setTaskHashtag(job.task_hashtag || '');
      onTaskOpen();
    }
  };

  const handleTaskView = (job: Job) => {
    if (job.task_description) {
      setSelectedTask({
        task_id: job.task_id || job.id,
        title: job.title,
        description: job.task_description,
        hashtag: job.task_hashtag || '',
        is_verified: job.task_verified || false,
      });
      onTaskViewOpen();
    }
  };

  const handleTaskApprovalSubmit = async () => {
    if (selectedTask) {
      try {
        setIsTaskVerifying(true);
        if (!taskHashtag.trim() || !taskHashtag.startsWith('#')) {
          toast({
            title: "Invalid Hashtag",
            description: "Please enter a valid hashtag starting with #.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          return;
        }

        const isVerified = await verifyLaunchpadTask(
          selectedTask.task_id,
          taskHashtag,
          true
        );

        if (isVerified) {
          const updatedData = data.map(job =>
            job.task_id === selectedTask.task_id
              ? {
                  ...job,
                  task_hashtag: taskHashtag,
                  task_verified: true,
                }
              : job
          );
          setData(updatedData);
          setFilteredData(updatedData);
          // Optional: Refetch to ensure consistency with backend
          // await fetchJobs();
          toast({
            title: "Task Verified",
            description: `Task "${selectedTask.title}" has been successfully verified with hashtag ${taskHashtag}.`,
            status: "success",
            duration: 3000,
            isClosable: true,
          });
          setTaskHashtag('');
          setSelectedTask(null);
          onTaskClose();
        } else {
          toast({
            title: "Verification Failed",
            description: "Failed to verify the task. Please try again.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        console.error("Error verifying task:", error);
        toast({
          title: "Error",
          description: "An error occurred while verifying the task.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setIsTaskVerifying(false);
      }
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getTaskStatus = (job: Job) => {
    if (job.opening_type === 'Task') {
      if (job.task_verified) {
        return <Badge colorScheme="green">Verified</Badge>;
      } else {
        return <Badge colorScheme="orange">Pending</Badge>;
      }
    }
    return <Badge colorScheme="gray">N/A</Badge>;
  };

  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  return (
    <>
      <TableTop
        onSearchText={handleSearch}
        onPerPageNumber={handlePerPageNumber}
      />
      
      <MuModal
        isOpen={isEditModalOpen}
        onClose={onEditModalClose}
        title="Edit Job"
        type="success"
        body="Enter the details of the job."
        onDone={handleSave}
      >
        {selectedJob && (
          <VStack spacing={4} align="stretch">
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                name="title"
                value={selectedJob.title || ''}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Domain</FormLabel>
              <Input
                name="domain"
                value={selectedJob.domain || ''}
                onChange={handleChange}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Skills & Description</FormLabel>
              <Textarea
                name="skills"
                value={selectedJob.skills || ''}
                onChange={handleChange}
                rows={4}
              />
            </FormControl>

            <HStack>
              <FormControl>
                <FormLabel>Salary Range</FormLabel>
                <Input
                  name="salary_range"
                  value={selectedJob.salary_range || ''}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Location</FormLabel>
                <Input
                  name="location"
                  value={selectedJob.location || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <HStack>
              <FormControl>
                <FormLabel>Job Type</FormLabel>
                <Select
                  name="job_type"
                  value={selectedJob.job_type || ''}
                  onChange={handleChange}
                >
                  <option value="">Select type</option>
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Freelance">Freelance</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel>Interest Groups</FormLabel>
                <Input
                  name="interest_groups"
                  value={selectedJob.interest_groups || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <HStack>
              <FormControl>
                <FormLabel>Minimum Karma</FormLabel>
                <Input
                  type="number"
                  name="minimum_karma"
                  value={selectedJob.minimum_karma || ''}
                  onChange={handleChange}
                />
              </FormControl>

              <FormControl>
                <FormLabel>Experience</FormLabel>
                <Input
                  name="experience"
                  value={selectedJob.experience || ''}
                  onChange={handleChange}
                />
              </FormControl>
            </HStack>

            <FormControl>
              <FormLabel>Opening Type</FormLabel>
              <Select
                name="opening_type"
                value={selectedJob.opening_type || ''}
                onChange={handleChange}
              >
                <option value="">Select opening type</option>
                <option value="General">General</option>
                <option value="Task">Task</option>
              </Select>
            </FormControl>

            {selectedJob.opening_type === 'Task' && (
              <>
                <Divider />
                <FormControl>
                  <FormLabel>Task Description</FormLabel>
                  <Textarea
                    name="task_description"
                    value={selectedJob.task_description || ''}
                    onChange={handleChange}
                    rows={3}
                  />
                </FormControl>

                <Box borderWidth="1px" borderRadius="md" p={4}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <VStack align="start" spacing={1}>
                      <Text fontWeight="bold">Task Status: {selectedJob.task_verified ? 'Verified' : 'Pending'}</Text>
                      {selectedJob.task_hashtag && (
                        <Text fontSize="sm">Hashtag: {selectedJob.task_hashtag}</Text>
                      )}
                    </VStack>
                    <HStack spacing={2}>
                      <Button
                        size="sm"
                        leftIcon={<Eye size={16} />}
                        onClick={() => handleTaskView(selectedJob)}
                      >
                        View Task
                      </Button>
                      {!selectedJob.task_verified && (
                        <Button
                          size="sm"
                          colorScheme="blue"
                          leftIcon={<Hash size={16} />}
                          onClick={() => handleTaskApproval(selectedJob)}
                        >
                          Approve Task
                        </Button>
                      )}
                    </HStack>
                  </HStack>
                </Box>
              </>
            )}
          </VStack>
        )}
      </MuModal>

      <MuModal
        isOpen={isTaskOpen}
        onClose={onTaskClose}
        title="Task Approval"
        type="success"
        body="Enter the task hashtag for approval."
        onDone={handleTaskApprovalSubmit}
      >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Task Title</FormLabel>
            <div className={styles.readOnlyField}>{selectedTask?.title || 'N/A'}</div>
          </FormControl>
          
          <FormControl>
            <FormLabel>Task Description</FormLabel>
            <div className={styles.readOnlyField}>{selectedTask?.description || 'N/A'}</div>
          </FormControl>
          
          <FormControl>
            <FormLabel>Task Hashtag</FormLabel>
            <Input
              placeholder="Enter task hashtag (e.g., #development2024)"
              value={taskHashtag}
              onChange={(e) => setTaskHashtag(e.target.value)}
              isDisabled={isTaskVerifying}
            />
          </FormControl>
        </VStack>
      </MuModal>

      <MuModal
        isOpen={isTaskViewOpen}
        onClose={onTaskViewClose}
        title="Task Details"
        type="success"
        body="View the details of the task."
        onDone={onTaskViewClose}
      >
        <VStack spacing={4} align="stretch">
          <FormControl>
            <FormLabel>Task Title</FormLabel>
            <div className={styles.readOnlyField}>{selectedTask?.title || 'N/A'}</div>
          </FormControl>
          
          <FormControl>
            <FormLabel>Task Description</FormLabel>
            <div className={styles.readOnlyField}>{selectedTask?.description || 'N/A'}</div>
          </FormControl>
          
          <FormControl>
            <FormLabel>Current Hashtag</FormLabel>
            <div className={styles.readOnlyField}>{selectedTask?.hashtag || 'Not set'}</div>
          </FormControl>
          
          <FormControl>
            <FormLabel>Verification Status</FormLabel>
            <div className={styles.readOnlyField}>
              {selectedTask?.is_verified ? (
                <Badge colorScheme="green">Verified</Badge>
              ) : (
                <Badge colorScheme="orange">Pending</Badge>
              )}
            </div>
          </FormControl>
        </VStack>
      </MuModal>

      <Table
        rows={paginatedData}
        isloading={isLoading}
        page={currentPage}
        perPage={perPage}
        columnOrder={columnOrder}
        id={["id"]}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        modalDeleteHeading="Delete Job"
        modalTypeContent="error"
        modalDeleteContent="Are you sure you want to delete this job?"
        customCellRender={(column: string, row: Job) => {
          if (column === "job_type") {
            return row.job_type || "-";
          }
          if (column === "salary_range") {
            return row.salary_range || "-";
          }
          if (column === "location") {
            return row.location || "-";
          }
          if (column === "experience") {
            return row.experience ? `${row.experience} years` : "-";
          }
          if (column === "opening_type") {
            return (
              <Badge colorScheme={row.opening_type === 'Task' ? 'blue' : 'green'}>
                {row.opening_type || 'General'}
              </Badge>
            );
          }
          if (column === "task_status") {
            return getTaskStatus(row);
          }
          if (column === "created_at") {
            return formatDate(row.created_at);
          }
          if (column === "minimum_karma") {
            return row.minimum_karma || 0;
          }
          return null;
        }}
      >
        <THead
          columnOrder={columnOrder}
          onIconClick={handleIconClick}
          action={true}
        />
        <div>
          {!isLoading && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              margin="10px 0"
              handleNextClick={handleNextClick}
              handlePreviousClick={handlePreviousClick}
              onSearchText={handleSearch}
              onPerPageNumber={handlePerPageNumber}
              perPage={perPage}
              setPerPage={setPerPage}
            />
          )}
        </div>
        <Blank />
      </Table>
    </>
  );
};

export default ManageJobs;