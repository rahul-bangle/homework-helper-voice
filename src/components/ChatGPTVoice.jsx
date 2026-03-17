import React from 'react';
import { motion } from 'framer-motion';
import { 
  Menu, 
  MoreVertical, 
  Plus, 
  Mic, 
  AudioLines 
} from 'lucide-react';

const ChatGPTVoice = ({ onBack }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="flex flex-col h-screen bg-white"
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white">
        <div className="flex items-center gap-4">
          <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <Menu size={20} />
          </div>
          <span className="text-[17px] font-medium text-gray-700">ChatGPT <span className="text-gray-400">Voice</span></span>
        </div>
        <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
          <MoreVertical size={20} className="text-gray-700" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-[32px] text-gray-400 font-normal">Start talking</h2>
      </main>

      {/* Footer */}
      <footer className="p-4 bg-white sticky bottom-0">
        <div className="flex items-center gap-2">
          {/* Plus Button */}
          <div className="p-3 bg-gray-50 rounded-full text-gray-700 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <Plus size={20} />
          </div>

          {/* Type Input */}
          <div className="flex-1 flex items-center bg-gray-50 border border-gray-100 rounded-full px-4 py-2.5">
            <span className="text-gray-400 text-[16px]">Type</span>
          </div>

          {/* Mic Button */}
          <div className="p-3 bg-gray-50 rounded-full text-gray-700 shadow-sm active:scale-95 transition-transform cursor-pointer">
            <Mic size={20} />
          </div>

          {/* End Button */}
          <button 
            onClick={onBack}
            className="flex items-center gap-1.5 bg-[#0091FF] text-white px-4 py-3 rounded-full shadow-md active:scale-95 transition-transform"
          >
            <AudioLines size={20} strokeWidth={2.5} />
            <span className="text-[15px] font-semibold">End</span>
          </button>
        </div>
      </footer>
    </motion.div>
  );
};

export default ChatGPTVoice;
