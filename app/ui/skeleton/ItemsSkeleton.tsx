import React from 'react';
const shimmer =
  'before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/60 before:to-transparent';
const ItemsSkeleton = () => {
  return (
    <div className={`${shimmer} relative overflow-hidden rounded-xl bg-gray-100 p-2`}>
      <div className="flex p-4 justify-between">
        <div className="h-5 w-40 rounded-md bg-gray-200"/>
        <div className="h-5 w-20 rounded-md bg-gray-200"></div>
      </div>
        <div className=""></div>
    </div>
  )
}

export default ItemsSkeleton;