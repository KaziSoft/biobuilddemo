'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import Layout from '@/app/components/Layout';

export default function AddPrimeLocationPage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleImageUpload = async (): Promise<string> => {
    if (!image) throw new Error('No image selected');
    
    const formData = new FormData();
    const baseName = image.name.split('.')[0];

    formData.append('file', image);
    formData.append('upload_preset', 'biobuild');
    formData.append('public_id', `prime-location/${baseName}`);

    const res = await fetch(`https://api.cloudinary.com/v1_1/dytpebngy/image/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Cloudinary error:', errorText);
      throw new Error('Image upload failed');
    }

    const data = await res.json();
    return data.secure_url;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const imageUrl = await handleImageUpload();
      setImageUrl(imageUrl);

      const res = await fetch('/api/prime-locations', {
        method: 'POST',
        body: JSON.stringify({ name, description, image: imageUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to add location');
      }

      setMessage({ text: 'Location added successfully!', type: 'success' });
      setName('');
      setDescription('');
      setImage(null);
      setImageUrl('');
      router.push('/prime-locations/crud');
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({ text: error.message || 'Error adding location', type: 'error' });
    } finally {
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
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Add Prime Location</h1>
        </div>

        {message && (
          <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
            {message.text}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location Name
              </label>
              <input
                type="text"
                id="name"
                placeholder="Enter location name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Enter location description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Location Image
              </label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="image-upload"
                  className="cursor-pointer flex flex-col items-center px-6 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                >
                  <FiUpload className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                    {image ? image.name : 'Click to upload an image'}
                  </span>
                  <input
                    id="image-upload"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                    className="sr-only"
                    required
                  />
                </label>
              </div>
            </div>

            {imageUrl && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Preview:</h3>
                <img 
                  src={imageUrl} 
                  alt="Uploaded preview" 
                  className="max-w-full h-auto max-h-64 rounded-lg border border-gray-200 dark:border-gray-600" 
                />
              </div>
            )}

            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="button"
                onClick={() => router.push('/prime-locations/crud')}
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
                {loading ? 'Saving...' : 'Save Location'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    </Layout>
  );
}