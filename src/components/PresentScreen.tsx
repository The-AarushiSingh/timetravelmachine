import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import TimeMachine from "./TimeMachine";
import CatRobot from "./CatRobot";

interface PresentScreenProps {
  onNavigate: (direction: "past" | "future") => void;
  hasReturned: boolean;
}

const PresentScreen = ({ onNavigate, hasReturned }: PresentScreenProps) => {
  const [catState, setCatState] = useState<"floating" | "waving" | "sitting">("floating");
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Cat entrance sequence
    const timer = setTimeout(() => {
      setCatState("waving");
    }, 1500);
    
    const welcomeTimer = setTimeout(() => {
      setShowWelcome(true);
    }, 800);

    return () => {
      clearTimeout(timer);
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
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid" />
      
      {/* Gradient overlays */}
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at center, hsl(195 100% 55% / 0.08) 0%, transparent 50%)",
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, hsl(280 100% 65% / 0.06) 0%, transparent 40%)",
        }}
      />
      <div 
        className="absolute inset-0"
        style={{
          background: "radial-gradient(ellipse at 70% 80%, hsl(150 100% 50% / 0.06) 0%, transparent 40%)",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Time machine with cat on top */}
        <div className="relative">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <TimeMachine />
          </motion.div>

          {/* Cat robot - positioned on top of machine */}
          <motion.div
            className="absolute -top-8 md:-top-4 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0, y: -100, x: 100 }}
            animate={{ 
              opacity: 1, 
              y: catState === "sitting" ? 0 : -20,
              x: 0,
            }}
            transition={{ 
              delay: 0.8, 
              duration: 1.2,
              type: "spring",
              stiffness: 100,
            }}
          >
            <CatRobot state={catState} onAnimationComplete={() => setCatState("sitting")} />
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

      {/* Ambient floating particles */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 3 === 0 ? "hsl(195 100% 55%)" : i % 3 === 1 ? "hsl(280 100% 65%)" : "hsl(150 100% 50%)",
            left: `${10 + (i * 7)}%`,
            top: `${15 + (i % 5) * 18}%`,
            boxShadow: "0 0 8px currentColor",
          }}
          animate={{
            y: [-15, 15, -15],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}
    </motion.div>
  );
};

export default PresentScreen;