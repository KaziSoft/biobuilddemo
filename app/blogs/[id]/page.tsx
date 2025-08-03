'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  author: string;
  categories: string[];
  imageUrl: string;
  createdAt?: string;
}

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blog-posts/${id}`);
        const data = await res.json();
        setBlog(data);
      } catch (error) {
        console.error('Error fetching blog post:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#7AA859]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Blog post not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            The requested blog post could not be loaded.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#7AA859] hover:bg-[#7AA819] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7AA859]"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const formattedDate = blog.createdAt
    ? new Date(blog.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '';

  return (
    <>
      <Head>
        <title>{blog.title} | Blog</title>
        <meta name="description" content={blog.description.substring(0, 160)} />
      </Head>

      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen">
        {/* Hero Section */}
        <section className="relative px-4 py-24 md:py-32 text-center bg-gray-900 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <img
              className="w-full h-full object-cover opacity-30"
              src={blog.imageUrl}
              alt={blog.title}
              loading="eager"
            />
            <div
              className="absolute inset-0 bg-gradient-to-r from-[#7AA859] to-[#7AA819]/80 mix-blend-multiply"
              aria-hidden="true"
            />
          </div>

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-poppins tracking-tight text-white mb-6 leading-tight">
              Biobuild Blogs
            </h1>
          </div>  
        </section>

        {/* Blog Content Section */}
        <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
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

          <div className="flex flex-col lg:flex-row gap-12">
            {/* Left Column - Image */}
            <div className="lg:w-1/2">
              <div className="sticky top-8">
                <div className="rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Right Column - Content */}
            <div className="lg:w-1/2">
              {/* Meta Information */}
              <div className="flex flex-col gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center">
                    <span className="text-[#7AA859] dark:text-[#7AA819] font-medium text-lg">
                      {blog.author.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="text-lg font-medium text-gray-900 dark:text-gray-100">
                      {blog.author}
                    </p>
                    {formattedDate && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Published on {formattedDate}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {blog.categories.map((cat, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-[#7AA859] dark:bg-[#7AA819] dark:text-indigo-100"
                    >
                      {cat}
                    </span>
                  ))}
                </div>
                <div>
                    <p className="text-2xl font-poppins text-gray-900 dark:text-gray-100">
                      {blog.title}
                    </p>
                  </div>
              </div>

              {/* Content */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                  {blog.description}
                </p>
              </div>
            </div>
          </div>
        </article>
      </div>
    </>
  );
}