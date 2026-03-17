import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Mic, Sparkles, BookOpen, Globe, Check, ChevronDown, PenTool, Beaker, Calculator } from 'lucide-react';

const VoiceHelper = ({ onBack, onSpeak, selectedLang, setSelectedLang }) => {
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const timerRef = useRef(null);

  const handleMicClick = () => {
    if (isListening) {
      if (timerRef.current) clearTimeout(timerRef.current);
      onSpeak("Essay likhne mein help chahiye");
      return;
    }

    setIsListening(true);
    timerRef.current = setTimeout(() => {
      onSpeak("Essay likhne mein help chahiye");
    }, 3000); // 3 seconds for better experience
  };

  const translations = {
    'Hindi': {
      title: 'होमवर्क पूछो',
      subtitle: 'टैप करके सवाल पूछो',
      tooltip: 'अपनी भाषा में पूछने के लिए टैप करें',
      listeningTitle: 'सुन रहा हूँ...',
      listeningSubtitle: 'बोलिए, मैं सुन रहा हूँ',
      listeningStop: 'रोकने के लिए टैप करें',
      suggestions: ["Essay लिखने में मदद चाहिए", "Photosynthesis क्या है?", "मैथ्स में मदद चाहिए"]
    },
    'Hinglish': {
      title: 'Homework Poocho',
      subtitle: 'Tap karke sawaal poochho',
      tooltip: 'Apni language mein poochhne ke liye tap karein',
      listeningTitle: 'Listening...',
      listeningSubtitle: 'Boliye, main sun raha hoon',
      listeningStop: 'Tap to stop',
      suggestions: ["Essay likhne mein help chahiye", "Photosynthesis samjhao", "Maths help chahiye"]
    },
    'Bengali': {
      title: 'হোমওয়ার্ক জিজ্ঞাসা করুন',
      subtitle: 'ট্যাপ করে প্রশ্ন করুন',
      tooltip: 'আপনার পছন্দের ভাষায় কথা বলতে ট্যাপ করুন',
      listeningTitle: 'শুনছি...',
      listeningSubtitle: 'বলুন, আমি শুনছি',
      listeningStop: 'থামাতে ট্যাপ করুন',
      suggestions: ["রচনা লিখতে সাহায্য চাই", "সালোকসংশ্লেষ কি?", "গণিতে সাহায্য চাই"]
    },
    'Marathi': {
      title: 'होमवर्क विचारा',
      subtitle: 'टॅप करून प्रश्न विचारा',
      tooltip: 'तुमच्या भाषेत विचारण्यासाठी टॅप करा',
      listeningTitle: 'ऐकत आहे...',
      listeningSubtitle: 'बोला, मी ऐकत आहे',
      listeningStop: 'थांबवण्यासाठी टॅप करा',
      suggestions: ["निबंध लिहिण्यासाठी मदत हवी आहे", "प्रकाशसंश्लेषण म्हणजे काय?", "गणितात मदत हवी आहे"]
    },
    'Tamil': {
      title: 'வீட்டுப்பாடம் கேளுங்கள்',
      subtitle: 'தட்டி கேள்வி கேளுங்கள்',
      tooltip: 'உங்கள் மொழியில் கேட்க தட்டவும்',
      listeningTitle: 'கேட்டுக்கொண்டிருக்கிறேன்...',
      listeningSubtitle: 'பேசுங்கள், நான் கேட்கிறேன்',
      listeningStop: 'நிறுத்த தட்டவும்',
      suggestions: ["கட்டுரை எழுத உதவி வேண்டும்", "ஒளிச்சேர்க்கை என்றால் என்ன?", "கணக்கில் உதவி வேண்டும்"]
    },
    'Telugu': {
      title: 'హోంవర్క్ అడగండి',
      subtitle: 'ట్యాప్ చేసి ప్రశ్న అడగండి',
      tooltip: 'మీ భాషలో అడగడానికి ట్యాప్ చేయండి',
      listeningTitle: 'వింటున్నాను...',
      listeningSubtitle: 'మాట్లాడండి, నేను వింటున్నాను',
      listeningStop: 'ఆపడానికి ట్యాప్ చేయండి',
      suggestions: ["వ్యాసం రాయడంలో సహాయం కావాలి", "కిరణజన్య సంయోగక్రియ అంటే ఏమిటి?", "గణితంలో సహాయం కావాలి"]
    },
    'Gujarati': {
      title: 'હોમવર્ક પૂછો',
      subtitle: 'ટેપ કરીને પ્રશ્ન પૂછો',
      tooltip: 'તમારી ભાષામાં પૂછવા માટે ટેપ કરો',
      listeningTitle: 'સાંભળી રહ્યો છું...',
      listeningSubtitle: 'બોલો, હું સાંભળી રહ્યો છું',
      listeningStop: 'અટકાવવા માટે ટેપ કરો',
      suggestions: ["નિબંધ લખવામાં મદદ જોઈએ છે", "પ્રકાશસંશ્લેષણ શું છે?", "ગણિતમાં મદદ જોઈએ છે"]
    },
    'English': {
      title: 'Ask Homework',
      subtitle: 'Tap to ask a question',
      tooltip: 'Tap to ask in your preferred language',
      listeningTitle: 'Listening...',
      listeningSubtitle: "Speak, I'm listening",
      listeningStop: 'Tap to stop',
      suggestions: ["Need help writing an essay", "Explain Photosynthesis", "Need help with Maths"]
    },
    'Punjabi': {
      title: 'ਹੋਮਵਰਕ ਪੁੱਛੋ',
      subtitle: 'ਟੈਪ ਕਰਕੇ ਸਵਾਲ ਪੁੱਛੋ',
      tooltip: 'ਆਪਣੀ ਭਾਸ਼ਾ ਵਿੱਚ ਪੁੱਛਣ ਲਈ ਟੈਪ ਕਰੋ',
      listeningTitle: 'ਸੁਣ ਰਿਹਾ ਹਾਂ...',
      listeningSubtitle: 'ਬੋਲੋ, ਮੈਂ ਸੁਣ ਰਿਹਾ ਹਾਂ',
      listeningStop: 'ਰੋਕਣ ਲਈ ਟੈਪ ਕਰੋ',
      suggestions: ["ਲੇਖ ਲਿਖਣ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ ਹੈ", "ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ ਕੀ ਹੈ?", "ਗਣਿਤ ਵਿੱਚ ਮਦਦ ਚਾਹੀਦੀ ਹੈ"]
    },
    'Urdu': {
      title: 'ہوم ورک پوچھیں',
      subtitle: 'ٹیپ کر کے سوال پوچھیں',
      tooltip: 'اپنی زبان میں پوچھنے کے لیے ٹیپ کریں',
      listeningTitle: 'سن رہا ہوں...',
      listeningSubtitle: 'بولیے، میں سن رہا ہوں',
      listeningStop: 'روکنے کے لیے ٹیپ کریں',
      suggestions: ["مضمون لکھنے میں مدد چاہیے", "فوٹو سنتھیسس کیا ہے؟", "ریاضی میں مدد چاہیے"]
    }
  };

  const currentStrings = translations[selectedLang.name] || translations['Hindi'];

  const languages = [
    { name: 'Hindi', native: 'हिंदी' },
    { name: 'Hinglish', native: 'Hinglish' },
    { name: 'English', native: 'English' },
    { name: 'Bengali', native: 'বাংলা' },
    { name: 'Marathi', native: 'मराठी' },
    { name: 'Tamil', native: 'தமிழ்' },
    { name: 'Telugu', native: 'తెలుగు' },
    { name: 'Gujarati', native: 'ગુજરાતી' },
    { name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { name: 'Urdu', native: 'اردو' }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-white relative overflow-hidden"
    >
      {/* Header */}
      <header className="px-4 py-3 flex items-center justify-between bg-white/80 backdrop-blur-sm sticky top-0 z-20 border-b border-gray-50">
        <div className="flex items-center">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full transition-colors mr-1">
            <ChevronLeft size={24} className="text-gray-700" />
          </button>
          <span className="text-[17px] font-bold text-gray-800 ml-1">Homework Helper</span>
        </div>

        {/* Language Selector */}
        <div className="relative">
          <button 
            onClick={() => setShowLangMenu(!showLangMenu)}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full text-emerald-700 active:scale-95 transition-transform"
          >
            <Globe size={14} />
            <span className="text-[13px] font-bold">{selectedLang.name}</span>
            <ChevronDown size={14} className={`transition-transform duration-200 ${showLangMenu ? 'rotate-180' : ''}`} />
          </button>

          <AnimatePresence>
            {showLangMenu && (
              <>
                <div 
                  className="fixed inset-0 z-30" 
                  onClick={() => setShowLangMenu(false)}
                />
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-[180px] bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 z-40 overflow-hidden"
                >
                  <div className="py-2 max-h-[300px] overflow-y-auto">
                    {languages.map((lang) => (
                      <button
                        key={lang.name}
                        onClick={() => {
                          setSelectedLang(lang);
                          setShowLangMenu(false);
                        }}
                        className={`w-full px-4 py-2.5 flex items-center justify-between hover:bg-gray-50 transition-colors ${
                          selectedLang.name === lang.name ? 'bg-emerald-50/50 text-emerald-700' : 'text-gray-600'
                        }`}
                      >
                        <div className="flex flex-col items-start">
                          <span className="text-[14px] font-bold">{lang.name}</span>
                          <span className="text-[11px] opacity-60 font-medium">{lang.native}</span>
                        </div>
                        {selectedLang.name === lang.name && <Check size={14} className="text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center px-8 pb-12 overflow-y-auto">
        {/* Animated Mic Section */}
        <div className="relative mb-12">
          {/* Floating Tooltip */}
          <motion.div 
            initial={{ y: 0, opacity: 0, scale: 0.9 }}
            animate={{ 
              y: [0, -8, 0], 
              opacity: 1, 
              scale: 1 
            }}
            transition={{ 
              y: { repeat: Infinity, duration: 2, ease: "easeInOut" },
              opacity: { duration: 0.5 },
              scale: { duration: 0.5 }
            }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-gray-900 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl z-20 whitespace-nowrap"
          >
            {isListening ? (
              <>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-[12px] font-black text-emerald-50 uppercase tracking-widest">{currentStrings.listeningStop}</span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </>
            ) : (
              <>
                <Mic size={14} className="text-emerald-400" />
                <span className="text-[12px] font-bold">{currentStrings.tooltip}</span>
                {/* Tooltip triangle */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
              </>
            )}
          </motion.div>

          {/* Wave ripples */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1.6], opacity: [0.3, 0.1, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeOut" }}
            className="absolute inset-0 bg-emerald-400 rounded-full"
          />
          <motion.div 
            animate={{ scale: [1, 1.2, 1.4], opacity: [0.4, 0.2, 0] }}
            transition={{ repeat: Infinity, duration: 2, delay: 0.5, ease: "easeOut" }}
            className="absolute inset-0 bg-emerald-300 rounded-full"
          />
          
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleMicClick}
            className={`relative w-32 h-32 rounded-full flex items-center justify-center text-white transition-all duration-500 z-10 ${
              isListening ? 'bg-gray-900 shadow-[0_0_60px_rgba(16,185,129,0.3)]' : 'bg-emerald-600 shadow-[0_10px_40px_-10px_rgba(5,150,105,0.5)]'
            }`}
          >
            <AnimatePresence mode="wait">
              {isListening ? (
                <motion.div
                  key="listening"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <div className="flex gap-1 items-end h-8">
                    {[0, 1, 2, 3, 4].map(i => (
                      <motion.div
                        key={i}
                        animate={{ height: [10, 30, 10] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                        className="w-1.5 bg-white rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="mic"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                >
                  <Mic size={48} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLang.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center w-full"
          >
            <div className="text-center mb-10 h-20 flex flex-col justify-center">
              <AnimatePresence mode="wait">
                {isListening ? (
                  <motion.div
                    key="listening-text"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                  >
                    <h3 className="text-3xl font-black text-emerald-600 tracking-tight underline decoration-emerald-100 underline-offset-8">{currentStrings.listeningTitle}</h3>
                    <p className="text-gray-400 mt-2 font-medium">{currentStrings.listeningSubtitle}</p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="normal-text"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <h3 className="text-[28px] font-semibold text-gray-900 mb-2">{currentStrings.title}</h3>
                    <p className="text-gray-500 font-medium tracking-tight">{currentStrings.subtitle}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Improved Suggestion Chips */}
            <div className="w-full max-w-[320px] space-y-3 mb-8">
              {!isListening && currentStrings.suggestions.map((text, i) => {
                let Icon = BookOpen;
                if (i === 0) Icon = PenTool;
                if (i === 1) Icon = Beaker;
                if (i === 2) Icon = Calculator;

                return (
                  <motion.button 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => onSpeak(text)}
                    className="w-full p-4 border border-gray-100 rounded-2xl bg-white hover:bg-emerald-50 hover:border-emerald-200 transition-all flex items-center gap-4 text-left group shadow-sm active:scale-98"
                  >
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors shrink-0">
                      <Icon size={20} />
                    </div>
                    <span className="text-[15px] font-bold text-gray-800 leading-tight flex-1">{text}</span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </motion.div>
  );
};

export default VoiceHelper;
