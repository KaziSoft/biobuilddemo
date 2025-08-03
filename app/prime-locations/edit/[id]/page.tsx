'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import Layout from '@/app/components/Layout';

export default function EditPrimeLocationPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState('');
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  // Load existing location data
  useEffect(() => {
    const fetchLocation = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/prime-locations`);
        if (!res.ok) throw new Error('Failed to fetch locations');
        
        const data = await res.json();
        const location = data.locations.find((loc: any) => loc._id === id);
        
        if (!location) throw new Error('Location not found');
        
        setName(location.name);
        setDescription(location.description);
        setExistingImageUrl(location.image);
        setMessage(null);
      } catch (error) {
        console.error('Failed to fetch location:', error);
        setMessage({ 
          text: error instanceof Error ? error.message : 'Failed to load location', 
          type: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [id]);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let imageUrl = existingImageUrl;

      if (image) {
        imageUrl = await handleImageUpload();
      }

      const res = await fetch(`/api/prime-locations/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ name, description, image: imageUrl }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Update failed');
      }

      setMessage({ text: 'Location updated successfully!', type: 'success' });
      setTimeout(() => router.push('/prime-locations/crud'), 1000);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({ 
        text: error.message || 'Error updating location', 
        type: 'error' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this location?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/prime-locations/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Delete failed');
      }

      router.push('/prime-locations/crud');
    } catch (error: any) {
      console.error('Delete error:', error);
      setMessage({ 
        text: error.message || 'Delete failed', 
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Edit Prime Location</h1>
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
            <form onSubmit={handleUpdate} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Location Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter location name"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter location description"
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
                      {image ? image.name : 'Click to upload a new image'}
                    </span>
                    <input
                      id="image-upload"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files?.[0] || null)}
                      className="sr-only"
                    />
                  </label>
                </div>
              </div>

              {existingImageUrl && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {image ? 'New Image Preview' : 'Current Image'}
                  </h3>
                  <img 
                    src={image ? URL.createObjectURL(image) : existingImageUrl} 
                    alt="Location preview" 
                    className="max-w-full h-auto max-h-64 rounded-lg border border-gray-200 dark:border-gray-600" 
                  />
                </div>
              )}

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={loading || isDeleting}
                  className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <FiTrash2 className="mr-2" />
                  {isDeleting ? 'Deleting...' : 'Delete Location'}
                </button>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/prime-locations/crud')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    disabled={loading || isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={loading || isDeleting}
                  >
                    <FiSave className="mr-2" />
                    {loading ? 'Saving...' : 'Save Changes'}
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