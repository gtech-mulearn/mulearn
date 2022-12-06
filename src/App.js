import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./Pages/Gallery/News";
import Calendar from "./Pages/Calendar/Calendar";
import Gallery from "./Pages/Gallery/Gallery";
import MuAnnouncements from "./Pages/Events/MuAnnouncements/MuAnnouncements";
import ISR from "./Pages/Events/ISR/ISR";
import Company from "./Pages/Company/Company";
import Teams from "./Pages/Teams/Teams";
import CommunityPartner from "./Pages/CommPartners/CommPartners";
import ArtOfTeaching from "./Pages/ArtOfTeaching/ArtOfTeaching";
import Career from "./Pages/Career/Career";
import LeaderBoard from "./Pages/LeaderBoard/leaderBoard";
import WikiSyllabus from "./Pages/WikiSyllabus/WikiSyllabus";
import HacktoberFest from "./Pages/Events/HacktoberFest/HacktoberFest";
import Yip from "./Pages/YIP/Yip";
import CampusChapters from "./Pages/CampusChapters/CampusChapters";
import BlogLanding from "./Pages/CampusChapters/Blogs/BlogLanding";
import BlogTemplate from "./Pages/CampusChapters/Blogs/BlogTemplate/BlogTemplate";
import Notifications from "./Pages/Notifications/Notifications";
import MonthlyLeaderboard from "./Pages/LeaderBoard/MonthlyLeaderboard/MonthlyLeaderboard";
import MentorConnect from "./Pages/Events/MentorConnect/MentorConnect";
import SaltMangoTree from "./Pages/Events/SaltMangoTree/SaltMangoTree";
import OpenMic from "./Pages/Events/OpenMic/OpenMic";
import BuildForTeam from "./Pages/Events/BuildForTeam/BuildForTeam";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/blogs" element={<BlogLanding />} />
          <Route path="/blogs/:id" element={<BlogTemplate />} />
          <Route path="/buildforteam" element={<BuildForTeam />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/blog" element={<BlogTemplate />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/announcements" element={<MuAnnouncements />} />
          <Route path="/isr" element={<ISR />} />
          <Route path="/events/mentorconnect" element={<MentorConnect />} />
          <Route path="/events/saltmangotree" element={<SaltMangoTree />} />
          <Route path="/events/openmic" element={<OpenMic />} />
          <Route path="/company-partners" element={<Company />} />
          <Route path="/community-partners" element={<CommunityPartner />} />
          <Route path="/artofteaching" element={<ArtOfTeaching />} />
          <Route path="/wikisyllabus" element={<WikiSyllabus />} />
          <Route path="/yip" element={<Yip />} />
          <Route path="/team">
            <Route path="" element={<Teams />} />
          </Route>
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/leaderboard/monthly" element={<MonthlyLeaderboard />} />
          <Route path="/hacktoberfest" element={<HacktoberFest />} />
          <Route path="/campuschapters">
            <Route path="" element={<CampusChapters />} />
          </Route>
          <Route path="/blog/amirthags" element={<BlogPage />} />
          <Route path="/blog/jessno" element={<JBlogPage />} />
          <Route path="/enablers" element={<EnablersOnboarding />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
