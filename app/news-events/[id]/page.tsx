// app/news-events/[id]/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { FaCalendarAlt, FaNewspaper, FaMapMarkerAlt, FaArrowLeft } from 'react-icons/fa';
import Link from 'next/link';

interface NewsEvent {
  _id: string;
  title: string;
  date: string;
  summary: string;
  image: string;
  type: 'news' | 'event';
  location?: string;
  content?: string;
}

export default function NewsEventDetailPage() {
  const { id } = useParams();
  const [item, setItem] = useState<NewsEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news-events/${id}`);
        if (!res.ok) {
          throw new Error('Failed to fetch item');
        }
        const data = await res.json();
        setItem(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error('Error fetching item:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7AA859]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-red-500 text-lg">{error}</div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900 flex items-center justify-center">
        <div className="text-gray-600 dark:text-gray-300 text-lg">
          Item not found
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Hero Section with Fixed Height */}
      <div className="relative bg-gray-900 h-64 md:h-80 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            className="w-full h-full object-cover opacity-40"
            src="https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80"
            alt="News and events background"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-green-700 mix-blend-multiply" />
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center mb-4">
              {item.type === 'news' ? (
                <>
                  <FaNewspaper className="text-5xl mr-2 text-white" />
                  <span className="text-white font-poppins tracking-wider text-5xl font-medium">
                    News
                  </span>
                </>
              ) : (
                <>
                  <FaCalendarAlt className="text-5xl mr-2 text-white" />
                  <span className="text-white font-poppins tracking-wider text-5xl font-medium">
                    Event
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back Button and Title Section */}
        <div className="mb-8">
          <Link
            href="/news-events"
            className="inline-flex items-center text-[#7AA859] hover:text-[#5d8a3f] mb-6 transition-colors"
          >
            <FaArrowLeft className="mr-2" />
            Back to News & Events
          </Link>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
            {item.title}
          </h1>
          
          <div className="mt-3 flex flex-col sm:flex-row sm:items-center text-gray-600 dark:text-gray-400 gap-2 sm:gap-4">
            <span className="flex items-center">
              <FaCalendarAlt className="mr-2 text-[#7AA859]" />
              {new Date(item.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
            {item.location && (
              <span className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-[#7AA859]" />
                {item.location}
              </span>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-lg dark:prose-invert max-w-none">
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-auto object-cover"
            />
          </div>
          <p className="text-xl font-light text-gray-600 dark:text-gray-300 mb-8">
            {item.summary}
          </p>
          {item.content ? (
            <div 
              className="text-gray-700 dark:text-gray-300 space-y-4"
              dangerouslySetInnerHTML={{ __html: item.content }} 
            />
          ) : (
            <p className="text-gray-600 dark:text-gray-300">
              More details coming soon...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}