'use client'
import React, { useState } from "react";
import { useRef } from "react";
import { addItem } from "@/app/lib/actions";
import { useSession } from "next-auth/react";

const AddItem = ({}) => {

  const {data:session} = useSession();
  const imageRef = useRef<HTMLInputElement>(null);  
  const [files, setFiles] = useState([]);
  const handleFiles = (event) => {
    
  };
  console.log(files);
  return (
    <div className="max-w-md w-full space-y-8">
      <form
        className="mt-8 space-y-6 bg-gray-800 rounded-lg p-8"
        action={addItem}
      >
        <h2 className="mt-6 text-3xl font-extrabold text-gray-800 text-center">
          Post New Item
        </h2>
        <div className="space-y-4">
          <div>
            <input name="user_id" hidden value={session?.user?.id}></input>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter Item Name"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Description
            </label>
            <input
              name="description"
              type="text"
              id="description"
              placeholder="Enter Item Description"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Location Found/Lost
            </label>
            <input
              type="text"
              name="location"
              id="location"
              placeholder="Where was the item found or lost?"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
            />
          </div>

          <div>
            <label
              htmlFor="report_date"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Report Date
            </label>
            <input
              type="date"
              name="report_date"
              id="report_date"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
              required
            />
          </div>
          <div>
            <label
              htmlFor="type"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Item Status
            </label>
            <select
              name="type"
              id="type"
              className="appearance-none relative block w-full px-3 py-3 border border-gray-300 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm transition duration-200"
              required
            >
              <option value="">Select if Lost or Found</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="item-image"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Upload Item Image
            </label>
            <div className="flex items-center space-x-2">
              <input
                name="file"
                type="file"
                id="item-image"
                ref={imageRef}
                onChange={(e) => handleFiles(e)}
                multiple
                hidden
              />
              <button
                type="button"
                onClick={() => imageRef.current?.click()}
                className="group relative flex justify-center py-2 px-4 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200"
              >
                Upload Image
              </button>
              <span className="text-sm text-gray-500">No file chosen</span>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gray-800 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 transform hover:scale-[1.02]"
          >
            Post Item
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddItem;
