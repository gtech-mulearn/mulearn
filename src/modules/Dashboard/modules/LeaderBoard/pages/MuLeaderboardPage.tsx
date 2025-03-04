"use client";
import styles from './leaderboard.module.css';
import first from '../assets/10496279.jpg'
import second from '../assets/11475206.jpg'
import third from '../assets/11475225.jpg'
import campusOne from '../assets/campus-1.webp';
import campusTwo from '../assets/campus-2.webp';
import campusThree from '../assets/campus-3.webp';
import Leaderboard from '../components/Leaderboard';



// const leaderboardDataSample = [
//     { name: "Alex M", avatar: second, monthly: 3100, yearly: 38000, overall: 52000, category: "student" },
//     { name: "Sarah K", avatar: first, monthly: 2900, yearly: 29500, overall: 46000, category: "student" },
//     { name: "John D", avatar: third, monthly: 2500, yearly: 27000, overall: 43000, category: "student" },
//     { name: "Rachel S", avatar: first, monthly: 3600, yearly: 18000, overall: 41000, category: "mentor" },
//     { name: "Daniel L", avatar: third, monthly: 1400, yearly: 33000, overall: 39000, category: "mentor" },
//     { name: "Emily T", avatar: first, monthly: 2900, yearly: 15000, overall: 35000, category: "mentor" },
//     { name: "Michael P", avatar: second, monthly: 2800, yearly: 31000, overall: 47000, category: "student" },
//     { name: "Jessica H", avatar: first, monthly: 3200, yearly: 28000, overall: 44000, category: "student" },
//     { name: "David W", avatar: third, monthly: 2700, yearly: 25000, overall: 38000, category: "mentor" },
//     { name: "Lisa M", avatar: second, monthly: 2400, yearly: 22000, overall: 36000, category: "student" },
//     { name: "Robert K", avatar: first, monthly: 2100, yearly: 26000, overall: 42000, category: "mentor" },
//     { name: "Anna S", avatar: third, monthly: 2600, yearly: 24000, overall: 37000, category: "student" },
//     { name: "Thomas R", avatar: second, monthly: 2300, yearly: 21000, overall: 34000, category: "student" },
//     { name: "Maria G", avatar: first, monthly: 2000, yearly: 23000, overall: 33000, category: "mentor" },
//     { name: "James B", avatar: third, monthly: 1900, yearly: 20000, overall: 32000, category: "student" },
//     { name: "Sophie L", avatar: second, monthly: 1800, yearly: 19000, overall: 31000, category: "mentor" },
//     { name: "William T", avatar: first, monthly: 1700, yearly: 18500, overall: 30000, category: "student" },
//     { name: "Emma C", avatar: third, monthly: 1600, yearly: 17000, overall: 29000, category: "student" },
//     { name: "Oliver N", avatar: second, monthly: 1500, yearly: 16000, overall: 28000, category: "mentor" },
//     { name: "Grace F", avatar: first, monthly: 1300, yearly: 15500, overall: 27000, category: "student" },
//   ];
  
//   const campusLeaderboardData = [
//     { name: "IIT Palakkad", avatar: campusOne, monthly: 10000, yearly: 120000, overall: 250000, category: "campus" },
//     { name: "NIT Calicut", avatar: campusTwo, monthly: 9500, yearly: 115000, overall: 240000, category: "campus" },
//     { name: "CUSAT", avatar: campusThree, monthly: 8700, yearly: 110000, overall: 230000, category: "campus" },
//     { name: "MG University", avatar: campusTwo, monthly: 8000, yearly: 105000, overall: 220000, category: "campus" },
//   ];

const MuLeaderboardPage = () => {
    const leaderboardDataSample = [
        { name: "Alex M", avatar: second, monthly: 3100, yearly: 38000, overall: 52000, category: "student" },
        { name: "Sarah K", avatar: first, monthly: 2900, yearly: 29500, overall: 46000, category: "student" },
        { name: "John D", avatar: third, monthly: 2500, yearly: 27000, overall: 43000, category: "student" },
        { name: "Rachel S", avatar: first, monthly: 3600, yearly: 18000, overall: 41000, category: "mentor" },
        { name: "Daniel L", avatar: third, monthly: 1400, yearly: 33000, overall: 39000, category: "mentor" },
        { name: "Emily T", avatar: first, monthly: 2900, yearly: 15000, overall: 35000, category: "mentor" },
        { name: "Michael P", avatar: second, monthly: 2800, yearly: 31000, overall: 47000, category: "student" },
        { name: "Jessica H", avatar: first, monthly: 3200, yearly: 28000, overall: 44000, category: "student" },
        { name: "David W", avatar: third, monthly: 2700, yearly: 25000, overall: 38000, category: "mentor" },
        { name: "Lisa M", avatar: second, monthly: 2400, yearly: 22000, overall: 36000, category: "student" },
        { name: "Robert K", avatar: first, monthly: 2100, yearly: 26000, overall: 42000, category: "mentor" },
        { name: "Anna S", avatar: third, monthly: 2600, yearly: 24000, overall: 37000, category: "student" },
        { name: "Thomas R", avatar: second, monthly: 2300, yearly: 21000, overall: 34000, category: "student" },
        { name: "Maria G", avatar: first, monthly: 2000, yearly: 23000, overall: 33000, category: "mentor" },
        { name: "James B", avatar: third, monthly: 1900, yearly: 20000, overall: 32000, category: "student" },
        { name: "Sophie L", avatar: second, monthly: 1800, yearly: 19000, overall: 31000, category: "mentor" },
        { name: "William T", avatar: first, monthly: 1700, yearly: 18500, overall: 30000, category: "student" },
        { name: "Emma C", avatar: third, monthly: 1600, yearly: 17000, overall: 29000, category: "student" },
        { name: "Oliver N", avatar: second, monthly: 1500, yearly: 16000, overall: 28000, category: "mentor" },
        { name: "Grace F", avatar: first, monthly: 1300, yearly: 15500, overall: 27000, category: "student" },
      ];
      
      const campusLeaderboardData = [
        { name: "IIT Palakkad", avatar: campusOne, monthly: 10000, yearly: 120000, overall: 250000, category: "campus" },
        { name: "NIT Calicut", avatar: campusTwo, monthly: 9500, yearly: 115000, overall: 240000, category: "campus" },
        { name: "CUSAT", avatar: campusThree, monthly: 8700, yearly: 110000, overall: 230000, category: "campus" },
        { name: "MG University", avatar: campusTwo, monthly: 8000, yearly: 105000, overall: 220000, category: "campus" },
      ];
    
    console.log(leaderboardDataSample);
   
  return (
    <div className={styles.pageWrapper}>
      <Leaderboard
            data={[...leaderboardDataSample, ...campusLeaderboardData]}
            filterOptions={["monthly", "yearly", "overall"]}
            categoryOptions={[
              { label: "All Categories", value: "all" },
              { label: "Student", value: "student" },
              { label: "Mentor", value: "mentor" },
              { label: "Campus", value: "campus" },
            ]}
            defaultFilter="monthly"
            defaultCategory="all"
            topPlayerCount={3}
          />
    </div>
  );
};

export default MuLeaderboardPage;