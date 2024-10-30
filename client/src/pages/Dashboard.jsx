// src/pages/Dashboard.jsx
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import StatCard from './StatCard';
import bannerImage from '../assets/dashboard-banner.jpg';
import { FaUser, FaInfoCircle, FaFileAlt, FaUsers, FaChartLine, FaClipboard, FaBuilding, FaLeaf, FaIdBadge, FaColumns, FaSignOutAlt } from 'react-icons/fa';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';

const Dashboard = () => {
    axios.defaults.withCredentials = true;
    const location = useLocation();
    const currentPath = location.pathname;
    const navigate = useNavigate();
    const [isReportOpen, setIsReportOpen] = useState(false);

    // State to hold the stats data
    const [stats, setStats] = useState({
        totalEmployees: 0,
        leavesTaken: 0,
        pendingLeaveAppeals: 0,
    });

    // Fetch the dashboard statistics
    useEffect(() => {
        const fetchStats = async () => {
            try {
                const resEmployees = await axios.get('http://localhost:3005/auth/totalEmployees');
                setStats(prevStats => ({
                    ...prevStats,
                    totalEmployees: resEmployees.data.totalEmployees || 0,
                }));
            } catch (error) {
                console.error("Error fetching totalEmployees:", error);
            }

            try {
                const resLeaves = await axios.get('http://localhost:3005/auth/leavesTaken');
                setStats(prevStats => ({
                    ...prevStats,
                    leavesTaken: resLeaves.data.leavesTaken || 0,
                }));
            } catch (error) {
                console.error("Error fetching leavesTaken:", error);
            }

            try {
                const resAppeals = await axios.get('http://localhost:3005/auth/pendingLeaveAppeals');
                setStats(prevStats => ({
                    ...prevStats,
                    pendingLeaveAppeals: resAppeals.data.pendingLeaveAppeals || 0,
                }));
            } catch (error) {
                console.error("Error fetching pendingLeaveAppeals:", error);
            }
        };

        fetchStats();
    }, []);

    const tabs = [
        { name: 'Profile', icon: <FaUser />, path: '/dashboard/profile' },
        { name: 'Performance', icon: <FaChartLine />, path: '/dashboard/performance' },
        { name: 'Leave Info', icon: <FaInfoCircle />, path: '/dashboard/leaveinfo' },
        { name: 'Leave Appeals', icon: <FaFileAlt />, path: '/dashboard/leaveappeal' },
        { name: 'Manage Employee', icon: <FaUsers />, path: '/dashboard/manageemployee' },
        { name: 'Report', icon: <FaClipboard />, path: '#', onClick: () => setIsReportOpen(!isReportOpen) },
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
        <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#17153B' }}>
            {/* Sidebar with Tabs */}
            <div style={{ width: '20%', backgroundColor: '#2E236C', color: '#C8ACD6', position: 'fixed', left: 0, height: '100%', boxShadow: '2xl', borderRadius: '0 24px 24px 0' }}>
                <Link to="/dashboard">
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', textAlign: 'center', padding: '24px', borderBottom: '1px solid #433D8B', letterSpacing: '0.1em' }}>DASHBOARD</h2>
                </Link>
                <nav style={{ display: 'flex', flexDirection: 'column', marginTop: '1.5rem', padding: '0 16px' }}>
                    {tabs.map((tab) => (
                        <Link to={tab.path} key={tab.name}>
                            <button
                                style={{
                                    display: 'flex', alignItems: 'center', width: '100%', padding: '12px', borderRadius: '9999px', textAlign: 'left', transition: 'all 0.2s ease-in-out',
                                    ...(currentPath === tab.path
                                        ? { boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', transform: 'scale(1.05)', backgroundImage: 'linear-gradient(to right, #433D8B, #2E236C)' }
                                        : { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }),
                                }}
                                onClick={tab.onClick ? tab.onClick : undefined}
                            >
                                <span style={{ marginRight: '12px', fontSize: '1.5rem', color: currentPath === tab.path ? '#C8ACD6' : '#fff' }}>{tab.icon}</span>
                                <span style={{ fontWeight: 'bold', color: currentPath === tab.path ? '#C8ACD6' : '#fff' }}>{tab.name}</span>
                            </button>
                        </Link>
                    ))}
                    {isReportOpen && (
                        <div style={{ marginLeft: '2.5rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {reportSubItems.map((item) => (
                                <Link to={item.path} key={item.name}>
                                    <button
                                        style={{
                                            display: 'flex', alignItems: 'center', width: '100%', padding: '8px', borderRadius: '9999px', textAlign: 'left', transition: 'all 0.2s ease-in-out',
                                            ...(currentPath === item.path
                                                ? { boxShadow: '0px 4px 8px rgba(0,0,0,0.2)', transform: 'scale(1.05)', backgroundImage: 'linear-gradient(to right, #433D8B, #2E236C)' }
                                                : { boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }),
                                        }}
                                    >
                                        <span style={{ marginRight: '8px', fontSize: '1.25rem', color: currentPath === item.path ? '#C8ACD6' : '#fff' }}>{item.icon}</span>
                                        <span style={{ fontWeight: 'bold', color: currentPath === item.path ? '#C8ACD6' : '#fff' }}>{item.name}</span>
                                    </button>
                                </Link>
                            ))}
                        </div>
                    )}
                    <button
                        onClick={handleLogout}
                        style={{ display: 'flex', alignItems: 'center', width: '100%', padding: '16px', marginTop: 'auto', color: '#fff', borderRadius: '9999px', boxShadow: '0px 4px 8px rgba(0,0,0,0.3)', backgroundImage: 'linear-gradient(to right, #e63946, #d62828)', transition: 'all 0.2s ease-in-out' }}
                    >
                        <FaSignOutAlt style={{ marginRight: '12px', fontSize: '1.5rem' }} />
                        <span style={{ fontWeight: 'bold' }}>Logout</span>
                    </button>
                </nav>
            </div>

            {/* Main Content Area */}
            <div style={{ width: '80%', marginLeft: '20%', backgroundColor: '#17153B', borderRadius: '0 24px 24px 0' }}>
                {/* Conditionally render the Banner and Welcome Message */}
                {currentPath === '/dashboard' && (
                    <div style={{ position: 'relative', width: '100%', height: '250px' }}>
                        <img src={bannerImage} alt="Dashboard Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <div style={{
                            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: 'linear-gradient(to right, rgba(23, 21, 59, 0.8), rgba(46, 35, 108, 0.6))', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#fff' }}>Welcome to Your Dashboard</h1>
                        </div>
                    </div>
                )}

                <div style={{ padding: '2rem', color: '#C8ACD6' }}>
                    {/* Conditionally render the StatCard Section */}
                    {currentPath === '/dashboard' && (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2rem' }}>
                            <StatCard label="Total Employees" value={stats.totalEmployees} />
                            <StatCard label="Leaves Taken" value={stats.leavesTaken} />
                            <StatCard label="Pending Leave Appeals" value={stats.pendingLeaveAppeals} />
                        </div>
                    )}

                    {/* Render sub-routes inside dashboard */}
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
