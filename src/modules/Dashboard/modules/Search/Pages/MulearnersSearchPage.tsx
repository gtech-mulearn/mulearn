import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./MuLearnersSearchPage.module.css";
import { FiSearch } from "react-icons/fi";
import profileImage from "../assets/ProfileImages/10496279.jpg";
import userImage2 from "../assets/ProfileImages/11475206.jpg";
import dpm from "../../Profile/assets/images/dpm.webp";
import debounce from "lodash/debounce";
import { getUsers } from "../services/api";
import AsideDetails from "../../../components/AsideDetails";
import Karma from "../../ProfileV2/assets/svg/Karma";
import AvgKarma from "../../ProfileV2/assets/svg/AvgKarma";
import Rank from "../../ProfileV2/assets/svg/Rank";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import UserCard from "../../../components/UserCard";

interface User {
  full_name: string;
  muid: string;
  interest_groups: { id: string; name: string }[];
  organizations: { id: string; title: string; code: string; org_type: string }[];
  profile_pic: string | null;
  karma: string;
}

interface Pagination {
  totalPages: number;
  isNext: boolean;
}

interface UserResource {
  read: () => { data: User[]; pagination: Pagination };
}

const createResource = (promise: Promise<any>): UserResource => {
  let status: "pending" | "success" | "error" = "pending";
  let result: any;

  const suspender = promise.then(
    (data) => {
      status = "success";
      result = data;
    },
    (error) => {
      status = "error";
      result = error;
    }
  );

  return {
    read: () => {
      if (status === "pending") throw suspender;
      if (status === "error") throw result;
      return result;
    },
  };
};

const UserList: React.FC<{
  search: string;
  searchType: "name" | "college" | "interest";
  onSelect: (user: User) => void;
}> = ({ search, searchType, onSelect }) => {
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const fetchUsers = useCallback(
    async (searchTerm: string, pageNum: number) => {
      setIsFetching(true);
      try {
        const response = await getUsers({
          search: searchType === "name" ? searchTerm : "",
          pageIndex: pageNum,
          perPage: 9,
        });
        const newUsers = response.data;
        

        let filtered: User[] = newUsers;
        if (searchType === "college" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.organizations.some(
              (org) =>
                org.org_type === "College" &&
                org.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else if (searchType === "interest" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.interest_groups.some((ig) =>
              ig.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        }

        setAllUsers((prevUsers) =>
          pageNum === 1 ? newUsers : [...prevUsers, ...newUsers]
        );
        setFilteredUsers((prevFiltered) =>
          pageNum === 1 ? filtered : [...prevFiltered, ...filtered]
        );
        setTotalPages(response.pagination.totalPages);
        setIsFetching(false);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setIsFetching(false);
      }
    },
    [searchType]
  );

  const debouncedFetchUsers = useCallback(
    debounce((searchTerm: string, pageNum: number) => {
      fetchUsers(searchTerm, pageNum);
    }, 300),
    [fetchUsers]
  );

  // Reset and fetch initial page when search or searchType changes
  useEffect(() => {
    setAllUsers([]);
    setFilteredUsers([]);
    setPage(1);
    debouncedFetchUsers(search, 1);
    return () => debouncedFetchUsers.cancel();
  }, [search, searchType, debouncedFetchUsers]);

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

  useEffect(() => {
    if (page > 1) {
      fetchUsers(search, page);
    }
  }, [page, search, fetchUsers]);

  const displayUsers =
    searchType === "name" || !search ? allUsers : filteredUsers;


  return (
    <div>
      <div className={styles.userGrid}>
        {displayUsers.length > 0 ? (
          displayUsers.map((user, index) => (
            <UserCard
              key={`${user.muid}-${index}`}
              data={{
                name: user.full_name.trim() || "Unknown User",
                muid: user.muid,
                interest_groups: user.interest_groups,
                organizations: user.organizations,
                profile_pic: user.profile_pic || (index % 2 === 0 ? profileImage : userImage2),
                karma: user.karma,
              }}
              onSelect={() => onSelect(user)}
            />
          ))
        ) : (
          !isFetching && (
            <p className={styles.noResultsText}>
              The universe says... no results. Try again?
            </p>
          )
        )}
      </div>
      <div className={styles.loadingContainer}>
        {isFetching && <MuLoader />}
        <div ref={loadMoreRef} style={{ height: "20px" }} />
      </div>
    </div>
  );
};

const MuLearnersSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"name" | "college" | "interest">("name");
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);




  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsAsideOpen(true);
    console.log(selectedUser, "selected user")
  };



  const handleAsideClose = () => {
    setIsAsideOpen(false);
    setSelectedUser(null);
  };



  return (
    <div className={styles.pageContainer}>
      <div className={styles.Banner}>
        <div className={styles.BannerContent}>
          <h1 className={styles.BannerTitle}>Find & Connect</h1>
          <p className={styles.BannerSubtitle}>
            Explore a curated network of individuals based on interest groups, names, or colleges.
            Navigate technology, management, and creativity with clarity and purpose.
          </p>
        </div>
      </div>

      <div className={styles.searchContainer}>
        
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder={`Search by ${searchType === "name" ? "name" : searchType === "college" ? "college" : "interest group"}`}
          className={styles.searchInput}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

      </div>
      <div className={styles.searchTypeButtons}>
        <button
          className={`${styles.searchTypeButton} ${searchType === "name" ? styles.active : ""}`}
          onClick={() => setSearchType("name")}
        >
          Name
        </button>
        <button
          className={`${styles.searchTypeButton} ${searchType === "college" ? styles.active : ""}`}
          onClick={() => setSearchType("college")}
        >
          College
        </button>
        <button
          className={`${styles.searchTypeButton} ${searchType === "interest" ? styles.active : ""}`}
          onClick={() => setSearchType("interest")}
        >
          Interest Group
        </button>
      </div>

      {error && <p className={styles.errorText}>{error}</p>}

      <Suspense fallback={<MuLoader />}>
        <UserList search={searchTerm} searchType={searchType} onSelect={handleUserSelect} />
      </Suspense>

      <AsideDetails isOpen={isAsideOpen} handleClose={handleAsideClose}>
        {selectedUser && (
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={styles.profileImageContainer}>
                <img
                  src={selectedUser.profile_pic || dpm}
                  alt={selectedUser.full_name}
                  className={styles.profileImage}
                />
              </div>
              {/* <div className={styles.memberSince}>Member since 2023</div>
              <button className={styles.connectBtn}>Connect</button> */}
            </div>

            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{selectedUser.full_name}</h2>
              <p className={styles.profileUsername}>{selectedUser.muid}</p>
              <p className={styles.profileCollegeName}>
                {selectedUser.organizations.find((org) => org.org_type === "College")?.title || "No college specified"}
              </p>
              {/* Added Interest Groups */}
              {selectedUser.interest_groups.length > 0 && (
                <div className={styles.interestGroups}>
                  <p className={styles.sectionTitle}>Interest Groups:</p>
                  <ul>
                    {selectedUser.interest_groups.map((group) => (
                      <li key={group.id}>{group.name}</li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Added All Organizations */}
              {selectedUser.organizations.length > 0 && (
                <div className={styles.organizations}>
                  <p className={styles.sectionTitle}>Organizations:</p>
                  <ul>
                    {selectedUser.organizations.map((org) => (
                      <li key={org.id}>{`${org.title} (${org.org_type})`}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <Karma />
                <p className={styles.statsLabel}>Karma</p>
                <p className={styles.statsValue}>{selectedUser.karma}</p>
              </div>
              {/* Keep other stats cards as they were */}
              {/* <div className={styles.statsCard}>
                <AvgKarma />
                <p className={styles.statsLabel}>Avg.Karma/Month</p>
                <p className={styles.statsValue}>1.156K</p>
              </div>
              <div className={styles.statsCard}>
                <Rank />
                <p className={styles.statsLabel}>Rank</p>
                <p className={styles.statsValue}>1</p>
              </div>
              <div className={styles.statsCard}>
                <Rank />
                <p className={styles.statsLabel}>Percentile</p>
                <p className={styles.statsValue}>0.29</p>
              </div> */}
            </div>
          </div>
        )}
      </AsideDetails>
    </div>
  );
};

export default MuLearnersSearchPage;