import { motion } from "framer-motion";
import { useState } from "react";

interface WhenScreenProps {
  direction: "past" | "future";
  onSubmit: (when: string) => void;
  onBack: () => void;
}

const WhenScreen = ({ direction, onSubmit, onBack }: WhenScreenProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue);
    }
  };

  const placeholder = direction === "past" 
    ? "2019, school days, that December..." 
    : "next year, someday, when I'm ready...";

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cyber grid background */}
      <div className="absolute inset-0 cyber-grid opacity-30" />
      
      {/* Gradient overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, 
            ${direction === "past" ? "hsl(280 100% 65% / 0.1)" : "hsl(150 100% 50% / 0.1)"} 0%, 
            transparent 60%)`
        }}
      />

      {/* Floating particles */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full"
          style={{
            background: i % 2 === 0 ? "hsl(195 100% 55%)" : "hsl(280 100% 65%)",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            boxShadow: "0 0 10px currentColor",
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.2,
          }}
        />
      ))}

      <motion.div
        className="relative z-10 w-full max-w-lg text-center"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Back button */}
        <motion.button
          onClick={onBack}
          className="absolute -top-16 left-0 text-muted-foreground hover:text-foreground transition-colors font-sans text-lg"
          whileHover={{ x: -5 }}
        >
          ← Back
        </motion.button>

        {/* Title */}
        <motion.h2
          className="text-4xl md:text-5xl font-display mb-12 neon-text-blue"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Travel to when?
        </motion.h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Neon input */}
          <div className="relative">
            <motion.input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={placeholder}
              className="w-full px-6 py-5 text-xl md:text-2xl bg-transparent border-b-2 border-neon-blue/50 
                         focus:border-neon-blue focus:outline-none transition-all placeholder:text-muted-foreground/40
                         text-center font-sans tracking-wide"
              style={{
                textShadow: inputValue ? "0 0 10px hsl(195 100% 55% / 0.5)" : "none",
              }}
              autoFocus
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            />
            
            {/* Blinking cursor effect on empty */}
            {!inputValue && (
              <motion.span
                className="absolute left-1/2 top-1/2 -translate-y-1/2 w-0.5 h-8 bg-neon-blue"
                style={{ marginLeft: placeholder.length * 2 }}
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
            )}

            {/* Glow line under input */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-0.5"
              style={{
                background: "linear-gradient(90deg, transparent, hsl(195 100% 55%), transparent)",
                boxShadow: "0 0 20px hsl(195 100% 55% / 0.5)",
              }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </div>

          {/* Submit button */}
          <motion.button
            type="submit"
            disabled={!inputValue.trim()}
            className="relative px-12 py-4 text-xl font-display uppercase tracking-widest rounded-lg
                       disabled:opacity-30 disabled:cursor-not-allowed transition-all overflow-hidden group"
            style={{
              background: "linear-gradient(135deg, hsl(230 30% 15%) 0%, hsl(230 25% 10%) 100%)",
              border: `2px solid ${direction === "past" ? "hsl(280 100% 65%)" : "hsl(150 100% 50%)"}`,
              boxShadow: inputValue.trim() 
                ? `0 0 20px ${direction === "past" ? "hsl(280 100% 65% / 0.4)" : "hsl(150 100% 50% / 0.4)"}` 
                : "none",
            }}
            whileHover={{ 
              scale: inputValue.trim() ? 1.05 : 1,
              boxShadow: inputValue.trim() 
                ? `0 0 40px ${direction === "past" ? "hsl(280 100% 65% / 0.6)" : "hsl(150 100% 50% / 0.6)"}` 
                : "none",
            }}
            whileTap={{ scale: inputValue.trim() ? 0.95 : 1 }}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <span 
              className={direction === "past" ? "neon-text-violet" : "neon-text-green"}
            >
              Start Time Travel
            </span>

            {/* Hover glow effect */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity"
              style={{
                background: `radial-gradient(circle at center, ${
                  direction === "past" ? "hsl(280 100% 65% / 0.2)" : "hsl(150 100% 50% / 0.2)"
                } 0%, transparent 70%)`,
              }}
            />
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default WhenScreen;