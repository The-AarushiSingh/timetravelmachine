import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TimeMachine from "./TimeMachine";
import CatRobot from "./CatRobot";
import StarfieldBackground from "./StarfieldBackground";

interface PresentScreenProps {
  onNavigate: (direction: "past" | "future") => void;
  hasReturned: boolean;
}

const PresentScreen = ({ onNavigate, hasReturned }: PresentScreenProps) => {
  const [catArrived, setCatArrived] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Cat arrives at center after floating animation
    const arriveTimer = setTimeout(() => {
      setCatArrived(true);
    }, 2000);
    
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 800);

    return () => {
      clearTimeout(arriveTimer);
      clearTimeout(welcomeTimer);
    };
  }, []);

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
      
      {/* Central glow */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, hsl(195 100% 55% / 0.1) 0%, transparent 50%)",
        }}
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Time machine with cat on top - 60-70% width */}
        <div className="relative" style={{ width: "min(70vw, 500px)" }}>
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TimeMachine />
          </motion.div>

          {/* Cat robot - positioned centered on top of machine */}
          <motion.div
            className="absolute -top-6 md:-top-2 left-1/2"
            initial={{ opacity: 0, y: -150, x: 150 }}
            animate={{ 
              opacity: 1, 
              y: catArrived ? 0 : -30,
              x: "-50%",
            }}
            transition={{ 
              delay: 0.5, 
              duration: 1.5,
              type: "spring",
              stiffness: 60,
              damping: 12,
            }}
          >
            <CatRobot isWaving={catArrived} />
          </motion.div>
        </div>

        {/* Text */}
        <motion.div
          className="mt-16 md:mt-20 text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: showWelcome ? 1 : 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {hasReturned ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-3xl md:text-5xl font-display neon-text-blue mb-4">
                You're back.
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-sans">
                The present still matters the most.
              </p>
            </motion.div>
          ) : (
            <h1 className="text-3xl md:text-5xl font-display neon-text-blue">
              Where do you want to go?
            </h1>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-6 md:gap-8 mt-12"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: showWelcome ? 1 : 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <motion.button
            onClick={() => onNavigate("past")}
            className="relative px-10 md:px-14 py-4 md:py-5 text-xl md:text-2xl font-display uppercase tracking-widest rounded-lg overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(230 30% 12%) 0%, hsl(230 25% 8%) 100%)",
              border: "2px solid hsl(280 100% 65%)",
              boxShadow: "0 0 20px hsl(280 100% 65% / 0.3), inset 0 0 20px hsl(280 100% 65% / 0.1)",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px hsl(280 100% 65% / 0.5), inset 0 0 30px hsl(280 100% 65% / 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="neon-text-violet">PAST</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "radial-gradient(circle at center, hsl(280 100% 65% / 0.2) 0%, transparent 70%)",
              }}
            />
          </motion.button>
          
          <motion.button
            onClick={() => onNavigate("future")}
            className="relative px-10 md:px-14 py-4 md:py-5 text-xl md:text-2xl font-display uppercase tracking-widest rounded-lg overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(230 30% 12%) 0%, hsl(230 25% 8%) 100%)",
              border: "2px solid hsl(150 100% 50%)",
              boxShadow: "0 0 20px hsl(150 100% 50% / 0.3), inset 0 0 20px hsl(150 100% 50% / 0.1)",
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: "0 0 40px hsl(150 100% 50% / 0.5), inset 0 0 30px hsl(150 100% 50% / 0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="neon-text-green">FUTURE</span>
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: "radial-gradient(circle at center, hsl(150 100% 50% / 0.2) 0%, transparent 70%)",
              }}
            />
          </motion.button>
        </motion.div>
      </div>

      {/* Extra ambient particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full pointer-events-none"
          style={{
            background: i % 3 === 0 ? "hsl(195 100% 55%)" : i % 3 === 1 ? "hsl(280 100% 65%)" : "hsl(150 100% 50%)",
            left: `${10 + (i * 12)}%`,
            top: `${20 + (i % 4) * 20}%`,
            boxShadow: "0 0 15px currentColor",
          }}
          animate={{
            y: [-20, 20, -20],
            x: [-10, 10, -10],
            opacity: [0.4, 0.9, 0.4],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </motion.div>
  );
};

export default PresentScreen;
