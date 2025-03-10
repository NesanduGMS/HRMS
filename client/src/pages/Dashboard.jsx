
import axios from 'axios';
import React, { useState } from 'react';
import {
  FaUser, FaInfoCircle, FaFileAlt, FaUsers, FaChartLine, FaClipboard,
  FaBuilding, FaLeaf, FaIdBadge, FaColumns, FaSignOutAlt
} from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import bannerImage from '../assets/dashboard-banner.jpg'; // Importing the banner image

const Dashboard = () => {
  axios.defaults.withCredentials = true;
  const location = useLocation();
  const currentPath = location.pathname;
  const navigate = useNavigate();

  const ROLE = localStorage.getItem('ROLE');
  const [isReportOpen, setIsReportOpen] = useState(false);

  const tabs = [
    { name: 'Profile', icon: <FaUser />, path: '/dashboard/profile', roles: ['HR_Manager', 'Supervisor', 'Employee', 'Manager'] },
    { name: 'Performance', icon: <FaChartLine />, path: '/dashboard/performance', roles: ['HR_Manager', 'Supervisor', 'Employee', 'Manager'] },
    { name: 'Leave Info', icon: <FaInfoCircle />, path: '/dashboard/leaveinfo', roles: ['HR_Manager', 'Supervisor', 'Employee', 'Manager'] },
    { name: 'Leave Appeals', icon: <FaFileAlt />, path: '/dashboard/leaveappeal', roles: ['Supervisor'] },
    { name: 'Manage Employee', icon: <FaUsers />, path: '/dashboard/manageemployee', roles: ['HR_Manager'] },
    { name: 'Report', icon: <FaClipboard />, path: '#', roles: ['HR_Manager', 'Manager'], onClick: () => setIsReportOpen(!isReportOpen) },
  ];

  const reportSubItems = [
    { name: 'Department', icon: <FaBuilding />, path: '/dashboard/report/department' },
    { name: 'Leaves', icon: <FaLeaf />, path: '/dashboard/report/leaves' },
    { name: 'Employee', icon: <FaIdBadge />, path: '/dashboard/report/employee' },
    { name: 'Custom Fields', icon: <FaColumns />, path: '/dashboard/report/customfields' },
  ];

  const handleLogout = () => {
    axios.get('http://localhost:3005/auth/logout')
      .then((result) => {
        if (result.data.Status) {
          navigate('/logout');
        }
      })
      .catch(err => {
        console.error("Logout failed", err);
      });
  };

  return (
    <div className="min-h-screen flex bg-[#17153B]">
      {/* Sidebar with Tabs */}
      <div className="w-1/5 bg-[#2E236C] text-[#C8ACD6] fixed left-0 h-full shadow-2xl rounded-r-3xl">
        <Link to="/dashboard">
          <h2 className="text-2xl font-semibold text-center py-6 border-b border-[#433D8B] tracking-wider">DASHBOARD</h2>
        </Link>
        <nav className="flex flex-col mt-6 space-y-4 px-4">
          {tabs
            .filter(tab => tab.roles.includes(ROLE))
            .map((tab) => (
              <Link to={tab.path} key={tab.name}>
                <button
                  className={`flex items-center w-full p-3 rounded-full text-left transition-all duration-200 ease-in-out ${
                    currentPath === tab.path
                      ? 'shadow-lg transform scale-105 bg-gradient-to-r from-[#433D8B] to-[#2E236C]'
                      : 'hover:shadow-md'
                  }`}
                  onClick={tab.onClick ? tab.onClick : undefined}
                >
                  <span className={`mr-3 text-2xl ${currentPath === tab.path ? 'text-[#C8ACD6]' : 'text-white'}`}>
                    {tab.icon}
                  </span>
                  <span className={`font-semibold ${currentPath === tab.path ? 'text-[#C8ACD6]' : 'text-white'}`}>
                    {tab.name}
                  </span>
                </button>
              </Link>
            ))}

          {isReportOpen && (ROLE === 'HR_Manager' || ROLE === 'Manager') && (
            <div className="ml-10 space-y-2">
              {reportSubItems.map((item) => (
                <Link to={item.path} key={item.name}>
                  <button
                    className={`flex items-center w-full p-2 rounded-full text-left transition-all duration-200 ease-in-out ${
                      currentPath === item.path
                        ? 'shadow-lg transform scale-105 bg-gradient-to-r from-[#433D8B] to-[#2E236C]'
                        : 'hover:shadow-md'
                    }`}
                  >
                    <span className={`mr-2 text-xl ${currentPath === item.path ? 'text-[#C8ACD6]' : 'text-white'}`}>
                      {item.icon}
                    </span>
                    <span className={`font-semibold ${currentPath === item.path ? 'text-[#C8ACD6]' : 'text-white'}`}>
                      {item.name}
                    </span>
                  </button>
                </Link>
              ))}
            </div>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center w-full p-4 mt-auto text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200 ease-in-out bg-gradient-to-r from-[#e63946] to-[#d62828]"
          >
            <FaSignOutAlt className="mr-3 text-xl" />
            <span className="font-semibold">Logout</span>
          </button>
        </nav>
      </div>

      {/* Main Content Area */}
      <div className="w-4/5 ml-auto p-8 text-[#C8ACD6] bg-[#17153B] min-h-screen rounded-l-3xl shadow-2xl">
        {currentPath === '/dashboard' ? (
          <div
            className="w-full h-full relative rounded-lg shadow-md flex items-center justify-center text-white"
            style={{ backgroundImage: `url(${bannerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>

            {/* Text Content */}
            <div className="relative z-10 text-center">
              <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard!</h1>
              <p className="text-lg">Manage your tasks, performance, and reports all in one place.</p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
