import React from 'react';
import { motion } from 'framer-motion';

const VoiceSkeleton = () => {
  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header Skeleton */}
      <header className="px-4 py-3 flex items-center bg-white border-b border-gray-50">
        <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse mr-2" />
        <div className="w-32 h-8 bg-gray-100 rounded-full animate-pulse" />
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-12">
        {/* Mic Skeleton */}
        <div className="relative mb-12">
          <div className="w-32 h-32 bg-gray-100 rounded-full animate-pulse flex items-center justify-center">
            <div className="w-12 h-16 bg-gray-200 rounded-full" />
          </div>
        </div>

        {/* Text Skeletons */}
        <div className="flex flex-col items-center mb-10 w-full">
          <div className="w-48 h-8 bg-gray-100 rounded-lg animate-pulse mb-3" />
          <div className="w-32 h-4 bg-gray-50 rounded-lg animate-pulse" />
        </div>

        {/* Suggestion Skeletons */}
        <div className="w-full max-w-[320px] space-y-3 mb-8">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="w-full h-[72px] bg-gray-50 rounded-2xl animate-pulse border border-gray-100 flex items-center px-4"
            >
              <div className="w-6 h-6 bg-gray-200 rounded-md mr-3" />
              <div className="space-y-2">
                <div className="w-32 h-4 bg-gray-100 rounded" />
                <div className="w-24 h-3 bg-gray-50 rounded" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default VoiceSkeleton;
