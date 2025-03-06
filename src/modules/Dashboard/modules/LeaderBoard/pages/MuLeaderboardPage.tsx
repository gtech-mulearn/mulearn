"use client";
import { useEffect, useState } from "react";
import { privateGateway, publicGateway } from '@/MuLearnServices/apiGateways';
import { dashboardRoutes } from '@/MuLearnServices/urls';
import Leaderboard from '../components/Leaderboard';
import styles from './leaderboard.module.css';
import MuLoader from "@/MuLearnComponents/MuLoader/MuLoader"; 

interface LeaderboardEntry {
  name: string;
  monthly?: number;
  overall?: number;
  category?: string;
}

const MuLeaderboardPage = () => {
  const [studentLeaderboardData, setStudentYearlyLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [monthlyStudentLeaderBoard, setStudentMonthlyLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [campusLeaderboardData, setCampusLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [monthlyCampusLeaderboard, setCampusMonthlyLeaderBoard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const [
          studentOverallResponse,
          studentMonthlyResponse,
          campusOverallResponse,
          campusMonthlyResponse,
        ] = await Promise.all([
          publicGateway.get(dashboardRoutes.getStudentLeaderBoard),
          publicGateway.get(dashboardRoutes.getMonthlyStudentLeaderBoard),
          publicGateway.get(dashboardRoutes.getCollegeLeaderBoard),
          publicGateway.get(dashboardRoutes.getCollegeMonthlyLeaderBoard),
        ]);

        if (studentOverallResponse?.data?.response) {
          setStudentYearlyLeaderBoard(
            studentOverallResponse.data.response.map((student: { full_name: string; total_karma: number }) => ({
              name: student.full_name,
              overall: student.total_karma,
              category: "student",
            }))
          );
        }

        if (studentMonthlyResponse?.data?.response) {
          setStudentMonthlyLeaderBoard(
            studentMonthlyResponse.data.response.map((student: { full_name: string; total_karma: number }) => ({
              name: student.full_name,
              monthly: student.total_karma,
              category: "student",
            }))
          );
        }

        if (campusOverallResponse?.data?.response) {
          setCampusLeaderBoard(
            campusOverallResponse.data.response.map((campus: { title: string; total_karma: number }) => ({
              name: campus.title,
              overall: campus.total_karma,
              category: "campus",
            }))
          );
        }

        if (campusMonthlyResponse?.data?.response) {
          console.log("campus monthly response", campusMonthlyResponse.data);
          setCampusMonthlyLeaderBoard(
            campusMonthlyResponse.data.response.map((campus: { code: string; total_karma: number }) => ({
              name: campus.code,
              monthly: campus.total_karma,
              category: "campus",
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching leaderboards:", error);
      } finally {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, []);

  // console.log("leaderboard data", studentLeaderboardData, campusLeaderboardData);
  console.log("monthly leaderboard data", monthlyStudentLeaderBoard, monthlyCampusLeaderboard);

  return (
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
          }}
          filterOptions={["monthly", "overall"]}
          categoryOptions={[
            { label: "Student", value: "student" },
            { label: "Campus", value: "campus" },
          ]}
          defaultFilter="monthly"
          defaultCategory="student"
          topPlayerCount={3}
        />
      )}
    </div>
  );
};

export default MuLeaderboardPage;