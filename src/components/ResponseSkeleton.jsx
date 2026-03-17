import React from 'react';
import { motion } from 'framer-motion';

const ResponseSkeleton = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header Skeleton */}
      <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0">
        <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
        <div className="w-24 h-6 bg-gray-100 rounded-lg animate-pulse" />
        <div className="w-10" />
      </header>

      {/* Banner Skeleton */}
      <div className="bg-gray-200 h-10 w-full animate-pulse" />

      <main className="flex-1 p-6 space-y-6 overflow-y-auto pb-32">
        {/* Main Card Skeleton */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <div className="w-24 h-4 bg-gray-100 rounded animate-pulse" />
            <div className="w-12 h-4 bg-gray-100 rounded animate-pulse" />
          </div>
          <div className="w-3/4 h-8 bg-gray-100 rounded-lg animate-pulse mb-6" />
          
          <div className="h-px bg-gray-100 mb-6" />

          <div className="space-y-4">
            <div className="space-y-2">
              <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-full h-4 bg-gray-100 rounded animate-pulse" />
              <div className="w-2/3 h-4 bg-gray-100 rounded animate-pulse" />
            </div>
            
            <div className="w-full h-[52px] bg-gray-50 rounded-2xl animate-pulse" />
          </div>
        </div>

        {/* Second Card Skeleton */}
        <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 animate-pulse">
          <div className="w-32 h-6 bg-blue-100 rounded mb-2" />
          <div className="space-y-2">
            <div className="w-full h-4 bg-blue-100 rounded" />
            <div className="w-5/6 h-4 bg-blue-100 rounded" />
          </div>
        </div>
      </main>

      {/* Footer Skeleton */}
      <footer className="p-4 bg-white border-t border-gray-100 sticky bottom-0 grid grid-cols-2 gap-3">
        <div className="h-[72px] bg-gray-50 border border-gray-200 rounded-2xl animate-pulse" />
        <div className="h-[72px] bg-gray-50 border border-gray-200 rounded-2xl animate-pulse" />
      </footer>
    </div>
  );
};

export default ResponseSkeleton;
