"use client";
import { useEffect, useState } from "react";
import { privateGateway, publicGateway } from '@/MuLearnServices/apiGateways';
import { dashboardRoutes } from '@/MuLearnServices/urls';
import Leaderboard from '../components/Leaderboard';
import styles from './leaderboard.module.css';
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader";
import { Helmet } from "react-helmet";

interface LeaderboardEntry {
  name: string;
  monthly?: number;
  overall?: number;
  campus?: number;
  zonal?: number;
  category?: string;
}

interface FetchedDataState {
  student: {
    monthly: boolean;
    overall: boolean;
  };
  campus: {
    monthly: boolean;
    overall: boolean;
  };
  wadhwani: {
    zonal: boolean;
    campus: boolean;
  };
}

const MuLeaderboardPage = () => {
  const [studentLeaderboardData, setStudentYearlyLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [monthlyStudentLeaderBoard, setStudentMonthlyLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [campusLeaderboardData, setCampusLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [monthlyCampusLeaderboard, setCampusMonthlyLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [wadhwaniCollegeLeaderboard, setWadhwaniCollegeLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [wadhwaniZonalLeaderboard, setWadhwaniZonalLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeFilter, setActiveFilter] = useState<"monthly" | "overall" | "campus" | "zonal">("monthly");
  const [activeCategory, setActiveCategory] = useState<"student" | "campus" | "wadhwani">("student");

  const [fetchedData, setFetchedData] = useState<FetchedDataState>({
    student: {
      monthly: false,
      overall: false
    },
    campus: {
      monthly: false,
      overall: false
    },
    wadhwani: {
      zonal: false,
      campus: false
    }
  });

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        setIsLoading(true);

        if (activeCategory === "student") {
          const apiRoute = activeFilter === "monthly"
            ? dashboardRoutes.getMonthlyStudentLeaderBoard
            : dashboardRoutes.getStudentLeaderBoard;

          const response = await publicGateway.get(apiRoute);

          if (response?.data?.response) {
            const mappedData = response.data.response.map((student: {
              full_name: string;
              total_karma: number
            }) => ({
              name: student.full_name,
              [activeFilter]: student.total_karma,
              category: "student",
            }));

            if (activeFilter === "monthly") {
              setStudentMonthlyLeaderBoard(mappedData);
            } else {
              setStudentYearlyLeaderBoard(mappedData);
            }

            setFetchedData(prev => ({
              ...prev,
              student: {
                ...prev.student,
                [activeFilter]: true
              }
            }));
          }
        } else if (activeCategory === "campus") {
          const apiRoute = activeFilter === "monthly"
            ? dashboardRoutes.getCollegeMonthlyLeaderBoard
            : dashboardRoutes.getCollegeLeaderBoard;

          const response = await publicGateway.get(apiRoute);

          if (response?.data?.response) {
            const mappedData = response.data.response.map((campus: {
              title?: string;
              code?: string;
              total_karma: number
            }) => ({
              name: activeFilter === "monthly" ? campus.code : campus.title,
              [activeFilter]: campus.total_karma,
              category: "campus",
            }));

            if (activeFilter === "monthly") {
              setCampusMonthlyLeaderBoard(mappedData);
            } else {
              setCampusLeaderBoard(mappedData);
            }

            setFetchedData(prev => ({
              ...prev,
              campus: {
                ...prev.campus,
                [activeFilter]: true
              }
            }));
          }
        } else if (activeCategory === "wadhwani") {
          const apiRoute = activeFilter === "campus"
            ? dashboardRoutes.getWadhwaniCollegeLeaderBoard
            : dashboardRoutes.getWadhwaniZonalLeaderBoard;

          const response = await publicGateway.get(apiRoute);

          if (response?.data?.response) {
            const mappedData = response.data.response.map((item: {
              title?: string;
              code?: string;
              zone_name?: string;
              total_karma: number
            }) => ({
              name: activeFilter === "campus" ? item.title || item.code : item.zone_name,
              [activeFilter]: item.total_karma,
              category: "wadhwani",
            }));

            if (activeFilter === "campus") {
              setWadhwaniCollegeLeaderboard(mappedData);
            } else {
              setWadhwaniZonalLeaderboard(mappedData);
            }

            setFetchedData(prev => ({
              ...prev,
              wadhwani: {
                ...prev.wadhwani,
                [activeFilter]: true
              }
            }));
          }
        }
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    

    let shouldFetchData = false;
    if (activeCategory === "student" || activeCategory === "campus") {
      shouldFetchData = !fetchedData[activeCategory][activeFilter as "monthly" | "overall"];
    } else if (activeCategory === "wadhwani") {
      shouldFetchData = !fetchedData.wadhwani[activeFilter as "campus" | "zonal"];
    }

    if (shouldFetchData) {
      fetchLeaderboardData();
    }
  }, [activeFilter, activeCategory, fetchedData]);

   useEffect(() => {
    if (activeCategory === "wadhwani") {
      setActiveFilter("campus");
    } else {
      setActiveFilter("monthly");
    }
  }, [activeCategory]);


  return (
    <>
      <Helmet>
        <title>Leaderboard | µLearn</title>
        <meta
          name="description"
          content="Explore the leaderboard to see top µLearners, campuses, and Wadhwani rankings."
        />
        <meta property="og:title" content="Leaderboard | µLearn" />
        <meta property="og:url" content="https://app.mulearn.org/dashboard/leaderboard" />
        <meta
          property="og:description"
          content="Explore the leaderboard to see top µLearners, campuses, and Wadhwani rankings."
        />
      </Helmet>
      <div className={styles.pageWrapper}>
        {isLoading ? (
          <div className={styles.loadingContainer}>
            <MuLoader />
          </div>
        ) : (
          <Leaderboard
            leaderboards={{
              student: {
                overall: studentLeaderboardData,
                monthly: monthlyStudentLeaderBoard,
              },
              campus: {
                overall: campusLeaderboardData,
                monthly: monthlyCampusLeaderboard,
              },
              wadhwani: {
                campus: wadhwaniCollegeLeaderboard,
                zonal: wadhwaniZonalLeaderboard,
              },
            }}
            filterOptions={activeCategory === "wadhwani" ? ["campus", "zonal"] : ["monthly", "overall"]}
            categoryOptions={[
              { label: "Student", value: "student" },
              { label: "Campus", value: "campus" },
              { label: "Wadhwani", value: "wadhwani" },
            ]}
            defaultFilter="monthly"
            defaultCategory="student"
            topPlayerCount={3}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
          />
        )}
      </div>
    </>
  );
};

export default MuLeaderboardPage;