import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

interface JourneyTransitionProps {
  direction: "past" | "future";
  onComplete: () => void;
}

const pastLoadingTexts = [
  "Rewinding moments…",
  "Searching for that one decision…",
  "Untangling timelines…",
  "Dusting off memories…",
];

const futureLoadingTexts = [
  "Skipping ahead…",
  "Avoiding spoilers…",
  "Buffering tomorrow…",
  "Consulting the void…",
];

const JourneyTransition = ({ direction, onComplete }: JourneyTransitionProps) => {
  const [textIndex, setTextIndex] = useState(0);
  const texts = direction === "past" ? pastLoadingTexts : futureLoadingTexts;

  useEffect(() => {
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 800);

    const completeTimeout = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(completeTimeout);
    };
  }, [texts.length, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Spinning portal */}
      <motion.div
        className="relative w-32 h-32 mb-12"
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div className="absolute inset-0 rounded-full border-4 border-primary/30" />
        <div className="absolute inset-2 rounded-full border-4 border-accent/40" />
        <div className="absolute inset-4 rounded-full border-4 border-primary/50" />
        <motion.div
          className="absolute inset-8 rounded-full bg-accent/30"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Loading text */}
      <AnimatePresence mode="wait">
        <motion.p
          key={textIndex}
          className="text-xl md:text-2xl font-serif italic text-muted-foreground"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.3 }}
        >
          {texts[textIndex]}
        </motion.p>
      </AnimatePresence>

      {/* Time particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-primary/40"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: direction === "past" ? [0, -100] : [0, 100],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: i * 0.2,
            ease: "easeOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default JourneyTransition;
