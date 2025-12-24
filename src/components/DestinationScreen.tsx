import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";
import { Heart, BookOpen, Clock, Star, Music, Gamepad2, Plane, Coffee } from "lucide-react";
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
  color: string;
}

const detectTheme = (input: string): ThemeType => {
  const lowerInput = input.toLowerCase();
  
  const loveKeywords = ["love", "relationship", "girlfriend", "boyfriend", "crush", "date", "marry", "wedding", "heart", "romance", "partner", "kiss", "hug", "together", "breakup", "ex", "miss you", "i love"];
  const studyKeywords = ["study", "exam", "school", "college", "university", "homework", "test", "grade", "learn", "book", "class", "teacher", "student", "degree", "education"];
  const workKeywords = ["work", "job", "office", "boss", "career", "meeting", "deadline", "project", "salary", "promotion", "interview", "resign", "business"];
  const travelKeywords = ["travel", "vacation", "trip", "flight", "holiday", "beach", "adventure", "explore", "visit", "abroad", "journey"];
  const musicKeywords = ["music", "song", "sing", "concert", "band", "guitar", "piano", "dance", "party", "dj"];
  const gamingKeywords = ["game", "gaming", "play", "xbox", "playstation", "nintendo", "esports", "stream", "twitch"];

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
      icons: Array(8).fill(null).map((_, i) => <Heart key={i} className="w-8 h-8" />),
      message: direction === "past" ? "Love and you? Go back!" : "Love awaits... maybe!",
      color: "hsl(340 80% 60%)",
    },
    study: {
      icons: Array(6).fill(null).map((_, i) => <BookOpen key={i} className="w-8 h-8" />),
      message: direction === "past" ? "Oops! Back to reality!" : "Future exams loading...",
      color: "hsl(45 90% 55%)",
    },
    work: {
      icons: Array(6).fill(null).map((_, i) => <Clock key={i} className="w-8 h-8" />),
      message: direction === "past" ? "Time's up, back to present!" : "Deadlines never end!",
      color: "hsl(200 80% 55%)",
    },
    travel: {
      icons: Array(6).fill(null).map((_, i) => <Plane key={i} className="w-8 h-8" />),
      message: direction === "past" ? "Trip memory unlocked!" : "Adventure awaits!",
      color: "hsl(180 70% 50%)",
    },
    music: {
      icons: Array(6).fill(null).map((_, i) => <Music key={i} className="w-8 h-8" />),
      message: direction === "past" ? "Those tunes hit different!" : "Future beats loading...",
      color: "hsl(280 70% 60%)",
    },
    gaming: {
      icons: Array(6).fill(null).map((_, i) => <Gamepad2 key={i} className="w-8 h-8" />),
      message: direction === "past" ? "GG! Returning to spawn..." : "New game+ loading...",
      color: "hsl(150 80% 50%)",
    },
    default: {
      icons: Array(6).fill(null).map((_, i) => i % 2 === 0 ? <Star key={i} className="w-8 h-8" /> : <Coffee key={i} className="w-8 h-8" />),
      message: direction === "past" ? "Memory accessed!" : "Future pending...",
      color: "hsl(195 100% 55%)",
    },
  };
  
  return configs[theme];
};

const pastResponses = [
  "That version of you already did their best with what they knew.",
  "You survived it. That mattered more than perfection.",
  "Some lessons only work once.",
  "The past heard you. It just can't answer.",
  "That timeline is sealed. You're the one who made it out.",
];

const futureResponses = [
  "Noted. The future is listening, but not replying yet.",
  "Hope logged. No delivery date available.",
  "Let's not spoil it.",
  "Filed. The universe will get back to you.",
  "Acknowledged. No ETA, but it's in the queue.",
];

const DestinationScreen = ({ direction, onReturn }: DestinationScreenProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [theme, setTheme] = useState<ThemeType>("default");

  const themeConfig = useMemo(() => getThemeConfig(theme, direction), [theme, direction]);

  // Generate random positions for floating icons
  const floatingIcons = useMemo(() => {
    return themeConfig.icons.map((icon, i) => ({
      icon,
      initialX: Math.random() * 100,
      initialY: Math.random() * 100,
      delay: i * 0.15,
      duration: 2 + Math.random() * 2,
    }));
  }, [themeConfig.icons]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const detectedTheme = detectTheme(inputValue);
    setTheme(detectedTheme);

    const responses = direction === "past" ? pastResponses : futureResponses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
    setShowResponse(true);
  };

  // Auto-return after showing response
  useEffect(() => {
    if (showResponse) {
      const timer = setTimeout(() => {
        onReturn();
      }, 5000); // 5 seconds delay
      return () => clearTimeout(timer);
    }
  }, [showResponse, onReturn]);

  const prompt = direction === "past" ? "What would you change?" : "What are you hoping for?";

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
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
            className="relative z-10 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Floating themed icons */}
            {floatingIcons.map((item, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none"
                style={{
                  left: `${item.initialX}%`,
                  top: `${item.initialY}%`,
                  color: themeConfig.color,
                  filter: `drop-shadow(0 0 10px ${themeConfig.color})`,
                }}
                initial={{ opacity: 0, scale: 0, y: 50 }}
                animate={{
                  opacity: [0, 1, 1, 0],
                  scale: [0.5, 1.2, 1, 0.8],
                  y: [-20, -80, -140, -200],
                  x: [0, Math.sin(i) * 30, Math.cos(i) * 20, 0],
                  rotate: [0, 180, 360],
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

            {/* Time Machine with Cat */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <TimeMachine />
              <motion.div
                className="absolute -top-6 md:-top-2 left-1/2 -translate-x-1/2"
              >
                <CatRobot isWaving={true} />
              </motion.div>
            </motion.div>

            {/* Themed message */}
            <motion.div
              className="text-center max-w-xl px-4 mt-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <motion.p
                className="text-3xl md:text-4xl font-display mb-6"
                style={{
                  color: themeConfig.color,
                  textShadow: `0 0 20px ${themeConfig.color}, 0 0 40px ${themeConfig.color}`,
                }}
                animate={{
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {themeConfig.message}
              </motion.p>

              <motion.p
                className={`text-xl md:text-2xl font-display leading-relaxed ${direction === "past" ? "neon-text-violet" : "neon-text-green"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                "{response}"
              </motion.p>
              
              {/* Progress bar for return countdown */}
              <motion.div
                className="mt-8 w-full max-w-xs mx-auto h-1 rounded-full overflow-hidden"
                style={{ background: "hsl(230 20% 20%)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: themeConfig.color }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                />
              </motion.div>
              
              <motion.p
                className="mt-4 text-muted-foreground font-sans text-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
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
