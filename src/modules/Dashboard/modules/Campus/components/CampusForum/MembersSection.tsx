import Leaderboard from '../../../LeaderBoard/components/Leaderboard';
import styles from "./MembersSection.module.css";
import { cdnUrl } from "@/modules/utils/cdn";

const leaderboardData = [
  { name: "Alex M", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 3100, yearly: 38000, overall: 52000, category: "student" },
  { name: "Sarah K", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg"), monthly: 2900, yearly: 29500, overall: 46000, category: "student" },
  { name: "John D", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg"), monthly: 2500, yearly: 27000, overall: 43000, category: "student" },
  { name: "Rachel S", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 3600, yearly: 18000, overall: 41000, category: "mentor" },
  { name: "Daniel L", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg"), monthly: 1400, yearly: 33000, overall: 39000, category: "mentor" },
  { name: "Emily T", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 2900, yearly: 15000, overall: 35000, category: "mentor" },
  { name: "Michael P", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg"), monthly: 2800, yearly: 31000, overall: 47000, category: "student" },
  { name: "Jessica H", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 3200, yearly: 28000, overall: 44000, category: "student" },
  { name: "David W", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg"), monthly: 2700, yearly: 25000, overall: 38000, category: "mentor" },
  { name: "Lisa M", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg"), monthly: 2400, yearly: 22000, overall: 36000, category: "student" },
  { name: "Robert K", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 2100, yearly: 26000, overall: 42000, category: "mentor" },
  { name: "Anna S", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg"), monthly: 2600, yearly: 24000, overall: 37000, category: "student" },
  { name: "Thomas R", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg"), monthly: 2300, yearly: 21000, overall: 34000, category: "student" },
  { name: "Maria G", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 2000, yearly: 23000, overall: 33000, category: "mentor" },
  { name: "James B", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg"), monthly: 1900, yearly: 20000, overall: 32000, category: "student" },
  { name: "Sophie L", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg"), monthly: 1800, yearly: 19000, overall: 31000, category: "mentor" },
  { name: "William T", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 1700, yearly: 18500, overall: 30000, category: "student" },
  { name: "Emma C", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg"), monthly: 1600, yearly: 17000, overall: 29000, category: "student" },
  { name: "Oliver N", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg"), monthly: 1500, yearly: 16000, overall: 28000, category: "mentor" },
  { name: "Grace F", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg"), monthly: 1300, yearly: 15500, overall: 27000, category: "student" },
];

// Define the campus leaderboard data with imported images
const campusLeaderboardData = [
  { name: "IIT Palakkad", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-1.webp"), monthly: 10000, yearly: 120000, overall: 250000, category: "campus" },
  { name: "NIT Calicut", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-2.webp"), monthly: 9500, yearly: 115000, overall: 240000, category: "campus" },
  { name: "CUSAT", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-3.webp"), monthly: 8700, yearly: 110000, overall: 230000, category: "campus" },
  { name: "MG University", avatar: cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-2.webp"), monthly: 8000, yearly: 105000, overall: 220000, category: "campus" },
];

const MembersSection = ({campusId}:{campusId:string}) => {
  return (
    <div className={styles.container}>
      <img src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/10496279.jpg")} alt="First Place" />
      <img src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475206.jpg")} alt="Second Place" />
      <img src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/11475225.jpg")} alt="Third Place" />
      <img src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-1.webp")} alt="Campus 1" />
      <img src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-2.webp")} alt="Campus 2" />
      <img src={cdnUrl("src/modules/Dashboard/modules/LeaderBoard/assets/campus-3.webp")} alt="Campus 3" />
    </div>
  );
};

export default MembersSection;