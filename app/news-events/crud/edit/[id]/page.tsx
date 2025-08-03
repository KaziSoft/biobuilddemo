'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft, FiTrash2, FiLoader, FiX } from 'react-icons/fi';
import Layout from '@/app/components/Layout';

export default function EditNewsEventPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const [form, setForm] = useState({
    type: '',
    title: '',
    date: '',
    summary: '',
    location: '',
    image: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Fetch existing data
  useEffect(() => {
    const fetchItem = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/news-events/${id}`);
        if (!res.ok) throw new Error('Failed to fetch item');
        const data = await res.json();
        setForm(data);
        setPreview(data.image);
      } catch (err) {
        setMessage({ 
          text: err instanceof Error ? err.message : 'Failed to load item', 
          type: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };
    fetchItem();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: 'Image size must be less than 5MB', type: 'error' });
      return;
    }
    
    setImageFile(file);
    setPreview(URL.createObjectURL(file));
    setMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      let imageUrl = form.image;

      if (imageFile) {
        const data = new FormData();
        data.append('file', imageFile);
        data.append('upload_preset', 'biobuild');

        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dytpebngy/image/upload', {
          method: 'POST',
          body: data,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');

        const img = await uploadRes.json();
        imageUrl = img.secure_url;
      }

      const res = await fetch(`/api/news-events/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      if (!res.ok) throw new Error('Update failed');

      setMessage({ text: 'Item updated successfully!', type: 'success' });
      setTimeout(() => router.push('/news-events/crud'), 1000);
    } catch (err) {
      setMessage({ 
        text: err instanceof Error ? err.message : 'An unexpected error occurred', 
        type: 'error' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this item?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/news-events/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Delete failed');
      }

      router.push('/news-events/crud');
    } catch (err) {
      setMessage({ 
        text: err instanceof Error ? err.message : 'Delete failed', 
        type: 'error' 
      });
    } finally {
      setIsDeleting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Edit News/Event</h1>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 
              'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100' : 
              'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'}`}
            >
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
                  name="type"
                  value={form.type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="">Select Type</option>
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
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter title"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={form.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
              </div>

              {form.type === 'event' && (
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={form.location}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                    placeholder="Enter event location"
                  />
                </div>
              )}

              <div>
                <label htmlFor="summary" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Summary
                </label>
                <textarea
                  id="summary"
                  name="summary"
                  value={form.summary}
                  onChange={handleChange}
                  rows={4}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter summary"
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
                      {imageFile ? imageFile.name : 'Click to upload a new image'}
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {(form.image || imageFile) && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {imageFile ? 'New Image Preview' : 'Current Image'}
                  </h3>
                  <img 
                    src={preview || form.image} 
                    alt="Preview" 
                    className="max-w-full h-auto max-h-64 rounded-lg border border-gray-200 dark:border-gray-600" 
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={submitting || isDeleting}
                  className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrash2 className="mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete Item'}
                </button>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/news-events/crud')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    disabled={submitting || isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-[#7AA859] hover:bg-[#7AA819] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting || isDeleting}
                  >
                    {submitting ? (
                      <>
                        <FiLoader className="animate-spin mr-2" />
                        Saving...
                      </>
                    ) : (
                      <>
                        <FiSave className="mr-2" />
                        Save Changes
                      </>
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}