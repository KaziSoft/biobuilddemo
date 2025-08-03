'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft, FiTrash2, FiLoader, FiPlus, FiX } from 'react-icons/fi';
import Image from 'next/image';
import Layout from '@/app/components/Layout';

interface Project {
  _id: string;
  title: string;
  hoverTitle: string;
  hoverText: string;
  location: string;
  status: 'ongoing' | 'completed' | 'upcoming';
  description: string;
  size: string;
  units: number;
  floors: number;
  amenities: string[];
  image: string;
}

const EditProjectPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [form, setForm] = useState<Project>({
    _id: '',
    title: '',
    hoverTitle: '',
    hoverText: '',
    location: '',
    status: 'ongoing',
    description: '',
    size: '',
    units: 0,
    floors: 0,
    amenities: [],
    image: ''
  });

  const [newAmenity, setNewAmenity] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!id) {
      setMessage({ text: 'No project ID provided', type: 'error' });
      setLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects/${id}`);
        if (!res.ok) throw new Error('Failed to fetch project');
        const data = await res.json();
        setForm(data);
      } catch (err) {
        setMessage({ 
          text: err instanceof Error ? err.message : 'Failed to fetch project', 
          type: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: Number(value) }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, status: e.target.value as 'ongoing' | 'completed' | 'upcoming' }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    
    const file = e.target.files[0];
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ text: 'Image size must be less than 5MB', type: 'error' });
      return;
    }
    
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setMessage(null);
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim() && !form.amenities.includes(newAmenity.trim())) {
      setForm(prev => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()]
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (amenityToRemove: string) => {
    setForm(prev => ({
      ...prev,
      amenities: prev.amenities.filter(amenity => amenity !== amenityToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      let imageUrl = form.image;

      if (imageFile) {
        const formData = new FormData();
        const baseName = imageFile.name.split('.')[0];
        formData.append('file', imageFile);
        formData.append('upload_preset', 'biobuild');
        formData.append('public_id', `projects/${baseName}`);

        const uploadRes = await fetch('https://api.cloudinary.com/v1_1/dytpebngy/image/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) throw new Error('Image upload failed');

        const img = await uploadRes.json();
        imageUrl = img.secure_url;
      }

      const res = await fetch(`/api/projects/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, image: imageUrl }),
      });

      if (!res.ok) throw new Error('Update failed');

      setMessage({ text: 'Project updated successfully!', type: 'success' });
      setTimeout(() => router.push('/projects/crud'), 1000);
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
    const confirmDelete = confirm('Are you sure you want to delete this project?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/projects/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Delete failed');
      }

      router.push('/projects/crud');
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Edit Project</h1>
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
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter project title"
                />
              </div>

              <div>
                <label htmlFor="hoverTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hover Title
                </label>
                <input
                  type="text"
                  id="hoverTitle"
                  name="hoverTitle"
                  value={form.hoverTitle}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter hover title"
                />
              </div>

              <div>
                <label htmlFor="hoverText" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Hover Text
                </label>
                <textarea
                  id="hoverText"
                  name="hoverText"
                  value={form.hoverText}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter hover description"
                />
              </div>

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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter project location"
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={form.status}
                  onChange={handleStatusChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
                  required
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                  <option value="upcoming">Upcoming</option>
                </select>
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter project description"
                />
              </div>

              <div>
                <label htmlFor="size" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Size
                </label>
                <input
                  type="text"
                  id="size"
                  name="size"
                  value={form.size}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter project size (e.g., 5000 sq ft)"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="units" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Units
                  </label>
                  <input
                    type="number"
                    id="units"
                    name="units"
                    value={form.units}
                    onChange={handleNumberChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Enter number of units"
                  />
                </div>
                <div>
                  <label htmlFor="floors" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Floors
                  </label>
                  <input
                    type="number"
                    id="floors"
                    name="floors"
                    value={form.floors}
                    onChange={handleNumberChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    required
                    placeholder="Enter number of floors"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="amenities" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Amenities
                </label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    id="amenities"
                    value={newAmenity}
                    onChange={(e) => setNewAmenity(e.target.value)}
                    className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                    placeholder="Enter an amenity"
                  />
                  <button
                    type="button"
                    onClick={handleAddAmenity}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200"
                  >
                    <FiPlus />
                  </button>
                </div>
                {form.amenities.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.amenities.map((amenity) => (
                      <div key={amenity} className="flex items-center bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                        <span className="text-sm text-gray-800 dark:text-gray-200">{amenity}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveAmenity(amenity)}
                          className="ml-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                        >
                          <FiX size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Project Image
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

              {(form.image || imagePreview) && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {imagePreview ? 'New Image Preview' : 'Current Image'}
                  </h3>
                  <div className="relative w-full h-64 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                    <Image 
                      src={imagePreview || form.image} 
                      alt="Project preview" 
                      fill 
                      className="object-cover" 
                    />
                  </div>
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
                  {isDeleting ? 'Deleting...' : 'Delete Project'}
                </button>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/projects/crud')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    disabled={submitting || isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
};

export default EditProjectPage;