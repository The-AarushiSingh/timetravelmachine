import { motion } from "framer-motion";
import { useState } from "react";

interface DestinationScreenProps {
  direction: "past" | "future";
  onReturn: () => void;
}

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const responses = direction === "past" ? pastResponses : futureResponses;
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    setResponse(randomResponse);
    setShowResponse(true);

    setTimeout(() => {
      onReturn();
    }, 4000);
  };

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

      {!showResponse ? (
        <motion.div
          className="relative z-10 w-full max-w-lg text-center"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
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
          className="relative z-10 text-center max-w-xl px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className={`text-2xl md:text-3xl font-display leading-relaxed ${direction === "past" ? "neon-text-violet" : "neon-text-green"}`}
          >
            "{response}"
          </motion.p>
          
          <motion.p
            className="mt-12 text-muted-foreground font-sans text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
          >
            Returning to the present...
          </motion.p>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DestinationScreen;