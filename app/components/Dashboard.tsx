'use client'
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaNewspaper, FaSignOutAlt, FaMapMarkerAlt, FaFileInvoice, FaLock, FaChartLine,FaBlogger } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';

const Dashboard: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/login');
    };

    // Close mobile menu on path change
    useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    // Fetch username from localStorage
    const [username, setUsername] = useState('');
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (user) {
            const formData = JSON.parse(user);
            setUsername(formData.email);
        } else {
            router.push('/login');
        }
    }, [router]);

    // Check authentication on mount
    useEffect(() => {
        const user = localStorage.getItem('user');
        if (!user) {
            router.push('/login');
        }
    }, [router]);

    // Fetch dashboard data
    const [dashboardData, setDashboardData] = useState({
        totalProjects: 0,
        totalBlogPosts: 0,
        totalNewsEvents: 0,
        statusCounts: [] as { _id: string; count: number }[],
        loading: true
    });

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const [projectsRes, blogsRes, newsRes, statusRes] = await Promise.all([
                    axios.get('/api/projects/total'),
                    axios.get('/api/blog-posts/total'),
                    axios.get('/api/news-events/total'),
                    axios.get('/api/projects/status-count')
                ]);

                setDashboardData({
                    totalProjects: projectsRes.data.total,
                    totalBlogPosts: blogsRes.data.total,
                    totalNewsEvents: newsRes.data.total,
                    statusCounts: statusRes.data.success ? statusRes.data.data : [],
                    loading: false
                });
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
                setDashboardData(prev => ({ ...prev, loading: false }));
            }
        };

        fetchDashboardData();
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.location.reload();
        }
    };

    const getStatusCount = (statusName: string) => {
        const status = dashboardData.statusCounts.find(c => c._id === statusName);
        return status ? status.count : 0;
    };

    // Status colors mapping
    const statusColors: Record<string, string> = {
        completed: 'bg-emerald-100 text-emerald-800',
        ongoing: 'bg-blue-100 text-blue-800',
        upcoming: 'bg-amber-100 text-amber-800'
    };

    return (
        <div className="min-h-screen bg-gray-50 flex pt-16">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-gradient-to-b from-gray-900 to-gray-800 shadow-xl transform transition-transform duration-300 ease-in-out z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0`}
            >
                <div className="p-5 flex justify-center border-b border-gray-700">
                    <Link href="/dashboard">
                        <Image 
                            src="/img/logo.png" 
                            alt="Logo" 
                            height={50} 
                            width={200} 
                            className="hover:opacity-90 transition-opacity"
                        />
                    </Link>
                </div>
                <nav className="p-4">
                    <ul className="space-y-2">
                        <li>
                            <Link 
                                href="/dashboard" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname === '/dashboard' ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                                onClick={handleHomeClick}
                            >
                                <FaHome className="text-lg mr-3" />
                                <span className="font-medium">Home</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/projects/crud" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname.includes('/projects') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            >
                                <FaMapMarkerAlt className="text-lg mr-3" />
                                <span className="font-medium">Projects</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/clients/crud" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname.includes('/clients') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            >
                                <FaUser className="text-lg mr-3" />
                                <span className="font-medium">Clients</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/news-events/crud" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname.includes('/news-events') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            >
                                <FaNewspaper className="text-lg mr-3" />
                                <span className="font-medium">News & Events</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/blogs/crud" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname.includes('/news-events') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            >
                                <FaBlogger className="text-lg mr-3" />
                                <span className="font-medium">Blogs</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/prime-locations/crud" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname.includes('/prime-locations') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            >
                                <FaFileInvoice className="text-lg mr-3" />
                                <span className="font-medium">Locations</span>
                            </Link>
                        </li>
                        <li>
                            <Link 
                                href="/dashboard/change-password" 
                                className={`flex items-center p-3 rounded-lg transition-all ${pathname.includes('/change-password') ? 'bg-gray-700 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
                            >
                                <FaLock className="text-lg mr-3" />
                                <span className="font-medium">Change Password</span>
                            </Link>
                        </li>
                        <li className="border-t border-gray-700 pt-2 mt-2">
                            <button 
                                onClick={handleLogout} 
                                className="flex items-center w-full p-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-red-400 transition-all"
                            >
                                <FaSignOutAlt className="text-lg mr-3" />
                                <span className="font-medium">Logout</span>
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Mobile Menu Toggle Button */}
            <div className={`md:hidden flex justify-between items-center p-4 bg-white shadow-sm ${isOpen ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}`}>
                <div className="flex items-center">
                    <FaChartLine className="text-blue-600 mr-2 text-xl" />
                    <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
                </div>
                <button 
                    onClick={toggleMenu} 
                    className="focus:outline-none p-2 rounded-md hover:bg-gray-100 transition-colors"
                    aria-label="Toggle menu"
                >
                    {isOpen ? (
                        <FaTimes className="text-gray-600 text-2xl" />
                    ) : (
                        <FaBars className="text-gray-600 text-2xl" />
                    )}
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-1 p-6 transition-all duration-300 overflow-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome back, {username.split('@')[0]}!</h1>
                    <p className="text-gray-600">Here's what's happening with your projects today</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {/* Total Projects Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Projects</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                    {dashboardData.loading ? '--' : dashboardData.totalProjects}
                                </h3>
                            </div>
                            <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
                                <FaMapMarkerAlt className="text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Updated just now</span>
                        </div>
                    </div>

                    {/* Total Posts Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total Posts</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                    {dashboardData.loading ? '--' : dashboardData.totalBlogPosts}
                                </h3>
                            </div>
                            <div className="p-3 rounded-lg bg-purple-50 text-purple-600">
                                <FaNewspaper className="text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Updated just now</span>
                        </div>
                    </div>

                    {/* Total News Card */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="text-sm font-medium text-gray-500">Total News</p>
                                <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                    {dashboardData.loading ? '--' : dashboardData.totalNewsEvents}
                                </h3>
                            </div>
                            <div className="p-3 rounded-lg bg-green-50 text-green-600">
                                <FaFileInvoice className="text-xl" />
                            </div>
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-100">
                            <span className="text-sm text-gray-500">Updated just now</span>
                        </div>
                    </div>
                </div>

                {/* Project Status Section */}
                <div className="mb-8">
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Status Overview</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {['completed', 'ongoing', 'upcoming'].map((status) => (
                            <div key={status} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500 capitalize">{status} Projects</p>
                                        <h3 className="text-3xl font-bold text-gray-800 mt-2">
                                            {dashboardData.loading ? '--' : getStatusCount(status)}
                                        </h3>
                                    </div>
                                    <div className={`p-3 rounded-lg ${statusColors[status].split(' ')[0]} ${statusColors[status].split(' ')[1]}`}>
                                        <FaChartLine className="text-xl" />
                                    </div>
                                </div>
                                <div className="mt-4 pt-4 border-t border-gray-100">
                                    <span className="text-sm text-gray-500">Updated just now</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link 
                            href="/projects/crud/create" 
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center text-center"
                        >
                            <div className="p-3 rounded-full bg-blue-50 text-blue-600 mb-3">
                                <FaMapMarkerAlt />
                            </div>
                            <span className="font-medium text-gray-800">Add New Project</span>
                        </Link>
                        <Link 
                            href="/news-events/crud/create" 
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center text-center"
                        >
                            <div className="p-3 rounded-full bg-purple-50 text-purple-600 mb-3">
                                <FaNewspaper />
                            </div>
                            <span className="font-medium text-gray-800">Add News/Event</span>
                        </Link>
                        <Link 
                            href="/clients/crud/create" 
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center text-center"
                        >
                            <div className="p-3 rounded-full bg-amber-50 text-amber-600 mb-3">
                                <FaUser />
                            </div>
                            <span className="font-medium text-gray-800">Add New Client</span>
                        </Link>
                        <Link 
                            href="/prime-locations/crud/create" 
                            className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-all flex flex-col items-center text-center"
                        >
                            <div className="p-3 rounded-full bg-green-50 text-green-600 mb-3">
                                <FaFileInvoice />
                            </div>
                            <span className="font-medium text-gray-800">Add Location</span>
                        </Link>
                    </div>
                </div>
            </main>

            {/* Overlay when the menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
                    onClick={() => setIsOpen(false)}
                />
            )}
        </div>
    );
};

export default Dashboard;