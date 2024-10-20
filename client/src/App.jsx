
// import { Route, Routes, useLocation } from "react-router-dom";
// import Header from "./components/Header";
// import Home from "./pages/Home";
// import AboutUs from "./pages/Aboutus";
// import Contact from "./pages/Contact";
// import Reports from "./pages/Reports";
// import Leaveform from "./pages/Leaveform";
// import Dashboard from "./pages/Dashboard";
// import Profile from "./pages/Profile";
// import Performance from "./pages/Performance";
// import Leaveinfo from "./pages/Leaveinfo";
// import Leaveappeal from "./pages/Leaveappeal";
// import Manageemployee from "./pages/Manageemployee";

// const App = () => {
//   // Get the current path
//   const location = useLocation();

//   // Check if the current path is any of the dashboard paths
//   const isDashboard =
//     location.pathname === "/dashboard" ||
//     location.pathname === "/dashboard/profile" ||
//     location.pathname === "/dashboard/performance" ||
//     location.pathname === "/dashboard/leaveinfo" ||
//     location.pathname === "/dashboard/leaveappeal" ||
//     location.pathname === "/dashboard/manageemployee";

//   return (
//     <div>
//       {/* Conditionally render Header only if not on /dashboard */}
//       {!isDashboard && <Header />}

//       {/* Render other routes */}
//       <div className="flex-grow">
//         <Routes>
//           <Route path="/dashboard" element={<Dashboard />}>
//             <Route path="profile" element={<Profile />} />
//             <Route path="performance" element={<Performance />} />
//             <Route path="leaveinfo" element={<Leaveinfo />} />
//             <Route path="leaveappeal" element={<Leaveappeal />} />
//             <Route path="manageemployee" element={<Manageemployee />} />
//           </Route>
//           <Route path="/" element={<Home />} />
//           <Route path="/aboutus" element={<AboutUs />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/leaveform" element={<Leaveform />} />
//           <Route path="/report" element={<Reports />} />
//         </Routes>
//       </div>
//     </div>
//   );
// };

// export default App;

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
            <Route path="profile" element={<Profile/>} />
            <Route path="performance" element={<Performance />} />
            <Route path="leaveinfo" element={<Leaveinfo />} />
            <Route path="leaveappeal" element={<Leaveappeal />} />
            <Route path="manageemployee" element={<Manageemployee />} />
            <Route path="applyleave" element={<Applyleave/>}/>
           
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
