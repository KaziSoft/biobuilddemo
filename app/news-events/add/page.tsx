'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import Layout from '@/app/components/Layout';

export default function AddNewsEventPage() {
  const router = useRouter();
  const [type, setType] = useState<'news' | 'event'>('news');
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [summary, setSummary] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (loading) return;

    setLoading(true);
    setMessage(null);

    if (!title || !date || !summary || !imageFile) {
      setMessage({ text: 'All fields including image are required', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      // Upload image to Cloudinary
      const formData = new FormData();
      const baseName = imageFile.name.split('.')[0];
      formData.append('file', imageFile);
      formData.append('upload_preset', 'biobuild');
      formData.append('public_id', `news-events/${baseName}`);

      const cloudinaryRes = await fetch('https://api.cloudinary.com/v1_1/dytpebngy/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!cloudinaryRes.ok) {
        const errorText = await cloudinaryRes.text();
        console.error('Cloudinary error:', errorText);
        throw new Error('Image upload failed');
      }

      const cloudinaryData = await cloudinaryRes.json();

      // Submit to your API
      const res = await fetch('/api/news-events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          title,
          date,
          location: type === 'event' ? location : undefined,
          summary,
          image: cloudinaryData.secure_url,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to add news/event');
      }

      setMessage({ text: 'Item added successfully!', type: 'success' });

      // Reset all fields
      setType('news');
      setTitle('');
      setDate('');
      setLocation('');
      setSummary('');
      setImageFile(null);
      setImagePreview('');

      // Redirect after a short delay to show success message
      setTimeout(() => router.push('/news-events'), 1500);
    } catch (err: any) {
      console.error('Error:', err);
      setMessage({ text: err.message || 'Something went wrong', type: 'error' });
      setLoading(false);
    }
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => router.back()}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4"
            >
              <FiArrowLeft className="mr-2" />
              Back
            </button>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Add News or Event</h1>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
              {message.text}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Type
                </label>
                <select
                  id="type"
                  value={type}
                  onChange={(e) => setType(e.target.value as 'news' | 'event')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="news">News</option>
                  <option value="event">Event</option>
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  placeholder="Enter title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />

              </div>

              {type === 'event' && (
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter event location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Summary
                </label>
                <textarea
                  id="summary"
                  placeholder="Enter summary content"
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Image
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center px-6 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                  >
                    <FiUpload className="h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                      {imageFile ? imageFile.name : 'Click to upload an image'}
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                      required
                    />
                  </label>
                </div>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Preview:</h3>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <Image
                      src={imagePreview}
                      alt="Uploaded preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/news-events')}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  <FiSave className="mr-2" />
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}