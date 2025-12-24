import { motion } from "framer-motion";

const CatRobot = () => {
  return (
    <motion.div
      className="relative w-20 h-24 md:w-24 md:h-28"
      animate={{
        y: [-8, -20, -12, -8],
        x: [0, 8, -5, 0],
        rotate: [-3, 3, -2, -3],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Body */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-14 md:w-16 md:h-16 bg-cat-body rounded-2xl shadow-soft">
        {/* Belly light */}
        <motion.div
          className="absolute bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent/60"
          animate={{
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Legs */}
        <div className="absolute -bottom-2 left-2 w-3 h-4 bg-cat-body rounded-b-lg" />
        <div className="absolute -bottom-2 right-2 w-3 h-4 bg-cat-body rounded-b-lg" />
      </div>

      {/* Head */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-14 md:w-20 md:h-16 bg-cat-body rounded-t-3xl rounded-b-2xl shadow-soft">
        {/* Ears */}
        <div className="absolute -top-3 left-1 w-4 h-5 bg-cat-body rounded-t-full transform -rotate-12" />
        <div className="absolute -top-3 right-1 w-4 h-5 bg-cat-body rounded-t-full transform rotate-12" />
        <div className="absolute -top-2 left-1.5 w-2 h-3 bg-cat-accent/60 rounded-t-full transform -rotate-12" />
        <div className="absolute -top-2 right-1.5 w-2 h-3 bg-cat-accent/60 rounded-t-full transform rotate-12" />

        {/* Face */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-12 md:w-14 flex flex-col items-center">
          {/* Eyes */}
          <div className="flex gap-4 mb-1">
            <motion.div
              className="w-3 h-3 bg-foreground/80 rounded-full"
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.5, 1],
              }}
            >
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-background rounded-full" />
            </motion.div>
            <motion.div
              className="w-3 h-3 bg-foreground/80 rounded-full"
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.5, 1],
              }}
            >
              <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-background rounded-full" />
            </motion.div>
          </div>
          
          {/* Nose */}
          <div className="w-2 h-1.5 bg-cat-accent rounded-full" />
          
          {/* Mouth */}
          <div className="flex gap-0.5 mt-0.5">
            <div className="w-2 h-1 border-b-2 border-r border-foreground/40 rounded-br-full" />
            <div className="w-2 h-1 border-b-2 border-l border-foreground/40 rounded-bl-full" />
          </div>
        </div>

        {/* Antenna */}
        <motion.div
          className="absolute -top-5 left-1/2 -translate-x-1/2 w-0.5 h-4 bg-cat-body"
          animate={{
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <motion.div
            className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-accent"
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.1, 0.8],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Tail */}
      <motion.div
        className="absolute bottom-4 -right-4 w-8 h-2 bg-cat-body rounded-full origin-left"
        animate={{
          rotate: [-15, 15, -15],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default CatRobot;
