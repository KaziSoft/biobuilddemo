'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
interface Client {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
}

export default function ClientLogoSlider() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await fetch('/api/clients');
        const data = await response.json();
        // Ensure we only get unique clients
        const uniqueClients = data.locations.filter(
          (client: Client, index: number, self: Client[]) =>
            index === self.findIndex((c) => c._id === client._id)
        );
        setClients(uniqueClients);
      } catch (error) {
        console.error('Error fetching clients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <FaSpinner className="animate-spin text-4xl text-[#7AA859]" />
        </div>
      );
    }

  if (!clients.length) {
    return <div className="container mx-auto max-w-5xl bg-white py-8 text-center">No clients found</div>;
  }

  return (
    <div className="container mx-auto max-w-5xl overflow-hidden bg-white py-8">
      <div className="relative w-full">
        <div className="flex w-max animate-slide hover:animation-paused">
          {/* Render clients 3 times for smooth looping (original + 2 copies) */}
          {[...Array(3)].map((_, copyIndex) => (
            <div key={`copy-${copyIndex}`} className="flex">
              {clients.map((client) => (
                <div 
                  key={`${client._id}-${copyIndex}`} 
                  className="w-40 h-20 flex items-center justify-center flex-shrink-0 px-4"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={client.image}
                      alt={client.name || `Client Logo`}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}