'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaNewspaper, FaSignOutAlt, FaMapMarkerAlt, FaFileInvoice } from 'react-icons/fa';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Toggle the mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Handle Logout
  const handleLogout = () => {
    // Clear the user session (e.g., localStorage or another method)
    localStorage.removeItem('user'); // Example using localStorage

    // Redirect to the login page
    router.push('/login');
  };

  // Close the mobile menu when the pathname changes
  useEffect(() => {
    setIsOpen(false); // Close the menu on path change
  }, [pathname]);

  // Force reload if already on Home page
  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen mt-12 flex flex-col md:flex-row bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 shadow-md transform transition-transform duration-300 z-20 ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } md:static md:translate-x-0 md:block`}
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
              <button
                onClick={handleLogout}
                className="block text-xl text-gray-50 py-2 px-4"
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Header with Hamburger Menu */}
      <div className={`md:hidden flex justify-between p-5 bg-white shadow-md fixed top-0 left-0 right-0 z-30`}>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <button onClick={toggleMenu} className="focus:outline-none">
          {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-grow p-6 mt-16 md:mt-0 z-10">
        {children}
      </main>

      {/* Overlay when the menu is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-10"
          onClick={toggleMenu}  // Ensure the overlay closes when clicked
        />
      )}
    </div>
  );
};

export default Layout;
