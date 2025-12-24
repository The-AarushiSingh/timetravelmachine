import { motion } from "framer-motion";

interface TimeMachineProps {
  isSpinningFast?: boolean;
}

const TimeMachine = ({ isSpinningFast = false }: TimeMachineProps) => {
  const spinDuration = isSpinningFast ? 0.5 : 20;
  const spinReverseDuration = isSpinningFast ? 0.8 : 15;

  return (
    <div className="relative w-[320px] h-[320px] md:w-[450px] md:h-[450px] lg:w-[500px] lg:h-[500px]">
      {/* Outer glow aura */}
      <motion.div
        className="absolute inset-[-40px] rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(195 100% 55% / 0.15) 0%, hsl(280 100% 65% / 0.1) 40%, transparent 70%)",
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating particles around portal */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 md:w-1.5 md:h-1.5 rounded-full"
          style={{
            background: i % 3 === 0 
              ? "hsl(150 100% 50%)" 
              : i % 3 === 1 
                ? "hsl(195 100% 55%)" 
                : "hsl(280 100% 65%)",
            left: `${50 + 45 * Math.cos((i * 2 * Math.PI) / 20)}%`,
            top: `${50 + 45 * Math.sin((i * 2 * Math.PI) / 20)}%`,
            boxShadow: `0 0 10px currentColor`,
          }}
          animate={{
            scale: [0.5, 1.5, 0.5],
            opacity: [0.3, 1, 0.3],
            x: [0, Math.cos(i) * 20, 0],
            y: [0, Math.sin(i) * 20, 0],
          }}
          transition={{
            duration: 2 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.1,
          }}
        />
      ))}

      {/* Outermost ring - Violet */}
      <motion.div
        className="absolute inset-0 rounded-full border-4 md:border-[6px] border-neon-violet"
        style={{
          boxShadow: `
            0 0 20px hsl(280 100% 65% / 0.6),
            0 0 40px hsl(280 100% 65% / 0.4),
            0 0 80px hsl(280 100% 65% / 0.2),
            inset 0 0 30px hsl(280 100% 65% / 0.3)
          `,
        }}
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: spinDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Second ring - Blue with dashes */}
      <motion.div
        className="absolute inset-4 md:inset-6 rounded-full"
        style={{
          border: "3px dashed hsl(195 100% 55%)",
          boxShadow: `
            0 0 15px hsl(195 100% 55% / 0.5),
            0 0 30px hsl(195 100% 55% / 0.3)
          `,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: spinReverseDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Third ring - Green */}
      <motion.div
        className="absolute inset-10 md:inset-14 rounded-full border-2 md:border-4 border-neon-green"
        style={{
          boxShadow: `
            0 0 15px hsl(150 100% 50% / 0.6),
            0 0 30px hsl(150 100% 50% / 0.3),
            inset 0 0 20px hsl(150 100% 50% / 0.2)
          `,
        }}
        animate={{
          rotate: 360,
          scale: [1, 1.02, 1],
        }}
        transition={{
          rotate: {
            duration: spinDuration * 0.8,
            repeat: Infinity,
            ease: "linear",
          },
          scale: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      />

      {/* Fourth ring - Violet inner */}
      <motion.div
        className="absolute inset-16 md:inset-24 rounded-full border-2 border-neon-violet/60"
        style={{
          boxShadow: `
            0 0 10px hsl(280 100% 65% / 0.4),
            inset 0 0 15px hsl(280 100% 65% / 0.2)
          `,
        }}
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: spinDuration * 1.2,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Energy field background */}
      <motion.div
        className="absolute inset-20 md:inset-28 rounded-full"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, hsl(195 100% 55% / 0.3) 0%, transparent 50%),
            radial-gradient(circle at 70% 70%, hsl(280 100% 65% / 0.3) 0%, transparent 50%),
            radial-gradient(circle, hsl(150 100% 50% / 0.1) 0%, hsl(230 25% 7% / 0.9) 100%)
          `,
        }}
        animate={{
          rotate: 180,
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Inner core ring */}
      <motion.div
        className="absolute inset-24 md:inset-32 rounded-full border-2 border-neon-blue/80"
        style={{
          boxShadow: `
            0 0 20px hsl(195 100% 55% / 0.8),
            0 0 40px hsl(195 100% 55% / 0.4),
            inset 0 0 30px hsl(195 100% 55% / 0.3)
          `,
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Core center - The portal eye */}
      <motion.div
        className="absolute inset-28 md:inset-36 rounded-full bg-background/80 flex items-center justify-center"
        style={{
          boxShadow: `
            inset 0 0 30px hsl(195 100% 55% / 0.5),
            inset 0 0 60px hsl(280 100% 65% / 0.3)
          `,
        }}
        animate={{
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Pulsing core light */}
        <motion.div
          className="w-8 h-8 md:w-12 md:h-12 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(195 100% 70%) 0%, hsl(195 100% 55%) 50%, transparent 100%)",
            boxShadow: `
              0 0 30px hsl(195 100% 55%),
              0 0 60px hsl(195 100% 55% / 0.7),
              0 0 100px hsl(150 100% 50% / 0.5)
            `,
          }}
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.7, 1, 0.7],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Orbiting energy dots */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={`orbit-${i}`}
          className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full"
          style={{
            background: i % 2 === 0 ? "hsl(195 100% 55%)" : "hsl(150 100% 50%)",
            boxShadow: `0 0 15px ${i % 2 === 0 ? "hsl(195 100% 55%)" : "hsl(150 100% 50%)"}`,
            top: "50%",
            left: "50%",
            marginTop: "-6px",
            marginLeft: "-6px",
          }}
          animate={{
            x: [
              Math.cos((i * Math.PI) / 2) * 120,
              Math.cos((i * Math.PI) / 2 + Math.PI) * 120,
              Math.cos((i * Math.PI) / 2 + Math.PI * 2) * 120,
            ],
            y: [
              Math.sin((i * Math.PI) / 2) * 120,
              Math.sin((i * Math.PI) / 2 + Math.PI) * 120,
              Math.sin((i * Math.PI) / 2 + Math.PI * 2) * 120,
            ],
          }}
          transition={{
            duration: isSpinningFast ? 1 : 6,
            repeat: Infinity,
            ease: "linear",
            delay: i * 0.5,
          }}
        />
      ))}
    </div>
  );
};

export default TimeMachine;