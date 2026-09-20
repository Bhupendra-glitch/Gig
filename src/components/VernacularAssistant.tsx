import React, { useState, useEffect, useRef } from 'react';
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Send,
  Sparkles,
  Bot,
  User,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Compass,
  ArrowRight,
} from 'lucide-react';
import {
  GigPersona,
  IncomeTwinVariables,
  IndianLanguage,
  VernacularAssistantResponse,
} from '../types';
import { getTranslations, LANGUAGE_OPTIONS } from '../utils/translations';

interface VernacularAssistantProps {
  persona: GigPersona;
  selectedLanguage: IndianLanguage;
  onLanguageChange: (lang: IndianLanguage) => void;
  simulationVariables: IncomeTwinVariables;
  currentCashflowScore: number;
}

interface Message {
  id: string;
  sender: 'user' | 'assistant';
  text: string;
  responseObj?: VernacularAssistantResponse;
  timestamp: string;
}

const getWelcomeMessage = (lang: IndianLanguage, personaName: string): string => {
  switch (lang) {
    case 'hi':
      return `नमस्ते ${personaName}! मैं आपका GigCred AI वित्तीय सलाहकार हूँ। आप मुझसे बोलकर या लिखकर पूछ सकते हैं कि क्या आप नया लोन ले सकते हैं, EMI कैसे कम करें, या आय में उतार-चढ़ाव से कैसे निपटें।`;
    case 'ta':
      return `வணக்கம் ${personaName}! நான் உங்கள் GigCred AI நிதி வழிகாட்டி. புதிய கடன் பாதுகாப்பு, EMI மேலாண்மை அல்லது கிரெடிட் மேம்பாடு பற்றி என்னிடம் தமிழில் கேட்கலாம்.`;
    case 'te':
      return `నమస్కారం ${personaName}! నేను మీ GigCred AI ఫైనాన్షియల్ మెంటార్‌ని. కొత్త లోన్ భద్రత, EMI నిర్వహణ లేదా క్రెడిట్ స్కోర్ మెరుగుదల గురించి నాతో తెలుగులో మాట్లాడవచ్చు.`;
    case 'bn':
      return `নমস্কার ${personaName}! আমি আপনার GigCred AI আর্থিক পরামর্শদাতা। নতুন ঋণ, EMI বা ক্রেডিট স্কোর উন্নতির বিষয়ে বাংলায় যেকোনো প্রশ্ন জিজ্ঞাসা করতে পারেন।`;
    case 'mr':
      return `नमस्कार ${personaName}! मी तुमचा GigCred AI आर्थिक मार्गदर्शक आहे. तुम्ही मराठीत नवीन कर्ज, EMI किंवा क्रेडिट स्कोअर सुधारण्याबाबत विचारू शकता.`;
    case 'kn':
      return `ನಮಸ್ಕಾರ ${personaName}! ನಾನು ನಿಮ್ಮ GigCred AI ಹಣಕಾಸು ಮಾರ್ಗದರ್ಶಿ. ಹೊಸ ಸಾಲ, EMI ಅಥವಾ ಕ್ರೆಡಿಟ್ ಸ್ಕೋರ್ ಸುಧಾರಣೆ ಬಗ್ಗೆ ಕನ್ನಡದಲ್ಲಿ ನನ್ನನ್ನು ಕೇಳಬಹುದು.`;
    default:
      return `Hello ${personaName}! I am your GigCred AI Financial Mentor. You can ask me questions via voice or text in your native language about loan safety, EMI affordability, or your credit roadmap.`;
  }
};

const getInputPlaceholder = (lang: IndianLanguage): string => {
  switch (lang) {
    case 'hi':
      return 'यहाँ हिन्दी में पूछें (उदा. क्या मैं ₹20,000 का लोन ले सकता हूँ?)...';
    case 'ta':
      return 'தமிழில் கேளுங்கள் (எ.கா. நான் ₹20,000 கடன் வாங்கலாமா?)...';
    case 'te':
      return 'తెలుగులో అడగండి (ఉదా. నేను ₹20,000 రుణం తీసుకోవచ్చా?)...';
    case 'bn':
      return 'এখানে বাংলায় জিজ্ঞাসা করুন (উদা. আমি কি ২০,০০০ টাকার ঋণ নিতে পারি?)...';
    case 'mr':
      return 'येथे मराठीत विचारा (उदा. मी ₹२०,००० चे कर्ज घेऊ शकेन का?)...';
    case 'kn':
      return 'ಕನ್ನಡದಲ್ಲಿ ಕೇಳಿ (ಉದಾ. ನಾನು ₹20,000 ಸಾಲ ಪಡೆಯಬಹುದೇ?)...';
    default:
      return 'Ask a financial question in English or click the mic to speak...';
  }
};

const getFallbackMessage = (lang: IndianLanguage): string => {
  switch (lang) {
    case 'hi':
      return 'आपके वर्तमान वित्तीय डेटा के अनुसार, यह लोन लेने से पहले सुनिश्चित करें कि आपकी कुल मासिक ईएमआई आय के 35% से कम रहे।';
    case 'ta':
      return 'உங்கள் தற்போதைய பணப்புழக்கத்தின்படி, இந்த கடனை வாங்குவதற்கு முன் உங்கள் மாதாந்திர EMI 35% க்கும் குறைவாக இருப்பதை உறுதிப்படுத்தவும்.';
    case 'te':
      return 'మీ ప్రస్తుత ఆర్థిక డేటా ప్రకారం, ఈ రుణం తీసుకునే ముందు మీ నెలవారీ EMI ఆదాయంలో 35% కంటే తక్కువగా ఉండేలా చూసుకోండి.';
    case 'bn':
      return 'আপনার বর্তমান আর্থিক তথ্য অনুযায়ী, এই ঋণ নেওয়ার আগে নিশ্চিত করুন যে আপনার মাসিক EMI উপার্জনের ৩৫% এর নিচে থাকে।';
    case 'mr':
      return 'तुमच्या सध्याच्या आर्थिक स्थितीनुसार, हे कर्ज घेण्यापूर्वी तुमची एकूण मासिक EMI उत्पन्नाच्या 35% पेक्षा कमी असल्याची खात्री करा.';
    case 'kn':
      return 'ನಿಮ್ಮ ಪ್ರಸ್ತುತ ಆರ್ಥಿಕ ಡೇಟಾದ ಪ್ರಕಾರ, ಈ ಸಾಲ ಪಡೆಯುವ ಮೊದಲು ನಿಮ್ಮ ಮಾಸಿಕ EMI ಆದಾಯದ 35% ಗಿಂತ ಕಡಿಮೆಯಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.';
    default:
      return 'Based on your cashflow, taking this loan increases your debt obligations. Ensure your total EMI stays below 35% FOIR.';
  }
};

export const VernacularAssistant: React.FC<VernacularAssistantProps> = ({
  persona,
  selectedLanguage,
  onLanguageChange,
  simulationVariables,
  currentCashflowScore,
}) => {
  const t = getTranslations(selectedLanguage);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: `welcome-${selectedLanguage}`,
      sender: 'assistant',
      text: getWelcomeMessage(selectedLanguage, persona.name),
      timestamp: 'Just now',
    },
  ]);

  // Synchronize welcome message whenever language or persona changes
  useEffect(() => {
    setMessages((prev) => {
      if (prev.length <= 1) {
        return [
          {
            id: `welcome-${selectedLanguage}-${persona.id}`,
            sender: 'assistant',
            text: getWelcomeMessage(selectedLanguage, persona.name),
            timestamp: 'Just now',
          },
        ];
      }
      return prev;
    });
  }, [selectedLanguage, persona.id, persona.name]);

  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const recognitionRef = useRef<any>(null);

  // Quick prompt questions tailored by language
  const promptSuggestions: Record<IndianLanguage, string[]> = {
    en: [
      'Can I safely manage this ₹20,000 loan?',
      'What happens if my income falls by 20%?',
      'What will happen if I combine these three loans?',
      'How do I build a prime credit profile without CIBIL?',
    ],
    hi: [
      'क्या मैं यह ₹20,000 का ऋण सुरक्षित रूप से ले सकता हूँ?',
      'अगर मेरी डिलीवरी की कमाई 20% गिर जाए तो क्या होगा?',
      'अगर मैं अपने इन तीनों कर्जों को एक साथ मिला लूँ तो क्या लाभ होगा?',
      'बिना सिबिल स्कोर के अपना क्रेडिट स्कोर कैसे बढ़ाएं?',
    ],
    ta: [
      'இந்த ₹20,000 கடனை நான் பாதுகாப்பாக வாங்கலாமா?',
      'எனது வருமானம் 20% குறைந்தால் என்ன ஆகும்?',
      'இந்த மூன்று கடன்களையும் ஒன்றாக இணைத்தால் என்ன நடக்கும்?',
    ],
    te: [
      'నేను ఈ ₹20,000 రుణాన్ని సురక్షితంగా నిర్వహించగలనా?',
      'నా ఆదాయం 20% తగ్గితే ఏమి జరుగుతుంది?',
      'ఈ మూడు రుణాలను కలిపితే ఏమి జరుగుతుంది?',
    ],
    bn: [
      'আমি কি নিরাপদে এই ২০,০০০ টাকার ঋণ নিতে পারি?',
      'আমার আয় ২০% কমে গেলে কী হবে?',
      'এই তিনটি ঋণ একত্রিত করলে কী হবে?',
    ],
    mr: [
      'मी हे ₹२०,००० चे कर्ज सुरक्षितपणे फेडू शकेन का?',
      'माझे उत्पन्न २०% कमी झाल्यास काय होईल?',
      'मी ही तिन्ही कर्जे एकत्र केल्यास काय होईल?',
    ],
    kn: [
      'ನಾನು ಈ ₹20,000 ಸಾಲವನ್ನು ಸುರಕ್ಷಿತವಾಗಿ ನಿಭಾಯಿಸಬಹುದೇ?',
      'ನನ್ನ ಆದಾಯ 20% ಕಡಿಮೆಯಾದರೆ ಏನಾಗುತ್ತದೆ?',
      'ನಾನು ಈ ಮೂರು ಸಾಲಗಳನ್ನು ಸಂಯೋಜಿಸಿದರೆ ಏನಾಗುತ್ತದೆ?',
    ],
  };

  // Speech Recognition (Microphone) Setup
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      // Set language code
      const langCodes: Record<IndianLanguage, string> = {
        en: 'en-IN',
        hi: 'hi-IN',
        ta: 'ta-IN',
        te: 'te-IN',
        bn: 'bn-IN',
        mr: 'mr-IN',
        kn: 'kn-IN',
      };
      recognition.lang = langCodes[selectedLanguage] || 'en-IN';

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputText(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, [selectedLanguage]);

  const toggleListen = () => {
    if (!recognitionRef.current) {
      alert('Voice recognition is not supported in this browser. Please type your question.');
      return;
    }
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsListening(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
      }
    }
  };

  // Text-to-Speech Playback
  const playAudio = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    window.speechSynthesis.cancel();
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const langCodes: Record<IndianLanguage, string> = {
      en: 'en-IN',
      hi: 'hi-IN',
      ta: 'ta-IN',
      te: 'te-IN',
      bn: 'bn-IN',
      mr: 'mr-IN',
      kn: 'kn-IN',
    };
    utterance.lang = langCodes[selectedLanguage] || 'en-IN';
    utterance.rate = 0.95;

    utterance.onstart = () => setIsPlayingAudio(true);
    utterance.onend = () => setIsPlayingAudio(false);
    utterance.onerror = () => setIsPlayingAudio(false);

    window.speechSynthesis.speak(utterance);
  };

  const handleSendMessage = async (queryText?: string) => {
    const question = queryText || inputText;
    if (!question.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: question,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/gemini/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question,
          language: selectedLanguage,
          profileData: {
            name: persona.name,
            segment: persona.role,
            monthlyInflow: persona.monthlyAverageInflow,
            score: currentCashflowScore,
            runwayDays: Math.round(persona.currentLiquidSavings / (persona.monthlyEssentialBurn / 30)),
            foir: Math.round(
              (persona.existingLoans.reduce((s, l) => s + l.monthlyEmi, 0) /
                persona.monthlyAverageInflow) *
                100
            ),
            totalEmi: persona.existingLoans.reduce((s, l) => s + l.monthlyEmi, 0),
          },
          simulationState: {
            actionDescription: `Simulated loan: ₹${simulationVariables.newLoanPrincipal}, Income shock: ${simulationVariables.incomeShockPct}%`,
            projectedFoir: Math.round(
              ((persona.existingLoans.reduce((s, l) => s + l.monthlyEmi, 0) +
                (simulationVariables.newLoanPrincipal > 0 ? 3600 : 0)) /
                persona.monthlyAverageInflow) *
                100
            ),
            projectedBuffer: persona.currentLiquidSavings,
          },
        }),
      });

      const data: VernacularAssistantResponse = await response.json();

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: data.summary,
        responseObj: data,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);

      // Automatically speak vernacular response if available
      if (data.vernacularAudioText) {
        playAudio(data.vernacularAudioText);
      }
    } catch (err: any) {
      console.error('Assistant request failed:', err);
      const fallbackMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'assistant',
        text: getFallbackMessage(selectedLanguage),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 bg-gradient-to-tr from-emerald-600 to-teal-500 text-white rounded-xl shadow-xs">
              <Bot className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 font-display">
                  {t.assistantTitle}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Gemini 3.8 &bull; Voice Enabled
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {t.assistantSubtitle}
              </p>
            </div>
          </div>
        </div>

        {/* Vernacular Language Badges */}
        <div className="flex flex-wrap items-center gap-1 text-xs">
          {LANGUAGE_OPTIONS.map((l) => (
            <button
              key={l.code}
              onClick={() => onLanguageChange(l.code)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                selectedLanguage === l.code
                  ? 'bg-emerald-600 text-white font-bold shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {l.native}
            </button>
          ))}
        </div>
      </div>

      {/* Suggestion Prompts Chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
          {t.quickPromptsLabel}:
        </span>
        <div className="flex flex-wrap gap-2">
          {(promptSuggestions[selectedLanguage] || promptSuggestions.en).map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendMessage(suggestion)}
              className="text-xs bg-slate-50 hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 active:bg-emerald-100 px-3 py-1.5 rounded-xl border border-slate-200 text-slate-700 font-medium transition-all text-left"
            >
              &ldquo;{suggestion}&rdquo;
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Stream */}
      <div className="bg-slate-50/70 rounded-xl p-4 border border-slate-100 max-h-96 overflow-y-auto space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-2.5 ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.sender === 'assistant' && (
              <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 text-xs font-bold shadow-xs">
                GC
              </div>
            )}

            <div
              className={`max-w-[85%] rounded-2xl p-3.5 space-y-2 text-xs leading-relaxed ${
                msg.sender === 'user'
                  ? 'bg-slate-900 text-white rounded-tr-xs'
                  : 'bg-white text-slate-800 border border-slate-200 rounded-tl-xs shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[10px] font-bold opacity-60">
                  {msg.sender === 'user' ? persona.name : 'GigCred Financial Assistant'}
                </span>
                <span className="text-[10px] opacity-40">{msg.timestamp}</span>
              </div>

              <p className="whitespace-pre-line text-[13px]">{msg.text}</p>

              {/* Structured AI Insights Card if returned by Gemini */}
              {msg.responseObj && (
                <div className="mt-3 pt-2.5 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        msg.responseObj.riskVerdict === 'Safe'
                          ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                          : msg.responseObj.riskVerdict === 'Caution'
                          ? 'bg-amber-100 text-amber-800 border-amber-300'
                          : 'bg-rose-100 text-rose-800 border-rose-300'
                      }`}
                    >
                      Verdict: {msg.responseObj.riskVerdict}
                    </span>

                    {msg.responseObj.vernacularAudioText && (
                      <button
                        type="button"
                        onClick={() => playAudio(msg.responseObj!.vernacularAudioText)}
                        className="flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 font-semibold transition-colors"
                      >
                        {isPlayingAudio ? (
                          <VolumeX className="w-3.5 h-3.5 text-rose-600" />
                        ) : (
                          <Volume2 className="w-3.5 h-3.5 text-emerald-600" />
                        )}
                        <span>{isPlayingAudio ? t.stopAudio : t.listenAudio}</span>
                      </button>
                    )}
                  </div>

                  {msg.responseObj.keyReasoning && msg.responseObj.keyReasoning.length > 0 && (
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        {t.keyReasoning}:
                      </span>
                      {msg.responseObj.keyReasoning.map((reason, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-slate-600">
                          <span className="text-emerald-600 font-bold">&bull;</span>
                          <span>{reason}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {msg.responseObj.creditBuildingAction && (
                    <div className="bg-emerald-50/80 p-2.5 rounded-lg border border-emerald-200/80 text-[11px] text-emerald-900 flex items-start gap-1.5">
                      <Compass className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
                      <div>
                        <span className="font-bold block">{t.actionRoadmap}:</span>
                        <span>{msg.responseObj.creditBuildingAction}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {msg.sender === 'user' && (
              <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 text-xs font-bold">
                {persona.avatar}
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-xs text-slate-500 p-2 bg-white rounded-xl border border-slate-200 w-fit animate-pulse">
            <Sparkles className="w-4 h-4 text-emerald-600 animate-spin" />
            <span>GigCred AI is analyzing cashflows and formulating vernacular advice...</span>
          </div>
        )}
      </div>

      {/* Voice & Text Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex items-center gap-2"
      >
        <button
          type="button"
          onClick={toggleListen}
          title={isListening ? 'Listening... click to stop' : 'Click to speak via Microphone'}
          className={`p-2.5 rounded-xl border transition-all ${
            isListening
              ? 'bg-rose-600 text-white border-rose-700 animate-bounce'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
          }`}
        >
          {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
        </button>

        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={getInputPlaceholder(selectedLanguage)}
          className="flex-1 bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
        />

        <button
          type="submit"
          disabled={!inputText.trim() || isLoading}
          className="p-2.5 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-40 text-white rounded-xl transition-colors shadow-xs"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
