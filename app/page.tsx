// app/page.tsx
"use client";
import LostItem from "@/app/ui/LostItem";
import { Item } from "@/app/lib/definitions";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Suspense } from "react";
import ItemsSkeleton from "@/app/ui/skeleton/ItemsSkeleton";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [activeTab, setActiveTab] = useState<"lost" | "found">("lost");

  useEffect(() => {
    const fetchItems = async () => {
      try {
        setLoading(true);
        const response = await fetch("/api/items");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setItems(data.data);
      } catch (err) {
        setError("Failed to load items.");
      } finally {
        setLoading(false);
      }
    };
    fetchItems();
  }, []);
  console.log(items);

  const filteredItems = items.filter((item) => item.type === activeTab);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full mt-2 border-b border-gray-200">
        <ul className="flex text-black w-full">
          <li
            className={`p-3 flex-1 text-center cursor-pointer ${
              activeTab === "lost" ? "border-b-4 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("lost")}
          >
            Lost
          </li>
          <li
            className={`p-3 flex-1 text-center cursor-pointer ${
              activeTab === "found" ? "border-b-4 border-blue-500" : ""
            }`}
            onClick={() => setActiveTab("found")}
          >
            Found
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center grow md:p-4 overflow-y-auto mt-4 p-2">
        <div className="flex gap-2">
          <Link href="/report/lost">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Report Lost Item
            </button>
          </Link>
          <Link href="/report/found">
            <button className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors">
              Report Found Item
            </button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl mx-auto">
          {loading ? (
            <ItemsSkeleton />
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            filteredItems.map((item) => <LostItem key={item.id} {...item} />)
          )}
        </div>
      </div>
    </div>
  );
}