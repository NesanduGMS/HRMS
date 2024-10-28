
import axios from 'axios';
import React, { useState } from 'react';
import { FaUser, FaInfoCircle, FaFileAlt, FaUsers, FaChartLine, FaClipboard, FaBuilding, FaLeaf, FaIdBadge, FaColumns } from 'react-icons/fa'; // Added icons for sub-items
import { Link, Outlet, useLocation } from 'react-router-dom';

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const location = useLocation(); // Get the current location
  const currentPath = location.pathname; // Get the current pathname
  const navigate = useNavigate(); // For redirecting after logout

  const [isReportOpen, setIsReportOpen] = useState(false); // State to toggle Report sub-items

  const tabs = [
    { name: 'Profile', icon: <FaUser />, path: '/dashboard/profile' },
    { name: 'Performance', icon: <FaChartLine />, path: '/dashboard/performance' },
    { name: 'Leave Info', icon: <FaInfoCircle />, path: '/dashboard/leaveinfo' },
    { name: 'Leave Appeals', icon: <FaFileAlt />, path: '/dashboard/leaveappeal' },
    { name: 'Manage Employee', icon: <FaUsers />, path: '/dashboard/manageemployee' },
    { name: 'Report', icon: <FaClipboard />, path: '#', onClick: () => setIsReportOpen(!isReportOpen) }, // Toggle report sub-items
  ];


  // Report sub-items (these will show when the Reports button is clicked)
  const reportSubItems = [
    { name: 'Department', icon: <FaBuilding />, path: '/dashboard/report/department' },
    { name: 'Leaves', icon: <FaLeaf />, path: '/dashboard/report/leaves' },
    { name: 'Employee', icon: <FaIdBadge />, path: '/dashboard/report/employee' },
    { name: 'Custom Fields', icon: <FaColumns />, path: '/dashboard/report/customfields' },
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
                onClick={tab.onClick ? tab.onClick : undefined} // Handle onClick for Report
              >
                <span className={`mr-3 text-xl ${currentPath === tab.path ? 'text-blue-300' : 'text-white'}`}>
                  {tab.icon}
                </span>
                <span className={`${currentPath === tab.path ? 'text-blue-300' : 'text-white'}`}>{tab.name}</span>
              </button>
            </Link>
          ))}


          {/* Show report sub-items if Report is clicked */}
          {isReportOpen && (
            <div className="ml-6 space-y-2">
              {reportSubItems.map((item) => (
                <Link to={item.path} key={item.name}>
                  <button
                    className={`flex items-center w-full p-3 text-left hover:bg-blue-700 transition-colors rounded-lg ${
                      currentPath === item.path ? 'bg-blue-700' : ''
                    }`}
                  >
                    <span className={`mr-3 text-lg ${currentPath === item.path ? 'text-blue-300' : 'text-white'}`}>
                      {item.icon}
                    </span>
                    <span className={`${currentPath === item.path ? 'text-blue-300' : 'text-white'}`}>{item.name}</span>
                  </button>
                </Link>
              ))}
            </div>
          )}

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
