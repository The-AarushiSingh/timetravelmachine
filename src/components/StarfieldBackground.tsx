import { motion } from "framer-motion";
import { useMemo } from "react";

interface StarfieldBackgroundProps {
  intensity?: "low" | "medium" | "high";
}

const StarfieldBackground = ({ intensity = "medium" }: StarfieldBackgroundProps) => {
  const starCount = intensity === "low" ? 30 : intensity === "medium" ? 60 : 100;
  const cloudCount = intensity === "low" ? 3 : intensity === "medium" ? 5 : 8;

  // Generate stars with random positions
  const stars = useMemo(() => 
    [...Array(starCount)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: 1 + Math.random() * 2,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      color: i % 5 === 0 
        ? "hsl(195 100% 70%)" 
        : i % 7 === 0 
          ? "hsl(280 100% 75%)" 
          : i % 11 === 0
            ? "hsl(150 100% 65%)"
            : "hsl(0 0% 90%)",
    })), [starCount]
  );

  // Generate nebula clouds
  const clouds = useMemo(() =>
    [...Array(cloudCount)].map((_, i) => ({
      id: i,
      x: 10 + (i * 20) + Math.random() * 15,
      y: 20 + Math.random() * 60,
      size: 150 + Math.random() * 200,
      color: i % 3 === 0 
        ? "hsl(280 60% 50% / 0.08)" 
        : i % 3 === 1 
          ? "hsl(195 60% 50% / 0.08)" 
          : "hsl(150 60% 50% / 0.06)",
      delay: i * 2,
    })), [cloudCount]
  );

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Deep space gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 20%, hsl(280 40% 15% / 0.4) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, hsl(195 40% 15% / 0.3) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, hsl(230 30% 8%) 0%, hsl(230 25% 4%) 100%)
          `,
        }}
      />

      {/* Nebula clouds */}
      {clouds.map((cloud) => (
        <motion.div
          key={`cloud-${cloud.id}`}
          className="absolute rounded-full blur-3xl"
          style={{
            left: `${cloud.x}%`,
            top: `${cloud.y}%`,
            width: `${cloud.size}px`,
            height: `${cloud.size}px`,
            background: `radial-gradient(circle, ${cloud.color} 0%, transparent 70%)`,
          }}
          animate={{
            x: [-20, 20, -20],
            y: [-10, 10, -10],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 15 + cloud.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: cloud.delay,
          }}
        />
      ))}

      {/* Twinkling stars */}
      {stars.map((star) => (
        <motion.div
          key={`star-${star.id}`}
          className="absolute rounded-full"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            background: star.color,
            boxShadow: `0 0 ${star.size * 2}px ${star.color}`,
          }}
          animate={{
            opacity: [0.3, 1, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: star.delay,
          }}
        />
      ))}

      {/* Shooting stars (occasional) */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={`shooting-${i}`}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            boxShadow: "0 0 6px #fff, -30px 0 20px rgba(255,255,255,0.5), -60px 0 30px rgba(255,255,255,0.2)",
          }}
          initial={{ 
            x: `${-10 + i * 40}vw`, 
            y: `${10 + i * 20}vh`,
            opacity: 0,
          }}
          animate={{
            x: [`${-10 + i * 40}vw`, `${60 + i * 40}vw`],
            y: [`${10 + i * 20}vh`, `${50 + i * 20}vh`],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 8 + i * 4,
            ease: "easeOut",
            delay: 5 + i * 3,
          }}
        />
      ))}

      {/* Cyber grid overlay */}
      <div className="absolute inset-0 cyber-grid opacity-15" />
    </div>
  );
};

export default StarfieldBackground;
