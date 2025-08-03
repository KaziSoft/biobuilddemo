'use client';
import React, { useEffect, useState } from 'react';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
interface Location {
  _id: string;
  name: string;
  image: string;
  description: string;
}

const LIMIT = 3;

export default function PrimeLocationsPage() {
  const [locations, setLocations] = useState<Location[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchLocations = async () => {
      const res = await fetch(`/api/prime-locations?page=${page}&limit=${LIMIT}`, {
        cache: 'no-store',
      });
      const data = await res.json();
      setLocations(data.locations);
      setTotal(data.total);
    };

    fetchLocations();
  }, [page]);

  const totalPages = Math.ceil(total / LIMIT);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 py-5">
      {/* Hero Section */}
      <section className="px-4 text-center bg-white dark:bg-gray-800">
        <h2 className='text-3xl font-poppins text-center mt-10 py-10'>
          Biobuild Prime Locations
        </h2>
      </section>

      {/* Locations Grid */}
      <section className="px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {locations.map((location) => (
              <div
                key={location._id}
                className="group relative bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden shadow hover:shadow-lg transition-all duration-300"
              >
                {/* Location Image */}
                <div className="h-48 overflow-hidden">
                  <img
                    src={location.image}
                    alt={location.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>

                {/* Location Info */}
                <div className="p-6">
                  <h3 className="text-xl text-gray-900 dark:text-white font-semibold mb-2">{location.name}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">{location.description.length > 100
                    ? `${location.description.slice(0, 100)}...`
                    : location.description}</p>

                  {/* Hover Border Animation */}
                  <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7AA859] to-[#5d8a3f] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-[#7AA859] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></div>
                    <div className="absolute top-0 right-0 w-0.5 h-full bg-[#7AA859] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500 delay-100"></div>
                    <div className="absolute bottom-0 right-0 w-full h-0.5 bg-[#7AA859] scale-x-0 group-hover:scale-x-100 origin-right transition-transform duration-500 delay-200"></div>
                    <div className="absolute bottom-0 left-0 w-0.5 h-full bg-[#7AA859] scale-y-0 group-hover:scale-y-100 origin-bottom transition-transform duration-500 delay-300"></div>
                  </div>

                  {/* Explore Button */}
                  <div className="absolute bottom-0 left-0 right-0 bg-[#7AA859] text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-full group-hover:translate-y-0">
                    <button className="w-full text-center font-medium">
                      Explore Opportunities
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
                  <div className="flex justify-center mt-12 gap-2">
                    <button
                      onClick={() => setPage((p) => Math.max(p - 1, 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                      <IoMdArrowBack />
                    </button>
                    
                    {Array.from({ length: totalPages }, (_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => setPage(i + 1)}
                        className={`px-4 py-2 rounded-lg ${page === i + 1 ? 'bg-[#7AA859] text-white' : 'bg-gray-200 dark:bg-gray-700'}`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                      disabled={page === totalPages}
                      className="px-4 py-2 rounded-lg bg-gray-200 dark:bg-gray-700 disabled:opacity-50"
                    >
                      <IoMdArrowForward />
                    </button>
                  </div>
                )}
        </div>
      </section>

      {/* CTA */}
      {/* <section className="px-4 py-16 bg-[#7AA859] text-white text-center">
        <h2 className="text-2xl md:text-3xl font-semibold mb-4">Invest in Prime Real Estate</h2>
        <p className="max-w-2xl mx-auto mb-6 text-gray-50">
          Partner with BIOBUILD to secure your investment in Bangladesh's most promising locations.
        </p>
        <button className="px-6 py-3 bg-white text-[#7AA859] hover:bg-gray-100 rounded-lg font-medium transition-colors duration-300 shadow-md">
          Contact Our Investment Team
        </button>
      </section> */}
    </div>
  );
}
