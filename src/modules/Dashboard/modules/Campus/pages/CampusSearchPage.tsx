import React, { useState, useEffect, useCallback, Suspense, useRef } from "react";
import styles from "./CampusSearchPage.module.css";
import { FiSearch } from "react-icons/fi";
import debounce from "lodash/debounce";
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import CampusCard from "../components/CampusCard";
import { getCampuses } from "../services/api";
import { Trophy} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface Campus {
    id: string;
    title: string;
    code: string;
    affiliation?: string;
    district: string;
    zone: string;
    state: string;
    country: string;
    user_count: number;
}

interface DetailedCampus {
    college_name: string;
    campus_code: string;
    campus_zone: string;
    campus_level: number;
    total_karma: number;
    total_members: number;
    active_members: number;
    rank: number;
    lead: { campus_lead: string; enabler: string };
}

interface Pagination {
    totalPages: number;
    isNext: boolean;
}

interface GradeRequirement {
    grade: "A" | "B" | "C";
    requirements: string[];
}

const gradeRequirements: GradeRequirement[] = [
    {
        grade: "A",
        requirements: ["Maintain 90% student engagement", "Complete 10 major projects", "Achieve 1000+ karma points"],
    },
    {
        grade: "B",
        requirements: ["Maintain 75% student engagement", "Complete 7 major projects", "Achieve 750+ karma points"],
    },
    {
        grade: "C",
        requirements: ["Maintain 60% student engagement", "Complete 5 major projects", "Achieve 500+ karma points"],
    },
];

const CampusList: React.FC<{
    search: string;
    searchType: "name" | "code" | "zone" | "school" | "college" | "all";
    onSelect: (campus: Campus) => void;
}> = ({ search, searchType, onSelect }) => {
    const [allCampuses, setAllCampuses] = useState<Campus[]>([]);
    const [filteredCampuses, setFilteredCampuses] = useState<Campus[]>([]);
    const [page, setPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [isFetching, setIsFetching] = useState<boolean>(false);
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadMoreRef = useRef<HTMLDivElement | null>(null);

    const fetchCampuses = useCallback(
        async (searchTerm: string, pageNum: number) => {
            setIsFetching(true);
            try {
                const apiType = ["school", "college", "all"].includes(searchType) ? searchType : "all";
                const response = await getCampuses({
                    search: searchTerm,
                    pageIndex: pageNum,
                    perPage: 9,
                    type: apiType,
                });

                const newCampuses: Campus[] = response.data;
                let filtered: Campus[] = newCampuses;
                if (searchType === "name" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.title.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                } else if (searchType === "code" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.code.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                } else if (searchType === "zone" && searchTerm) {
                    filtered = newCampuses.filter((campus) =>
                        campus.zone.toLowerCase().includes(searchTerm.toLowerCase())
                    );
                }

                setAllCampuses((prev) => (pageNum === 1 ? newCampuses : [...prev, ...newCampuses]));
                setFilteredCampuses((prev) => (pageNum === 1 ? filtered : [...prev, ...filtered]));
                setTotalPages(response.pagination.totalPages);
                setIsFetching(false);
            } catch (error) {
                console.error("Failed to fetch campuses:", error);
                setIsFetching(false);
            }
        },
        [searchType]
    );

    const debouncedFetchCampuses = useCallback(
        debounce((searchTerm: string, pageNum: number) => {
            fetchCampuses(searchTerm, pageNum);
        }, 300),
        [fetchCampuses]
    );

    useEffect(() => {
        setAllCampuses([]);
        setFilteredCampuses([]);
        setPage(1);
        debouncedFetchCampuses(search, 1);
        return () => debouncedFetchCampuses.cancel();
    }, [search, searchType, debouncedFetchCampuses]);

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
            fetchCampuses(search, page);
        }
    }, [page, search, fetchCampuses]);

    const displayCampuses =
        ["name", "school", "college", "all"].includes(searchType) || !search
            ? allCampuses
            : filteredCampuses;

    console.log(displayCampuses);
    return (
        <div>
            <div className={styles.userGrid}>
                {displayCampuses.length > 0 ? (
                    displayCampuses.map((campus, index) => (
                        <CampusCard
                            key={`${campus.code}-${index}`}
                            data={{
                                name: campus.title,
                                code: campus.code,
                                grade: undefined,
                                lead: undefined,
                                enabler: undefined,
                                userCount: campus.user_count.toString(),
                                district: campus.district,
                                zone: campus.zone,
                                state: campus.state,
                                country: campus.country,
                            }}
                            onSelect={() => onSelect(campus)}
                        />
                    ))
                ) : (
                    !isFetching && (
                        <p className={styles.noResultsText}>No campuses found. Try a different search?</p>
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

const CampusSearchPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [searchType, setSearchType] = useState<"name" | "code" | "zone" | "school" | "college" | "all">("name");
    const [error, setError] = useState<string | null>(null);
    const [selectedCampus, setSelectedCampus] = useState<Campus | null>(null);
    const [isAsideOpen, setIsAsideOpen] = useState<boolean>(false);
    const [detailedCampus, setDetailedCampus] = useState<DetailedCampus | null>(null);
    const [barData, setBarData] = useState<string[][] | null>(null);
    const [pieData, setPieData] = useState<string[][] | null>(null);
    const [isLoadingDetails, setIsLoadingDetails] = useState(false);
    const navigate = useNavigate()
    

    const handleCampusSelect = (campus: Campus) => {
        setSelectedCampus(campus);
        
        navigate("/dashboard/campus/" + campus.id);
    };

    const handleAsideClose = () => {
        setIsAsideOpen(false);
        setSelectedCampus(null);
        setDetailedCampus(null);
        setBarData(null);
        setPieData(null);
    };

    // const fetchDetailedCampusData = async (orgId: string) => {
    //     setIsLoadingDetails(true);
    //     try {
    //         const campusResponse = await privateGateway.get(`/api/v1/dashboard/campus/${orgId}`);
            
    //         const campus = campusResponse.data.response;

    //         const weeklyKarmaResponse = await privateGateway.get(`/api/v1/dashboard/campus/weekly-karma/${orgId}`);
    //         const weeklyKarma = weeklyKarmaResponse.data.response; 
    //         const weeklyKarmaData = Object.entries(weeklyKarma)
    //             .filter(([key]) => key !== "college_name")
    //             .map(([date, karma]) => [convertDateToDayAndMonth(date), String(karma ?? 0)]);

    //         const studentLevelResponse = await privateGateway.get(`/api/v1/dashboard/campus/student-level/${orgId}`);
    //         const studentLevel = studentLevelResponse.data.response; 
    //         const studentLevelData = studentLevel.map((item: { students: number; level: number }) => [
    //             `Level ${item.level}`,
    //             String(item.students),
    //         ]);

    //         setDetailedCampus({
    //             college_name: campus.college_name || "Unknown College",
    //             campus_code: campus.campus_code || "N/A",
    //             campus_zone: campus.campus_zone || "N/A",
    //             campus_level: campus.campus_level || 0,
    //             total_karma: campus.total_karma || 0,
    //             total_members: campus.total_members || 0,
    //             active_members: campus.active_members || 0,
    //             rank: campus.rank || 0,
    //             lead: {
    //                 campus_lead: campus.lead?.campus_lead,
    //                 enabler: campus.lead?.enabler,
    //             },
    //         });
    //         setBarData([["", "Karma"]].concat(weeklyKarmaData));
    //         setPieData([["Level", "Students"]].concat(studentLevelData));

    //     } catch (err) {
    //         console.error("Failed to fetch detailed campus data:", err);
    //         toast.error("Failed to load campus details");
    //         setError("Failed to load campus details");
    //     } finally {
    //         setIsLoadingDetails(false);
    //     }
    // };

    // useEffect(() => {
    //     if (selectedCampus) {
    //         fetchDetailedCampusData(selectedCampus.id);
    //     }
    // }, [selectedCampus]);

    const getGradeIcon = (grade: "A" | "B" | "C" | "N/A"): JSX.Element | null => {
        switch (grade) {
            case "A":
                return <Trophy className="h-8 w-8" style={{ color: "#0066FF" }} />;
            case "B":
                return <Trophy className="h-8 w-8" style={{ color: "#94A3B8" }} />;
            case "C":
                return <Trophy className="h-8 w-8" style={{ color: "#B45309" }} />;
            case "N/A":
                return <Trophy className="h-8 w-8" style={{ color: "#64748B" }} />;
            default:
                return null;
        }
    };

    const getGradeFromLevel = (level: number): "A" | "B" | "C" | "N/A" => {
        if (level >= 4) return "A";
        if (level >= 3) return "B";
        if (level >= 2) return "C";
        return "N/A";
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.Banner}>
                <div className={styles.BannerContent}>
                    <h1 className={styles.BannerTitle}>Find Campuses</h1>
                    <p className={styles.BannerSubtitle}>
                        Explore a network of campuses by name, code, zone, or type.
                    </p>
                </div>
            </div>
            <div className={styles.searchContainer}>
                <FiSearch className={styles.searchIcon} />
                <input
                    type="text"
                    placeholder={`Search by ${searchType}`}
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
                    className={`${styles.searchTypeButton} ${searchType === "code" ? styles.active : ""}`}
                    onClick={() => setSearchType("code")}
                >
                    Code
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "zone" ? styles.active : ""}`}
                    onClick={() => setSearchType("zone")}
                >
                    Zone
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "school" ? styles.active : ""}`}
                    onClick={() => setSearchType("school")}
                >
                    School
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "college" ? styles.active : ""}`}
                    onClick={() => setSearchType("college")}
                >
                    College
                </button>
                <button
                    className={`${styles.searchTypeButton} ${searchType === "all" ? styles.active : ""}`}
                    onClick={() => setSearchType("all")}
                >
                    All
                </button>
            </div>
            {error && <p className={styles.errorText}>{error}</p>}
            <Suspense fallback={<MuLoader />}>
                <CampusList search={searchTerm} searchType={searchType} onSelect={handleCampusSelect} />
            </Suspense>

            {/* <AsideDetails isOpen={isAsideOpen} handleClose={handleAsideClose}>
                {isLoadingDetails ? (
                    <MuLoader />
                ) : error || !detailedCampus ? (
                    <div className={styles.container}>
                        <p>Unable to load campus details. Please try again later.</p>
                    </div>
                ) : (
                    <div className={styles.container}>
                        <div className={styles.wrapper}>
                            <div className={styles.header}>
                                <div className={styles.titleSection}>
                                    <h1 className={styles.title}>
                                        {detailedCampus.college_name} ({detailedCampus.campus_code})
                                    </h1>
                                </div>
                            </div>

                            <div className={styles.grid}>
                                

                                <div className={styles.cardHover}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>Karma Points</h3>
                                        <Medal size={16} style={{ color: "#0066FF" }} />
                                    </div>
                                    <div className={styles.statsValue}>{detailedCampus.total_karma.toLocaleString()}</div>
                                    <p className={styles.statsLabel}>Points earned this year</p>
                                </div>

                                <div className={styles.cardHover}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>Active Students</h3>
                                        <Users size={16} style={{ color: "#0066FF" }} />
                                    </div>
                                    <div className={styles.statsValue}>{detailedCampus.active_members}</div>
                                    <p className={styles.statsLabel}>Currently active</p>
                                </div>

                                <div className={styles.cardHover}>
                                    <div className={styles.cardHeader}>
                                        <h3 className={styles.cardTitle}>Overall Rank</h3>
                                        <Trophy size={16} style={{ color: "#0066FF" }} />
                                    </div>
                                    <div className={styles.statsValue}>#{detailedCampus.rank}</div>
                                    <p className={styles.statsLabel}>Among all campuses</p>
                                </div>
                            </div>
                            {detailedCampus.lead.campus_lead && (
                            <div className={styles.leadershipSection}>
                                <h3 className={styles.leadershipTitle}>Campus Leadership</h3>
                                <div className={styles.leadershipGrid}>
                                    <div className={styles.leaderCard}>
                                        <div className="flex items-center flex-col">
                                            <img src={CLIcon} alt="Campus Lead" className={styles.leaderIcon} />
                                            <div className={styles.leaderName}>{detailedCampus.lead.campus_lead}</div>
                                            <span className={styles.leaderRole}>Campus Lead</span>
                                        </div>
                                    </div>
                                    {detailedCampus.lead.enabler && (
                                        <div className={styles.leaderCard}>
                                            <div className="flex flex-col items-center">
                                                <img src={CEIcon} alt="Campus Enabler" className={styles.leaderIcon} />
                                                <div className={styles.leaderName}>{detailedCampus.lead.enabler}</div>
                                                <span className={styles.leaderRole}>Campus Lead Enabler</span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>)}
                            <div className={styles.graphs}>
                                    <div className={styles.graphContainer}>
                                        <h2>Weekly Karma Insights</h2>
                                        <BarChart
                                            data={barData}
                                            ylabel="Karma"
                                            addOptions={{
                                                legend: { position: "none" },
                                                colors: ["#91ABFF"],
                                            }}
                                        />
                                    </div>
                                    <div className={styles.graphContainer}>
                                        <h2>Student Statistics</h2>
                                        <BarChart data={pieData} />
                                    </div>
                                </div>

                            
                        </div>
                    </div>
                )}
        </AsideDetails> */}
        </div>
    );
};

export default CampusSearchPage;