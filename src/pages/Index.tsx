import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";
import OnboardingScreen from "@/components/OnboardingScreen";
import DiscoverScreen from "@/components/DiscoverScreen";

type Screen = "welcome" | "onboarding" | "discover";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");

  const handleGetStarted = () => {
    setCurrentScreen("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen("discover");
  };

  const handleBack = () => {
    setCurrentScreen("welcome");
  };

  const handleNavigate = (screen: string) => {
    setCurrentScreen(screen as Screen);
  };

  return (
    <div className="h-[100dvh] overflow-hidden bg-background">
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <WelcomeScreen onGetStarted={handleGetStarted} />
          </motion.div>
        )}
        
        {currentScreen === "onboarding" && (
          <motion.div
            key="onboarding"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <OnboardingScreen 
              onComplete={handleOnboardingComplete} 
              onBack={handleBack}
            />
          </motion.div>
        )}
        
        {currentScreen === "discover" && (
          <motion.div
            key="discover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <DiscoverScreen onNavigate={handleNavigate} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
