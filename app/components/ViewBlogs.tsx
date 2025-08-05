'use client';

import React, { useEffect, useState } from 'react';
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  author: string;
  categories: string[];
  imageUrl: string;
}

const ViewBlogs: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const blogsPerPage = 3;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blog-posts');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // Pagination logic
  const startIndex = (page - 1) * blogsPerPage;
  const paginatedBlogs = blogs.slice(startIndex, startIndex + blogsPerPage);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  return (
    <div className="max-w-screen-xl mx-auto px-5 sm:px-10 md:px-16 py-10">
      {/* Added Page Title Section */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-poppins text-center text-gray-900 mb-4">
          Biobuild Lifestyle
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover the latest trends, insights, and stories about sustainable living
        </p>
      </div>

      <div className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {paginatedBlogs.map((blog) => (
          <div key={blog._id} className="rounded overflow-hidden flex flex-col bg-white shadow-md">
            <Link href={`/blogs/${blog._id}`}>
              <img
                className="w-80 h-auto object-cover"
                src={blog.imageUrl}
                alt={blog.title}
              />
            </Link>
            <div className="relative -mt-10 mx-6 px-6 pt-5 pb-10 bg-white shadow-lg z-10">
              <Link
                href={`/blogs/${blog._id}`}
                className="font-semibold text-lg inline-block hover:text-[#7AA859] transition duration-500 ease-in-out mb-2"
              >
                {blog.title}
              </Link>
              <p className="text-gray-500 text-sm">
                {blog.description.length > 100
                  ? `${blog.description.slice(0, 100)}...`
                  : blog.description}
              </p>
              <p className="mt-5 text-gray-600 text-xs">
                By{' '}
                <Link
                  href="#"
                  className="text-xs text-[#7AA859] transition duration-500 ease-in-out"
                >
                  {blog.author}
                </Link>{' '}
                | in{' '}
                {blog.categories.map((cat, index) => (
                  <React.Fragment key={index}>
                    <Link
                      href="#"
                      className="text-xs text-[#7AA859] transition duration-500 ease-in-out"
                    >
                      {cat}
                    </Link>
                    {index < blog.categories.length - 1 && ', '}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Updated Pagination Controls */}
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
  );
};

export default ViewBlogs;