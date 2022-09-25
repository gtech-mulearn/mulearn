import "./App.css";
import Home from "./Pages/Home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import News from "./Pages/News/News";
import Calendar from "./Pages/Calendar/Calendar";
import Gallary from "./Pages/Gallary/Gallary";
import MuAnnouncements from "./Pages/MuAnnouncements/MuAnnouncements";

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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
