'use client';

import { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { FiUpload, FiSave, FiArrowLeft, FiTrash2 } from 'react-icons/fi';
import Layout from '@/app/components/Layout';

interface BlogPost {
  _id: string;
  title: string;
  description: string;
  author: string;
  categories: string[];
  imageUrl: string;
}

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState<Omit<BlogPost, '_id'>>({
    title: '',
    description: '',
    author: '',
    categories: [],
    imageUrl: '',
  });
  const [newImageFile, setNewImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/blog-posts/${id}`);
        if (!res.ok) throw new Error('Failed to fetch blog post');
        
        const data = await res.json();
        setForm({
          title: data.title,
          description: data.description,
          author: data.author,
          categories: data.categories,
          imageUrl: data.imageUrl,
        });
        setMessage(null);
      } catch (error) {
        console.error('Failed to fetch blog post:', error);
        setMessage({ 
          text: error instanceof Error ? error.message : 'Failed to load blog post', 
          type: 'error' 
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLInputElement>) => {
    const categories = e.target.value.split(',').map((c) => c.trim());
    setForm((prev) => ({ ...prev, categories }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'biobuild');
    formData.append('public_id', `blog-posts/${file.name.split('.')[0]}`);

    const res = await fetch('https://api.cloudinary.com/v1_1/dytpebngy/image/upload', {
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      let imageUrl = form.imageUrl;

      if (newImageFile) {
        imageUrl = await uploadImage(newImageFile);
      }

      const updatedBlog = { ...form, imageUrl };

      const res = await fetch(`/api/blog-posts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedBlog),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || 'Update failed');
      }

      setMessage({ text: 'Blog post updated successfully!', type: 'success' });
      setTimeout(() => router.push('/blogs/crud'), 1000);
    } catch (error: any) {
      console.error('Error:', error);
      setMessage({ 
        text: error.message || 'Error updating blog post', 
        type: 'error' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = confirm('Are you sure you want to delete this blog post?');
    if (!confirmDelete) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/blog-posts/${id}`, {
        method: 'DELETE',
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Delete failed');
      }

      router.push('/blogs/crud');
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Edit Blog Post</h1>
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
                  placeholder="Enter blog post title"
                />
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter blog post description"
                />
              </div>

              <div>
                <label htmlFor="author" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={form.author}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  required
                  placeholder="Enter author name"
                />
              </div>

              <div>
                <label htmlFor="categories" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Categories (comma separated)
                </label>
                <input
                  type="text"
                  id="categories"
                  value={form.categories.join(', ')}
                  onChange={handleCategoryChange}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Enter categories separated by commas"
                />
              </div>

              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Blog Image
                </label>
                <div className="mt-1 flex items-center">
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer flex flex-col items-center px-6 py-10 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg w-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-200"
                  >
                    <FiUpload className="h-12 w-12 text-gray-400" />
                    <span className="mt-2 block text-sm font-medium text-gray-600 dark:text-gray-400">
                      {newImageFile ? newImageFile.name : 'Click to upload a new image'}
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

              {form.imageUrl && (
                <div className="mt-4">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {newImageFile ? 'New Image Preview' : 'Current Image'}
                  </h3>
                  <img 
                    src={newImageFile ? URL.createObjectURL(newImageFile) : form.imageUrl} 
                    alt="Blog post preview" 
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
                  {isDeleting ? 'Deleting...' : 'Delete Post'}
                </button>
                
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => router.push('/blogs/crud')}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    disabled={submitting || isDeleting}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center px-4 py-2 bg-[#7AA859] hover:[#7AA819] text-white font-medium rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={submitting || isDeleting}
                  >
                    <FiSave className="mr-2" />
                    {submitting ? 'Saving...' : 'Save Changes'}
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