import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import PresentScreen from "@/components/PresentScreen";
import WhenScreen from "@/components/WhenScreen";
import JourneyTransition from "@/components/JourneyTransition";
import DestinationScreen from "@/components/DestinationScreen";
import SoundToggle from "@/components/SoundToggle";

type Screen = "present" | "when" | "traveling" | "destination";
type Direction = "past" | "future" | null;

const Index = () => {
  const [screen, setScreen] = useState<Screen>("present");
  const [direction, setDirection] = useState<Direction>(null);
  const [hasReturned, setHasReturned] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio on first render
  useEffect(() => {
    audioRef.current = new Audio("/sounds/time-travel.mp3");
    audioRef.current.loop = true; // Loop continuously during travel
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const playSound = useCallback(() => {
    if (!isMuted && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {
        // Autoplay may be blocked
      });
    }
  }, [isMuted]);

  const stopSound = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, []);

  const handleNavigate = (dir: "past" | "future") => {
    setDirection(dir);
    setScreen("when");
  };

  const handleWhenSubmit = () => {
    setScreen("traveling");
    playSound();
  };

  const handleWhenBack = () => {
    setDirection(null);
    setScreen("present");
  };

  const handleTransitionComplete = () => {
    // Sound continues playing through destination screen
    setScreen("destination");
  };

  const handleReturn = () => {
    stopSound(); // Stop sound when returning to present
    setHasReturned(true);
    setDirection(null);
    setScreen("present");
  };

  const toggleMute = () => {
    setIsMuted(prev => !prev);
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <SoundToggle isMuted={isMuted} onToggle={toggleMute} />
      
      <AnimatePresence mode="wait">
        {screen === "present" && (
          <PresentScreen
            key="present"
            onNavigate={handleNavigate}
            hasReturned={hasReturned}
          />
        )}

        {screen === "when" && direction && (
          <WhenScreen
            key="when"
            direction={direction}
            onSubmit={handleWhenSubmit}
            onBack={handleWhenBack}
          />
        )}

        {screen === "traveling" && direction && (
          <JourneyTransition
            key="traveling"
            direction={direction}
            onComplete={handleTransitionComplete}
          />
        )}

        {screen === "destination" && direction && (
          <DestinationScreen
            key="destination"
            direction={direction}
            onReturn={handleReturn}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Index;
