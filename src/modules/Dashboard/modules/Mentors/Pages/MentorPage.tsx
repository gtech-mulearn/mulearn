import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./MentorPage.module.css";
import { FiSearch } from "react-icons/fi";
import profileImage from "../assets/ProfileImages/10496279.jpg";
import userImage2 from "../assets/ProfileImages/11475206.jpg";
import debounce from "lodash/debounce";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { getUsers } from "../../Search/services/api";
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

const MentorList: React.FC<{
  search: string;
  searchType: "name" | "college" | "expertise" | "enabler" | "mentor";
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
        const role =
          searchType === "enabler" ? "enabler" :
          searchType === "mentor" ? "mentor" :
          "mentor";

        const response = await getUsers({
          search: searchType === "name" ? searchTerm : "",
          role,
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
        } else if (searchType === "expertise" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.interest_groups.some((ig) =>
              ig.name.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else if (searchType === "enabler" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.organizations.some(
              (org) =>
                org.org_type === "College" &&
                org.title.toLowerCase().includes(searchTerm.toLowerCase())
            )
          );
        } else if (searchType === "mentor" && searchTerm) {
          filtered = newUsers.filter((user) =>
            user.organizations.some(
              (org) =>
                org.org_type === "Company" &&
                org.title.toLowerCase().includes(searchTerm.toLowerCase())
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
      } catch (error) {
        console.error("Failed to fetch mentors:", error);
      } finally {
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

  useEffect(() => {
    setAllUsers([]);
    setFilteredUsers([]);
    setPage(1);
    debouncedFetchUsers(search, 1);
    return () => debouncedFetchUsers.cancel();
  }, [search, searchType, debouncedFetchUsers]);

  useEffect(() => {
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
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [isFetching, page, totalPages]);

  useEffect(() => {
    if (page > 1) {
      fetchUsers(search, page);
    }
  }, [page, search, fetchUsers]);

  const displayUsers = searchType === "name" || !search ? allUsers : filteredUsers;

  return (
    <div>
      <div className={styles.mentorGrid}>
        {displayUsers.length > 0 ? (
          displayUsers.map((user, index) => (
            <UserCard 
              key={`${user.muid}-${index}`}
              data={{
                id: index + 1,
                name: user.full_name,
                role: user.organizations
                  .map((org) => `${org.title} (${org.org_type})`)
                  .join(", ") || "Unknown Role",
                expertise: user.interest_groups.map((ig) => ig.name),
                karma: user.karma,
                image: user.profile_pic || (index % 2 === 0 ? profileImage : userImage2),
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

const MentorSearchPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchType, setSearchType] = useState<"name" | "college" | "expertise" | "enabler" | "mentor">("name");
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
 
   const handleUserSelect = (user: User) => {
     setSelectedUser(user);
     window.open(`/profile/${user.muid}`, "_blank");
   };
 
  const getDisplayOrganization = (user: User) => {
    const hasCompany = user.organizations.some(org => org.org_type === "Company");
    if (hasCompany) {
      const firstCompany = user.organizations.find(org => org.org_type === "Company");
      return firstCompany ? firstCompany.title : "N/A";
    }
    const firstCollege = user.organizations.find(org => org.org_type === "College");
    return firstCollege ? firstCollege.title : "N/A";
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.Banner}>
        <div className={styles.BannerContent}>
          <h1 className={styles.BannerTitle}>Find a Mentor</h1>
          <p className={styles.BannerSubtitle}>
            Search for experienced mentors by expertise, name, or institution. Connect with the right guidance to navigate technology, management, and creativity with confidence.
          </p>
        </div>
      </div>
      <div className={styles.searchContainer}>
        <FiSearch className={styles.searchIcon} />
        <input
          type="text"
          placeholder={`Search public profiles by ${searchType === "name" ? "name" : searchType === "college" ? "college" : searchType === "expertise" ? "expertise" : searchType === "enabler" ? "enabler" : "mentor"}`}
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
          className={`${styles.searchTypeButton} ${searchType === "expertise" ? styles.active : ""}`}
          onClick={() => setSearchType("expertise")}
        >
          Expertise
        </button>
        <button
          className={`${styles.searchTypeButton} ${searchType === "enabler" ? styles.active : ""}`}
          onClick={() => setSearchType("enabler")}
        >
          Role Enabler
        </button>
        <button
          className={`${styles.searchTypeButton} ${searchType === "mentor" ? styles.active : ""}`}
          onClick={() => setSearchType("mentor")}
        >
          Role Mentor
        </button>
      </div>
      {error && <p className={styles.errorText}>{error}</p>}
      <Suspense fallback={<MuLoader />}>
        <MentorList search={searchTerm} searchType={searchType} onSelect={handleUserSelect} />
      </Suspense>
      {/* <AsideDetails isOpen={isAsideOpen} handleClose={handleAsideClose}>
        {selectedMentor && (
          <div className={styles.profileContainer}>
            <div className={styles.profileHeader}>
              <div className={styles.profileImageContainer}>
                <img
                  src={selectedMentor.profile_pic || dpm}
                  alt={selectedMentor.full_name}
                  className={styles.profileImage}
                />
              </div>
              <div className={styles.memberSince}>Member since 2023</div>
              <button className={styles.connectBtn}>Connect</button>
            </div>
            <div className={styles.profileInfo}>
              <h2 className={styles.profileName}>{selectedMentor.full_name}</h2>
              <p className={styles.profileUsername}>{selectedMentor.muid}</p>
              <p className={styles.profileCollegeName}>
                {getDisplayOrganization(selectedMentor)}
              </p>
              <p className={styles.profileLevel}>LEVEL 5</p>
            </div>
            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <Karma />
                <p className={styles.statsLabel}>Karma</p>
                <p className={styles.statsValue}>{selectedMentor.karma}</p>
              </div>
              <div className={styles.statsCard}>
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
              </div>
            </div>
          </div>
        )}
      </AsideDetails> */}
    </div>
  );
};

export default MentorSearchPage;