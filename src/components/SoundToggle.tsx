import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

interface SoundToggleProps {
  isMuted: boolean;
  onToggle: () => void;
}

const SoundToggle = ({ isMuted, onToggle }: SoundToggleProps) => {
  return (
    <motion.button
      onClick={onToggle}
      className="fixed top-6 right-6 z-50 p-3 rounded-full transition-all"
      style={{
        background: "linear-gradient(135deg, hsl(230 30% 15%) 0%, hsl(230 25% 10%) 100%)",
        border: "1px solid hsl(195 100% 55% / 0.3)",
        boxShadow: "0 0 15px hsl(195 100% 55% / 0.2)",
      }}
      whileHover={{ 
        scale: 1.1,
        boxShadow: "0 0 25px hsl(195 100% 55% / 0.4)",
      }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      aria-label={isMuted ? "Unmute sound" : "Mute sound"}
    >
      {isMuted ? (
        <VolumeX className="w-5 h-5 text-muted-foreground" />
      ) : (
        <Volume2 className="w-5 h-5 text-neon-blue" />
      )}
    </motion.button>
  );
};

export default SoundToggle;
