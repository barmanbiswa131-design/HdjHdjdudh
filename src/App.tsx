import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, RotateCcw, Sparkles, Wind, Moon, Sun, Volume2, VolumeX } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });

const PRESETS = [5, 10, 15, 20, 30];

export default function App() {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [isActive, setIsActive] = useState(false);
  const [preset, setPreset] = useState(10);
  const [affirmation, setAffirmation] = useState("Your journey to peace begins with a single breath.");
  const [isLoading, setIsLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const generateAffirmation = async () => {
    setIsLoading(true);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Generate a short, poetic, and deeply calming zen affirmation or quote for meditation. Maximum 15 words.",
        config: {
          systemInstruction: "You are a zen master providing gentle guidance.",
          temperature: 0.8,
        }
      });
      setAffirmation(response.text || "Peace is within you.");
    } catch (error) {
      console.error("Failed to generate affirmation:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTimer = () => setIsActive(!isActive);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(preset * 60);
  }, [preset]);

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      if (timerRef.current) clearInterval(timerRef.current);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = 1 - timeLeft / (preset * 60);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
      {/* Immersive Background */}
      <div className="absolute inset-0 atmosphere z-0" />
      
      {/* Floating UI */}
      <main className="relative z-10 w-full max-w-md flex flex-col items-center gap-12">
        
        {/* Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <h1 className="text-4xl font-serif italic tracking-wider text-white/90">ZenSpace</h1>
          <p className="text-xs uppercase tracking-[0.3em] text-white/40 font-medium">Find your center</p>
        </motion.header>

        {/* Timer Circle */}
        <div className="relative w-72 h-72 flex items-center justify-center">
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="4"
            />
            <motion.circle
              cx="144"
              cy="144"
              r="130"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="4"
              strokeDasharray={816}
              animate={{ strokeDashoffset: 816 * (1 - progress) }}
              transition={{ duration: 1, ease: "linear" }}
              className="timer-ring"
            />
          </svg>
          
          <div className="flex flex-col items-center gap-2">
            <motion.span 
              key={timeLeft}
              initial={{ opacity: 0.5, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-6xl font-light tracking-tighter text-white tabular-nums"
            >
              {formatTime(timeLeft)}
            </motion.span>
            <div className="flex gap-4 mt-4">
              <button 
                onClick={toggleTimer}
                className="p-4 rounded-full glass hover:bg-white/10 transition-colors text-white"
                id="toggle-btn"
              >
                {isActive ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
              </button>
              <button 
                onClick={resetTimer}
                className="p-4 rounded-full glass hover:bg-white/10 transition-colors text-white/60"
                id="reset-btn"
              >
                <RotateCcw size={24} />
              </button>
            </div>
          </div>
        </div>

        {/* Presets */}
        <div className="flex gap-3">
          {PRESETS.map((p) => (
            <button
              key={p}
              onClick={() => {
                setPreset(p);
                setTimeLeft(p * 60);
                setIsActive(false);
              }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all ${
                preset === p ? 'glass text-white border-white/20' : 'text-white/40 hover:text-white/60'
              }`}
            >
              {p}m
            </button>
          ))}
        </div>

        {/* AI Affirmation */}
        <motion.div 
          className="glass p-8 rounded-[2rem] w-full text-center space-y-6"
          layout
        >
          <AnimatePresence mode="wait">
            <motion.p 
              key={affirmation}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-xl font-serif italic leading-relaxed text-white/80 min-h-[4rem] flex items-center justify-center"
            >
              {affirmation}
            </motion.p>
          </AnimatePresence>
          
          <button 
            onClick={generateAffirmation}
            disabled={isLoading}
            className="flex items-center gap-2 mx-auto text-[10px] uppercase tracking-[0.2em] text-white/40 hover:text-white/70 transition-colors disabled:opacity-30"
            id="generate-btn"
          >
            <Sparkles size={14} className={isLoading ? 'animate-pulse' : ''} />
            {isLoading ? 'Seeking wisdom...' : 'New Affirmation'}
          </button>
        </motion.div>

      </main>

      {/* Footer Controls */}
      <footer className="fixed bottom-8 left-0 right-0 flex justify-center gap-8 z-10 text-white/30">
        <button onClick={() => setIsMuted(!isMuted)} className="hover:text-white/60 transition-colors">
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
        <Wind size={18} className="hover:text-white/60 transition-colors cursor-help" />
        <Moon size={18} className="hover:text-white/60 transition-colors cursor-help" />
      </footer>

      {/* Subtle Grain Overlay */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-50 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
    </div>
  );
}
