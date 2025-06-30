import React from 'react';
import Image from 'next/image';
import { User, Item } from '@/types';
import Vercel from '@/public/vercel.svg'
// Mock data types
interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

interface Item {
  id: string;
  title: string;
  description: string;
  status: 'lost' | 'found';
  imageUrl: string;
  date: string;
}

// Mock data
const user: User = {
  id: '1',
  name: 'John Doe',
  avatarUrl: 'https://via.placeholder.com/150',
};

const items: Item[] = [
  {
    id: '1',
    title: 'Lost Wallet',
    description: 'Black leather wallet lost near Central Park.',
    status: 'lost',
    imageUrl: 'https://via.placeholder.com/300x200',
    date: '2025-06-20',
  },
  {
    id: '2',
    title: 'Found Keys',
    description: 'Set of keys found at the library.',
    status: 'found',
    imageUrl: 'https://via.placeholder.com/300x200',
    date: '2025-06-18',
  },
];

const ProfilePage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* User Profile Section */}
      <div className="flex flex-col items-center mb-12">
        <div className="relative w-32 h-32 mb-4">
          <Image
            src={Vercel}
            alt={`${user.name}'s avatar`}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">{user.name}</h1>
      </div>

      {/* Lost and Found Items Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Posted Items
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={Vercel}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-medium text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-sm text-gray-500 mb-2">
                  Status:{' '}
                  <span
                    className={`${
                      item.status === 'lost' ? 'text-red-500' : 'text-green-500'
                    } font-semibold`}
                  >
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </p>
                <p className="text-sm text-gray-500">Posted on: {item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;