import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import News from "./Pages/News/News";
import Calendar from "./Pages/Calendar/Calendar";
import Gallery from "./Pages/Gallery/Gallery";
import MuAnnouncements from "./Pages/Events/MuAnnouncements/MuAnnouncements";
import ISR from "./Pages/Events/ISR/ISR";
import Company from "./Pages/Company/Company";
import Teams from "./Pages/Teams/Teams";
import CommunityPartner from "./Pages/CommPartners/CommPartners";
import ArtOfTeaching from "./Pages/ArtOfTeaching/ArtOfTeaching";
import YIP from "./Pages/Teams/YIP/YIP";
import Community from "./Pages/Teams/Community/Community";
import Execom from "./Pages/Teams/Execom/Execom";
import Career from "./Pages/Career/Career";
import LeaderBoard from "./Pages/LeaderBoard/leaderBoard";
import Courses from "./Pages/Courses/Courses";
import WikiSyllabus from "./Pages/WikiSyllabus/WikiSyllabus";
import Tech from "./Pages/Teams/Tech/Tech";
import HacktoberFest from "./Pages/Events/HacktoberFest/HacktoberFest";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Career />} />
          {/* <Route path="/news" element={<News />} /> */}
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/announcements" element={<MuAnnouncements />} />
          <Route path="/isr" element={<ISR />} />
          <Route path="/company-partners" element={<Company />} />
          <Route path="/community-partners" element={<CommunityPartner />} />
          <Route path="/artofteaching" element={<ArtOfTeaching />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/wikisyllabus" element={<WikiSyllabus />} />
          <Route path="/team">
            <Route path="" element={<Teams />} />
            <Route path="execom" element={<Execom />} />
            <Route path="yip" element={<YIP />} />
            <Route path="community" element={<Community />} />
            <Route path="tech" element={<Tech />} />
          </Route>
          <Route path="/leaderboard" element={<LeaderBoard />} />
          <Route path="/events/hacktoberfest" element={<HacktoberFest />} />
          {/* <Route path="/community" element={ }/> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
