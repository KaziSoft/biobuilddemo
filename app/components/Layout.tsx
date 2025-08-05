'use client'
import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUser, FaNewspaper, FaSignOutAlt, FaMapMarkerAlt, FaFileInvoice, FaLock, FaChartLine, FaBlogger } from 'react-icons/fa';
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

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem('user');
    router.push('/login');
  };

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const handleHomeClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (pathname === '/') {
      e.preventDefault();
      window.location.reload();
    }
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

      {/* Mobile Header */}
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
        {children}
      </main>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;