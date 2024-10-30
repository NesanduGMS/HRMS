
import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import AboutUs from "./pages/Aboutus";
import Contact from "./pages/Contact";
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
import Department from "./pages/reports/Department"; 
import Leaves from "./pages/reports/Leaves";
import Employee from "./pages/reports/Employee";
import CustomFields from "./pages/reports/CustomFields";
import Admin from "./pages/Admin";
import Adminlog from "./pages/Adminlog";

const App = () => {
  const location = useLocation();

  // Check if the current path is either '/dashboard', '/admin', or '/adminlog'
  const hideHeader = 
    location.pathname.startsWith("/dashboard") || 
    location.pathname === "/admin" || 
    location.pathname === "/adminlog"; // Added condition for adminlog

  return (
    <div>
      {!hideHeader && <Header />}
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
            <Route path="report/department" element={<Department />} />
            <Route path="report/leaves" element={<Leaves />} />
            <Route path="report/employee" element={<Employee />} />
            <Route path="report/customfields" element={<CustomFields />} />
          </Route>

          <Route path="/" element={<Home />} />
          <Route path="/logout" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaveform" element={<Leaveform />} />
          <Route path="/admin" element={<Admin/>} />
          <Route path="/adminlog" element={<Adminlog />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
