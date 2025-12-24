import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import TimeMachine from "./TimeMachine";
import RunningCharacter from "./RunningCharacter";

interface JourneyTransitionProps {
  direction: "past" | "future";
  onComplete: () => void;
}

const pastLoadingTexts = [
  "Hold tight…",
  "Rewinding moments…",
  "Messing with timelines…",
  "Searching for that one decision…",
  "Hope this was worth it…",
  "Untangling the threads…",
];

const futureLoadingTexts = [
  "Hold tight…",
  "Skipping ahead…",
  "Avoiding spoilers…",
  "Buffering tomorrow…",
  "Consulting the void…",
  "Fast-forwarding fate…",
];

const JourneyTransition = ({ direction, onComplete }: JourneyTransitionProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const [isShaking, setIsShaking] = useState(true);
  const texts = direction === "past" ? pastLoadingTexts : futureLoadingTexts;

  // Memoize particles to prevent re-creation on re-renders
  const particles = useMemo(() => 
    [...Array(40)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: i * 0.1,
      duration: 1 + Math.random(),
      drift: (Math.random() - 0.5) * 200,
      color: i % 3 === 0 
        ? "hsl(195 100% 55%)" 
        : i % 3 === 1 
          ? "hsl(280 100% 65%)" 
          : "hsl(150 100% 50%)",
    })), []
  );

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 700);

    // Stop shaking after a bit
    const shakeTimeout = setTimeout(() => setIsShaking(false), 3000);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 4500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(shakeTimeout);
      clearTimeout(completeTimeout);
    };
  }, [texts.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, hsl(230 25% 5%) 0%, hsl(240 30% 8%) 50%, hsl(230 25% 5%) 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        x: isShaking ? [0, -5, 5, -3, 3, 0] : 0,
      }}
      exit={{ opacity: 0 }}
      transition={{ 
        opacity: { duration: 0.3 },
        x: { duration: 0.5, repeat: isShaking ? Infinity : 0 },
      }}
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-20" />

      {/* Scanline effect */}
      <div className="absolute inset-0 scanline pointer-events-none" />

      {/* Radial glow */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, 
            ${direction === "past" ? "hsl(280 100% 65% / 0.3)" : "hsl(150 100% 50% / 0.3)"} 0%, 
            transparent 50%)`,
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Flying particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: particle.color,
            left: particle.left,
            bottom: "-20px",
            boxShadow: `0 0 10px ${particle.color}`,
          }}
          animate={{
            y: [0, "-120vh"],
            x: [0, direction === "past" ? -particle.drift : particle.drift],
            opacity: [1, 0],
            scale: [1, 0.3],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeOut",
          }}
        />
      ))}

      {/* Time machine - spinning fast */}
      <motion.div
        className="relative mb-8"
        initial={{ scale: 1, x: 0 }}
        animate={{
          scale: [1, 1.1, 1],
          x: direction === "past" ? [0, -50, "-150vw"] : [0, 50, "150vw"],
        }}
        transition={{
          scale: { duration: 1, repeat: 2 },
          x: { duration: 4, times: [0, 0.3, 1], ease: "easeInOut" },
        }}
      >
        <TimeMachine isSpinningFast />
      </motion.div>

      {/* Loading text with glitch effect */}
      <motion.div
        className="relative z-10 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={textIndex}
            className="text-2xl md:text-4xl font-display uppercase tracking-widest"
            style={{
              animation: "textGlitch 0.5s ease-in-out infinite",
            }}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
          >
            <span className={direction === "past" ? "neon-text-violet" : "neon-text-green"}>
              {texts[textIndex]}
            </span>
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2 w-64 h-1 bg-muted rounded-full overflow-hidden"
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: direction === "past" 
              ? "linear-gradient(90deg, hsl(280 100% 65%), hsl(195 100% 55%))"
              : "linear-gradient(90deg, hsl(150 100% 50%), hsl(195 100% 55%))",
            boxShadow: `0 0 10px ${direction === "past" ? "hsl(280 100% 65%)" : "hsl(150 100% 50%)"}`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Running character at bottom */}
      <RunningCharacter />
    </motion.div>
  );
};

export default JourneyTransition;