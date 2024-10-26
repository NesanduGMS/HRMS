import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Reports from "./pages/Reports";
import Leaveform from "./pages/Leaveform";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Performance from "./pages/Performance";
import Leaveinfo from "./pages/Leaveinfo";
import Leaveappeal from "./pages/Leaveappeal";
import Manageemployee from "./pages/Manageemployee";
import Applyleave from "./pages/Applyleave";
import Viewpersonalinfo from "./pages/Viewpersonalinfo";
import AddEmployeePage from "./pages/AddEmployeePage";
import EmployeeTablePage from "./pages/EmployeeTablePage";
import AvailableLeavesTable from "./pages/AvailableLeavesTable";
import ProfessionalDetailsTable from "./pages/ProfessionalDetailsTable";
import EmployeeContactInfoTable from "./pages/EmployeeContactInfoTable";
import EmergencyInformationTable from "./pages/EmergencyInformationTable";
import UserAccountTable from "./pages/UserAccountTable"; 

const App = () => {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {!isDashboard && <Header />}
      <div className="flex-grow">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="profile" element={<Profile />} />
            <Route path="performance" element={<Performance />} />
            <Route path="leaveinfo" element={<Leaveinfo />} />
            <Route path="leaveappeal" element={<Leaveappeal />} />
            <Route path="manageemployee" element={<Manageemployee />} />
            <Route path="applyleave" element={<Applyleave />} />
            <Route path="personalinfo" element={<Viewpersonalinfo />} />
            <Route path="addemployee" element={<AddEmployeePage />} />
            <Route path="edit-employee/:employeeId/personal-details" element={<EmployeeTablePage />} />
            <Route path="edit-employee/:employeeId/available-leaves" element={<AvailableLeavesTable />} />
            <Route path="edit-employee/:employeeId/professional-details" element={<ProfessionalDetailsTable />} />
            <Route path="edit-employee/:employeeId/contact-info" element={<EmployeeContactInfoTable />} />
            <Route path="edit-employee/:employeeId/emergency-info" element={<EmergencyInformationTable />} />
            <Route path="edit-employee/:employeeId/user-account" element={<UserAccountTable />} /> 
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaveform" element={<Leaveform />} />
          <Route path="/report" element={<Reports />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
