'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiEdit, FiTrash2, FiPlus } from 'react-icons/fi';
import Layout from './Layout';

interface Client {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}

export default function ClientsCrud() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 6;

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/clients?page=${page}&limit=${limit}`);
        const data = await res.json();
        setClients(data.locations);
        setTotal(data.total);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchClients();
  }, [page]);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('Are you sure you want to delete this client?');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/clients/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setClients(prev => prev.filter(client => client._id !== id));
      }
    } catch (err) {
      console.error('Failed to delete client', err);
    }
  };

  const totalPages = Math.ceil(total / limit);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white">Our Clients</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">Manage client logos and names</p>
          </div>
          <Link
            href="/clients/add"
            className="mt-4 md:mt-0 inline-flex items-center px-4 py-2 bg-[#7AA859] hover:bg-[#7AA819] text-white font-medium rounded-lg transition-colors duration-200"
          >
            <FiPlus className="mr-2" />
            Add Client
          </Link>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : clients.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No clients found.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Logo</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Created At</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {clients.map((client, index) => (
                    <tr key={client._id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                      <td className="px-6 py-4">{(page - 1) * limit + index + 1}</td>
                      <td className="px-6 py-4">
                        <Image
                          src={client.image}
                          alt={client.name}
                          width={60}
                          height={60}
                          className="rounded border border-gray-300 dark:border-gray-600 object-contain"
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800 dark:text-white">{client.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(client.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-4">
                          <Link
                            href={`/clients/edit/${client._id}`}
                            className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit"
                          >
                            <FiEdit className="h-5 w-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(client._id)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete"
                          >
                            <FiTrash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              onClick={() => setPage(p => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Prev
            </button>
            <span className="px-3 py-1 text-sm font-semibold">{`Page ${page} of ${totalPages}`}</span>
            <button
              className="px-3 py-1 border rounded text-sm disabled:opacity-50"
              onClick={() => setPage(p => Math.min(p + 1, totalPages))}
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
