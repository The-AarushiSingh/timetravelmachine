import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useMemo } from "react";
import TimeMachine from "./TimeMachine";
import CatRobot from "./CatRobot";
import StarfieldBackground from "./StarfieldBackground";

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
  const [phase, setPhase] = useState<"exit" | "travel" | "enter">("exit");
  const texts = direction === "past" ? pastLoadingTexts : futureLoadingTexts;

  // Memoize particles to prevent re-creation on re-renders
  const particles = useMemo(() => 
    [...Array(50)].map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: i * 0.08,
      duration: 0.8 + Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 300,
      size: 2 + Math.random() * 4,
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
    }, 600);

    // Phase transitions
    const exitTimeout = setTimeout(() => setPhase("travel"), 1500);
    const enterTimeout = setTimeout(() => setPhase("enter"), 3000);
    const completeTimeout = setTimeout(() => onComplete(), 4500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(exitTimeout);
      clearTimeout(enterTimeout);
      clearTimeout(completeTimeout);
    };
  }, [texts.length, onComplete]);

  // Calculate machine position based on phase
  const getMachineX = () => {
    if (phase === "exit") {
      return direction === "past" ? "-120%" : "120%";
    }
    if (phase === "travel") {
      return direction === "past" ? "-120%" : "120%";
    }
    return "0%";
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Starfield background */}
      <StarfieldBackground intensity="high" />

      {/* Speed lines effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`speed-${i}`}
            className="absolute h-0.5 rounded-full"
            style={{
              top: `${5 + i * 5}%`,
              left: direction === "past" ? "100%" : "-30%",
              width: `${100 + Math.random() * 200}px`,
              background: `linear-gradient(${direction === "past" ? "270deg" : "90deg"}, transparent, ${
                i % 3 === 0 ? "hsl(195 100% 55%)" : i % 3 === 1 ? "hsl(280 100% 65%)" : "hsl(150 100% 50%)"
              }, transparent)`,
            }}
            animate={{
              x: direction === "past" ? [0, -window.innerWidth * 1.5] : [0, window.innerWidth * 1.5],
            }}
            transition={{
              duration: 0.5 + Math.random() * 0.3,
              repeat: Infinity,
              delay: i * 0.1,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Radial pulse */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(circle at center, 
            ${direction === "past" ? "hsl(280 100% 65% / 0.4)" : "hsl(150 100% 50% / 0.4)"} 0%, 
            transparent 40%)`,
        }}
        animate={{
          scale: [1, 2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Flying particles - moving in travel direction */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            background: particle.color,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            left: direction === "past" ? "110%" : "-10%",
            top: `${Math.random() * 100}%`,
            boxShadow: `0 0 ${particle.size * 3}px ${particle.color}`,
          }}
          animate={{
            x: direction === "past" ? [0, -window.innerWidth * 1.5] : [0, window.innerWidth * 1.5],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "linear",
          }}
        />
      ))}

      {/* Time machine with cat - exits and enters */}
      <motion.div
        className="relative z-20"
        initial={{ x: "0%", scale: 1 }}
        animate={{ 
          x: getMachineX(),
          scale: phase === "travel" ? 0.8 : 1,
          rotate: phase === "travel" ? (direction === "past" ? -10 : 10) : 0,
        }}
        transition={{
          duration: phase === "enter" ? 1 : 1.5,
          ease: phase === "enter" ? "easeOut" : "easeIn",
        }}
      >
        {/* Machine container with shake during travel */}
        <motion.div
          animate={phase === "travel" ? {
            y: [-5, 5, -5],
            x: [-3, 3, -3],
          } : {}}
          transition={{
            duration: 0.15,
            repeat: phase === "travel" ? Infinity : 0,
          }}
        >
          <div className="transform scale-75 md:scale-90">
            <TimeMachine isSpinningFast />
          </div>
          
          {/* Cat on top - bouncing during travel */}
          <motion.div
            className="absolute -top-4 md:-top-2 left-1/2 -translate-x-1/2"
            animate={phase === "travel" ? {
              y: [-8, 8, -8],
              rotate: [-5, 5, -5],
            } : {
              y: [0, -5, 0],
            }}
            transition={{
              duration: phase === "travel" ? 0.3 : 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <CatRobot isWaving={phase !== "travel"} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Loading text with glitch effect */}
      <motion.div
        className="absolute bottom-32 left-0 right-0 text-center z-30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.p
            key={textIndex}
            className="text-2xl md:text-4xl font-display uppercase tracking-widest"
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ duration: 0.15 }}
          >
            <span className={direction === "past" ? "neon-text-violet" : "neon-text-green"}>
              {texts[textIndex]}
            </span>
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        className="absolute bottom-16 left-1/2 -translate-x-1/2 w-64 md:w-80 h-1.5 bg-muted/30 rounded-full overflow-hidden z-30"
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            background: direction === "past" 
              ? "linear-gradient(90deg, hsl(280 100% 65%), hsl(195 100% 55%))"
              : "linear-gradient(90deg, hsl(150 100% 50%), hsl(195 100% 55%))",
            boxShadow: `0 0 15px ${direction === "past" ? "hsl(280 100% 65%)" : "hsl(150 100% 50%)"}`,
          }}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 4.5, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Direction indicator */}
      <motion.div
        className="absolute top-8 left-0 right-0 text-center z-30"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-lg md:text-xl font-display uppercase tracking-[0.3em] text-muted-foreground">
          Traveling to the {direction}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default JourneyTransition;
