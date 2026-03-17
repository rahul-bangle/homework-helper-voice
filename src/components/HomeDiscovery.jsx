import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  User,
  Settings,
  Image as ImageIcon,
  Lightbulb,
  GraduationCap,
  Sparkles,
  Plus,
  Mic,
  Mic2,
  BookOpen,
  Search,
  SquarePen,
  LayoutGrid,
  FolderPlus,
  MessageSquare,
  ChevronRight,
  AudioLines
} from 'lucide-react';

const Sidebar = ({ isOpen, onClose }) => {
  const history = [
    { text: "Photosynthesis kya hota hai", lang: "hinglish" },
    { text: "Biryani recipe pressure cooker", lang: "en" },
    { text: "Resume mein gap explain kaise karein", lang: "hinglish" },
    { text: "Ganesh chaturthi decoration ideas", lang: "en" },
    { text: "English bolna kaise seekhein", lang: "hinglish" },
    { text: "Math formula class 8", lang: "en" },
    { text: "WhatsApp status ideas", lang: "en" },
    { text: "Science project ideas for kids", lang: "en" },
    { text: "Homework help Hindi medium", lang: "en" },
    { text: "रात को नींद नहीं आती", lang: "hi" }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 z-40 backdrop-blur-[2px]"
          />
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 w-[240px] bg-white z-50 flex flex-col shadow-2xl"
          >
            {/* Sidebar Header */}
            <div className="p-4 flex flex-col gap-4">
              <div className="flex items-center gap-3 p-2 bg-gray-100 rounded-xl">
                <Search size={18} className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none outline-none text-[15px] w-full"
                />
                <SquarePen size={18} className="text-gray-500" />
              </div>

              <div className="space-y-1">
                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <SquarePen size={20} className="text-gray-700" />
                  <span className="text-[15px] font-medium">New chat</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <ImageIcon size={20} className="text-gray-700" />
                  <span className="text-[15px] font-medium">Images</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <LayoutGrid size={20} className="text-gray-700" />
                  <span className="text-[15px] font-medium">Apps</span>
                </button>
                <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
                  <FolderPlus size={20} className="text-gray-700" />
                  <span className="text-[15px] font-medium">New project</span>
                </button>
              </div>
            </div>

            {/* History List */}
            <div className="flex-1 overflow-y-auto px-4 py-2 space-y-1">
              <div className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 ml-2">Recent</div>
              {history.map((item, i) => (
                <button
                  key={i}
                  className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-[14px] text-gray-700 truncate block whitespace-nowrap overflow-hidden"
                >
                  {item.text}
                </button>
              ))}
            </div>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-gray-100">
              <button className="w-full flex items-center gap-3 hover:bg-gray-100 p-2 rounded-xl transition-colors">
                <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-[12px] font-bold">
                  BR
                </div>
                <div className="flex-1 text-left">
                  <div className="text-[14px] font-semibold text-gray-900">Bangle Rahul</div>
                </div>
                <Settings size={16} className="text-gray-400" />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Card = ({ icon: Icon, title, subtitle, onClick, iconColor, centered }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center w-full ${centered ? 'justify-center text-center' : ''} gap-2.5 p-3.5 border border-gray-100 rounded-2xl bg-white active:bg-gray-50 transition-colors ${subtitle ? 'min-h-[64px] py-3' : 'h-[64px]'}`}
  >
    <div className={`p-1 rounded-lg flex-shrink-0 ${iconColor}`}>
      <Icon size={18} />
    </div>
    <div className={`flex flex-col ${centered ? 'items-center' : ''}`}>
      <span className="text-[14px] font-medium text-gray-700 leading-tight">{title}</span>
      {subtitle && <span className="text-[10px] text-gray-400 mt-0.5 leading-tight">{subtitle}</span>}
    </div>
  </motion.button>
);

const HomeDiscovery = ({ onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    return localStorage.getItem('isSidebarOpen') === 'true';
  });

  // Persist sidebar state
  useEffect(() => {
    localStorage.setItem('isSidebarOpen', isSidebarOpen);
  }, [isSidebarOpen]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen relative bg-white"
    >
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 bg-white/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="flex items-center gap-2">
          <div
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 border border-gray-100 rounded-full cursor-pointer hover:bg-gray-100 transition-colors">
            <span className="text-[15px] font-semibold">ChatGPT</span>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <div className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <SquarePen size={20} className="text-gray-700" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-32">
        <div className="w-full max-w-[310px] mb-10 p-4 bg-emerald-50/50 rounded-3xl border border-emerald-100/50 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-2">
            <div className="bg-emerald-100 p-1 rounded-full">
              <BookOpen size={12} className="text-emerald-700" />
            </div>
            <span className="text-[11px] text-emerald-700 font-bold uppercase tracking-widest">Parent Assistant</span>
          </div>
          <div className="text-center">
            <p className="text-[14px] font-semibold text-gray-800 mb-1">
              Difficult to explain homework?
            </p>
            <p className="text-[12px] text-gray-500 leading-tight">
              Get simple explanations in your language to help your child better. 
              <span className="text-emerald-700 font-semibold block mt-1 hover:underline cursor-pointer" onClick={() => onNavigate('voice')}>Ask homework question →</span>
            </p>
          </div>
        </div>

        <h1 className="text-[24px] font-semibold text-center mb-8">What can I help with?</h1>

        <div className="grid grid-cols-2 gap-2 w-full max-w-[310px] mb-2">
          <Card
            icon={ImageIcon}
            title="Create image"
            iconColor="text-green-600"
          />
          <Card
            icon={Lightbulb}
            title="Make a plan"
            iconColor="text-yellow-500"
          />
          <Card
            icon={GraduationCap}
            title="Get advice"
            iconColor="text-blue-500"
          />
          <Card
            icon={Sparkles}
            title="Surprise me"
            iconColor="text-cyan-400"
          />
        </div>


        <div className="w-full max-w-[310px] flex justify-center mt-2">
          <Card
            icon={BookOpen}
            title="Homework Helper"
            subtitle="Ask your child's homework question in your language"
            iconColor="text-emerald-600"
            centered={true}
            onClick={() => onNavigate('voice')}
          />
        </div>
      </main>

      {/* Bottom Input Area */}
      <footer className="p-4 bg-white sticky bottom-0">
        <div className="flex items-center gap-3 p-1.5 pl-4 bg-gray-50 border border-gray-200 rounded-full shadow-sm">
          <Plus size={20} className="text-gray-500" />
          <input
            type="text"
            placeholder="Ask ChatGPT"
            className="flex-1 bg-transparent border-none outline-none text-[16px] py-2 placeholder-gray-400"
            disabled
          />
          <div className="p-2 text-gray-400 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
            <Mic size={20} />
          </div>
          <div
            onClick={() => onNavigate('chatgpt-voice')}
            className="p-2 bg-black text-white rounded-full shadow-md active:scale-95 transition-transform cursor-pointer"
          >
            <AudioLines size={20} strokeWidth={2.5} />
          </div>
        </div>
      </footer>
    </motion.div>
  );
};

export default HomeDiscovery;
