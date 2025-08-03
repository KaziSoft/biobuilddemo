'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';

const images = [
  '/img/slider/slide-01.jpg',
  '/img/slider/slide-02.jpg',
  '/img/slider/slide-03.jpg',
];

const iconLinks = [
  { href: '/project-status/ongoing', src: '/img/icons/category1.svg', alt: 'Category 1', label: 'Ongoing' },
  { href: '/project-status/completed', src: '/img/icons/category2.svg', alt: 'Category 2', label: 'Completed' },
  { href: '/project-status/upcoming', src: '/img/icons/category3.svg', alt: 'Category 3', label: 'Upcoming' },
];

type NavigationDirection = 'prev' | 'next';

export default function Slider() {
  const [current, setCurrent] = useState<number>(0);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const length = images.length;

  useEffect(() => {
    const startTransition = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % length);
        setIsTransitioning(false);
      }, 10000);
    };

    const timer = setInterval(startTransition, 10000);
    return () => clearInterval(timer);
  }, [length]);

  const handleNavigation = (direction: NavigationDirection) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrent((prev) => direction === 'next' 
        ? (prev + 1) % length 
        : (prev - 1 + length) % length
      );
      setIsTransitioning(false);
    }, 10000);
  };

  return (
    <div className="w-full mt-16 relative">
      {/* Main Image Slider */}
      <div className="relative w-full h-[90vh] overflow-hidden shadow-md">
        {/* Slides with zoom effect */}
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[5000ms] ease-in-out ${
              index === current 
                ? 'opacity-100 z-10 scale-100' 
                : 'opacity-0 z-0 scale-150'
            }`}
          >
            <Image
              src={src}
              alt={`Slide ${index + 1}`}
              fill
              className="object-cover"
              priority={index === 0}
            />
          </div>
        ))}

        {/* Arrows */}
        <button
          onClick={() => handleNavigation('prev')}
          className={`absolute top-1/2 left-4 transform -translate-y-1/2 text-white text-3xl z-40 hover:scale-110 transition-transform ${
            isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isTransitioning}
        >
          <FaCircleArrowLeft />
        </button>
        <button
          onClick={() => handleNavigation('next')}
          className={`absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-3xl z-40 hover:scale-110 transition-transform ${
            isTransitioning ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isTransitioning}
        >
          <FaCircleArrowRight />
        </button>

        {/* Thumbnails */}
        <div className="absolute bottom-44 right-4 z-50 flex gap-3 bg-black/40 px-4 py-2 rounded-md">
          {images.map((src, index) => (
            <div
              key={index}
              onClick={() => setCurrent(index)}
              className={`cursor-pointer rounded-md border-5 transition duration-300 ${
                current === index ? 'border-[#7AA859]' : 'border-transparent'
              }`}
            >
              <Image
                src={src}
                alt={`Thumbnail ${index + 1}`}
                width={100}
                height={60}
                className="object-cover rounded-md"
              />
            </div>
          ))}
        </div>

        {/* Icons Bar */}
        <div className="absolute bottom-0 w-full h-40 z-50">
          {/* Desktop version */}
          <div className="hidden md:flex absolute inset-0 bg-black/40 backdrop-blur-md items-center px-10 z-50">
            <div className="text-white text-2xl font-semibold w-1/3">
              Explore Our Projects
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 flex gap-10">
              {iconLinks.map((icon, idx) => (
                <Link
                  key={idx}
                  href={icon.href}
                  className="flex flex-col items-center text-white group relative z-50"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={60}
                    height={60}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-1 text-sm">{icon.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile version */}
          <div className="flex md:hidden flex-col items-center justify-center absolute inset-0 bg-black/40 backdrop-blur-md px-4 py-3 gap-3 z-50">
            <div className="text-white text-lg font-semibold text-center">
              Explore Our Categories
            </div>
            <div className="flex gap-8">
              {iconLinks.map((icon, idx) => (
                <Link
                  key={idx}
                  href={icon.href}
                  className="flex flex-col items-center text-white group"
                >
                  <Image
                    src={icon.src}
                    alt={icon.alt}
                    width={35}
                    height={35}
                    className="transition-transform duration-300 group-hover:scale-110"
                  />
                  <span className="mt-1 text-xs">{icon.label}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}