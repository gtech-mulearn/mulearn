import Pagination from "@/MuLearnComponents/Pagination/Pagination";
import THead from "@/MuLearnComponents/Table/THead";
import Table from "@/MuLearnComponents/Table/Table";
import TableTop from "@/MuLearnComponents/TableTop/TableTop";
import MuModal from "@/MuLearnComponents/MuModal/MuModal";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Blank } from "@/MuLearnComponents/Table/Blank";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, FormControl, FormLabel, Input, Textarea, Select, Badge, VStack, HStack } from '@chakra-ui/react';
import { Edit } from 'lucide-react';
import styles from './ManageCompanies.module.css';
import { getCompanies, verifyCompany } from "../../services/api";
import toast from "react-hot-toast";

interface Company {
  id: number;
  name: string;
  pocName: string;
  pocMobile: string;
  email: string;
  website: string;
  address: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

type CompanyStatus = 'pending' | 'approved' | 'rejected';

interface StatusColorMap {
  approved: string;
  pending: string;
  rejected: string;
}

const ManageCompanies = () => {
  const [data, setData] = useState<Company[]>([]);
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(20);
  const [sort, setSort] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const firstFetch = useRef(true);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sample company data - replace with actual API call
  const sampleCompanies: Company[] = [
    {
      id: 1,
      name: 'TechCorp',
      pocName: 'John Doe',
      pocMobile: '+1-555-123-4567',
      email: 'john.doe@techcorp.com',
      website: 'https://techcorp.com',
      address: '123 Tech Street, San Francisco, CA',
      description: 'A leading technology company specializing in software solutions...',
      status: 'pending',
      createdAt: '2024-01-15',
      updatedAt: '2024-01-20'
    },
    {
      id: 2,
      name: 'Innovate Inc.',
      pocName: 'Jane Smith',
      pocMobile: '+1-555-987-6543',
      email: 'jane.smith@innovateinc.com',
      website: 'https://innovateinc.com',
      address: '456 Innovation Ave, New York, NY',
      description: 'Innovative solutions for modern business challenges...',
      status: 'approved',
      createdAt: '2024-01-10',
      updatedAt: '2024-01-18'
    }
  ];

  const columnOrder = [
    { column: 'name', Label: 'Company Name', isSortable: true },
    { column: 'pocName', Label: 'POC Name', isSortable: true },
    { column: 'pocMobile', Label: 'POC Mobile', isSortable: true },
    { column: 'email', Label: 'Email', isSortable: true },
    { column: 'website', Label: 'Website', isSortable: true },
    { column: 'address', Label: 'Address', isSortable: true },
    { column: 'description', Label: 'Description', isSortable: true },
    { column: 'status', Label: 'Status', isSortable: true },
    { column: 'createdAt', Label: 'Created At', isSortable: true },
    { column: 'updatedAt', Label: 'Updated At', isSortable: true }
  ];

  const fetchCompanies = async () => {
    setIsLoading(true);
    try {
      const { data } = await getCompanies();
      const rawCompanies = data.response;

      const mappedCompanies: Company[] = rawCompanies.map((company: any, index: number) => ({
        id: company.id,
        name: company.name || "N/A",
        pocName: company.poc_name || "N/A",
        pocMobile: company.poc_phone || "N/A",
        email: company.poc_email || "N/A",
        website: company.website || "N/A",
        address: company.address || "N/A",
        description: company.description || "N/A",
        status: company.is_verified ? "approved" : "pending",
        createdAt: "", // Fill with actual date if available in future
        updatedAt: ""  // Fill with actual date if available in future
      }));

      setData(mappedCompanies);
      setTotalPages(Math.ceil(mappedCompanies.length / perPage));
    } catch (error) {
      console.error("Error fetching companies:", error);
      setData([]);
      setTotalPages(1);
    } finally {
      setIsLoading(false);
    }
  };


  useEffect(() => {
    if (firstFetch.current) {
      fetchCompanies();
    }
    firstFetch.current = false;
  }, [selectedCompany]);

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
    if (search.trim() === "") {
      fetchCompanies();
    } else {
      const filteredData = data.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.pocName.toLowerCase().includes(search.toLowerCase()) ||
        item.email.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );
      setData(filteredData);
      setTotalPages(Math.ceil(filteredData.length / perPage));
    }
  };

  const handleEdit = (id: string | number | boolean) => {
    const company = data.find(item => item.id === id);
    if (company) {
      setSelectedCompany(company);
      setIsEditModalOpen(true);
    }
  };

  const handleCompanyUpdated = async (updatedCompany: Company) => {
    setIsLoading(true);
    await fetchCompanies();
    setIsEditModalOpen(false);
  };

  const handleDelete = async (id: string | undefined) => {
    if (id) {
      try {
        // Replace with actual delete API call
        console.log('Deleting company:', id);
        setData(prev => {
          const newData = prev.filter(item => item.id !== parseInt(id));
          setTotalPages(Math.ceil(newData.length / perPage));
          return newData;
        });
        navigate("/dashboard/management/manage-companies");
      } catch (error) {
        console.error("Delete failed, refetching companies:", error);
        await fetchCompanies();
      }
    }
  };

  const handlePerPageNumber = (selectedValue: number) => {
    setPerPage(selectedValue);
    setCurrentPage(1);
    setTotalPages(Math.ceil(data.length / selectedValue));
  };

  const handleIconClick = (column: string) => {
    const newSort = sort === column ? `-${column}` : column;
    setSort(newSort);
    const sortedData = [...data].sort((a, b) => {
      const key = newSort.startsWith("-") ? newSort.slice(1) : newSort;
      const aValue = a[key as keyof Company];
      const bValue = b[key as keyof Company];
      if (newSort.startsWith("-")) {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
    setData(sortedData);
  };

  const handleVerifyCompany = async (companyId: string) => {
    try {
      const isVerified = await verifyCompany(companyId);
      if (isVerified) {
        setSelectedCompany(prev => ({
          ...prev!,
          status: 'approved'
        }));
        toast.success('Company verified successfully!');
        handleCompanyUpdated(selectedCompany!);
      } else {
        console.error('Verification failed for company:', companyId);
      }
    } catch (error) {
      console.error('Error verifying company:', error);
    }
  };
 

  const getStatusColor = (status: CompanyStatus): string => {
    const colorMap: StatusColorMap = {
      approved: 'green',
      pending: 'yellow',
      rejected: 'red'
    };
    return colorMap[status] || 'gray';
  };

  return (
    <>
      <TableTop
        onSearchText={handleSearch}
        onPerPageNumber={handlePerPageNumber}
      />
      <MuModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Company Approval"
        type="success"
        body="Do you want to approve this company?"
      >
        {selectedCompany && (
          <>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>Company Name</FormLabel>
                <Input
                  name="name"
                  value={selectedCompany.name || ''}
                  isReadOnly
                />
              </FormControl>

              <HStack>
                <FormControl>
                  <FormLabel>POC Name</FormLabel>
                  <Input
                    name="pocName"
                    value={selectedCompany.pocName || ''}
                    isReadOnly
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>POC Mobile</FormLabel>
                  <Input
                    name="pocMobile"
                    value={selectedCompany.pocMobile || ''}
                    isReadOnly
                  />
                </FormControl>
              </HStack>

              <HStack>
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <Input
                    name="email"
                    value={selectedCompany.email || ''}
                    isReadOnly
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Website</FormLabel>
                  <Input
                    name="website"
                    value={selectedCompany.website || ''}
                    isReadOnly
                  />
                </FormControl>
              </HStack>

              <FormControl>
                <FormLabel>Address</FormLabel>
                <Input
                  name="address"
                  value={selectedCompany.address || ''}
                  isReadOnly
                />
              </FormControl>

              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name="description"
                  value={selectedCompany.description || ''}
                  isReadOnly
                  rows={4}
                />
              </FormControl>
            </VStack>

            <HStack justify="end" mt={6}>
              <Button
                colorScheme="green"
                onClick={() => handleVerifyCompany(selectedCompany.id.toString())}
              >
                Approve
              </Button>
            </HStack>
          </>
        )}
      </MuModal>

      <Table
        rows={data}
        isloading={isLoading}
        page={currentPage}
        perPage={perPage}
        columnOrder={columnOrder}
        id={["id"]}
        onEditClick={handleEdit}
        onDeleteClick={handleDelete}
        modalDeleteHeading="Delete Company"
        modalTypeContent="error"
        modalDeleteContent="Are you sure you want to delete this company?"
        customCellRender={(column: any, row: any) => {
          if (column === "status") {
            return (
              <Badge colorScheme={getStatusColor(row.status)}>
                {row.status?.toUpperCase() || 'N/A'}
              </Badge>
            );
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

export default ManageCompanies;