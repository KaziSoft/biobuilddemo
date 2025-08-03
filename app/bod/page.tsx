import Link from 'next/link';
import React from 'react';
import { RiArtboard2Fill } from 'react-icons/ri';
import { FaUserTie, FaChartLine, FaHandshake } from 'react-icons/fa';

interface Director {
  name: string;
  title: string;
  image: string;
  bio: string;
  link: string;
  linkedin?: string;
  twitter?: string;
}

export default function BoardOfDirectorsPage() {
  const directors: Director[] = [
    {
      name: "Architect Md. Mamunur Rahman (Munim)",
      title: "MANAGING DIRECTOR",
      image: "/img/bod/bod-01.png",
      bio: "Our managing director Architect Md Mamunur Rahman (Munim) plays a pivotal role as an organizer at BIOBUILD Development Ltd, bringing visionary leadership to our projects.",
      link: "/managing-director",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "M. M. Rahman Mamun",
      title: "DEPUTY MANAGING DIRECTOR",
      image: "/img/bod/mamun.png",
      bio: "Since 2012, M. M. RAHMAN MAMUN has been actively engaged in the Real Estate Industry, bringing extensive expertise, deep sincerity, and unwavering dedication.",
      link: "/deputy-md",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Md. Sujal Ahmed Talukder",
      title: "DIRECTOR & CEO",
      image: "/img/bod/bod-03.png",
      bio: "Our journey begins with a shared vision—to create innovative, eco-friendly spaces that redefine urban living while contributing to a sustainable future.",
      link: "#",
      linkedin: "#",
      twitter: "#"
    },
    {
      name: "Architect Mir Ashiqur Rahman",
      title: "DIRECTOR",
      image: "/img/bod/bod-04.png",
      bio: "With a keen eye for detail, Architect Mir Ashiqur Rahman has a passion for innovative and sustainable solutions that meet the needs of people and environment.",
      link: "#",
      linkedin: "#",
      twitter: "#"
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section with Background Image */}
      <section className="relative px-4 py-32 text-center bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-30"
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Corporate boardroom"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
            Board of Directors
          </h1>
          <p className="max-w-2xl mx-auto text-xl text-gray-100">
            Meet the visionary leaders guiding our company's strategic direction and operational excellence.
          </p>
        </div>
      </section>

      {/* Directors Grid - Stylish Card Design */}
      <section className="px-4 py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold dark:text-gray-50 mb-4">
              Our Leadership Team
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-gray-600 dark:text-gray-300">
              Experienced professionals committed to innovation and sustainable development
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {directors.map((director, index) => (
              <div
                key={index}
                className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group"
              >
                {/* Image with gradient overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={director.image}
                    alt={director.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{director.name}</h3>
                    <p className="text-[#7AA859] text-sm font-medium">{director.title}</p>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3">
                    {director.bio}
                  </p>

                  <div className="flex justify-between items-center">
                    <Link href={director.link}>
                      <button className="px-4 py-2 bg-[#7AA859] hover:bg-[#6a974f] text-white rounded-lg transition-all duration-300 text-sm font-medium flex items-center gap-2">
                        View Profile
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </Link>
                    
                    <div className="flex space-x-3">
                      {director.linkedin && (
                        <a href={director.linkedin} className="text-gray-500 hover:text-[#0077b5] transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                          </svg>
                        </a>
                      )}
                      {director.twitter && (
                        <a href={director.twitter} className="text-gray-500 hover:text-[#1DA1F2] transition-colors">
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#7AA859] transform rotate-45 origin-bottom-left translate-x-8 -translate-y-8"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Philosophy */}
      <section className="px-4 py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-[#7AA859] text-white p-4 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                <RiArtboard2Fill className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-bold dark:text-gray-50 mb-6">
                Our Leadership Approach
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                We believe in leadership that combines strategic vision with operational excellence, always putting our clients and communities first.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaChartLine className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Strategic Vision</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Our board sets long-term goals that balance innovation with financial sustainability.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-1 text-[#7AA859]">
                    <FaHandshake className="h-5 w-5" />
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium dark:text-gray-50">Ethical Governance</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      We maintain the highest standards of corporate governance and transparency.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2">
              <img
                className="w-full rounded-xl shadow-2xl"
                src="https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                alt="Leadership team meeting"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gradient-to-r from-[#7AA859] to-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Want to Learn More About Our Leadership?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-100">
            Discover how our board's expertise drives innovation and excellence in every project.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-[#7AA859] font-semibold px-8 py-3 rounded-full hover:bg-gray-100 transition shadow-lg">
              Our Governance
            </button>
            <button className="bg-transparent border-2 border-white text-white font-semibold px-8 py-3 rounded-full hover:bg-white hover:text-[#7AA859] transition shadow-lg">
              Contact the Board
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}