'use client'
import React from "react";
import Image from "next/image";
import Button from "./components/Button";


interface ItemProps {
    id: string;
    name: string;
    image: string;
    description: string;
    type: 'lost' | 'found';
    location: string;
    date: string;
    status: 'open' | 'claimed';
    userId: string;
}

const Item: React.FC<ItemProps> = ({
    id,
    name,
    image,
    description,
    type,
    location,
    date,
    status,
    userId
}) => {
    const handleClaim = () => {
        // TODO: Implement claim functionality
        console.log(`Claiming item ${id}`);
    };

    return (
        <div className="rounded-lg border border-gray-300 bg-white relative text-black p-4 mb-4 max-w-md">
        <Image src="/iphone.jpeg" alt="iphone" width={100} height={40} />
            <div className="flex items-center justify-between mb-2">
                <span className={`px-2 py-1 rounded text-sm ${
                    type === 'lost' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
                }`}>
                    {type.toUpperCase()}
                </span>
                <span className={`px-2 py-1 rounded text-sm ${
                    status === 'open' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                }`}>
                    {status.toUpperCase()}
                </span>
            </div>
            
            {image && (
                <div className="relative w-full h-52 mb-3">
                    <Image 
                        src={image} 
                        alt={name}
                        fill
                        className="object-cover rounded-md"
                    />
                </div>
            )}
            
            <div className="space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
                <p className="text-gray-600">{description}</p>
                <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                    {location}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                    {new Date(date).toLocaleDateString()}
                </div>
            </div>
            
            <div className="mt-4 flex justify-end">
                <button
                    onClick={handleClaim}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                >
                    {type === 'lost' ? 'I Found This' : 'This is Mine'}
                </button>
            </div>
        </div>
    );
};

export default Item;
