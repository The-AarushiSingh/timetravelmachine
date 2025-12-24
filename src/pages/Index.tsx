import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import PresentScreen from "@/components/PresentScreen";
import JourneyTransition from "@/components/JourneyTransition";
import DestinationScreen from "@/components/DestinationScreen";

type Screen = "present" | "traveling" | "destination";
type Direction = "past" | "future" | null;

const Index = () => {
  const [screen, setScreen] = useState<Screen>("present");
  const [direction, setDirection] = useState<Direction>(null);
  const [hasReturned, setHasReturned] = useState(false);

  const handleNavigate = (dir: "past" | "future") => {
    setDirection(dir);
    setScreen("traveling");
  };

  const handleTransitionComplete = () => {
    setScreen("destination");
  };

  const handleReturn = () => {
    setHasReturned(true);
    setDirection(null);
    setScreen("present");
  };

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      <AnimatePresence mode="wait">
        {screen === "present" && (
          <PresentScreen
            key="present"
            onNavigate={handleNavigate}
            hasReturned={hasReturned}
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
