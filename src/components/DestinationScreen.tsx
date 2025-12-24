import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Heart, BookOpen, Clock, Star, Music, Gamepad2, Plane, Coffee, Sparkles } from "lucide-react";
import TimeMachine from "./TimeMachine";
import CatRobot from "./CatRobot";

interface DestinationScreenProps {
  direction: "past" | "future";
  onReturn: () => void;
}

type ThemeType = "love" | "study" | "work" | "travel" | "music" | "gaming" | "default";

interface ThemeConfig {
  icons: React.ReactNode[];
  message: string;
  subMessage: string;
  color: string;
  glowColor: string;
}

const detectTheme = (input: string): ThemeType => {
  const lowerInput = input.toLowerCase();
  
  const loveKeywords = ["love", "relationship", "girlfriend", "boyfriend", "crush", "date", "marry", "wedding", "heart", "romance", "partner", "kiss", "hug", "together", "breakup", "ex", "miss you", "i love", "pyaar", "dil"];
  const studyKeywords = ["study", "exam", "school", "college", "university", "homework", "test", "grade", "learn", "book", "class", "teacher", "student", "degree", "education", "padhai"];
  const workKeywords = ["work", "job", "office", "boss", "career", "meeting", "deadline", "project", "salary", "promotion", "interview", "resign", "business", "kaam"];
  const travelKeywords = ["travel", "vacation", "trip", "flight", "holiday", "beach", "adventure", "explore", "visit", "abroad", "journey", "ghumna"];
  const musicKeywords = ["music", "song", "sing", "concert", "band", "guitar", "piano", "dance", "party", "dj", "gaana"];
  const gamingKeywords = ["game", "gaming", "play", "xbox", "playstation", "nintendo", "esports", "stream", "twitch", "khel"];

  if (loveKeywords.some(kw => lowerInput.includes(kw))) return "love";
  if (studyKeywords.some(kw => lowerInput.includes(kw))) return "study";
  if (workKeywords.some(kw => lowerInput.includes(kw))) return "work";
  if (travelKeywords.some(kw => lowerInput.includes(kw))) return "travel";
  if (musicKeywords.some(kw => lowerInput.includes(kw))) return "music";
  if (gamingKeywords.some(kw => lowerInput.includes(kw))) return "gaming";
  
  return "default";
};

const getThemeConfig = (theme: ThemeType, direction: "past" | "future"): ThemeConfig => {
  const configs: Record<ThemeType, ThemeConfig> = {
    love: {
      icons: Array(12).fill(null).map((_, i) => <Heart key={i} className="w-full h-full" fill="currentColor" />),
      message: direction === "past" ? "Love and you?" : "Future love awaits!",
      subMessage: "Go back! 💔",
      color: "hsl(340 80% 60%)",
      glowColor: "hsl(340 80% 60% / 0.6)",
    },
    study: {
      icons: Array(10).fill(null).map((_, i) => <BookOpen key={i} className="w-full h-full" />),
      message: direction === "past" ? "Oops!" : "More exams ahead!",
      subMessage: "Back to reality! 📚",
      color: "hsl(45 90% 55%)",
      glowColor: "hsl(45 90% 55% / 0.6)",
    },
    work: {
      icons: Array(10).fill(null).map((_, i) => <Clock key={i} className="w-full h-full" />),
      message: direction === "past" ? "Time's up!" : "Deadlines never end!",
      subMessage: "Back to present! ⏰",
      color: "hsl(200 80% 55%)",
      glowColor: "hsl(200 80% 55% / 0.6)",
    },
    travel: {
      icons: Array(10).fill(null).map((_, i) => <Plane key={i} className="w-full h-full" />),
      message: direction === "past" ? "Trip memory!" : "Adventure awaits!",
      subMessage: "Unlocked! ✈️",
      color: "hsl(180 70% 50%)",
      glowColor: "hsl(180 70% 50% / 0.6)",
    },
    music: {
      icons: Array(10).fill(null).map((_, i) => <Music key={i} className="w-full h-full" />),
      message: direction === "past" ? "Those tunes!" : "Future beats!",
      subMessage: "Hit different! 🎵",
      color: "hsl(280 70% 60%)",
      glowColor: "hsl(280 70% 60% / 0.6)",
    },
    gaming: {
      icons: Array(10).fill(null).map((_, i) => <Gamepad2 key={i} className="w-full h-full" />),
      message: direction === "past" ? "GG!" : "New game+",
      subMessage: "Returning to spawn... 🎮",
      color: "hsl(150 80% 50%)",
      glowColor: "hsl(150 80% 50% / 0.6)",
    },
    default: {
      icons: Array(10).fill(null).map((_, i) => i % 2 === 0 ? <Star key={i} className="w-full h-full" fill="currentColor" /> : <Sparkles key={i} className="w-full h-full" />),
      message: direction === "past" ? "Memory accessed!" : "Future pending...",
      subMessage: "Time warp complete! ✨",
      color: "hsl(195 100% 55%)",
      glowColor: "hsl(195 100% 55% / 0.6)",
    },
  };
  
  return configs[theme];
};

const pastResponses = [
  "That version of you already did their best.",
  "You survived it. That's what matters.",
  "Some lessons only work once.",
  "The past heard you. It just can't answer.",
  "That timeline is sealed. You made it out.",
];

const futureResponses = [
  "Noted. The future is listening.",
  "Hope logged. No delivery date.",
  "Let's not spoil it.",
  "Filed. Universe will get back to you.",
  "Acknowledged. It's in the queue.",
];

const DestinationScreen = ({ direction, onReturn }: DestinationScreenProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [theme, setTheme] = useState<ThemeType>("default");
  const [catBounce, setCatBounce] = useState(false);

  const themeConfig = useMemo(() => getThemeConfig(theme, direction), [theme, direction]);

  // Generate random positions for floating icons - more spread out
  const floatingIcons = useMemo(() => {
    return themeConfig.icons.map((icon, i) => ({
      icon,
      initialX: 10 + (i % 5) * 20 + Math.random() * 10,
      initialY: 10 + Math.floor(i / 5) * 40 + Math.random() * 20,
      size: 40 + Math.random() * 40, // 40-80px icons
      delay: i * 0.1,
      duration: 2.5 + Math.random() * 1.5,
    }));
  }, [themeConfig.icons]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const detectedTheme = detectTheme(inputValue);
    setTheme(detectedTheme);
    setCatBounce(true);

    const responses = direction === "past" ? pastResponses : futureResponses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
    setShowResponse(true);
  };

  // Auto-return after showing response with full animation
  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => {
        onReturn();
      }, 5500); // 5.5 seconds for full animation experience
      return () => clearTimeout(timer);
    }
  }, [showResponse, onReturn]);

  const prompt = direction === "past" ? "What would you change?" : "What are you hoping for?";

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute inset-0 cyber-grid opacity-20" />
      
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, 
            ${direction === "past" ? "hsl(280 100% 65% / 0.15)" : "hsl(150 100% 50% / 0.15)"} 0%, 
            transparent 60%)`
        }}
      />

      <AnimatePresence mode="wait">
        {!showResponse ? (
          <motion.div
            key="input"
            className="relative z-10 w-full max-w-lg text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className={`text-4xl md:text-5xl font-display mb-12 ${direction === "past" ? "neon-text-violet" : "neon-text-green"}`}>
              {prompt}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="relative">
                <motion.input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type anything..."
                  className="w-full px-6 py-5 text-xl bg-transparent border-b-2 border-neon-blue/50 
                             focus:border-neon-blue focus:outline-none transition-all placeholder:text-muted-foreground/40
                             text-center font-sans tracking-wide"
                  autoFocus
                />
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{
                    background: "linear-gradient(90deg, transparent, hsl(195 100% 55%), transparent)",
                    boxShadow: "0 0 20px hsl(195 100% 55% / 0.5)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              
              <motion.button
                type="submit"
                disabled={!inputValue.trim()}
                className="px-12 py-4 text-xl font-display uppercase tracking-widest rounded-lg
                           disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  background: "linear-gradient(135deg, hsl(230 30% 15%) 0%, hsl(230 25% 10%) 100%)",
                  border: "2px solid hsl(195 100% 55%)",
                  boxShadow: inputValue.trim() ? "0 0 20px hsl(195 100% 55% / 0.4)" : "none",
                }}
                whileHover={{ scale: inputValue.trim() ? 1.05 : 1 }}
                whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
              >
                <span className="neon-text-blue">Submit</span>
              </motion.button>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="response"
            className="relative z-10 flex flex-col items-center w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Large floating themed icons - visually dominant */}
            {floatingIcons.map((item, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${item.initialX}%`,
                  top: `${item.initialY}%`,
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  color: themeConfig.color,
                  filter: `drop-shadow(0 0 20px ${themeConfig.glowColor})`,
                }}
                initial={{ opacity: 0, scale: 0, y: 100 }}
                animate={{
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0.3, 1.5, 1.2, 1, 0.5],
                  y: [100, 0, -50, -150, -250],
                  x: [0, Math.sin(i * 0.8) * 50, Math.cos(i * 0.6) * 40, Math.sin(i) * 30, 0],
                  rotate: [0, 180, 360, 540, 720],
                }}
                transition={{
                  duration: item.duration,
                  delay: item.delay,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              >
                {item.icon}
              </motion.div>
            ))}

            {/* Giant themed message - visually dominant */}
            <motion.div
              className="absolute top-8 left-0 right-0 text-center z-20"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-display font-bold"
                style={{
                  color: themeConfig.color,
                  textShadow: `0 0 30px ${themeConfig.glowColor}, 0 0 60px ${themeConfig.glowColor}, 0 0 90px ${themeConfig.glowColor}`,
                }}
                animate={{
                  scale: [1, 1.05, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {themeConfig.message}
              </motion.h1>
              <motion.p
                className="text-3xl md:text-4xl font-display mt-2"
                style={{
                  color: themeConfig.color,
                  textShadow: `0 0 20px ${themeConfig.glowColor}`,
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {themeConfig.subMessage}
              </motion.p>
            </motion.div>

            {/* Time Machine with Cat - 60-70% width */}
            <motion.div
              className="relative mt-32 md:mt-40"
              style={{ width: "65%", maxWidth: "400px" }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5, type: "spring" }}
            >
              <div className="transform scale-90 md:scale-100">
                <TimeMachine />
              </div>
              
              {/* Cat with cheeky bounce */}
              <motion.div
                className="absolute -top-8 md:-top-4 left-1/2 -translate-x-1/2"
                animate={catBounce ? {
                  y: [0, -20, 0, -15, 0, -10, 0],
                  rotate: [0, -5, 5, -3, 3, 0],
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 1,
                  ease: "easeOut",
                }}
              >
                <CatRobot isWaving={true} />
              </motion.div>
            </motion.div>

            {/* Response text */}
            <motion.div
              className="text-center max-w-xl px-4 mt-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <motion.p
                className={`text-xl md:text-2xl font-display leading-relaxed ${direction === "past" ? "neon-text-violet" : "neon-text-green"}`}
              >
                "{response}"
              </motion.p>
              
              {/* Progress bar for return countdown */}
              <motion.div
                className="mt-6 w-full max-w-xs mx-auto h-1.5 rounded-full overflow-hidden"
                style={{ background: "hsl(230 20% 20%)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${themeConfig.color}, hsl(195 100% 55%))`,
                    boxShadow: `0 0 10px ${themeConfig.glowColor}`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5.5, ease: "linear" }}
                />
              </motion.div>
              
              <motion.p
                className="mt-3 text-muted-foreground font-sans text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ delay: 1, duration: 2, repeat: Infinity }}
              >
                Returning to the present...
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DestinationScreen;
