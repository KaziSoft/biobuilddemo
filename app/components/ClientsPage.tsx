'use client';

import React, { useEffect, useState } from 'react';
import { FaHandshake } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

interface Client {
  _id: string;
  name: string;
  image: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      const res = await fetch('/api/clients');
      const data = await res.json();
      setClients(data.locations || []);
    };

    fetchClients();
  }, []);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Office workspace background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
        </div>

        <div className="relative z-10 pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-40 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-poppins tracking-tight text-white sm:text-5xl lg:text-6xl">
              Our Valued Clients
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              We're proud to collaborate with industry leaders and valued partners who trust our vision.
            </p>
            <div className="mt-10 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <a
                  href="#clients-grid"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-[#7AA859] bg-white hover:bg-blue-50 transition-colors"
                >
                  <FaHandshake className="-ml-1 mr-2 h-5 w-5" />
                  View Our Partners
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <section id="clients-grid" className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-poppins text-gray-900 dark:text-gray-100 sm:text-3xl">
              Trusted by Industry Leaders
            </h2>
            <p className="mt-3 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-300 sm:mt-4">
              We work with some of the most innovative companies in the industry.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {clients.map((client) => (
              <div
                key={client._id}
                className="group relative bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center shadow hover:shadow-lg transition-all duration-300 h-40 flex items-center justify-center"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="max-h-16 max-w-[120px] md:max-h-32 md:max-w-[240px] object-contain opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />

                {/* Hover border animation */}
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#7AA859] to-[#5d8a3f] opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                  <div className="absolute top-0 left-0 w-full h-0.5 bg-[#7AA859] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                  <div className="absolute top-0 right-0 w-0.5 h-full bg-[#7AA859] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 delay-100"></div>
                  <div className="absolute bottom-0 right-0 w-full h-0.5 bg-[#7AA859] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 delay-200"></div>
                  <div className="absolute bottom-0 left-0 w-0.5 h-full bg-[#7AA859] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 delay-300"></div>
                </div>

                {/* Client name on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-[#7AA859] text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-xl">
                  <span className="text-sm font-medium">{client.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="px-4 py-16 bg-[#7AA859] text-white text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Become Our Partner</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-50">
          Interested in working with us? Let's build something great together.
        </p>
        <button className="px-6 py-3 bg-white text-[#7AA859] hover:bg-gray-100 rounded-lg font-medium transition-colors duration-300 shadow-md">
          Contact Our Partnership Team
        </button>
      </section>
    </div>
  );
}