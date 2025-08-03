'use client';

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaSpinner, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface Project {
  _id: string;
  title: string;
  image: string;
  hoverTitle: string;
  hoverText: string;
  status: 'ongoing' | 'completed' | 'upcoming';
}

const ViewProjectsPage: React.FC = () => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [duplicatedProjects, setDuplicatedProjects] = useState<Project[]>([]);
  const [showArrows, setShowArrows] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('/api/projects');
        const data = await res.json();
        setProjects(data);
        setDuplicatedProjects([...data, ...data]);
        setShowArrows(data.length > 0);
      } catch (err) {
        console.error('Failed to fetch projects:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider || projects.length === 0) return;

    let animationFrameId: number;
    let speed = 1;
    let position = 0;
    const itemWidth = 288; // 72rem = 288px
    const totalWidth = itemWidth * projects.length;

    const animate = () => {
      if (!isPaused.current) {
        position -= speed;
        
        if (position <= -totalWidth) {
          position = 0;
          slider.style.transition = 'none';
          slider.style.transform = `translateX(${position}px)`;
          slider.offsetHeight; // Force reflow
          slider.style.transition = '';
        }
        
        slider.style.transform = `translateX(${position}px)`;
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    const handleMouseEnter = () => { isPaused.current = true };
    const handleMouseLeave = () => { isPaused.current = false };

    slider.addEventListener('mouseenter', handleMouseEnter);
    slider.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationFrameId);
      slider.removeEventListener('mouseenter', handleMouseEnter);
      slider.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [projects]);

  const handleNext = () => {
    if (!sliderRef.current || !containerRef.current || projects.length === 0) return;
    
    const slider = sliderRef.current;
    const container = containerRef.current;
    const itemWidth = 288;
    const scrollAmount = container.clientWidth;
    const currentTransform = getComputedStyle(slider).transform;
    const matrix = new DOMMatrix(currentTransform);
    let currentPosition = matrix.m41;
    
    // Calculate new position (scroll by container width)
    const newPosition = currentPosition - scrollAmount;
    
    // If we've scrolled past the original set of projects, reset to start
    if (Math.abs(newPosition) >= itemWidth * projects.length) {
      slider.style.transition = 'none';
      slider.style.transform = 'translateX(0px)';
      slider.offsetHeight; // Force reflow
      slider.style.transition = 'transform 0.5s ease';
      slider.style.transform = `translateX(${-scrollAmount}px)`;
    } else {
      slider.style.transition = 'transform 0.5s ease';
      slider.style.transform = `translateX(${newPosition}px)`;
    }
  };

  const handlePrev = () => {
    if (!sliderRef.current || !containerRef.current || projects.length === 0) return;
    
    const slider = sliderRef.current;
    const container = containerRef.current;
    const itemWidth = 288;
    const scrollAmount = container.clientWidth;
    const currentTransform = getComputedStyle(slider).transform;
    const matrix = new DOMMatrix(currentTransform);
    let currentPosition = matrix.m41;
    
    // Calculate new position (scroll back by container width)
    const newPosition = currentPosition + scrollAmount;
    
    // If we're going back to the start, jump to the end of the original set
    if (newPosition >= 0) {
      slider.style.transition = 'none';
      slider.style.transform = `translateX(${-(itemWidth * projects.length - scrollAmount)}px)`;
      slider.offsetHeight; // Force reflow
      slider.style.transition = 'transform 0.5s ease';
      slider.style.transform = `translateX(${-(itemWidth * projects.length)}px)`;
    } else {
      slider.style.transition = 'transform 0.5s ease';
      slider.style.transform = `translateX(${newPosition}px)`;
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <FaSpinner className="animate-spin text-4xl text-[#7AA859]" />
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-gray-600 text-lg">No projects found.</p>
      </div>
    );
  }

  return (
    <section className="container mx-auto px-3 flex flex-col max-w-7xl gap-10 w-full justify-center mt-20 overflow-hidden">
      <h1 className="text-3xl text-center font-poppins text-gray-700">Turning Ordinary Into Extraordinary!</h1>

      <div className="relative w-full overflow-hidden" ref={containerRef}>
        {showArrows && (
          <>
            <button 
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Previous projects"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button 
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
              aria-label="Next projects"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </>
        )}
        <div
          ref={sliderRef}
          className="flex gap-10 w-max py-5"
          style={{ willChange: 'transform' }}
        >
          {duplicatedProjects.map((project, index) => (
            <div key={`${project._id}-${index}`} className="relative group w-72 flex-shrink-0">
              <div
                className={`absolute top-2 right-2 z-10 text-xs font-semibold px-3 py-1 rounded-full shadow capitalize ${
                  project.status === 'completed'
                    ? 'bg-green-100 text-green-800'
                    : project.status === 'ongoing'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-blue-100 text-blue-800'
                }`}
              >
                {project.status}
              </div>

              <span className="flex flex-col justify-center items-center">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={320}
                  height={240}
                  className="w-full h-full object-cover rounded-xl"
                />
                <h1 className="-mt-10 text-xl font-poppins font-semibold bg-black text-white w-full py-2 text-center rounded-b-xl">
                  {project.title}
                </h1>
              </span>

              <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center opacity-0 rounded-xl group-hover:opacity-70 transition-opacity duration-300 p-5 text-center font-sans">
                <h2 className="text-xl font-bold text-gray-100">{project.hoverTitle}</h2>
                <p className="text-gray-50 text-lg mt-2 mb-6">
                  {project.hoverText.length > 100
                    ? `${project.hoverText.slice(0, 100)}...`
                    : project.hoverText}
                </p>
                <Link
                  href={`/projects/${project._id}`}
                  className="bg-white text-black px-6 py-2 rounded-md font-medium hover:bg-gray-200 transition-colors duration-300"
                >
                  View Project
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ViewProjectsPage;