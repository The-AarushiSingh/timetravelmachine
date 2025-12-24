import { motion } from "framer-motion";

const TimeMachine = () => {
  return (
    <div className="relative w-64 h-64 md:w-80 md:h-80">
      {/* Outer glow ring */}
      <motion.div
        className="absolute inset-0 rounded-full bg-portal-outer/30"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      {/* Main portal ring */}
      <motion.div
        className="absolute inset-4 rounded-full gradient-portal shadow-float"
        animate={{
          boxShadow: [
            "0 0 40px hsl(250 60% 75% / 0.3), 0 0 80px hsl(180 60% 70% / 0.2)",
            "0 0 60px hsl(250 60% 75% / 0.5), 0 0 120px hsl(180 60% 70% / 0.3)",
            "0 0 40px hsl(250 60% 75% / 0.3), 0 0 80px hsl(180 60% 70% / 0.2)",
          ],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Inner rings */}
        <div className="absolute inset-6 rounded-full bg-portal-inner/60 border-2 border-portal-outer/40" />
        <div className="absolute inset-12 rounded-full bg-portal-center/80 border border-accent/30" />
        
        {/* Center core */}
        <motion.div
          className="absolute inset-16 md:inset-20 rounded-full bg-background/90 shadow-inner flex items-center justify-center"
          animate={{
            scale: [1, 0.95, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="w-4 h-4 rounded-full bg-accent"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-primary/40"
          style={{
            left: `${20 + i * 12}%`,
            top: `${10 + (i % 3) * 30}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.3,
          }}
        />
      ))}
    </div>
  );
};

export default TimeMachine;
