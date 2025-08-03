"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Image from "next/image";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null); 

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 768);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) 
      ) {
        setIsOpen(false);
        setOpenSubmenu(null);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const toggleSubmenu = (menu: string) => {
    setOpenSubmenu(openSubmenu === menu ? null : menu);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-100">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold text-gray-800">
              <Image
                src="/img/logo.jpg"
                alt="logo"
                height={100}
                width={100}
                className="h-16 w-auto"
              />
            </Link>
          </div>

          {/* Hamburger Menu Button (all screens) */}
          <div className="flex md:flex">
            <button
              ref={buttonRef} // ✅ Add ref
              onClick={toggleMenu}
              className="text-[#7AA859] hover:text-[#7AA813] focus:outline-none"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Menu */}
      {isDesktop && (
        <div
          ref={menuRef}
          className={`fixed top-16 right-0 w-1/2 bg-white shadow-lg transform transition-transform duration-500 ease-in-out ${
            isOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 py-4 flex">
            {/* Left Links */}
            <div className="w-1/2 pr-8 space-y-4">
              <Link
                href="/"
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]"
              >
                HOME
              </Link>

              {/* About Us */}
              <div className="relative">
                <button
                  onClick={() => toggleSubmenu("about")}
                  className="flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-[#7AA859]"
                >
                  ABOUT US{" "}
                  {openSubmenu === "about" ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </button>
                {openSubmenu === "about" && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/story" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Our Story</Link>
                    <Link href="/bod" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Board of Directors</Link>
                    <Link href="/mission-vision" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Mission and Vision</Link>
                    <Link href="/clients" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Our Clients</Link>
                  </div>
                )}
              </div>

              {/* Projects */}
              <div className="relative">
                <button
                  onClick={() => toggleSubmenu("projects")}
                  className="flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-[#7AA859]"
                >
                  PROJECTS{" "}
                  {openSubmenu === "projects" ? (
                    <FaChevronUp className="text-sm" />
                  ) : (
                    <FaChevronDown className="text-sm" />
                  )}
                </button>
                {openSubmenu === "projects" && (
                  <div className="mt-2 ml-4 space-y-2">
                    <Link href="/project-status/ongoing" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Ongoing Project</Link>
                    <Link href="/project-status/completed" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Completed Project</Link>
                    <Link href="/project-status/upcoming" onClick={() => setIsOpen(false)} className="block text-xl text-gray-700 hover:text-[#7AA859]">Upcoming Projects</Link>
                  </div>
                )}
              </div>

              <Link href="/news" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">NEWS & AWARDS</Link>
              <Link href="/career" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">CAREER</Link>
              <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">CONTACT</Link>
            </div>

            {/* Divider */}
            <div className="border-l border-gray-200 h-auto mx-4"></div>

            {/* Right Column */}
            <div className="w-1/2 pl-8 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-800">Hotline:</h3>
                <p className="text-gray-700 text-xl font-semibold">16594</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-800">Cell/WhatsApp:</h3>
                <p className="text-gray-700 text-xl font-semibold">+88017 51 51 12 12</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {!isDesktop && (
        <div
          ref={menuRef}
          className={`fixed top-16 left-0 w-full bg-white z-40 shadow-lg transform transition-transform duration-500 ease-in-out ${
            isOpen
              ? "translate-y-0 opacity-100 pointer-events-auto"
              : "-translate-y-10 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-4 py-4 space-y-4">
            <Link href="/" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">HOME</Link>

            {/* About */}
            <div className="relative">
              <button onClick={() => toggleSubmenu("about")} className="flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-[#7AA859]">
                ABOUT US{" "}
                {openSubmenu === "about" ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openSubmenu === "about" && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link href="/story" className="block text-lg text-gray-700 hover:text-[#7AA859]">Our Story</Link>
                  <Link href="/bod" className="block text-lg text-gray-700 hover:text-[#7AA859]">Board of Directors</Link>
                  <Link href="/mission-vision" className="block text-lg text-gray-700 hover:text-[#7AA859]">Mission and Vision</Link>
                  <Link href="/clients" className="block text-lg text-gray-700 hover:text-[#7AA859]">Our Clients</Link>
                </div>
              )}
            </div>

            {/* Projects */}
            <div className="relative">
              <button onClick={() => toggleSubmenu("projects")} className="flex items-center gap-1 text-lg font-medium text-gray-800 hover:text-[#7AA859]">
                PROJECTS{" "}
                {openSubmenu === "projects" ? (
                  <FaChevronUp className="text-sm" />
                ) : (
                  <FaChevronDown className="text-sm" />
                )}
              </button>
              {openSubmenu === "projects" && (
                <div className="mt-2 ml-4 space-y-2">
                  <Link href="/project-status/ongoing" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-[#7AA859]">Onegoing Project</Link>
                  <Link href="/project-status/completed" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-[#7AA859]">Completed Project</Link>
                  <Link href="/project-status/upcoming" onClick={() => setIsOpen(false)} className="block text-lg text-gray-700 hover:text-[#7AA859]">Upcoming Projects</Link>
                </div>
              )}
            </div>

            <Link href="/news" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">NEWS & AWARDS</Link>
            <Link href="/career" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">CAREER</Link>
            <Link href="/contact" onClick={() => setIsOpen(false)} className="block text-lg font-medium text-gray-800 hover:text-[#7AA859]">CONTACT</Link>

            <div className="pt-4 border-t border-gray-200 mt-4">
              <h3 className="text-lg font-medium text-gray-800">Hotline:</h3>
              <p className="text-gray-700 text-xl font-semibold">16594</p>

              <h3 className="text-lg font-medium text-gray-800 mt-3">International Callers:</h3>
              <p className="text-gray-700 text-xl font-semibold">+880 9612-111444</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
