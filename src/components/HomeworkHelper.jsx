import React, { useState, useEffect } from 'react';
import HomeDiscovery from './HomeDiscovery';
import VoiceHelper from './VoiceHelper';
import ResponseScreen from './ResponseScreen';
import ChatGPTVoice from './ChatGPTVoice';
import VoiceSkeleton from './VoiceSkeleton';
import ResponseSkeleton from './ResponseSkeleton';
import { motion, AnimatePresence } from 'framer-motion';

const HomeworkHelper = () => {
  // Initialize state from localStorage if available
  const [currentScreen, setCurrentScreen] = useState(() => {
    const saved = localStorage.getItem('currentScreen');
    // Don't start on a loading screen
    return (saved && !saved.startsWith('loading-')) ? saved : 'home';
  });
  
  const [lastPrompt, setLastPrompt] = useState(() => {
    return localStorage.getItem('lastPrompt') || '';
  });

  const [selectedLang, setSelectedLang] = useState(() => {
    try {
      const saved = localStorage.getItem('userPreferredLanguage');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Error parsing saved language", e);
    }
    return { name: 'Hindi', native: 'हिंदी' };
  });

  const [isLoading, setIsLoading] = useState(false);

  // Persist state to localStorage whenever it changes
  useEffect(() => {
    // Only persist non-loading screens
    if (!currentScreen.startsWith('loading-')) {
      localStorage.setItem('currentScreen', currentScreen);
    }
    localStorage.setItem('lastPrompt', lastPrompt);
    localStorage.setItem('userPreferredLanguage', JSON.stringify(selectedLang));
  }, [currentScreen, lastPrompt, selectedLang]);

  const navigateTo = (screen, prompt = '') => {
    if (prompt) setLastPrompt(prompt);
    
    if (screen === 'voice') {
      setIsLoading(true);
      setCurrentScreen('loading-voice');
      setTimeout(() => {
        setIsLoading(false);
        setCurrentScreen('voice');
      }, 800);
    } else if (screen === 'response') {
      setIsLoading(true);
      setCurrentScreen('loading-response');
      setTimeout(() => {
        setIsLoading(false);
        setCurrentScreen('response');
      }, 1000);
    } else {
      setCurrentScreen(screen);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full max-w-[430px] mx-auto text-black bg-white shadow-xl">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' && (
          <HomeDiscovery 
            key="home" 
            onNavigate={(screen = 'voice') => navigateTo(screen)} 
          />
        )}
        {currentScreen === 'loading-voice' && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <VoiceSkeleton />
          </motion.div>
        )}
        {currentScreen === 'voice' && (
          <VoiceHelper
            key="voice"
            selectedLang={selectedLang}
            setSelectedLang={setSelectedLang}
            onBack={() => navigateTo('home')}
            onSpeak={(prompt) => navigateTo('response', prompt)}
          />
        )}
        {currentScreen === 'chatgpt-voice' && (
          <ChatGPTVoice
            key="chatgpt-voice"
            onBack={() => navigateTo('home')}
          />
        )}
        {currentScreen === 'loading-response' && (
          <motion.div
            key="loading-response"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ResponseSkeleton />
          </motion.div>
        )}
        {currentScreen === 'response' && (
          <ResponseScreen
            key="response"
            prompt={lastPrompt}
            selectedLang={selectedLang}
            onBack={() => navigateTo('voice')}
            onAskAnother={() => navigateTo('voice')}
            onGoHome={() => navigateTo('home')}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomeworkHelper;
