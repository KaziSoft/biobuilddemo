'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  _id: string;
  title: string;
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  image: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

const ContentLoader = () => {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 backdrop-blur-sm rounded-xl">
      <div className="flex flex-col items-center">
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-blue-500 border-b-transparent border-l-transparent animate-spin"></div>
          <div className="absolute inset-1 rounded-full border-4 border-t-blue-600 border-r-blue-600 border-b-transparent border-l-transparent animate-spin animation-delay-200"></div>
        </div>
        <p className="mt-3 text-gray-600 text-sm font-medium">Loading projects...</p>
      </div>
    </div>
  );
};

export default function ProjectStatusViewPage() {
  const { status } = useParams<{ status: string }>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/project-status?status=${status}`);
        if (!res.ok) throw new Error('Failed to fetch projects');
        const data = await res.json();
        setProjects(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    };

    if (status) fetchProjects();
  }, [status]);

  const formattedTitle = status?.charAt(0).toUpperCase() + status?.slice(1);

  // Hero Section with Background Image
  const getHeroDescription = () => {
    switch (status) {
      case 'ongoing':
        return 'Explore our current projects that are actively in development and shaping the future';
      case 'completed':
        return 'Browse through our successfully delivered projects and see our work in action';
      case 'upcoming':
        return 'Discover our planned future projects and what we\'re building next';
      default:
        return 'Explore our portfolio of projects across all statuses';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ongoing':
        return 'bg-amber-500/10 text-amber-700 border-amber-500/20';
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-700 border-emerald-500/20';
      case 'upcoming':
        return 'bg-blue-500/10 text-blue-700 border-blue-500/20';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ongoing':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      case 'completed':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'upcoming':
        return (
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Background Image */}
      <div className="relative bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Construction site background"
            fill
            className="object-cover opacity-40"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" aria-hidden="true" />
        </div>

        <div className="relative z-10 pb-12 pt-24 sm:pt-32 lg:pb-16 lg:pt-40 px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-poppins tracking-tight text-white sm:text-5xl lg:text-6xl">
              {formattedTitle} Projects
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-2xl mx-auto">
              {getHeroDescription()}
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                href="/project-status/ongoing"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  status === 'ongoing' 
                    ? 'bg-white text-[#7AA859]' 
                    : 'text-white border-white hover:bg-white/10'
                }`}
              >
                Ongoing
              </Link>
              <Link
                href="/project-status/completed"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  status === 'completed' 
                    ? 'bg-white text-[#7AA859]' 
                    : 'text-white border-white hover:bg-white/10'
                }`}
              >
                Completed
              </Link>
              <Link
                href="/project-status/upcoming"
                className={`inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md ${
                  status === 'upcoming' 
                    ? 'bg-white text-[#7AA859]' 
                    : 'text-white border-white hover:bg-white/10'
                }`}
              >
                Upcoming
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back to Home Link - Added here */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-[#7AA859] hover:text-[#7AA819] transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
            Back to Home
          </Link>
        </div>

        <div className="relative min-h-[400px]">
          {loading && <ContentLoader />}

          {!loading && projects.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 text-center max-w-2xl mx-auto">
              <div className="mx-auto h-24 w-24 text-gray-400 mb-6">
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">
                No projects found
              </h3>
              <p className="text-gray-600 mb-6">
                There are currently no {status} projects in our portfolio.
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-2.5 bg-[#7AA859] text-white font-medium rounded-lg hover:bg-[#7AA819] transition-colors"
              >
                Back to Home
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                >
                  <div className="relative h-96 w-full group">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      priority={false}
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="mr-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          {project.title}
                        </h3>
                        <p className="text-gray-600 flex items-center">
                          <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                          </svg>
                          {project.location}
                        </p>
                      </div>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium capitalize border ${getStatusColor(
                          project.status
                        )}`}
                      >
                        {getStatusIcon(project.status)}
                        {project.status}
                      </span>
                    </div>

                    {(project.startDate || project.endDate) && (
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        {project.startDate && (
                          <span className="flex items-center mr-4">
                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {project.startDate}
                          </span>
                        )}
                        {project.endDate && project.status === 'completed' && (
                          <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1.5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                            </svg>
                            {project.endDate}
                          </span>
                        )}
                      </div>
                    )}
                    <Link href={`/projects/${project._id}`}>
                      <button className="w-full mt-2 px-4 py-2.5 bg-gray-50 hover:bg-gray-100 text-gray-800 font-medium rounded-lg transition-colors border border-gray-200 flex items-center justify-center">
                        View Details
                        <svg className="w-4 h-4 ml-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}