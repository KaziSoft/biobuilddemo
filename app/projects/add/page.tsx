'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft } from 'react-icons/fi';
import Image from 'next/image';
import Layout from '@/app/components/Layout';

const AddProjectPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [hoverTitle, setHoverTitle] = useState('');
  const [hoverText, setHoverText] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<'ongoing' | 'completed' | 'upcoming'>('ongoing');
  const [description, setDescription] = useState('');
  const [size, setSize] = useState('');
  const [units, setUnits] = useState<number>(0);
  const [floors, setFloors] = useState<number>(0);
  const [amenities, setAmenities] = useState<string[]>([]);
  const [currentAmenity, setCurrentAmenity] = useState('');
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

  const handleAddAmenity = () => {
    if (currentAmenity.trim() && !amenities.includes(currentAmenity.trim())) {
      setAmenities([...amenities, currentAmenity.trim()]);
      setCurrentAmenity('');
    }
  };

  const handleRemoveAmenity = (amenityToRemove: string) => {
    setAmenities(amenities.filter(amenity => amenity !== amenityToRemove));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setMessage(null);

    if (!title || !hoverTitle || !hoverText || !location || !status || !description || 
        !size || !units || !floors || amenities.length === 0 || !imageFile) {
      setMessage({ text: 'All fields are required', type: 'error' });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      const baseName = imageFile.name.split('.')[0];
      formData.append('file', imageFile);
      formData.append('upload_preset', 'biobuild');
      formData.append('public_id', `projects/${baseName}`);

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

      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          hoverTitle,
          hoverText,
          location,
          status,
          description,
          size,
          units,
          floors,
          amenities,
          image: cloudinaryData.secure_url,
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Failed to create project');
      }

      setMessage({ text: 'Project added successfully!', type: 'success' });

      setTitle('');
      setHoverTitle('');
      setHoverText('');
      setLocation('');
      setStatus('ongoing');
      setDescription('');
      setSize('');
      setUnits(0);
      setFloors(0);
      setAmenities([]);
      setImageFile(null);
      setImagePreview('');

      setTimeout(() => router.push('/projects/crud'), 1500);
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Add Project</h1>
          </div>

          {message && (
            <div className={`mb-6 p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100' : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'}`}>
              {message.text}
            </div>
          )}

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Title</label>
                <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              {/* hoverTitle */}
              <div>
                <label htmlFor="hoverTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hover Title</label>
                <input type="text" id="hoverTitle" value={hoverTitle} onChange={(e) => setHoverTitle(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              {/* hoverText */}
              <div>
                <label htmlFor="hoverText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Hover Text</label>
                <textarea id="hoverText" rows={4} value={hoverText} onChange={(e) => setHoverText(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              {/* location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              {/* status */}
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Status</label>
                <select
                  id="status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'ongoing' | 'completed' | 'upcoming')}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              {/* description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea id="description" rows={4} value={description} onChange={(e) => setDescription(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              {/* size */}
              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Size</label>
                <input type="text" id="size" value={size} onChange={(e) => setSize(e.target.value)} required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
              </div>

              {/* units and floors */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Units</label>
                  <input type="number" id="units" value={units} onChange={(e) => setUnits(Number(e.target.value))} min={0} required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
                <div>
                  <label htmlFor="floors" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Floors</label>
                  <input type="number" id="floors" value={floors} onChange={(e) => setFloors(Number(e.target.value))} min={0} required
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white" />
                </div>
              </div>

              {/* amenities */}
              <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amenities</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={currentAmenity} onChange={(e) => setCurrentAmenity(e.target.value)}
                    placeholder="Enter an amenity"
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <button type="button" onClick={handleAddAmenity}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                    Add
                  </button>
                </div>
                {amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {amenities.map((a) => (
                      <div key={a} className="bg-gray-200 dark:bg-gray-700 px-3 py-1 rounded-full flex items-center">
                        <span className="text-sm">{a}</span>
                        <button onClick={() => handleRemoveAmenity(a)} type="button" className="ml-2 text-gray-500 hover:text-red-500">&times;</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* image upload */}
              <div>
                <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Project Image</label>
                <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center px-6 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full">
                  <FiUpload className="h-12 w-12 text-gray-400" />
                  <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                    {imageFile ? imageFile.name : 'Click to upload an image'}
                  </span>
                  <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} className="sr-only" required />
                </label>
              </div>

              {imagePreview && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image Preview:</h3>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <Image src={imagePreview} alt="Preview" fill className="object-cover" />
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-4 pt-4">
                <button type="button" onClick={() => router.push('/projects')} disabled={loading}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                  Cancel
                </button>
                <button type="submit" disabled={loading}
                  className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50">
                  <FiSave className="mr-2" />
                  {loading ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AddProjectPage;
