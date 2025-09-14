import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Box, VStack, HStack, Text, Badge, Button, FormControl, FormLabel, Input, Textarea, useDisclosure, Select, Flex, Divider, useToast, IconButton, Link, Image } from '@chakra-ui/react';
import { Eye, CheckCircle, XCircle, Calendar, ExternalLink, User, MapPin, DollarSign, Briefcase, Clock, Users } from 'lucide-react';
import styles from './JobInvites.module.css';
import MuModal from '@/components/MuComponents/MuModal/MuModal';
import { getJobInvites, applyToJob } from './services/api';


interface Task {
  task_id: string;
  task_description: string;
  task_verified: boolean;
  task_hashtag: string | null;
}

interface JobInvite {
  application_id: string;
  job_id: string;
  job_title: string;
  company_name: string;
  company_id: string;
  recruiter_name: string;
  skills: string | null;
  experience: string | null;
  location: string | null;
  salary_range: string | null;
  job_type: string | null;
  domain: string | null;
  opening_type: string | null;
  minimum_karma: number | null;
  status: 'invited' | 'applied' | 'interview_scheduled' | 'accepted' | 'rejected';
  invited_at: string;
  applied_at: string | null;
  task_id?: string;
  task_description?: string;
  task_verified?: boolean;
  task_hashtag?: string | null;
  interview_details?: InterviewDetails;
 
}

interface InterviewDetails {
  interview_date: string | null;
  interview_time: string | null;
  interview_platform: string | null;
  interview_link: string | null;
}

interface ApiResponse {
  data: JobInvite[];
  pagination: {
    count: number;
    totalPages: number;
    isNext: boolean;
  };
}

type JobStatus = 'invited' | 'applied' | 'interview_scheduled' | 'accepted' | 'rejected';

interface StatusColorMap {
  invited: string;
  applied: string;
  interview_scheduled: string;
  accepted: string;
  rejected: string;
}

const Launchpad = () => {
  const { isOpen: isDetailsOpen, onOpen: onDetailsOpen, onClose: onDetailsClose } = useDisclosure();
  const { isOpen: isAcceptOpen, onOpen: onAcceptOpen, onClose: onAcceptClose } = useDisclosure();
  const { isOpen: isTaskViewOpen, onOpen: onTaskViewOpen, onClose: onTaskViewClose } = useDisclosure();
  const [selectedInvite, setSelectedInvite] = useState<JobInvite | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [invites, setInvites] = useState<JobInvite[]>([]);
  const [filteredInvites, setFilteredInvites] = useState<JobInvite[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const firstFetch = useRef(true);
  const toast = useToast();
  const [acceptForm, setAcceptForm] = useState({
    resume_link: '',
    linkedin_link: '',
    portfolio_link: '',
    cover_letter: '',
    other_link: ''
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [companyFilter, setCompanyFilter] = useState<string>('');

  const fetchInvites = async () => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const response: ApiResponse = await getJobInvites();
      const invitesData: JobInvite[] = response.data || [];
      console.log('Fetched invites:', response); // Debug log
      setInvites(invitesData);
      applyFilters(invitesData, statusFilter, companyFilter);
    } catch (error: any) {
      console.error('Error fetching job invites:', error);
      setErrorMessage('Failed to fetch job invites. Please try again.');
      setInvites([]);
      setFilteredInvites([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (firstFetch.current) {
      fetchInvites();
    }
    firstFetch.current = false;
  }, []);

  const applyFilters = (data: JobInvite[], status: string, company: string) => {
    let filtered: JobInvite[] = data || [];
    if (status !== 'all') {
      filtered = filtered.filter(invite => invite.status === status);
    }
    if (company.trim()) {
      filtered = filtered.filter(invite =>
        invite.company_name?.toLowerCase().includes(company.toLowerCase())
      );
    }
    console.log('Filtered invites:', filtered); // Debug log
    setFilteredInvites(filtered);
  };

  const handleStatusFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    setStatusFilter(newStatus);
    applyFilters(invites, newStatus, companyFilter);
  };

  const handleCompanyFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCompany = e.target.value;
    setCompanyFilter(newCompany);
    applyFilters(invites, statusFilter, newCompany);
  };

  const handleInviteClick = (invite: JobInvite, event?: React.MouseEvent) => {
    // Prevent opening modal if clicking on interview button
    if (event?.target && (event.target as HTMLElement).closest('.interview-button')) {
      return;
    }
    setSelectedInvite(invite);
    onDetailsOpen();
  };

  const handleInterviewLinkClick = (link: string) => {
    window.open(link, '_blank', 'noopener,noreferrer');
  };

  const handleAccept = () => {
    if (selectedInvite) {
      onDetailsClose();
      onAcceptOpen();
    }
  };

  const handleReject = async () => {
    if (selectedInvite) {
      try {
        setInvites(prev =>
          prev.map(invite =>
            invite.application_id === selectedInvite.application_id
              ? { ...invite, status: 'rejected' }
              : invite
          )
        );
        setFilteredInvites(prev =>
          prev.map(invite =>
            invite.application_id === selectedInvite.application_id
              ? { ...invite, status: 'rejected' }
              : invite
          )
        );
        toast({
          title: "Invitation Declined",
          description: "You have successfully declined this job invitation.",
          status: "info",
          duration: 3000,
          isClosable: true,
        });
        onDetailsClose();
      } catch (error: any) {
        toast({
          title: "Error",
          description: "Failed to decline job invite. Please try again.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const handleAcceptSubmit = async () => {
    if (!selectedInvite) return;

    try {
      const response = await applyToJob(
        selectedInvite.application_id,
        acceptForm.resume_link,
        acceptForm.linkedin_link,
        acceptForm.portfolio_link,
        acceptForm.cover_letter,
        acceptForm.other_link
      );

      setInvites(prev =>
        prev.map(invite =>
          invite.application_id === selectedInvite.application_id
            ? { ...invite, status: 'applied', applied_at: response.applied_at }
            : invite
        )
      );
      setFilteredInvites(prev =>
        prev.map(invite =>
          invite.application_id === selectedInvite.application_id
            ? { ...invite, status: 'applied', applied_at: response.applied_at }
            : invite
        )
      );
      setAcceptForm({
        resume_link: '',
        linkedin_link: '',
        portfolio_link: '',
        cover_letter: '',
        other_link: '',
      });
      toast({
        title: "Application Submitted",
        description: "Your job application has been submitted successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onAcceptClose();
    } catch (error: any) {
      console.error('Error accepting job invite:', error);
      toast({
        title: "Application Failed",
        description: "Failed to submit your application. Please check your details and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  const handleAcceptFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAcceptForm(prev => ({ ...prev, [name]: value }));
  };

  const handleTaskView = (task: Task) => {
    setSelectedTask(task);
    onTaskViewOpen();
  };

  const getStatusColor = (status: JobStatus): string => {
    const colorMap: StatusColorMap = {
      invited: 'yellow',
      applied: 'blue',
      interview_scheduled: 'purple',
      accepted: 'green',
      rejected: 'red',
    };
    return colorMap[status] || 'gray';
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Job Invites & Interviews</h1>
        <p className={styles.subtitle}>View and manage your job invites and scheduled interviews</p>
      </div>

      {errorMessage && (
        <Text color="red.500" mb={4}>
          {errorMessage}
        </Text>
      )}

      <Flex className={styles.filterContainer} gap={4} mb={4}>
        <FormControl maxW="200px">
          <FormLabel>Filter by Status</FormLabel>
          <Select value={statusFilter} onChange={handleStatusFilterChange}>
            <option value="all">All</option>
            <option value="invited">Invited</option>
            <option value="applied">Applied</option>
            <option value="interview_scheduled">Interview Scheduled</option>
            <option value="accepted">Accepted</option>
            <option value="rejected">Rejected</option>
          </Select>
        </FormControl>
        <FormControl maxW="300px">
          <FormLabel>Search by Company</FormLabel>
          <Input
            value={companyFilter}
            onChange={handleCompanyFilterChange}
            placeholder="Enter company name"
          />
        </FormControl>
      </Flex>

      {isLoading ? (
        <Text className={styles.loadingText}>Loading invites...</Text>
      ) : !filteredInvites || filteredInvites.length === 0 ? (
        <>
          <Text className={styles.noDataText}>No job invites or interviews available. <br/>If you haven't enabled open to work in your profile settings, please do so to receive job invites.</Text>
       
        </>
      
      ) : (
        <VStack spacing={4} align="stretch">
          {filteredInvites.map(invite => (
            <Box
              key={invite.application_id}
              className={styles.inviteCard}
              onClick={(e) => handleInviteClick(invite, e)}
            >
              <HStack justifyContent="space-between" alignItems="flex-start">
                <VStack align="start" spacing={3} flex={1}>
                  <VStack align="start" spacing={1}>
                    <Text className={styles.cardTitle}>{invite.job_title}</Text>
                    <HStack spacing={2}>
                      <Briefcase size={14} />
                      <Text className={styles.cardCompany}>{invite.company_name}</Text>
                    </HStack>
                  </VStack>
                  
                  <HStack spacing={6} flexWrap="wrap">
                    {invite.salary_range && (
                      <HStack spacing={1}>
                        <DollarSign size={14} color="#4A5568" />
                        <Text className={styles.cardDetail}>{invite.salary_range}</Text>
                      </HStack>
                    )}
                    {invite.location && (
                      <HStack spacing={1}>
                        <MapPin size={14} color="#4A5568" />
                        <Text className={styles.cardDetail}>{invite.location}</Text>
                      </HStack>
                    )}
                    {invite.experience && (
                      <HStack spacing={1}>
                        <Clock size={14} color="#4A5568" />
                        <Text className={styles.cardDetail}>{invite.experience} experience</Text>
                      </HStack>
                    )}
                  </HStack>

                  {invite.status === 'interview_scheduled' && (
                    <Box className={styles.interviewDetails} w="100%">
                      <VStack align="start" spacing={2}>
                        <HStack spacing={2}>
                          <Calendar size={16} color="#2D3748" />
                          <Text fontSize="sm" fontWeight="bold" color="purple.600">
                            Interview: {invite.interview_details?.interview_date || 'N/A'} at {invite.interview_details?.interview_time || 'N/A'}
                          </Text>
                        </HStack>
                        <Text fontSize="sm" color="gray.600">
                          Platform: {invite.interview_details?.interview_platform || 'N/A'}
                        </Text>
                      </VStack>
                    </Box>
                  )}
                </VStack>
                
                <VStack spacing={2} alignItems="flex-end">
                  <Badge className={styles.statusBadge} colorScheme={getStatusColor(invite.status)}>
                    {invite.status === 'interview_scheduled' ? 'INTERVIEW' : invite.status.toUpperCase()}
                  </Badge>
                  
                  {invite.status === 'interview_scheduled' && invite.interview_details?.interview_link && (
                    <Button
                      className="interview-button"
                      size="sm"
                      colorScheme="purple"
                      leftIcon={<ExternalLink size={14} />}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleInterviewLinkClick(invite.interview_details!.interview_link!);
                      }}
                    >
                      Join Interview
                    </Button>
                  )}
                </VStack>
              </HStack>
            </Box>
          ))}
        </VStack>
      )}

      {/* Job Invite/Interview Details Modal */}
      <MuModal
        isOpen={isDetailsOpen}
        onClose={onDetailsClose}
        title={selectedInvite?.status === 'interview_scheduled' ? 'Interview Details' : 'Job Invite Details'}
        type="success"
        body={selectedInvite?.status === 'interview_scheduled' ? 'Complete details of your scheduled interview.' : 'Complete details of the job invitation.'}
        onDone={onDetailsClose}
      >
        {selectedInvite && (
          <VStack spacing={6} align="stretch">
            {/* Job Information Section */}
            <Box> 
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800" borderBottom="2px solid" borderColor="blue.200" pb={2}>
                Job Information
              </Text>
              <VStack spacing={4} align="stretch">
                <HStack alignItems="center">
                  <Box minW="120px">
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm">Position:</Text>
                  </Box>
                  <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md" flex={1}>
                    <Text fontWeight="medium" color="gray.900" fontSize="md">{selectedInvite.job_title || 'N/A'}</Text>
                  </Box>
                </HStack>

                <HStack alignItems="center">
                  <Box minW="120px">
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm">Company:</Text>
                  </Box>
                  <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md" flex={1}>
                    <HStack>
                      <Briefcase size={16} color="#2D3748" />
                      <Text fontWeight="medium" color="gray.900" fontSize="md">{selectedInvite.company_name || 'N/A'}</Text>
                    </HStack>
                  </Box>
                </HStack>

                <HStack alignItems="center">
                  <Box minW="120px">
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm">Recruiter:</Text>
                  </Box>
                  <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md" flex={1}>
                    <HStack>
                      <User size={16} color="#2D3748" />
                      <Text fontWeight="medium" color="gray.900" fontSize="md">{selectedInvite.recruiter_name || 'N/A'}</Text>
                    </HStack>
                  </Box>
                </HStack>
              </VStack>
            </Box>

            <Divider borderColor="gray.300" />

            {/* Job Details Section */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800" borderBottom="2px solid" borderColor="green.200" pb={2}>
                Job Details
              </Text>
              <VStack spacing={4} align="stretch">
                <HStack spacing={4}>
                  <Box flex={1}>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Salary:</Text>
                    <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <DollarSign size={16} color="#38A169" />
                      <Text color="gray.900" fontSize="md">{selectedInvite.salary_range || 'Not specified'}</Text>
                    </HStack>
                  </Box>
                  <Box flex={1}>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Location:</Text>
                    <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <MapPin size={16} color="#3182CE" />
                      <Text color="gray.900" fontSize="md">{selectedInvite.location || 'Not specified'}</Text>
                    </HStack>
                  </Box>
                </HStack>

                <HStack spacing={4}>
                  <Box flex={1}>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Experience:</Text>
                    <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <Clock size={16} color="#D69E2E" />
                      <Text color="gray.900" fontSize="md">{selectedInvite.experience || 'Not specified'}</Text>
                    </HStack>
                  </Box>
                  <Box flex={1}>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Job Type:</Text>
                    <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <Briefcase size={16} color="#805AD5" />
                      <Text color="gray.900" fontSize="md">{selectedInvite.job_type || 'Not specified'}</Text>
                    </HStack>
                  </Box>
                </HStack>

                <HStack spacing={4}>
                  <Box flex={1}>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Domain:</Text>
                    <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <Users size={16} color="#E53E3E" />
                      <Text color="gray.900" fontSize="md">{selectedInvite.domain || 'Not specified'}</Text>
                    </HStack>
                  </Box>
                  <Box flex={1}>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Min Karma:</Text>
                    <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <Text color="gray.900" fontSize="md" fontWeight="medium">{selectedInvite.minimum_karma ?? 'Not specified'}</Text>
                    </Box>
                  </Box>
                </HStack>

                {selectedInvite.skills && (
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Required Skills:</Text>
                    <Box bg="white" border="1px solid" borderColor="gray.200" p={4} borderRadius="md">
                      <Text color="gray.900" fontSize="md" lineHeight="1.6">{selectedInvite.skills}</Text>
                    </Box>
                  </Box>
                )}
              </VStack>
            </Box>

            {selectedInvite.status === 'interview_scheduled' && (
              <>
                <Divider borderColor="gray.300" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800" borderBottom="2px solid" borderColor="purple.200" pb={2}>
                    Interview Details
                  </Text>
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                      <Box flex={1}>
                        <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Date:</Text>
                        <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                          <Calendar size={16} color="#805AD5" />
                          <Text color="gray.900" fontSize="md">{selectedInvite.interview_details?.interview_date || 'Not specified'}</Text>
                        </HStack>
                      </Box>
                      <Box flex={1}>
                        <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Time:</Text>
                        <HStack bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                          <Clock size={16} color="#805AD5" />
                          <Text color="gray.900" fontSize="md">{selectedInvite.interview_details?.interview_time || 'Not specified'}</Text>
                        </HStack>
                      </Box>
                    </HStack>
                    
                    <Box>
                      <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Platform:</Text>
                      <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                        <Text color="gray.900" fontSize="md">{selectedInvite.interview_details?.interview_platform || 'Not specified'}</Text>
                      </Box>
                    </Box>
                    
                    {selectedInvite.interview_details?.interview_link && (
                      <Box>
                        <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Interview Link:</Text>
                        <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                          <HStack>
                            <ExternalLink size={16} color="#805AD5" />
                            <Link
                              href={selectedInvite.interview_details.interview_link}
                              isExternal
                              color="purple.600"
                              fontWeight="medium"
                              fontSize="md"
                              _hover={{ textDecoration: 'underline', color: 'purple.700' }}
                            >
                              Join Interview
                            </Link>
                          </HStack>
                        </Box>
                      </Box>
                    )}
                  </VStack>
                </Box>
              </>
            )}

            <Divider borderColor="gray.300" />

            {/* Status and Timeline Section */}
            <Box>
              <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800" borderBottom="2px solid" borderColor="orange.200" pb={2}>
                Application Timeline
              </Text>
              <VStack spacing={4} align="stretch">
                <HStack justifyContent="space-between" alignItems="center">
                  <Text fontWeight="semibold" color="gray.700" fontSize="md">Current Status:</Text>
                  <Badge colorScheme={getStatusColor(selectedInvite.status)} fontSize="sm" px={4} py={2} borderRadius="full">
                    {selectedInvite.status === 'interview_scheduled' ? 'INTERVIEW SCHEDULED' : selectedInvite.status.toUpperCase()}
                  </Badge>
                </HStack>
                
                <Box>
                  <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Invited On:</Text>
                  <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                    <Text color="gray.900" fontSize="md">{selectedInvite.invited_at ? new Date(selectedInvite.invited_at).toLocaleDateString() : 'N/A'}</Text>
                  </Box>
                </Box>
                
                {selectedInvite.applied_at && (
                  <Box>
                    <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Applied On:</Text>
                    <Box bg="white" border="1px solid" borderColor="gray.200" p={3} borderRadius="md">
                      <Text color="gray.900" fontSize="md">{new Date(selectedInvite.applied_at).toLocaleDateString()}</Text>
                    </Box>
                  </Box>
                )}
              </VStack>
            </Box>

            {selectedInvite.opening_type === 'Task' && selectedInvite.task_id && (
              <>
                <Divider borderColor="gray.300" />
                <Box>
                  <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800" borderBottom="2px solid" borderColor="teal.200" pb={2}>
                    Associated Task
                  </Text>
                  <Box bg="white" border="2px solid" borderColor="teal.200" borderRadius="lg" p={5}>
                    <VStack align="stretch" spacing={4}>
                      <Box>
                        <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Task Description:</Text>
                        <Box bg="gray.50" border="1px solid" borderColor="gray.200" p={4} borderRadius="md">
                          <Box color="gray.900" fontSize="md" lineHeight="1.6" className="markdown-content">
                            <ReactMarkdown>{selectedInvite.task_description}</ReactMarkdown>
                          </Box>
                        </Box>
                      </Box>
                      
                      <HStack spacing={4} alignItems="flex-end">
                        <VStack align="stretch" spacing={3} flex={1}>
                          {selectedInvite.task_hashtag && (
                            <Box>
                              <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Hashtag:</Text>
                              <Badge colorScheme="teal" fontSize="md" px={3} py={1} borderRadius="md">
                                {selectedInvite.task_hashtag}
                              </Badge>
                            </Box>
                          )}
                          <Box>
                            <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Verification Status:</Text>
                            <Badge colorScheme={selectedInvite.task_verified ? 'green' : 'red'} fontSize="md" px={3} py={1} borderRadius="md">
                              {selectedInvite.task_verified ? (
                                <>
                                  <CheckCircle size={14} style={{ marginRight: '4px' }} />
                                  Verified
                                </>
                              ) : (
                                <>
                                  <XCircle size={14} style={{ marginRight: '4px' }} />
                                  Not Verified
                                </>
                              )}
                            </Badge>
                          </Box>
                        </VStack>
                        <Button
                          size="md"
                          colorScheme="teal"
                          leftIcon={<Eye size={16} />}
                          onClick={() =>
                            handleTaskView({
                              task_id: selectedInvite.task_id!,
                              task_description: selectedInvite.task_description!,
                              task_verified: selectedInvite.task_verified!,
                              task_hashtag: selectedInvite.task_hashtag ?? null,
                            })
                          }
                          _hover={{ transform: 'translateY(-1px)', boxShadow: 'lg' }}
                        >
                          View Details
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                </Box>
              </>
            )}

            {selectedInvite.status === 'invited' && (
              <>
                <Divider borderColor="gray.300" />
                <Box bg="gray.50" p={6} borderRadius="lg" border="1px solid" borderColor="gray.200">
                  <Text textAlign="center" color="gray.700" mb={4} fontSize="sm">
                    Choose your action for this job invitation
                  </Text>
                  <HStack spacing={4} justifyContent="center">
                    <Button
                      colorScheme="green"
                      size="lg"
                      leftIcon={<CheckCircle size={20} />}
                      onClick={handleAccept}
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl' }}
                      boxShadow="md"
                      px={8}
                    >
                      Accept Invitation
                    </Button>
                    <Button
                      colorScheme="red"
                      variant="outline"
                      size="lg"
                      leftIcon={<XCircle size={20} />}
                      onClick={handleReject}
                      _hover={{ transform: 'translateY(-2px)', boxShadow: 'xl', bg: 'red.50' }}
                      boxShadow="md"
                      px={8}
                    >
                      Decline
                    </Button>
                  </HStack>
                </Box>
              </>
            )}
          </VStack>
        )}
      </MuModal>

      {/* Accept Invite Modal */}
      <MuModal
        isOpen={isAcceptOpen}
        onClose={onAcceptClose}
        title="Submit Your Application"
        type="success"
        body="Complete your application by providing the required information below."
        onDone={handleAcceptSubmit}
      >
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4} color="blue.600">
              Application for: {selectedInvite?.job_title}
            </Text>
            <Text fontSize="sm" color="gray.600" mb={4}>
              at {selectedInvite?.company_name}
            </Text>
          </Box>

          <Divider />

          <VStack spacing={4} align="stretch">
            <FormControl isRequired>
              <FormLabel fontWeight="semibold" color="gray.700">
                Resume Link <span style={{ color: 'red' }}>*</span>
              </FormLabel>
              <Input
                name="resume_link"
                value={acceptForm.resume_link}
                onChange={handleAcceptFormChange}
                placeholder="https://drive.google.com/your-resume-link"
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Provide a direct link to your resume (Google Drive, Dropbox, etc.)
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" color="gray.700">LinkedIn Profile</FormLabel>
              <Input
                name="linkedin_link"
                value={acceptForm.linkedin_link}
                onChange={handleAcceptFormChange}
                placeholder="https://linkedin.com/in/your-profile"
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" color="gray.700">Portfolio Link</FormLabel>
              <Input
                name="portfolio_link"
                value={acceptForm.portfolio_link}
                onChange={handleAcceptFormChange}
                placeholder="https://your-portfolio.com"
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
              />
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" color="gray.700">Cover Letter</FormLabel>
              <Textarea
                name="cover_letter"
                value={acceptForm.cover_letter}
                onChange={handleAcceptFormChange}
                rows={4}
                placeholder="Write a brief cover letter explaining your interest in this position..."
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
                resize="vertical"
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                Optional but recommended to stand out
              </Text>
            </FormControl>

            <FormControl>
              <FormLabel fontWeight="semibold" color="gray.700">Additional Links</FormLabel>
              <Input
                name="other_link"
                value={acceptForm.other_link}
                onChange={handleAcceptFormChange}
                placeholder="https://github.com/your-profile or other relevant links"
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: "blue.400" }}
                _focus={{ borderColor: "blue.500", boxShadow: "0 0 0 1px #3182CE" }}
              />
              <Text fontSize="xs" color="gray.500" mt={1}>
                GitHub, personal website, or other professional links
              </Text>
            </FormControl>
          </VStack>

          <Divider />

          <Box bg="blue.50" p={4} borderRadius="md">
            <Text fontSize="sm" color="blue.700" textAlign="center">
              <strong>Note:</strong> Make sure all links are publicly accessible. 
              Your application will be reviewed by the recruitment team.
            </Text>
          </Box>
        </VStack>
      </MuModal>

      {/* Task View Modal */}
      <MuModal
        isOpen={isTaskViewOpen}
        onClose={onTaskViewClose}
        title="Task Information"
        type="success"
        body="Complete details of the associated task for this job opportunity."
        onDone={onTaskViewClose}
      >
        <VStack spacing={6} align="stretch">
          <Box>
            <Text fontSize="lg" fontWeight="bold" mb={4} color="gray.800" borderBottom="2px solid" borderColor="teal.200" pb={2}>
              Task Details
            </Text>
          </Box>

          <VStack spacing={4} align="stretch">
            <Box>
              <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Description:</Text>
              <Box bg="white" border="1px solid" borderColor="gray.200" p={4} borderRadius="md" borderLeft="4px solid" borderLeftColor="teal.400">
                <Box color="gray.900" fontSize="md" lineHeight="1.6" className="markdown-content">
                  <ReactMarkdown>{selectedTask?.task_description || 'No description available'}</ReactMarkdown>
                </Box>
              </Box>
            </Box>

            {selectedTask?.task_hashtag && (
              <Box>
                <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Hashtag:</Text>
                <Box>
                  <Badge colorScheme="teal" fontSize="md" px={4} py={2} borderRadius="md">
                    {selectedTask.task_hashtag}
                  </Badge>
                </Box>
              </Box>
            )}

            <Box>
              <Text fontWeight="semibold" color="gray.700" fontSize="sm" mb={2}>Verification Status:</Text>
              <Box>
                <Badge 
                  colorScheme={selectedTask?.task_verified ? 'green' : 'red'} 
                  fontSize="md" 
                  px={4}
                  py={2}
                  borderRadius="md"
                  display="inline-flex"
                  alignItems="center"
                  gap={2}
                >
                  {selectedTask?.task_verified ? (
                    <>
                      <CheckCircle size={16} />
                      Verified
                    </>
                  ) : (
                    <>
                      <XCircle size={16} />
                      Not Verified
                    </>
                  )}
                </Badge>
              </Box>
            </Box>
          </VStack>

          <Divider borderColor="gray.300" />

          <Box bg="teal.50" border="1px solid" borderColor="teal.200" p={4} borderRadius="md">
            <Text fontSize="sm" color="teal.800" textAlign="center" lineHeight="1.5">
              <strong>Note:</strong> This task is associated with the job opportunity. 
              Completion status may affect your application eligibility.
            </Text>
          </Box>
        </VStack>
      </MuModal>
    </div>
  );
};

export default Launchpad;