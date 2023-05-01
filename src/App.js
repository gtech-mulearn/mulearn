import axios from "axios";
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
// import Yip from "./Pages/YIP/Yip";
import CampusChapters from "./Pages/CampusChapters/CampusChapters";
import BlogLanding from "./Pages/CampusChapters/Blogs/BlogLanding";
import BlogTemplate from "./Pages/CampusChapters/Blogs/BlogTemplate/BlogTemplate";
import Notifications from "./Pages/Notifications/Notifications";
import MonthlyLeaderboard from "./Pages/LeaderBoard/MonthlyLeaderboard/MonthlyLeaderboard";
import MentorConnect from "./Pages/Events/MentorConnect/MentorConnect";
import SaltMangoTree from "./Pages/Events/SaltMangoTree/SaltMangoTree";
import OpenMic from "./Pages/Events/OpenMic/OpenMic";
import BuildForTeam from "./Pages/Events/BuildForTeam/BuildForTeam";
import EnablersOnboarding from "./Pages/EnablersOnboarding/EnablersOnboarding";
import HackathonKarma from "./Pages/HackathonKarma/HackathonKarma";
import NotFound from "./Pages/404/NotFound";
import EventsHome from "./Pages/Events/EventsHome/EventsHome";
import CommunityLanding from "./Pages/CommunityLanding/CommunityLanding";
import CampusLogoGenerator from "./Pages/CampusLogoGen/CampusLogoGen";
import TermsAndCondition from "./Pages/TermsAndCondition/TermsAndCondition";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";

//import redirects from "./redirects.json"
import Redirection from "./Components/Redirection/Redirection";
import Layout from "./Layout";
import { useEffect, useState } from "react";
import YIP2023 from "./Pages/YIP2023/YIP2023";
import BeWebDev from "./Pages/Events/BeWebDev/BeWebDev";

function App() {
  const [redirects, setRedirects] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://opensheet.elk.sh/1ylhC8QHDxBLheCtYliSasQNWjuOkb_N-A_BRh8aMpe4/redirections"
      )
      .then((response) => {
        setRedirects(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[]);
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Loop through the redirects.json and redirect them */}
          {redirects.map((redirect, index) => (
            <Route
              key={index}
              path={redirect.route}
              element={<Redirection link={redirect.redirect} />}
            />
          ))}
          {/* //Redirect /yip to https://yip.kerala.gov.in/yipapp/index.php/idea2022 */}
          {/* <Route
            path="/yip"
            element={
              <Redirection link="https://yip.kerala.gov.in/" />
            }
          /> */}
          <Route path="/careers" element={<Career />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/termsandconditions" element={<TermsAndCondition />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
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
            <Route path="/yip" element={<YIP2023 />} />
            <Route path="/events/bewebdev" element={<BeWebDev />} />
            <Route path="/team">
              <Route path="" element={<Teams />} />
            </Route>
            <Route path="/leaderboard" element={<LeaderBoard />} />
            <Route
              path="/leaderboard/monthly"
              element={<MonthlyLeaderboard />}
            />
            <Route path="/hacktoberfest" element={<HacktoberFest />} />
            <Route path="/campuschapters">
              <Route path="" element={<CampusChapters />} />
            </Route>
            <Route path="/participate" element={<EnablersOnboarding />} />
            <Route path="/earnkarma" element={<HackathonKarma />} />
            <Route path="/events" element={<EventsHome />} />
            <Route
              path="/community-partners/:id"
              element={<CommunityLanding />}
            />
            <Route
              path="/campus-logo-generator"
              element={<CampusLogoGenerator />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
