import React, { useState, useEffect, useCallback, Suspense, useRef, useMemo } from "react";
import styles from "./MuLearnersSearchPage.module.css";
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";
import { getUsers } from "../services/api";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import UserCard from "../../../components/UserCard";
import { HStack, useBreakpointValue, VStack } from "@chakra-ui/react";
import defaultProfile from "../../../assets/images/defaultProfile.png";

interface User {
  full_name: string;
  muid: string;
  interest_groups: { id: string; name: string }[];
  organizations: { id: string; title: string; code: string; org_type: string }[];
  profile_pic: string | null;
  karma: string;
}

// First, simplify the User list component
const UserList: React.FC<{
  search: string;
  onSelect: (user: User) => void;
}> = ({ search, onSelect }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const latestRequestIdRef = useRef<number>(0);

  // Simplified fetchUsers without search type logic
  const fetchUsers = useCallback(
    async (searchTerm: string, pageNum: number) => {
      const currentRequestId = Date.now();
      latestRequestIdRef.current = currentRequestId;
      setIsFetching(true);
      
      try {
        const response = await getUsers({
          search: searchTerm, // Just pass the search term directly
          pageIndex: pageNum,
          perPage: 30,
        });

        if (currentRequestId === latestRequestIdRef.current) {
          const newUsers = response.data;
          
          setUsers((prevUsers) =>
            pageNum === 1 ? newUsers : [...prevUsers, ...newUsers]
          );
          setTotalPages(response.pagination.totalPages);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      } finally {
        if (currentRequestId === latestRequestIdRef.current) {
          setIsFetching(false);
        }
      }
    },
    []
  );

  const debouncedFetchUsers = useMemo(
    () => debounce((searchTerm: string, pageNum: number) => {
      fetchUsers(searchTerm, pageNum);
    }, 800),
    [fetchUsers]
  );

  // Reset page and fetch on search change
  useEffect(() => {
    setPage(1);
    debouncedFetchUsers(search, 1);
    setIsFetching(true);
    return () => {
      debouncedFetchUsers.cancel();
    };
  }, [search, debouncedFetchUsers]);

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching && page < totalPages) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) observerRef.current.observe(loadMoreRef.current);

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [isFetching, page, totalPages]);

  // Fixed: Remove the search condition so pagination works for empty search
  useEffect(() => {
    if (page > 1) { // Removed the search condition
      fetchUsers(search, page);
    }
  }, [page, search, fetchUsers]);

  return (
    <div>
      <div className={styles.userGrid}>
        {isFetching && page === 1 ? (
          <div className={styles.loadingContainer}>
            <MuLoader />
          </div>
        ) : users.length > 0 ? (
          users.map((user, index) => (
            <UserCard
              key={`${user.muid}-${index}`}
              data={{
                name: user.full_name.trim() || "Unknown User",
                muid: user.muid,
                interest_groups: user.interest_groups,
                organizations: user.organizations,
                profile_pic: user.profile_pic ? user.profile_pic : defaultProfile,
                karma: user.karma,
              }}
              onSelect={() => onSelect(user)}
            />
          ))
        ) : (!isFetching && search) ? (
          <p className={styles.noResultsText}>
            The universe says... no results. Try again?
          </p>
        ) : null}
        {isFetching && page > 1 && (
          <div className={styles.loadingContainer}>
            <MuLoader />
          </div>
        )}
      </div>
      <div ref={loadMoreRef} style={{ height: "20px" }} />
    </div>
  );
};

// Update the main component to remove searchType
const MuLearnersSearchPage: React.FC = () => {
  const StackComponent = useBreakpointValue({ base: VStack, md: HStack }) || VStack;
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    window.open(`/profile/${user.muid}`, "_blank");
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.Banner}>
        <div className={styles.BannerContent}>
          <h1 className={styles.BannerTitle}>Find & Connect</h1>
          <p className={styles.BannerSubtitle}>
            Find and connect with like-minded students based on skills, interests, or institution. Collaborate, learn, and grow together in a vibrant community of peers.
          </p>
          <span className={styles.BannerDisclaimer}>*Only <b>public</b> profiles will be displayed here</span>
        </div>
      </div>
      <StackComponent align="center" justify="start" width="100%">
        <div className={styles.searchContainer}>
          <FiSearch className={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search public profiles"
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </StackComponent>

      {error && <p className={styles.errorText}>{error}</p>}
      <Suspense fallback={<MuLoader />}>
        <UserList search={searchTerm} onSelect={handleUserSelect} />
      </Suspense>
    </div>
  );
};

export default MuLearnersSearchPage;