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
import BlogPage from "./Pages/CampusChapters/AmrithaBlogPage/BlogPage";
import JBlogPage from "./Pages/CampusChapters/JessnoBlogPage/JBlogPage";
import SandraBlogPage from "./Pages/CampusChapters/SandraBlogPage/SandraBlogPage";
import GigWork from "./Pages/GigWork/GigWork";
import BlogsLandingSandra from "./Pages/CampusChapters/Blogs/BlogsLandingSandra";
import BlogsLandingAmirtha from "./Pages/CampusChapters/Blogs/BlogsLandingAmirtha";
import BlogsLandingJessno from "./Pages/CampusChapters/Blogs/BlogsLandingJessno";
import BlogLanding from "./Pages/CampusChapters/Blogs/BlogLanding";
import BlogTemplate from "./Pages/CampusChapters/BlogTemplate/BlogTemplate";
import Notifications from "./Pages/Notifications/Notifications";
import MonthlyLeaderboard from "./Pages/LeaderBoard/MonthlyLeaderboard/MonthlyLeaderboard";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/blogs" element={<BlogLanding />} />
          <Route path="/blogs/sandra-pramod" element={<BlogsLandingSandra />} />
          <Route path="/blogs/amirtha-gs" element={<BlogsLandingAmirtha />} />
          <Route path="/blogs/jessno-oomen" element={<BlogsLandingJessno />} />
          <Route path="/gig-work" element={<GigWork />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/blog" element={<BlogTemplate />} />

          <Route path="/calendar" element={<Calendar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/news" element={<News />} />
          <Route path="/announcements" element={<MuAnnouncements />} />
          <Route path="/isr" element={<ISR />} />
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
          <Route path="/blog/sandra" element={<SandraBlogPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
