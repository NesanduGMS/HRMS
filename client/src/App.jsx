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
import Department from "./pages/reports/Department"; // Importing the Department component
import Leaves from "./pages/reports/Leaves"; // Importing the Leaves component
import Employee from "./pages/reports/Employee"; // Importing the Employee component
import CustomFields from "./pages/reports/CustomFields"; // Importing the Custom Fields component

const App = () => {
  const location = useLocation();

  // Check if the current path starts with '/dashboard' (for dashboard and all its subroutes)
  const isDashboard = location.pathname.startsWith("/dashboard");

  return (
    <div>
      {/* Conditionally render Header only if not on /dashboard */}
      {!isDashboard && <Header />}

      {/* Render other routes */}
      <div className="flex-grow">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />}>
            {/* Include userId as a route parameter */}
            <Route path="profile" element={<Profile />} />
            <Route path="performance" element={<Performance />} />
            <Route path="leaveinfo" element={<Leaveinfo />} />
            <Route path="leaveappeal" element={<Leaveappeal />} />
            <Route path="manageemployee" element={<Manageemployee />} />
            <Route path="applyleave" element={<Applyleave />} />
            <Route path="personalinfo" element={<Viewpersonalinfo />} />
            <Route path="report/department" element={<Department />} /> {/* Route for Department */}
            <Route path="report/leaves" element={<Leaves />} /> {/* Route for Leaves */}
            <Route path="report/employee" element={<Employee />} /> {/* Route for Employee */}
            <Route path="report/customfields" element={<CustomFields />} /> {/* Route for Custom Fields */}
          </Route>
          <Route path="/" element={<Home />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/leaveform" element={<Leaveform />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
