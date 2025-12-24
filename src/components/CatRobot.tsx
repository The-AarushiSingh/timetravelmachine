import { motion } from "framer-motion";

interface CatRobotProps {
  isWaving?: boolean;
}

const CatRobot = ({ isWaving = true }: CatRobotProps) => {
  return (
    <motion.div
      className="relative w-24 h-28 md:w-32 md:h-36"
      animate={{
        y: [0, -5, 0],
        rotate: [-1, 1, -1],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {/* Glow effect under cat */}
      <motion.div
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-6 rounded-full"
        style={{
          background: "radial-gradient(ellipse, hsl(195 100% 55% / 0.4) 0%, transparent 70%)",
        }}
        animate={{
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Body */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-2xl"
        style={{
          background: "linear-gradient(180deg, hsl(230 25% 35%) 0%, hsl(230 25% 25%) 100%)",
          boxShadow: `
            0 0 20px hsl(195 100% 55% / 0.3),
            inset 0 2px 10px hsl(200 30% 50% / 0.3)
          `,
        }}
      >
        {/* Chest panel */}
        <div 
          className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-8 md:w-12 md:h-10 rounded-lg"
          style={{
            background: "linear-gradient(180deg, hsl(230 30% 20%) 0%, hsl(230 25% 15%) 100%)",
            border: "1px solid hsl(195 100% 55% / 0.3)",
          }}
        >
          {/* Power core */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 md:w-5 md:h-5 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(195 100% 60%) 0%, hsl(195 100% 40%) 100%)",
              boxShadow: "0 0 15px hsl(195 100% 55%), 0 0 30px hsl(195 100% 55% / 0.5)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.9, 1.1, 0.9],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Legs */}
        <div 
          className="absolute -bottom-3 left-3 w-4 h-5 md:w-5 md:h-6 rounded-b-lg"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 30%) 0%, hsl(230 25% 22%) 100%)",
          }}
        />
        <div 
          className="absolute -bottom-3 right-3 w-4 h-5 md:w-5 md:h-6 rounded-b-lg"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 30%) 0%, hsl(230 25% 22%) 100%)",
          }}
        />
      </div>

      {/* Head */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-18 md:w-24 md:h-20 rounded-t-3xl rounded-b-2xl"
        style={{
          background: "linear-gradient(180deg, hsl(230 25% 38%) 0%, hsl(230 25% 28%) 100%)",
          boxShadow: `
            0 0 25px hsl(195 100% 55% / 0.2),
            inset 0 2px 15px hsl(200 30% 50% / 0.2)
          `,
        }}
      >
        {/* Ears */}
        <div 
          className="absolute -top-4 left-1 w-5 h-6 rounded-t-full transform -rotate-12"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 35%) 0%, hsl(230 25% 28%) 100%)",
          }}
        >
          <motion.div 
            className="absolute top-1 left-1 w-2.5 h-3 rounded-t-full"
            style={{
              background: "hsl(195 100% 55% / 0.6)",
              boxShadow: "0 0 8px hsl(195 100% 55% / 0.5)",
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
        <div 
          className="absolute -top-4 right-1 w-5 h-6 rounded-t-full transform rotate-12"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 35%) 0%, hsl(230 25% 28%) 100%)",
          }}
        >
          <motion.div 
            className="absolute top-1 right-1 w-2.5 h-3 rounded-t-full"
            style={{
              background: "hsl(195 100% 55% / 0.6)",
              boxShadow: "0 0 8px hsl(195 100% 55% / 0.5)",
            }}
            animate={{
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          />
        </div>

        {/* Face visor */}
        <div 
          className="absolute top-4 left-1/2 -translate-x-1/2 w-16 md:w-18 h-10 rounded-lg"
          style={{
            background: "linear-gradient(180deg, hsl(230 30% 15%) 0%, hsl(230 25% 10%) 100%)",
            border: "2px solid hsl(195 100% 55% / 0.4)",
            boxShadow: "inset 0 0 15px hsl(195 100% 55% / 0.2)",
          }}
        >
          {/* Eyes */}
          <div className="flex justify-center gap-5 pt-2">
            <motion.div
              className="w-4 h-4 md:w-5 md:h-5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(150 100% 70%) 0%, hsl(150 100% 45%) 100%)",
                boxShadow: "0 0 10px hsl(150 100% 50%), 0 0 20px hsl(150 100% 50% / 0.5)",
              }}
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.05, 0.1],
              }}
            />
            <motion.div
              className="w-4 h-4 md:w-5 md:h-5 rounded-full"
              style={{
                background: "radial-gradient(circle at 30% 30%, hsl(150 100% 70%) 0%, hsl(150 100% 45%) 100%)",
                boxShadow: "0 0 10px hsl(150 100% 50%), 0 0 20px hsl(150 100% 50% / 0.5)",
              }}
              animate={{
                scaleY: [1, 0.1, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                times: [0, 0.05, 0.1],
              }}
            />
          </div>
        </div>

        {/* Antenna */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2 w-1 h-5"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 40%) 0%, hsl(230 25% 30%) 100%)",
          }}
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
            className="absolute -top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full"
            style={{
              background: "radial-gradient(circle, hsl(280 100% 70%) 0%, hsl(280 100% 50%) 100%)",
              boxShadow: "0 0 15px hsl(280 100% 65%), 0 0 30px hsl(280 100% 65% / 0.5)",
            }}
            animate={{
              opacity: [0.5, 1, 0.5],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.div>
      </div>

      {/* Arm - for waving */}
      <motion.div
        className="absolute top-14 -right-2 w-4 h-8 rounded-full origin-top"
        style={{
          background: "linear-gradient(180deg, hsl(230 25% 32%) 0%, hsl(230 25% 25%) 100%)",
        }}
        animate={isWaving ? {
          rotate: [0, -40, 40, -40, 40, 0],
        } : {
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: isWaving ? 1.2 : 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Hand */}
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 35%) 0%, hsl(230 25% 28%) 100%)",
          }}
        />
      </motion.div>

      {/* Other arm */}
      <motion.div
        className="absolute top-14 -left-2 w-4 h-8 rounded-full origin-top"
        style={{
          background: "linear-gradient(180deg, hsl(230 25% 32%) 0%, hsl(230 25% 25%) 100%)",
        }}
        animate={{
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <div 
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full"
          style={{
            background: "linear-gradient(180deg, hsl(230 25% 35%) 0%, hsl(230 25% 28%) 100%)",
          }}
        />
      </motion.div>

      {/* Tail */}
      <motion.div
        className="absolute bottom-6 -right-6 w-10 h-3 rounded-full origin-left"
        style={{
          background: "linear-gradient(90deg, hsl(230 25% 30%) 0%, hsl(230 25% 38%) 100%)",
        }}
        animate={{
          rotate: [-20, 20, -20],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <motion.div
          className="absolute -right-1 top-0 w-3 h-3 rounded-full"
          style={{
            background: "hsl(195 100% 55%)",
            boxShadow: "0 0 10px hsl(195 100% 55%)",
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default CatRobot;
