'use client'
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaNewspaper, FaSignOutAlt, FaMapMarkerAlt, FaFileInvoice } from 'react-icons/fa';
import axios from 'axios';
import Image from 'next/image';

const Dashboard: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

// Handle Logout
  const handleLogout = () => {
    // Clear the user session (e.g., localStorage or another method)
    localStorage.removeItem('user'); // Example using localStorage

    // Redirect to the login page
    router.push('/login');
  };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        if (pathname === '/') {
            e.preventDefault();
            window.location.reload();
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-md transform transition-transform duration-300 z-50 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static md:translate-x-0 md:block`}
            >
                <div className="p-5 flex justify-center">
                    <Link href="/dashboard"><Image src="/img/logo.png" alt='Logo' height={50} width={200} /></Link>
                </div>
                <nav>
                    <ul>
                        <li className="hover:bg-gray-700 transition duration-300 flex items-center">
                            <FaHome className="mx-3 text-gray-50 text-xl" />
                            <Link href="/dashboard" className="block text-xl text-gray-50 py-2 px-4" onClick={handleHomeClick}>
                                Home
                            </Link>
                        </li>
                        <li className="hover:bg-gray-700 transition duration-300 flex items-center">
                            <FaMapMarkerAlt className="mx-3 text-gray-50 text-xl" />
                            <Link href="/projects/crud" className="block text-xl text-gray-50 py-2 px-4">
                                Projects
                            </Link>
                        </li>
                        <li className="hover:bg-gray-700 transition duration-300 flex items-center">
                            <FaUser className="mx-3 text-gray-50 text-xl" />
                            <Link href="/clients/crud" className="block text-xl text-gray-50 py-2 px-4">
                                Clients
                            </Link>
                        </li>
                        <li className="hover:bg-gray-700 transition duration-300 flex items-center">
                            <FaNewspaper className="mx-3 text-gray-50 text-xl" />
                            <Link href="/news-events/crud" className="block text-xl text-gray-50 py-2 px-4">
                                News & Events
                            </Link>
                        </li>
                        <li className="hover:bg-gray-700 transition duration-300 flex items-center">
                            <FaFileInvoice className="mx-3 text-gray-50 text-xl" />
                            <Link href="/prime-locations/crud" className="block text-xl text-gray-50 py-2 px-4">
                                Locations
                            </Link>
                        </li>
                        <li className="hover:bg-gray-700 transition duration-300 flex items-center">
                            <FaSignOutAlt className="mx-3 text-gray-50 text-xl" />
                            <button onClick={handleLogout} className="block text-xl text-gray-50 py-2 px-4">
                                Logout
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Mobile Menu Toggle Button */}
            <div className={`md:hidden flex justify-between p-5 bg-white shadow-md ${isOpen ? 'fixed top-0 left-0 right-0 z-50' : 'relative'}`}>
                <h2 className="text-xl font-bold">Dashboard</h2>
                <button onClick={toggleMenu} className="focus:outline-none">
                    {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
                </button>
            </div>

            {/* Main Content */}
            <main className="flex-grow p-6 m-12 transition-all duration-300">
                <h1 className="text-2xl text-gray-900 font-semibold">Welcome!</h1> {/* Display the username */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-5 shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 text-center">
                        <h3 className="font-bold text-lg">Total Employees</h3>
                        <h1 className='text-3xl text-green-500 font-semibold'></h1>
                    </div>
                    <div className="bg-white p-5 shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 text-center">
                        <h3 className="font-bold text-lg">Total Post</h3>
                        <h1 className='text-3xl text-green-500 font-semibold'></h1>
                    </div>
                    <div className="bg-white p-5 shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 text-center">
                        <h3 className="font-bold text-lg">Total Dhaka</h3>
                        <h1 className='text-3xl text-green-500 font-semibold'></h1>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                    <div className="bg-white p-5 shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 text-center">
                        <h3 className="font-bold text-lg">Total Faridpur</h3>
                        <h1 className='text-3xl text-green-500 font-semibold'></h1>
                    </div>
                    <div className="bg-white p-5 shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 text-center">
                        <h3 className="font-bold text-lg">Total Madaripur</h3>
                        <h1 className='text-3xl text-green-500 font-semibold'></h1>
                    </div>
                    <div className="bg-white p-5 shadow-md rounded-lg transform transition-transform hover:scale-105 duration-300 text-center">
                        <h3 className="font-bold text-lg">Total Kushtia</h3>
                        <h1 className='text-3xl text-green-500 font-semibold'></h1>
                    </div>
                </div>
            </main>

            {/* Overlay when the menu is open */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black opacity-50"
                    onClick={() => setIsOpen(false)}  // Close the menu on overlay click
                />
            )}
        </div>
    );
};

export default Dashboard;
