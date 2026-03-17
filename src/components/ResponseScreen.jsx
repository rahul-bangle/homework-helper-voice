import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Volume2, Mic, RefreshCw, Home, AlertCircle, Sparkles } from 'lucide-react';

const ResponseScreen = ({ prompt, onBack, onAskAnother, onGoHome, selectedLang }) => {
  const translations = {
    'Hindi': {
      yourQuestion: "आपका सवाल:",
      playVoice: "आवाज़ सुनिए (Play Voice)",
      explainHeading: "बच्चे को ऐसे समझाएं:",
      nextQuestion: "अगला सवाल",
      goHome: "होम पेज",
      essay: {
        ans: "Essay (nibandh) likhne ke liye sabse pehle ek accha topic chuniye, phir introduction, body paragraphs aur conclusion likhiye.",
        ex: "Jaise hum ek story sunate hain, waise hi essay mein humein apne thoughts ko line-by-line likhna hota hai."
      },
      maths: {
        ans: "Maths ke sawal hal karne ke liye pehle formula samajhna zaroori hai. Aap mujhe specific sawal bataiye, main step-by-step samjha doonga.",
        ex: "Maths ek game ki tarah hai, agar hum rules (formulas) samajh lein toh solution nikalna asaan ho jata hai."
      },
      science: {
        ans: "Photosynthesis ek process hai jisme plants sunlight, pani aur carbon dioxide ka use karke apna khana (glucose) banate hain.",
        ex: "Jaise hum kitchen mein khana banate hain, plants dhoop (sunlight) mein apna khana banate hain."
      },
      generic: {
        ans: "Main aapke is sawal ka jawab dhoondne mein madad kar sakta hoon. Yeh ek bahut hi dilchasp sawal hai!",
        ex: "Har sawal ka ek naya jawab hota hai, chalo milkar seekhte hain!"
      }
    },
    'Bengali': {
      yourQuestion: "আপনার প্রশ্ন:",
      playVoice: "ভয়েস শুনুন (Play Voice)",
      explainHeading: "শিশুকে এভাবে বোঝান:",
      nextQuestion: "পরবর্তী প্রশ্ন",
      goHome: "হোম পেজ",
      essay: {
        ans: "একটি প্রবন্ধ লিখতে হলে প্রথমে একটি ভালো বিষয় বেছে নিন, তারপর ভূমিকা, মূল অংশ এবং উপসংহার লিখুন। আমি আপনাকে সাহায্য করতে পারি।",
        ex: "যেমন আমরা একটি গল্প বলি, প্রবন্ধের ক্ষেত্রেও আমাদের চিন্তাভাবনাগুলোকে একের পর এক লিখতে হয়।"
      },
      maths: {
        ans: "অঙ্কের সমস্যার সমাধানের জন্য প্রথমে সূত্রটি বোঝা জরুরি। আমাকে আপনার প্রশ্নটি বলুন, আমি ধাপে ধাপে বুঝিয়ে দেব।",
        ex: "অঙ্ক একটি খেলার মতো, যদি আমরা নিয়মগুলো (সূত্র) বুঝে নিই তবে সমাধান পাওয়া সহজ হয়ে যায়।"
      },
      science: {
        ans: "সালোকসংশ্লেষ হলো এমন একটি প্রক্রিয়া যার মাধ্যমে উদ্ভিদ সূর্যালোক, জল এবং কার্বন ডাই অক্সাইড ব্যবহার করে নিজের খাদ্য তৈরি করে।",
        ex: "যেমন আমরা রান্নাঘরে খাবার তৈরি করি, উদ্ভিদও সূর্যের আলোতে নিজেদের খাবার তৈরি করে।"
      },
      generic: {
        ans: "আমি আপনার এই প্রশ্নের উত্তর খুঁজে পেতে সাহায্য করতে পারি। এটি একটি খুব আকর্ষণীয় প্রশ্ন!",
        ex: "প্রতিটি প্রশ্নের একটি নতুন উত্তর থাকে, চলুন একসঙ্গে শিখি!"
      }
    },
    'Marathi': {
      yourQuestion: "तुमचा प्रश्न:",
      playVoice: "आवाज ऐका (Play Voice)",
      explainHeading: "मुलाला असे समजावून सांगा:",
      nextQuestion: "पुढील प्रश्न",
      goHome: "होम पेज",
      essay: {
        ans: "निबंध लिहिण्यासाठी सर्वात आधी एक चांगला विषय निवडा, मग प्रस्तावना, मुख्य भाग आणि समारोप लिहा. मी तुम्हाला मदत करू शकतो.",
        ex: "जसे आपण एखादी गोष्ट सांगतो, तसेच निबंधात आपल्याला आपले विचार ओळीने लिहावे लागतात."
      },
      maths: {
        ans: "गणिताचे प्रश्न सोडवण्यासाठी आधी सूत्र समजून घेणे महत्त्वाचे आहे. तुम्ही मला तुमचा प्रश्न सांगा, मी स्टेप-बाय-स्टेप समजावून सांगेन.",
        ex: "गणित एका खेळासारखे आहे, जर आपण नियम (सूत्रे) समजून घेतली तर उत्तर शोधणे सोपे होते."
      },
      science: {
        ans: "प्रकाशसंश्लेषण ही अशी प्रक्रिया आहे ज्यामध्ये वनस्पती सूर्यप्रकाश, पाणी आणि कार्बन डायऑक्साइड वापरून स्वतःचे अन्न तयार करतात.",
        ex: "जसे आपण स्वयंपाकघरात अन्न बनवतो, तसे वनस्पती सूर्यप्रकाशात स्वतःचे अन्न बनवतात."
      },
      generic: {
        ans: "मी तुमच्या प्रश्नाचे उत्तर शोधण्यात मदत करू शकतो. हा खूप मनोरंजक प्रश्न आहे!",
        ex: "प्रत्येक प्रश्नाचे एक नवीन उत्तर असते, चला मिळून शिकूया!"
      }
    },
    'Tamil': {
      yourQuestion: "உங்கள் கேள்வி:",
      playVoice: "குரலைக் கேளுங்கள் (Play Voice)",
      explainHeading: "குழந்தைக்கு இப்படி விளக்குங்கள்:",
      nextQuestion: "அடுத்த கேள்வி",
      goHome: "முகப்புப் பக்கம்",
      essay: {
        ans: "கட்டுரை எழுத முதலில் ஒரு நல்ல தலைப்பைத் தேர்ந்தெடுங்கள், பிறகு முன்னுரை, உடல் பகுதி மற்றும் முடிவுரையை எழுதுங்கள். நான் உங்களுக்கு உதவ முடியும்.",
        ex: "நாம் ஒரு கதையைச் சொல்வது போல, கட்டுரையில் நமது சிந்தனைகளை வரிசையாக எழுத வேண்டும்."
      },
      maths: {
        ans: "கணிதக் கணக்குகளைத் தீர்க்க முதலில் சூத்திரத்தைப் புரிந்துகொள்வது அவசியம். உங்கள் கேள்வியைச் சொல்லுங்கள், நான் விளக்குகிறேன்.",
        ex: "கணிதம் ஒரு விளையாட்டு போன்றது, நாம் விதிகளைப் (சூத்திரங்கள்) புரிந்து கொண்டால் தீர்வு காண்பது எளிது."
      },
      science: {
        ans: "ஒளிச்சேர்க்கை என்பது தாவரங்கள் சூரிய ஒளி, நீர் மற்றும் கார்பன் டை ஆக்சைடைப் பயன்படுத்தி தங்கள் உணவைத் தயாரிக்கும் ஒரு செயல்முறையாகும்.",
        ex: "நாம் சமையலறையில் உணவு சமைப்பது போல, தாவரங்கள் சூரிய ஒளியில் தங்கள் உணவைத் தயாரிக்கின்றன."
      },
      generic: {
        ans: "உங்கள் கேள்விக்கான பதிலைக் கண்டறிய நான் உதவ முடியும். இது மிகவும் சுவாரஸ்யமான கேள்வி!",
        ex: "ஒவ்வொரு கேள்விக்கும் ஒரு புதிய பதில் உள்ளது, ஒன்றாகக் கற்றுக்கொள்வோம்!"
      }
    },
    'Telugu': {
      yourQuestion: "మీ ప్రశ్న:",
      playVoice: "వాయిస్ వినండి (Play Voice)",
      explainHeading: "పిల్లలకి ఇలా వివరించండి:",
      nextQuestion: "తదుపరి ప్రశ్న",
      goHome: "హోమ్ పేజీ",
      essay: {
        ans: "వ్యాసం రాయడానికి ముందుగా ఒక మంచి అంశాన్ని ఎంచుకోండి, ఆపై పరిచయం, విషయం మరియు ముగింపు రాయండి. నేను మీకు సహాయం చేయగలను.",
        ex: "మనం ఒక కథ చెప్పేటప్పుడు ఎలాగో, వ్యాసంలో మన ఆలోచనలను క్రమ పద్ధతిలో రాయాలి."
      },
      maths: {
        ans: "గణిత సమస్యలను పరిష్కరించడానికి ముందుగా ఫార్ములాను అర్థం చేసుకోవడం ముఖ్యం. మీ ప్రశ్న చెప్పండి, నేను వివరిస్తాను.",
        ex: "గణితం ఒక ఆట లాంటిది, మనం నియమాలు (ఫార్ములాలు) అర్థం చేసుకుంటే సమాధానం కనుగొనడం సులభం."
      },
      science: {
        ans: "కిరణజన్య సంయోగక్రియ అనేది మొక్కలు సూర్యరశ్మి, నీరు మరియు కార్బన్ డై ఆక్సైడ్‌ని ఉపయోగించి తమ ఆహారాన్ని తయారు చేసుకునే ప్రక్రియ.",
        ex: "మనం వంటగదిలో ఆహారం ఎలా వండుకుంటామో, మొక్కలు సూర్యరశ్మిలో తమ ఆహారాన్ని తయారు చేసుకుంటాయి."
      },
      generic: {
        ans: "మీ ప్రశ్నకు సమాధానం కనుగొనడంలో నేను సహాయం చేయగలను. ఇది చాలా ఆసక్తికరమైన ప్రశ్న!",
        ex: "ప్రతి ప్రశ్నకు ఒక కొత్త సమాధానం ఉంటుంది, కలిసి నేర్చుకుందాం!"
      }
    },
    'Gujarati': {
      essay: {
        ans: "નિબંધ લખવા માટે સૌથી પહેલા એક સારો વિષય પસંદ કરો, પછી પ્રસ્તાવના, મુખ્ય ભાગ અને ઉપસંહાર લખો. હું તમને મદદ કરી શકું છું.",
        ex: "જેમ આપણે કોઈ વાર્તા કહીએ છીએ, તેમ નિબંધમાં આપણે આપણા વિચારોને ક્રમબદ્ધ રીતે લખવાના હોય છે."
      },
      maths: {
        ans: "ગણિતના દાખલા ઉકેલવા માટે પહેલા સૂત્ર સમજવું જરૂરી છે. તમે મને તમારો પ્રશ્ન કહો, હું સ્ટેપ-બાય-સ્ટેપ સમજાવીશ.",
        ex: "ગણિત એક રમત જેવું છે, જો આપણે નિયમો (સૂત્રો) સમજી લઈએ તો ઉકેલ શોધવો સરળ બની જાય છે."
      },
      science: {
        ans: "પ્રકાશસંશ્લેષણ એ એવી પ્રક્રિયા છે જેમાં વનસ્પતિ સૂર્યપ્રકાશ, પાણી અને કાર્બન ડાયોક્સાઈડનો ઉપયોગ કરીને પોતાનો ખોરાક બનાવે છે.",
        ex: "જેમ આપણે રસોડામાં રસોઈ કરીએ છીએ, તેમ વનસ્પતિ સૂર્યપ્રકાશમાં પોતાનો ખોરાક બનાવે છે."
      },
      generic: {
        ans: "હું તમારા પ્રશ્નનો જવાબ શોધવામાં મદદ કરી શકું છું. આ ખૂબ જ રસપ્રદ પ્રશ્ન છે!",
        ex: "દરેક પ્રશ્નનો એક નવો જવાબ હોય છે, ચાલો સાથે મળીને શીખીએ!"
      }
    },
    'English': {
      essay: {
        ans: "To write an essay, first choose a good topic, then write the introduction, body paragraphs, and conclusion.",
        ex: "Tell your child: 'Just like telling a story, we need to write down our thoughts line-by-line in an essay.'"
      },
      maths: {
        ans: "To solve math problems, it is important to understand the formula first. Tell me the specific question, and I will explain it step-by-step.",
        ex: "Tell your child: 'Math is like a game; if we understand the rules (formulas), finding the solution becomes easy.'"
      },
      science: {
        ans: "Photosynthesis is the process by which plants make their own food using sunlight, water, and carbon dioxide.",
        ex: "Tell your child: 'Just like we cook food in the kitchen, plants make their food in the sunlight.'"
      },
      generic: {
        ans: "I can help you find the answer to this question. This is a very interesting question!",
        ex: "Every question has a new answer, let's learn together!"
      }
    },
    'Punjabi': {
      essay: {
        ans: "ਲੇਖ ਲਿਖਣ ਲਈ ਸਭ ਤੋਂ ਪਹਿਲਾਂ ਇਕ ਵਧੀਆ ਵਿਸ਼ਾ ਚੁਣੋ, ਫਿਰ ਜਾਣ-ਪਛਾਣ, ਮੁੱਖ ਭਾਗ ਅਤੇ ਅਖੀਰਲਾ ਭਾਗ ਲਿਖੋ। ਮੈਂ ਤੁਹਾਡੀ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ।",
        ex: "ਜਿਵੇਂ ਅਸੀਂ ਕੋਈ ਕਹਾਣੀ ਸੁਣਾਉਂਦੇ ਹਾਂ, ਉਸੇ ਤਰ੍ਹਾਂ ਲੇਖ ਵਿੱਚ ਸਾਨੂੰ ਆਪਣੇ ਵਿਚਾਰਾਂ ਨੂੰ ਲਾਈਨ-ਵਾਰ ਲਿਖਣਾ ਹੁੰਦਾ ਹੈ।"
      },
      maths: {
        ans: "ਗਣਿਤ ਦੇ ਸਵਾਲ ਹੱਲ ਕਰਨ ਲਈ ਪਹਿਲਾਂ ਫਾਰਮੂਲਾ ਸਮਝਣਾ ਜ਼ਰੂਰੀ ਹੈ। ਤੁਸੀਂ ਮੈਨੂੰ ਆਪਣਾ ਸਵਾਲ ਦੱਸੋ, ਮੈਂ ਸਟੈਪ-ਬਾਈ-ਸਟੈਪ ਸਮਝਾ ਦਿਆਂਗਾ।",
        ex: "ਗਣਿਤ ਇਕ ਖੇਡ ਵਾਂਗ ਹੈ, ਜੇ ਅਸੀਂ ਨਿਯਮਾਂ (ਫਾਰਮੂਲੇ) ਨੂੰ ਸਮਝ ਲਈਏ ਤਾਂ ਹੱਲ ਲੱਭਣਾ ਆਸਾਨ ਹੋ ਜਾਂਦਾ ਹੈ।"
      },
      science: {
        ans: "ਪ੍ਰਕਾਸ਼ ਸੰਸ਼ਲੇਸ਼ਣ ਉਹ ਪ੍ਰਕਿਰਿਆ ਹੈ ਜਿਸ ਰਾਹੀਂ ਪੌਦੇ ਸੂਰਜ ਦੀ ਰੌਸ਼ਨੀ, ਪਾਣੀ ਅਤੇ ਕਾਰਬਨ ਡਾਈਆਕਸਾਈਡ ਦੀ ਵਰਤੋਂ ਕਰਕੇ ਆਪਣਾ ਭੋਜਨ ਬਣਾਉਂਦੇ ਹਨ।",
        ex: "ਜਿਵੇਂ ਅਸੀਂ ਰਸੋਈ ਵਿੱਚ ਖਾਣਾ ਬਣਾਉਂਦੇ ਹਾਂ, ਪੌਦੇ ਸੂਰਜ ਦੀ ਰੌਸ਼ਨੀ ਵਿੱਚ ਆਪਣਾ ਖਾਣਾ ਬਣਾਉਂਦੇ ਹਨ।"
      },
      generic: {
        ans: "ਮੈਂ ਤੁਹਾਡੇ ਇਸ ਸਵਾਲ ਦਾ ਜਵਾਬ ਲੱਭਣ ਵਿੱਚ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ। ਇਹ ਬਹੁਤ ਹੀ ਦਿਲਚਸਪ ਸਵਾਲ ਹੈ!",
        ex: "ਹਰ ਸਵਾਲ ਦਾ ਇਕ ਨਵਾਂ ਜਵਾਬ ਹੁੰਦਾ ਹੈ, ਚਲੋ ਮਿਲ ਕੇ ਸਿੱਖਦੇ ਹਾਂ!"
      }
    },
    'Urdu': {
      essay: {
        ans: "مضمون لکھنے کے لیے سب سے پہلے ایک اچھا عنوان منتخب کریں، پھر تعارف، نفس مضمون اور اختتام لکھیں۔ میں آپ کی مدد کر سکتا ہوں۔",
        ex: "جیسے ہم کوئی کہانی سناتے ہیں، ویسے ہی مضمون میں ہمیں اپنے خیالات کو ترتیب سے لکھنا ہوتا ہے۔"
      },
      maths: {
        ans: "ریاضی کے سوالات حل کرنے کے لیے پہلے فارمولے کو سمجھنا ضروری ہے۔ آپ مجھے اپنا سوال بتائیں، میں مرحلہ وار سمجھا دوں گا۔",
        ex: "ریاضی ایک کھیل کی طرح ہے، اگر ہم اصول (فارمولے) سمجھ لیں تو حل نکالنا آسان ہو جاتا ہے۔"
      },
      science: {
        ans: "فوٹو سنتھیسس وہ عمل ہے جس کے ذریعے پودے سورجની روشنی، پانی اور کاربن ڈائی آکسائیڈ کا استعمال کرتے ہوئے اپنی خوراک بناتے ہیں۔",
        ex: "جیسے ہم باورچی خانے میں کھانا بناتے ہیں، پودے سورج کی روشنی میں اپنی خوراک بناتے ہیں۔"
      },
      generic: {
        ans: "میں آپ کے اس سوال کا جواب تلاش کرنے میں مدد کر سکتا ہوں۔ یہ ایک بہت ہی دلچسپ سوال ہے!",
        ex: "ہر سوال کا ایک نیا جواب ہوتا ہے، چلو مل کر سیکھتے ہیں!"
      }
    }
  };

  const getDynamicContent = (input, langName) => {
    const p = (input || "").toLowerCase();
    const lang = translations[langName] || translations['Hindi'];
    const fallback = translations['Hindi'];
    
    let category = 'generic';
    if (p.includes('essay') || p.includes('nibandh') || p.includes('ਰਚਨਾ') || p.includes('مضمون')) category = 'essay';
    else if (p.includes('math') || p.includes('ganit') || p.includes('मैथ्स') || p.includes('অঙ্ক') || p.includes('கணிதம்')) category = 'maths';
    else if (p.includes('photo') || p.includes('prakas') || p.includes('বিজ্ঞান')) category = 'science';

    return {
      answer: lang[category].ans,
      example: lang[category].ex,
      labels: {
        yourQuestion: lang.yourQuestion || fallback.yourQuestion,
        playVoice: lang.playVoice || fallback.playVoice,
        explainHeading: lang.explainHeading || fallback.explainHeading,
        nextQuestion: lang.nextQuestion || fallback.nextQuestion,
        goHome: lang.goHome || fallback.goHome
      }
    };
  };

  const { answer, example, labels } = getDynamicContent(prompt, selectedLang.name);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-gray-50"
    >
      <header className="p-4 bg-white border-b border-gray-100 flex items-center justify-between sticky top-0 z-20">
        <button onClick={onBack} className="p-2 hover:bg-gray-100 rounded-full">
          <ChevronLeft size={24} />
        </button>
        <span className="font-bold text-emerald-600 text-lg">Homework Helper</span>
        <div className="w-10" />
      </header>

      <main className="flex-1 p-6 space-y-6 overflow-y-auto pb-32">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-gray-400 text-sm font-medium uppercase tracking-wider">{labels.yourQuestion}</h3>
          </div>
          <p className="text-xl font-bold mb-6 text-gray-900 leading-tight">"{prompt || 'Sawal'}"</p>
          
          <div className="h-px bg-gray-100 mb-6" />

          <div className="space-y-5">
            <p className="text-[19px] font-medium leading-relaxed text-gray-800">
              {answer}
            </p>
            
            <button className="flex items-center gap-3 px-5 py-4 bg-emerald-600 text-white rounded-2xl font-bold w-full active:scale-95 transition-all shadow-md shadow-emerald-100">
              <Volume2 size={22} />
              {labels.playVoice}
            </button>
          </div>
        </div>

        <div className="bg-blue-50/80 p-6 rounded-3xl border border-blue-100">
          <h4 className="text-blue-700 font-bold mb-2 flex items-center gap-2">
            <Sparkles size={18} />
            {labels.explainHeading}
          </h4>
          <p className="text-blue-900 leading-relaxed text-[15px]">
            {example}
          </p>
        </div>
      </main>

      <footer className="p-4 bg-white border-t border-gray-100 sticky bottom-0 grid grid-cols-2 gap-3">
        <button 
          onClick={onAskAnother}
          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-2xl hover:bg-gray-50"
        >
          <Mic size={24} className="mb-1 text-emerald-600" />
          <span className="text-xs font-bold">{labels.nextQuestion}</span>
        </button>
        <button 
          onClick={onGoHome}
          className="flex flex-col items-center justify-center p-3 border border-gray-200 rounded-2xl hover:bg-gray-50"
        >
          <Home size={24} className="mb-1 text-gray-600" />
          <span className="text-xs font-bold">{labels.goHome}</span>
        </button>
      </footer>
    </motion.div>
  );
};

export default ResponseScreen;
