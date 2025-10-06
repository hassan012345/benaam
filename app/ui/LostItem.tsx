"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { addClaim, getClaims } from "../lib/actions";
import { useSession } from "next-auth/react";

interface ItemProps {
  id: number;
  name: string;
  description: string;
  type: "lost" | "found";
  location: string;
  report_date: string;
  image: string;
}

const Item: React.FC<ItemProps> = ({
  id,
  name,
  description,
  type,
  location,
  report_date,
  image,
}) => {
  const { data: session } = useSession();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [claimDetails, setClaimDetails] = useState("");
  const [claims, setClaims] = useState<{ full_name: string; claim_details: string }[]>([]);
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  useEffect(() => {
    const fetchClaims = async () => {
      const result = await getClaims(id);
      if (result.success) {
        setClaims(result.data);
      }
    };
    fetchClaims();
  }, [id]);

  const handleClaimClick = () => {
    setIsDialogOpen(true);
  };

  const handleClaimSubmit = () => {
    if (session?.user?.id && claimDetails.trim()) {
      addClaim(id, session.user.id, claimDetails, type);
      setIsDialogOpen(false);
      setClaimDetails("");
      // Refresh claims after submitting a new one
      getClaims(id.toString()).then((result) => {
        if (result.success) {
          setClaims(result.data);
        }
      });
    }
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setClaimDetails("");
  };

  return (
    <div className="rounded-lg border border-gray-300 bg-white relative text-black mb-4 w-full">
      <div className="flex items-center justify-between gap-2 p-2 md:p-1 bg-gray-800 text-white">
        <Image
          src={"/iphone.jpeg"}
          alt="User profile"
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col grow font-light">
          <p className="text-sm">Posted by</p>
          <p className="text-xs">Hassan Siddique</p>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
        <p>34m ago</p>
      </div>
      {image && (
        <div className="relative w-full h-80 mb-3">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
      <div className="px-2">
        <div className="flex items-center justify-between mb-2">
          <span
            className={`px-2 py-1 rounded text-sm ${
              type === "lost"
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            {type.toUpperCase()}
          </span>
          <div className="flex items-center gap-2">
            {/* <span
              className={`px-2 py-1 rounded text-sm ${
                status === "open"
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {status.toUpperCase()}
            </span> */}
            <div
              className="relative"
              onMouseEnter={() => setIsTooltipVisible(true)}
              onMouseLeave={() => setIsTooltipVisible(false)}
            >
              <span className="px-2 py-1 rounded text-sm bg-yellow-100 text-yellow-800 cursor-pointer">
                {claims.length} Claim{claims.length !== 1 ? "s" : ""}
              </span>
              {isTooltipVisible && claims.length > 0 && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg p-2 z-10">
                  <p className="text-sm font-semibold">Claimants:</p>
                  <ul className="text-sm text-gray-600">
                    {claims.map((claim, index) => (
                      <li key={index}>{claim.full_name}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
          <p className="text-gray-600">{description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            {new Date(report_date).toLocaleDateString()}
          </div>
        </div>
        <div className="mb-1 flex justify-end">
          <button
            onClick={handleClaimClick}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            {type === "lost" ? "I Found This" : "This is Mine"}
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">
              Enter Claim Details
            </h2>
            <textarea
              value={claimDetails}
              onChange={(e) => setClaimDetails(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
              rows={4}
              placeholder="Provide details to support your claim..."
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={handleCloseDialog}
                className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleClaimSubmit}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                disabled={!claimDetails.trim()}
              >
                Submit Claim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Item;