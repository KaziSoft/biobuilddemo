import React from 'react';
import { FaHandshake, FaChartLine, FaLightbulb } from 'react-icons/fa';
import { HiOutlineOfficeBuilding, HiOutlineBriefcase } from 'react-icons/hi';

export default function CareerPage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section with Background Image */}
      <section className="relative px-4 py-32 text-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern office building"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl font-poppins tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Build Your Career With Us
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-100">
            Join a leading real estate development company creating exceptional properties and communities.
          </p>
          <div className="mt-10 flex justify-center">
            <a
              href="#positions"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#7AA859] bg-white hover:bg-gray-100 transition-colors"
            >
              <HiOutlineBriefcase className="-ml-1 mr-2 h-5 w-5" />
              View Open Positions
            </a>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="px-4 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins dark:text-gray-50 mb-4">
              Why Join Our Team?
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              We offer more than just jobs - we build careers and shape communities
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#7AA859] text-white mb-4">
                <FaLightbulb className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Innovative Projects</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Work on cutting-edge developments that transform skylines and communities with sustainable, forward-thinking designs.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#7AA859] text-white mb-4">
                <FaChartLine className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Career Growth</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Structured mentorship programs and continuing education opportunities to help you reach your professional goals.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-[#7AA859] text-white mb-4">
                <FaHandshake className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Collaborative Culture</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                Join a team of passionate professionals who value teamwork, creativity, and excellence in every project.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section id="positions" className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins dark:text-gray-50 mb-4">
              Current Opportunities
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Explore our available positions and find where you fit in our growing team
            </p>
          </div>
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold dark:text-gray-50 mb-1">Real Estate Sales Agent</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                    <HiOutlineOfficeBuilding className="mr-2 h-4 w-4" />
                    <span>San Francisco, CA</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Represent our premium properties to discerning clients. Must have active license and proven sales record.
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-[#7AA859] text-white px-6 py-2 rounded-full hover:bg-[#7aa859e3] transition-all font-medium">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold dark:text-gray-50 mb-1">Project Manager</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                    <HiOutlineOfficeBuilding className="mr-2 h-4 w-4" />
                    <span>New York, NY</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Oversee projects from conception to completion. 5+ years experience in real estate development required.
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-[#7AA859] text-white px-6 py-2 rounded-full hover:bg-[#7aa859e3] transition-all font-medium">
                  Apply Now
                </button>
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-semibold dark:text-gray-50 mb-1">Architectural Designer</h3>
                  <div className="flex items-center text-gray-500 dark:text-gray-400 mb-3">
                    <HiOutlineOfficeBuilding className="mr-2 h-4 w-4" />
                    <span>Chicago, IL</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300">
                    Create innovative designs for residential and commercial properties. Portfolio and 3+ years experience required.
                  </p>
                </div>
                <button className="mt-4 md:mt-0 bg-[#7AA859] text-white px-6 py-2 rounded-full hover:bg-[#7aa859e3] transition-all font-medium">
                  Apply Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 bg-gradient-to-r from-[#7AA859] to-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-poppins mb-6">Ready to Build Something Great?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-100">
            We're looking for talented professionals to help shape the future of real estate development.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#7AA859] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              View All Positions
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#7AA859] transition shadow-lg">
              Contact Recruiting
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}