import React from 'react';

const AddItem = () => {
  return (
    <div className='p-2 md:p-4 rounded-md text-black'>
        <form action="">
            <label htmlFor="name" className="block text-lg font-semibold">Item Name</label>
            <input type="text" id="name" placeholder="Enter Item Name" className="px-2 rounded-md border-1" />
            <label htmlFor="description" className="block">Item Description</label>
            <input type="text" id="description" placeholder="Enter Item Description" className="px-4 py-2 rounded-md" />
            <label htmlFor="name" className="block"> Upload Item Image </label>
            <input type="file" id="item-image" className="px-4 py-2 rounded-md" />
            <button type="submit">
              Post Item
            </button>

        </form>
    </div>
  )
}

export default AddItem