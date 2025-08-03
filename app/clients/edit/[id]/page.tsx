'use client';
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FiUpload, FiSave, FiArrowLeft, FiLoader } from 'react-icons/fi';
import Layout from '@/app/components/Layout';

export default function EditClientPage() {
  const { id } = useParams();
  const router = useRouter();

  const [name, setName] = useState('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const res = await fetch(`/api/clients?page=1&limit=100`);
        const data = await res.json();
        const client = data.locations.find((c: any) => c._id === id);
        if (client) {
          setName(client.name);
          setImagePreview(client.image);
        } else {
          setMessage({ text: 'Client not found', type: 'error' });
        }
      } catch (error) {
        setMessage({ text: 'Failed to fetch client', type: 'error' });
      } finally {
        setLoading(false);
      }
    };
    fetchClient();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('name', name);
    if (file) formData.append('image', file);

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (!res.ok) throw new Error('Update failed');

      setMessage({ text: 'Client updated successfully!', type: 'success' });
      setTimeout(() => router.push('/clients/crud'), 1000);
    } catch (err) {
      setMessage({
        text: err instanceof Error ? err.message : 'Unexpected error occurred',
        type: 'error',
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 max-w-xl">
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.back()}
            className="flex items-center text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white mr-4"
          >
            <FiArrowLeft className="mr-2" />
            Back
          </button>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Edit Client</h2>
        </div>

        {message && (
          <div
            className={`mb-6 p-4 rounded-lg ${
              message.type === 'success'
                ? 'bg-green-50 text-green-800 dark:bg-green-900 dark:text-green-100'
                : 'bg-red-50 text-red-800 dark:bg-red-900 dark:text-red-100'
            }`}
          >
            {message.text}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700 dark:text-white"
                required
                placeholder="Enter client name"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Client Logo
              </label>
              <label
                htmlFor="client-image"
                className="cursor-pointer flex flex-col items-center px-6 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
              >
                <FiUpload className="h-12 w-12 text-gray-400" />
                <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {file ? file.name : 'Click to upload a new image'}
                </span>
                <input
                  id="client-image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Preview */}
            {imagePreview && (
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {file ? 'New Image Preview' : 'Current Image'}
                </h3>
                <div className="relative w-full h-48 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600">
                  <Image
                    src={imagePreview}
                    alt="Client logo preview"
                    fill
                    className="object-contain p-2"
                  />
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-[#7AA859] hover:bg-[#7AA819] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <FiLoader className="animate-spin mr-2" />
                    Updating...
                  </>
                ) : (
                  <>
                    <FiSave className="mr-2" />
                    Update Client
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
