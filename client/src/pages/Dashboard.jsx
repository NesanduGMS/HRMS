
// import axios from 'axios';
// import React from 'react';
// import { FaUser, FaInfoCircle, FaFileAlt, FaUsers, FaChartLine } from 'react-icons/fa'; // Icons for the tabs
// import { Link, Outlet, useLocation } from 'react-router-dom';

// const Dashboard = () => {
//   axios.defaults.withCredentials = true;
//   const location = useLocation(); // Get the current location
//   const currentPath = location.pathname; // Get the current pathname

//   const tabs = [
//     { name: 'Profile', icon: <FaUser />, path: '/dashboard/profile'},
//     { name: 'Performance', icon: <FaChartLine />, path: '/dashboard/performance' },
//     { name: 'Leave Info', icon: <FaInfoCircle />, path: '/dashboard/leaveinfo' },
//     { name: 'Leave Appeals', icon: <FaFileAlt />, path: '/dashboard/leaveappeal' },
//     { name: 'Manage Employee', icon: <FaUsers />, path: '/dashboard/manageemployee' },
//   ];

//   return (

//     <div className="min-h-screen flex">
//       {/* Sidebar with Tabs */}
//       <div className="w-1/5 bg-blue-800 text-white fixed left-0 h-full shadow-lg">
//         <Link to="/dashboard">
//           <h2 className="text-xl font-semibold text-center py-4 border-b border-blue-700">DASHBOARD</h2>
//         </Link>
//         <nav className="flex flex-col mt-4 space-y-2">
//           {tabs.map((tab) => (
//             <Link to={tab.path} key={tab.name}>
//               <button
//                 className={`flex items-center w-full p-4 text-left hover:bg-blue-700 transition-colors rounded-lg ${
//                   currentPath === tab.path ? 'bg-blue-700' : ''
//                 }`}
//               >
//                 <span className={`mr-3 text-xl ${currentPath === tab.path ? 'text-blue-300' : 'text-white'}`}>
//                   {tab.icon}
//                 </span>
//                 <span className={`${currentPath === tab.path ? 'text-blue-300' : 'text-white'}`}>{tab.name}</span>
//               </button>
//             </Link>
//           ))}
//         </nav>
//       </div>

//       {/* Main Content Area */}
//       <div className="w-4/5 ml-auto p-4">
//         <Outlet />
//       </div>
//     </div>
//   );
// };


// export default Dashboard;




import axios from 'axios';
import React from 'react';
import { FaUser, FaInfoCircle, FaFileAlt, FaUsers, FaChartLine, FaSignOutAlt } from 'react-icons/fa'; // Added FaSignOutAlt for the logout icon
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Get the current pathname
  const navigate = useNavigate(); // For redirecting after logout

  const tabs = [
    { name: 'Profile', icon: <FaUser />, path: '/dashboard/profile' },
    { name: 'Performance', icon: <FaChartLine />, path: '/dashboard/performance' },
    { name: 'Leave Info', icon: <FaInfoCircle />, path: '/dashboard/leaveinfo' },
    { name: 'Leave Appeals', icon: <FaFileAlt />, path: '/dashboard/leaveappeal' },
    { name: 'Manage Employee', icon: <FaUsers />, path: '/dashboard/manageemployee' },
  ];

  const handleLogout = () => {
    // Example: make API call to log out
    axios.get('http://localhost:3005/auth/logout')
    .then((result) => {
     if(result.data.Status){
      navigate('/logout')
     };
    }).catch(err => {
      console.error("Logout failed", err);
    });
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar with Tabs */}
      <div className="w-1/5 bg-blue-800 text-white fixed left-0 h-full shadow-lg">
        <Link to="/dashboard">
          <h2 className="text-xl font-semibold text-center py-4 border-b border-blue-700">DASHBOARD</h2>
        </Link>
        <nav className="flex flex-col mt-4 space-y-2">
          {tabs.map((tab) => (
            <Link to={tab.path} key={tab.name}>
              <button
                className={`flex items-center w-full p-4 text-left hover:bg-blue-700 transition-colors rounded-lg ${
                  currentPath === tab.path ? 'bg-blue-700' : ''
                }`}
              >
                <span className={`mr-3 text-xl ${currentPath === tab.path ? 'text-blue-300' : 'text-white'}`}>
                  {tab.icon}
                </span>
                <span className={`${currentPath === tab.path ? 'text-blue-300' : 'text-white'}`}>{tab.name}</span>
              </button>
            </Link>
          ))}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 mt-auto text-left bg-red-600 hover:bg-red-700 transition-colors rounded-lg"
          >
            <FaSignOutAlt className="mr-3 text-xl text-white" />
            <span className="text-white">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-4/5 ml-auto p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;

