'use client';
import Image from "next/image";
import Header from '@/app/ui/Header';
import Item from '@/app/ui/LostItem';
import Footer from '@/app/ui/Footer';
import AddItem from "@/app/ui/Additem";
import Items from '@/app/lib/data';
import { useState } from "react";


export default function Home() {
  const [activeTab, setActiveTab] = useState('lost');
  // Filter items based on activeTab
  const filteredItems = Items.filter(item => item.type === activeTab);
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="w-full mt-2 border-b border-gray-200">
        <ul className="flex text-black w-full ">
          <li
            className={`p-3 flex-1 text-center cursor-pointer${activeTab === 'lost' ? ' border-b-4 border-blue-500' : ''}`}
            onClick={() => setActiveTab('lost')}
          >
            Lost
          </li>
          <li
            className={`p-3 flex-1 text-center cursor-pointer${activeTab === 'found' ? ' border-b-4 border-blue-500' : ''}`}
            onClick={() => setActiveTab('found')}
          >
            Found
          </li>
        </ul>
      </div>
      <div className="flex flex-col items-center grow md:p-4 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-7xl">
          {filteredItems.map((item) => (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              description={item.description}
              type={item.type}
              location={item.location}
              date={item.date}
              status={item.status}
              userId={item.userId}
            />
          ))}
        </div>
        <AddItem />
      </div>
      <Footer />
    </div>
  );
}