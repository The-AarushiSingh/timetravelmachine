import { motion } from "framer-motion";
import TimeMachine from "./TimeMachine";
import CatRobot from "./CatRobot";

interface PresentScreenProps {
  onNavigate: (direction: "past" | "future") => void;
  hasReturned: boolean;
}

const PresentScreen = ({ onNavigate, hasReturned }: PresentScreenProps) => {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-sky pointer-events-none" />
      
      {/* Cat robot - floating around */}
      <motion.div
        className="absolute"
        initial={{ opacity: 0, x: 100 }}
        animate={{ 
          opacity: 1, 
          x: 0,
        }}
        transition={{ delay: 0.5, duration: 0.8 }}
        style={{ 
          top: "20%",
          right: "15%",
        }}
      >
        <CatRobot />
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Time machine */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TimeMachine />
        </motion.div>

        {/* Text */}
        <motion.div
          className="mt-12 text-center"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {hasReturned ? (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-3xl md:text-4xl font-serif text-foreground mb-2">
                You're back.
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground italic">
                This moment still listens.
              </p>
            </motion.div>
          ) : (
            <h1 className="text-3xl md:text-4xl font-serif text-foreground">
              Where do you want to go?
            </h1>
          )}
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex gap-6 mt-10"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <motion.button
            onClick={() => onNavigate("past")}
            className="px-10 py-4 text-lg font-medium bg-secondary text-secondary-foreground rounded-full shadow-soft hover:shadow-float transition-all border-2 border-transparent hover:border-primary/20"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            PAST
          </motion.button>
          
          <motion.button
            onClick={() => onNavigate("future")}
            className="px-10 py-4 text-lg font-medium bg-primary text-primary-foreground rounded-full shadow-soft hover:shadow-float transition-all"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            FUTURE
          </motion.button>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        className="absolute bottom-10 left-10 w-3 h-3 rounded-full bg-accent/40"
        animate={{
          y: [-10, 10, -10],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-20 left-20 w-2 h-2 rounded-full bg-primary/30"
        animate={{
          y: [-15, 15, -15],
          x: [-5, 5, -5],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-32 right-20 w-4 h-4 rounded-full bg-secondary/50"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default PresentScreen;
