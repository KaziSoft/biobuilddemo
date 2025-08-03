import React from 'react';
import { FaBullseye, FaEye, FaHandshake, FaChartLine, FaUsers, FaBuilding, FaLightbulb } from 'react-icons/fa';
import { GiEarthAmerica } from 'react-icons/gi';

export default function MissionVisionPage() {
  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section */}
      <section className="relative px-4 py-32 text-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Modern city skyline"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl font-poppins tracking-tight text-white sm:text-5xl lg:text-6xl mb-6">
            Our Purpose & Aspiration
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-100">
            Guiding principles that shape our work and define our future in real estate development
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-[#7AA859] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FaBullseye className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-poppins dark:text-gray-50 mb-6">
                Our Mission
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                To create exceptional living and working spaces that enrich communities while delivering sustainable value to all stakeholders.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaHandshake className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Integrity in Action</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We build trust through transparency, ethical practices, and accountability in every project.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaChartLine className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Sustainable Growth</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our developments balance economic success with environmental responsibility and social impact.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaUsers className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Community Focus</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We design spaces that foster connection, wellbeing, and opportunity for all residents.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                className="w-full rounded-xl shadow-2xl"
                src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Team discussing building plans"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 order-2 lg:order-1">
              <img
                className="w-full rounded-xl shadow-2xl"
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Futuristic cityscape"
              />
            </div>
            <div className="lg:w-1/2 order-1 lg:order-2">
              <div className="bg-[#7AA859] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <FaEye className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-poppins dark:text-gray-50 mb-6">
                Our Vision
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-6">
                To redefine urban living through innovative design, technology, and community-centric development that sets new standards for the industry.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <GiEarthAmerica className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Global Impact</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Expand our sustainable development model to cities worldwide by 2035.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaBuilding className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Innovation Leadership</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Pioneer smart building technologies that reduce environmental impact by 40%.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaUsers className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Community Transformation</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Create developments that improve quality of life metrics in every neighborhood we touch.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-4 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-poppins dark:text-gray-50 mb-4">
              Our Core Values
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              The principles that guide every decision we make
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#7AA859] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FaHandshake className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Integrity</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                We do what's right, not what's easy. Our word is our bond in all business dealings.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#7AA859] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <GiEarthAmerica className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Sustainability</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                We build for tomorrow, minimizing environmental impact while maximizing community benefit.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#7AA859] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FaUsers className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Collaboration</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                We believe the best solutions come from diverse teams working together toward common goals.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#7AA859] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FaLightbulb className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Innovation</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                We challenge conventional thinking to develop breakthrough solutions in real estate.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#7AA859] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FaChartLine className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Excellence</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                We pursue the highest standards in design, construction, and customer experience.
              </p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-[#7AA859] text-white p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <FaBuilding className="h-5 w-5" />
              </div>
              <h3 className="text-xl font-semibold dark:text-gray-50 mb-3">Legacy</h3>
              <p className='text-gray-600 dark:text-gray-300'>
                We create enduring value through timeless designs that serve generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-20 bg-gradient-to-r from-[#7AA859] to-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-poppins mb-6">Ready to Build the Future With Us?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-xl text-gray-100">
            Discover how our mission and vision come to life in every project we undertake.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#7AA859] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              Our Projects
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#7AA859] transition shadow-lg">
              Contact Our Team
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}