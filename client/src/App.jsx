import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";
import Leaveform from "./pages/Leaveform";
import LeaveReportPage from "./pages/LeaveReportPage";  // Import the new component

const App = () => {
  return (
    <div>
      <Header />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaveform" element={<Leaveform />} />
          <Route path="/report" element={<Reports />} />
          <Route path="/leave-report" element={<LeaveReportPage />} />  {/* Add new route */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
