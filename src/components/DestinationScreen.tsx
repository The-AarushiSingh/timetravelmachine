import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useCallback, useRef } from "react";
import { Heart, BookOpen, Clock, Star, Music, Gamepad2, Plane, Coffee, Moon, Dumbbell, Utensils, Users, Sparkles, SkipForward } from "lucide-react";
import TimeMachine from "./TimeMachine";
import CatRobot from "./CatRobot";
import StarfieldBackground from "./StarfieldBackground";

interface DestinationScreenProps {
  direction: "past" | "future";
  onReturn: () => void;
  isMuted?: boolean;
}

type ThemeType = "love" | "study" | "work" | "travel" | "music" | "gaming" | "sleep" | "fitness" | "food" | "friends" | "default";

interface ThemeConfig {
  icons: React.ReactNode[];
  message: string;
  subMessage: string;
  color: string;
  glowColor: string;
}

const detectTheme = (input: string): ThemeType => {
  const lowerInput = input.toLowerCase();
  
  const loveKeywords = ["love", "relationship", "girlfriend", "boyfriend", "crush", "date", "marry", "wedding", "heart", "romance", "partner", "kiss", "hug", "together", "breakup", "ex", "miss you", "i love", "pyaar", "dil", "propose"];
  const studyKeywords = ["study", "exam", "school", "college", "university", "homework", "test", "grade", "learn", "book", "class", "teacher", "student", "degree", "education", "padhai", "marks", "library"];
  const workKeywords = ["work", "job", "office", "boss", "career", "meeting", "deadline", "project", "salary", "promotion", "interview", "resign", "business", "kaam", "money", "rich"];
  const travelKeywords = ["travel", "vacation", "trip", "flight", "holiday", "beach", "adventure", "explore", "visit", "abroad", "journey", "ghumna", "paris", "london", "dubai"];
  const musicKeywords = ["music", "song", "sing", "concert", "band", "guitar", "piano", "dance", "party", "dj", "gaana", "spotify"];
  const gamingKeywords = ["game", "gaming", "play", "xbox", "playstation", "nintendo", "esports", "stream", "twitch", "khel", "pubg", "fortnite", "minecraft"];
  const sleepKeywords = ["sleep", "nap", "rest", "tired", "bed", "dream", "lazy", "neend", "sona", "exhausted", "relax"];
  const fitnessKeywords = ["gym", "workout", "exercise", "fitness", "muscle", "weight", "run", "jog", "health", "diet", "body"];
  const foodKeywords = ["food", "eat", "pizza", "burger", "biryani", "khana", "hungry", "restaurant", "cook", "dinner", "lunch", "breakfast"];
  const friendsKeywords = ["friend", "friends", "dost", "bestie", "buddy", "gang", "squad", "hangout", "party with"];

  if (loveKeywords.some(kw => lowerInput.includes(kw))) return "love";
  if (studyKeywords.some(kw => lowerInput.includes(kw))) return "study";
  if (workKeywords.some(kw => lowerInput.includes(kw))) return "work";
  if (sleepKeywords.some(kw => lowerInput.includes(kw))) return "sleep";
  if (travelKeywords.some(kw => lowerInput.includes(kw))) return "travel";
  if (musicKeywords.some(kw => lowerInput.includes(kw))) return "music";
  if (gamingKeywords.some(kw => lowerInput.includes(kw))) return "gaming";
  if (fitnessKeywords.some(kw => lowerInput.includes(kw))) return "fitness";
  if (foodKeywords.some(kw => lowerInput.includes(kw))) return "food";
  if (friendsKeywords.some(kw => lowerInput.includes(kw))) return "friends";
  
  return "default";
};

const getThemeConfig = (theme: ThemeType, direction: "past" | "future"): ThemeConfig => {
  const configs: Record<ThemeType, ThemeConfig> = {
    love: {
      icons: Array(15).fill(null).map((_, i) => <Heart key={i} className="w-full h-full" fill="currentColor" />),
      message: direction === "past" ? "Ah, young love..." : "Future love awaits!",
      subMessage: "Still unresolved? Back to reality! 💔",
      color: "hsl(340 85% 60%)",
      glowColor: "hsl(340 85% 60% / 0.7)",
    },
    study: {
      icons: Array(12).fill(null).map((_, i) => i % 2 === 0 ? <BookOpen key={i} className="w-full h-full" /> : <Clock key={i} className="w-full h-full" />),
      message: direction === "past" ? "Books flew, dreams shattered..." : "More exams incoming!",
      subMessage: "Present wins again! 📚",
      color: "hsl(45 95% 55%)",
      glowColor: "hsl(45 95% 55% / 0.7)",
    },
    work: {
      icons: Array(12).fill(null).map((_, i) => <Clock key={i} className="w-full h-full" />),
      message: direction === "past" ? "Overtime flashbacks!" : "Deadlines never die!",
      subMessage: "Time's up, back to present! ⏰",
      color: "hsl(200 85% 55%)",
      glowColor: "hsl(200 85% 55% / 0.7)",
    },
    sleep: {
      icons: Array(12).fill(null).map((_, i) => <Moon key={i} className="w-full h-full" fill="currentColor" />),
      message: direction === "past" ? "Zzz... those were the days!" : "Future naps pending...",
      subMessage: "Nap time over, reality calls! 😴",
      color: "hsl(250 70% 65%)",
      glowColor: "hsl(250 70% 65% / 0.7)",
    },
    travel: {
      icons: Array(12).fill(null).map((_, i) => <Plane key={i} className="w-full h-full" />),
      message: direction === "past" ? "Passport to memories!" : "Adventures await!",
      subMessage: "But first, back to base! ✈️",
      color: "hsl(180 75% 50%)",
      glowColor: "hsl(180 75% 50% / 0.7)",
    },
    music: {
      icons: Array(12).fill(null).map((_, i) => <Music key={i} className="w-full h-full" />),
      message: direction === "past" ? "Those tunes hit different!" : "Future anthems loading...",
      subMessage: "But the present has its beat! 🎵",
      color: "hsl(300 75% 60%)",
      glowColor: "hsl(300 75% 60% / 0.7)",
    },
    gaming: {
      icons: Array(12).fill(null).map((_, i) => <Gamepad2 key={i} className="w-full h-full" />),
      message: direction === "past" ? "GG! Good times!" : "New game+ loading...",
      subMessage: "Respawning in present... 🎮",
      color: "hsl(150 85% 50%)",
      glowColor: "hsl(150 85% 50% / 0.7)",
    },
    fitness: {
      icons: Array(12).fill(null).map((_, i) => <Dumbbell key={i} className="w-full h-full" />),
      message: direction === "past" ? "Gains and pains!" : "Future gains await!",
      subMessage: "But today is leg day! 💪",
      color: "hsl(15 85% 55%)",
      glowColor: "hsl(15 85% 55% / 0.7)",
    },
    food: {
      icons: Array(12).fill(null).map((_, i) => i % 2 === 0 ? <Utensils key={i} className="w-full h-full" /> : <Coffee key={i} className="w-full h-full" />),
      message: direction === "past" ? "Tasty memories!" : "Future feasts await!",
      subMessage: "But dinner's ready now! 🍕",
      color: "hsl(30 90% 55%)",
      glowColor: "hsl(30 90% 55% / 0.7)",
    },
    friends: {
      icons: Array(12).fill(null).map((_, i) => <Users key={i} className="w-full h-full" />),
      message: direction === "past" ? "Squad memories!" : "Future hangouts await!",
      subMessage: "Group chat is waiting! 👥",
      color: "hsl(270 75% 60%)",
      glowColor: "hsl(270 75% 60% / 0.7)",
    },
    default: {
      icons: Array(12).fill(null).map((_, i) => i % 2 === 0 ? <Star key={i} className="w-full h-full" fill="currentColor" /> : <Sparkles key={i} className="w-full h-full" />),
      message: direction === "past" ? "Memory unlocked!" : "Future buffering...",
      subMessage: "Time warp complete! ✨",
      color: "hsl(195 100% 55%)",
      glowColor: "hsl(195 100% 55% / 0.7)",
    },
  };
  
  return configs[theme];
};

const pastResponses = [
  "That version of you did their best.",
  "You survived it. That's what counts.",
  "Some lessons only work once.",
  "The past heard you. It just can't answer.",
  "That timeline is sealed. You made it out.",
];

const futureResponses = [
  "Noted. The future is listening.",
  "Hope logged. No delivery date.",
  "Let's not spoil it.",
  "Filed. Universe will respond.",
  "Acknowledged. It's in the queue.",
];

const DestinationScreen = ({ direction, onReturn, isMuted = false }: DestinationScreenProps) => {
  const [inputValue, setInputValue] = useState("");
  const [showResponse, setShowResponse] = useState(false);
  const [response, setResponse] = useState("");
  const [theme, setTheme] = useState<ThemeType>("default");
  const [canSkip, setCanSkip] = useState(false);
  const funnyAudioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize funny sound
  useEffect(() => {
    funnyAudioRef.current = new Audio("/sounds/funny-moment.mp3");
    funnyAudioRef.current.loop = true;
    return () => {
      if (funnyAudioRef.current) {
        funnyAudioRef.current.pause();
        funnyAudioRef.current = null;
      }
    };
  }, []);

  // Play funny sound when response shows
  useEffect(() => {
    if (showResponse && !isMuted && funnyAudioRef.current) {
      funnyAudioRef.current.currentTime = 0;
      funnyAudioRef.current.play().catch(() => {});
    }
    return () => {
      if (funnyAudioRef.current) {
        funnyAudioRef.current.pause();
      }
    };
  }, [showResponse, isMuted]);

  const themeConfig = useMemo(() => getThemeConfig(theme, direction), [theme, direction]);

  // Generate random positions for floating icons - more elaborate
  const floatingIcons = useMemo(() => {
    return themeConfig.icons.map((icon, i) => ({
      icon,
      startX: Math.random() * 100,
      startY: 100 + Math.random() * 20,
      size: 50 + Math.random() * 60,
      delay: i * 0.12,
      duration: 3 + Math.random() * 2,
      rotateAmount: 360 + Math.random() * 360,
      horizontalDrift: (Math.random() - 0.5) * 100,
    }));
  }, [themeConfig.icons]);

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const detectedTheme = detectTheme(inputValue);
    setTheme(detectedTheme);

    const responses = direction === "past" ? pastResponses : futureResponses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
    setShowResponse(true);
  }, [inputValue, direction]);

  const handleSkip = useCallback(() => {
    if (funnyAudioRef.current) {
      funnyAudioRef.current.pause();
    }
    onReturn();
  }, [onReturn]);

  useEffect(() => {
    if (showResponse) {
      const skipTimer = setTimeout(() => setCanSkip(true), 2000);
      const returnTimer = setTimeout(() => {
        if (funnyAudioRef.current) {
          funnyAudioRef.current.pause();
        }
        onReturn();
      }, 5500);
      return () => {
        clearTimeout(skipTimer);
        clearTimeout(returnTimer);
      };
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
      {/* Starfield background */}
      <StarfieldBackground intensity="medium" />

      {/* Theme-colored overlay */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        animate={showResponse ? {
          background: `radial-gradient(ellipse at center, ${themeConfig.glowColor} 0%, transparent 60%)`,
        } : {
          background: `radial-gradient(ellipse at center, ${direction === "past" ? "hsl(280 100% 65% / 0.15)" : "hsl(150 100% 50% / 0.15)"} 0%, transparent 60%)`,
        }}
        transition={{ duration: 0.5 }}
      />

      <AnimatePresence mode="wait">
        {!showResponse ? (
          <motion.div
            key="input"
            className="relative z-10 w-full max-w-lg text-center"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: -30, scale: 0.9 }}
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
            className="relative z-10 flex flex-col items-center w-full min-h-screen justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Large floating themed icons - visually dominant */}
            {floatingIcons.map((item, i) => (
              <motion.div
                key={i}
                className="absolute pointer-events-none z-0"
                style={{
                  left: `${item.startX}%`,
                  bottom: "0%",
                  width: `${item.size}px`,
                  height: `${item.size}px`,
                  color: themeConfig.color,
                  filter: `drop-shadow(0 0 25px ${themeConfig.glowColor})`,
                }}
                initial={{ opacity: 0, scale: 0, y: 0 }}
                animate={{
                  opacity: [0, 1, 1, 0.8, 0],
                  scale: [0.3, 1.4, 1.2, 1, 0.6],
                  y: [0, -200, -400, -600, -800],
                  x: [0, item.horizontalDrift * 0.5, item.horizontalDrift, item.horizontalDrift * 0.5, 0],
                  rotate: [0, item.rotateAmount * 0.3, item.rotateAmount * 0.6, item.rotateAmount],
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

            {/* Giant themed message - at top */}
            <motion.div
              className="absolute top-16 md:top-20 left-0 right-0 text-center z-20 px-4"
              initial={{ scale: 0, opacity: 0, y: -50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 150, damping: 15 }}
            >
              <motion.h1
                className="text-4xl sm:text-5xl md:text-7xl font-display font-bold leading-tight"
                style={{
                  color: themeConfig.color,
                  textShadow: `0 0 30px ${themeConfig.glowColor}, 0 0 60px ${themeConfig.glowColor}, 0 0 100px ${themeConfig.glowColor}`,
                }}
                animate={{
                  scale: [1, 1.03, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                {themeConfig.message}
              </motion.h1>
              <motion.p
                className="text-2xl md:text-3xl font-display mt-3"
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

            {/* Time Machine with Cat - 60-70% width, centered */}
            <motion.div
              className="relative z-10"
              style={{ width: "min(65vw, 400px)" }}
              initial={{ scale: 0.3, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <div className="transform scale-75 md:scale-90">
                <TimeMachine />
              </div>
              
              {/* Cat with cheeky bounce */}
              <motion.div
                className="absolute -top-8 md:-top-4 left-1/2 -translate-x-1/2"
                animate={{
                  y: [0, -25, 0, -18, 0, -10, 0],
                  rotate: [0, -8, 8, -5, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 0.5,
                  ease: "easeOut",
                }}
              >
                <CatRobot isWaving={true} />
              </motion.div>
            </motion.div>

            {/* Response text - below machine */}
            <motion.div
              className="text-center max-w-xl px-4 mt-6 z-20"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <motion.p
                className={`text-lg md:text-xl font-display leading-relaxed ${direction === "past" ? "neon-text-violet" : "neon-text-green"}`}
              >
                "{response}"
              </motion.p>
              
              {/* Progress bar */}
              <motion.div
                className="mt-6 w-full max-w-xs mx-auto h-2 rounded-full overflow-hidden"
                style={{ background: "hsl(230 20% 15%)" }}
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{ 
                    background: `linear-gradient(90deg, ${themeConfig.color}, hsl(195 100% 55%))`,
                    boxShadow: `0 0 15px ${themeConfig.glowColor}`,
                  }}
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5.5, ease: "linear" }}
                />
              </motion.div>
              
              <motion.p
                className="mt-3 text-muted-foreground font-sans text-sm"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Returning to the present...
              </motion.p>
            </motion.div>

            {/* Skip button */}
            <AnimatePresence>
              {canSkip && (
                <motion.button
                  onClick={handleSkip}
                  className="absolute bottom-8 right-8 z-30 flex items-center gap-2 px-4 py-2 rounded-full
                             text-muted-foreground hover:text-foreground transition-colors"
                  style={{
                    background: "hsl(230 25% 12% / 0.8)",
                    border: "1px solid hsl(195 100% 55% / 0.3)",
                  }}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  whileHover={{ scale: 1.05, borderColor: "hsl(195 100% 55% / 0.6)" }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-sm font-sans">Skip</span>
                  <SkipForward className="w-4 h-4" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default DestinationScreen;
