import { motion } from "framer-motion";
import { useState } from "react";

interface DestinationScreenProps {
  direction: "past" | "future";
  onReturn: () => void;
}

const pastResponses = [
  "That version of you already tried.",
  "That timeline is closed.",
  "You did what you could back then.",
  "Some doors stay closed for good reasons.",
  "The past is patient. It can wait forever.",
];

const futureResponses = [
  "Future noted.",
  "No ETA, but acknowledged.",
  "The present will handle it.",
  "Filed under 'eventually'.",
  "Hope received. Processing indefinitely.",
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
    }, 3000);
  };

  const prompt = direction === "past" 
    ? "What would you do differently?" 
    : "What do you hope happens?";

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {!showResponse ? (
        <motion.div
          className="w-full max-w-md text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-serif mb-8 text-foreground">
            {prompt}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type your thoughts..."
              className="w-full px-6 py-4 text-lg bg-card border-2 border-border rounded-2xl focus:outline-none focus:border-primary/50 focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground/50"
              autoFocus
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
            />
            
            <motion.button
              type="submit"
              className="px-8 py-3 text-lg font-medium bg-primary text-primary-foreground rounded-full shadow-soft hover:shadow-float transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!inputValue.trim()}
            >
              Submit to time
            </motion.button>
          </form>
        </motion.div>
      ) : (
        <motion.div
          className="text-center max-w-md"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.p
            className="text-2xl md:text-3xl font-serif italic text-foreground leading-relaxed"
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
          >
            "{response}"
          </motion.p>
          
          <motion.p
            className="mt-8 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Returning to the present...
          </motion.p>
        </motion.div>
      )}

      {/* Ambient particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 rounded-full bg-accent/30"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 4) * 20}%`,
          }}
          animate={{
            y: [-20, 20, -20],
            opacity: [0.2, 0.5, 0.2],
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

export default DestinationScreen;
