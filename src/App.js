import "./App.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./Pages/News/News";
import Calendar from "./Pages/Calendar/Calendar";
import Gallary from "./Pages/Gallary/Gallary";
import MuAnnouncements from "./Pages/Events/MuAnnouncements/MuAnnouncements";
import ISR from "./Pages/Events/ISR/ISR";
import Company from "./Pages/Company/Company";
import Teams from "./Pages/Teams/Teams";
import CommunityPartner from "./Pages/CommPartners/CommPartners";
import ArtOfTeaching from "./Pages/ArtOfTeaching/ArtOfTeaching";
import YIP from "./Pages/Teams/YIP/YIP";
import Community from "./Pages/Teams/Community/Community";

function App() {
	return (
		<div className="App">
			<Router>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/news" element={<News />} />
					<Route path="/calendar" element={<Calendar />} />
					<Route path="/gallary" element={<Gallary />} />
					<Route path="/announcements" element={<MuAnnouncements />} />
					<Route path="/events/isr" element={<ISR />} />
					<Route path="/company" element={<Company />} />
					<Route path="/community" element={<CommunityPartner />} />
					<Route path="/artofteaching" element={<ArtOfTeaching />} />
					<Route path="/artofteaching" element={<ArtOfTeaching />} />
					<Route path="/team">
						<Route path="" element={<Teams />} />
						<Route path="execom" element={<YIP />} />
						<Route path="yip" element={<YIP />} />
						<Route path="community" element={<Community />} />
					</Route>
					{/* <Route path="/community" element={ }/> */}
				</Routes>
			</Router>
		</div>
	);
}

export default App;
