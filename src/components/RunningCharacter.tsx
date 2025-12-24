import { motion } from "framer-motion";

const RunningCharacter = () => {
  return (
    <motion.div
      className="fixed bottom-4 left-0 z-50"
      initial={{ x: -100 }}
      animate={{ x: "calc(100vw + 100px)" }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      <div className="relative">
        {/* Simple stick figure runner with neon glow */}
        <motion.div
          className="w-8 h-8 relative"
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 0.3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Head */}
          <div 
            className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: "hsl(150 100% 50%)",
              boxShadow: "0 0 10px hsl(150 100% 50%), 0 0 20px hsl(150 100% 50% / 0.5)",
            }}
          />
          
          {/* Body */}
          <div 
            className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-4"
            style={{
              background: "hsl(150 100% 50%)",
              boxShadow: "0 0 5px hsl(150 100% 50%)",
            }}
          />
          
          {/* Arms - animated */}
          <motion.div
            className="absolute top-4 left-1/2 w-4 h-0.5 origin-left"
            style={{
              background: "hsl(150 100% 50%)",
              boxShadow: "0 0 5px hsl(150 100% 50%)",
            }}
            animate={{
              rotate: [-30, 30, -30],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute top-4 left-1/2 w-4 h-0.5 origin-left"
            style={{
              background: "hsl(150 100% 50%)",
              boxShadow: "0 0 5px hsl(150 100% 50%)",
              transform: "scaleX(-1)",
            }}
            animate={{
              rotate: [30, -30, 30],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          />
          
          {/* Legs - animated */}
          <motion.div
            className="absolute top-7 left-1/2 w-0.5 h-4 origin-top"
            style={{
              background: "hsl(150 100% 50%)",
              boxShadow: "0 0 5px hsl(150 100% 50%)",
            }}
            animate={{
              rotate: [-40, 40, -40],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          />
          <motion.div
            className="absolute top-7 left-1/2 w-0.5 h-4 origin-top"
            style={{
              background: "hsl(150 100% 50%)",
              boxShadow: "0 0 5px hsl(150 100% 50%)",
            }}
            animate={{
              rotate: [40, -40, 40],
            }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
            }}
          />
        </motion.div>

        {/* Trail effect */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-4 w-2 h-0.5 rounded-full"
            style={{
              left: -(i + 1) * 8,
              background: `hsl(150 100% 50% / ${0.5 - i * 0.1})`,
              boxShadow: `0 0 ${5 - i}px hsl(150 100% 50% / ${0.5 - i * 0.1})`,
            }}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default RunningCharacter;