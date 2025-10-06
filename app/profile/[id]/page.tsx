"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Vercel from "@/public/vercel.svg";
import AddItem from "@/app/ui/Additem";
import { useSession } from "next-auth/react";
import { getClaims   } from "@/app/lib/actions";

// Define Item type
interface Item {
  id: number;
  user_id: number;
  title: string;
  description: string;
  status: "lost" | "found";
  date: string;
}

const ProfilePage: React.FC = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const [userItems, setUserItems] = useState<Item[]>([]);
  const [error, setError] = useState<string | null>(null);
  const user = session?.user;

  async function fetchUserItems(user_id: number) {
    try {
      const res = await fetch('/api/items');
      if (!res.ok) {
        throw new Error('Failed to fetch items');
      }
      const items = await res.json();
      const data: Item[] =items.data;
      setUserItems(data.filter((item) => item.user_id === user_id));
      setError(null);
    } catch (err) {
      setError('Error fetching items. Please try again later.');
      console.error(err);
    }
  }

  useEffect(() => {
    if (user?.id) {
      fetchUserItems(user.id);
    }
  }, [user?.id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleAddItem = () => {
    setOpen(true);
  };

  const handleCloseAddItem = () => {
    setOpen(false);
    if (user?.id) {
      fetchUserItems(user.id); // Refresh items after adding
    }
  };

  if (!session) {
    return <div>Please sign in to view your profile</div>;
  }

  return (
    <div className="container mx-auto px-4">
      {/* User Profile Section */}
      <div className="flex flex-col items-center">
        <div className="relative w-32 h-32 md:w-40 md:h-40 mb-4">
          <Image
            src={user?.image || '/default-avatar.png'} // Fallback image
            alt={`${user?.name || 'User'}'s avatar`}
            fill
            className="rounded-full object-cover inset-2"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-800">
          {user?.name || 'User'}
        </h1>
      </div>

      {/* Lost and Found Items Section */}
      <div className="mb-8">
        <div className="flex justify-between">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Posted Items
          </h2>
          <button
            onClick={handleAddItem}
            className="bg-gray-800 rounded-md text-white px-2 py-1 md:px-3 md:py-4"
          >
            Add item
          </button>
        </div>

        {error && (
          <div className="text-red-500 mb-4">{error}</div>
        )}

        {userItems.length === 0 && !error && (
          <div className="text-gray-600">No items posted yet.</div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1">
          {userItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border-2 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full h-48">
                <Image
                  src={Vercel} // Consider using item-specific image
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
                  Type:{" "}
                  <span
                    className={`${
                      item.status === "lost" ? "text-red-500" : "text-green-500"
                    } font-semibold`}
                  > 
                  </span>
                </p>
                <p className="text-sm text-gray-500">
                  Posted on: {formatDate(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AddItem onClose={handleCloseAddItem} />
        </div>
      )}
    </div>
  );
};

export default ProfilePage;