import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProfileCard from "./ProfileCard";
import BottomNav from "./BottomNav";
import { Button } from "./ui/button";
import { Bell, SlidersHorizontal, Sparkles } from "lucide-react";

// Mock profile data
const mockProfiles = [
  {
    id: "1",
    name: "Layla",
    age: 21,
    university: "American University in Dubai",
    major: "Business Administration",
    bio: "Coffee enthusiast ☕ | Future entrepreneur | Looking for someone who matches my energy and ambition 💫",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&q=80",
    matchScore: 92,
    interests: ["Entrepreneurship", "Travel", "Coffee", "Fitness", "Art"],
    verified: true,
    mutualFriends: 3,
    vibeStatus: "Coffee & Chill ☕",
  },
  {
    id: "2",
    name: "Ahmed",
    age: 22,
    university: "NYU Abu Dhabi",
    major: "Computer Engineering",
    bio: "Building the future one line of code at a time 💻 Weekend hiker and sunset chaser 🌅",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80",
    matchScore: 87,
    interests: ["Tech", "Hiking", "Photography", "Gaming", "Music"],
    verified: true,
    mutualFriends: 1,
    vibeStatus: "Study Mode 📚",
  },
  {
    id: "3",
    name: "Maya",
    age: 20,
    university: "American University in Dubai",
    major: "Psychology",
    bio: "Understanding minds, one conversation at a time 🧠 Cat mom | Book lover | Deep talks only 📚",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=800&q=80",
    matchScore: 95,
    interests: ["Psychology", "Reading", "Cats", "Yoga", "Podcasts"],
    verified: true,
    mutualFriends: 5,
    vibeStatus: "Artistic Flow 🎨",
  },
];

interface DiscoverScreenProps {
  onNavigate: (screen: string) => void;
}

const DiscoverScreen = ({ onNavigate }: DiscoverScreenProps) => {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeTab, setActiveTab] = useState("discover");
  const [showMatch, setShowMatch] = useState(false);

  const currentProfile = profiles[currentIndex];

  const handleLike = () => {
    // 30% chance to show match animation
    if (Math.random() < 0.3) {
      setShowMatch(true);
      setTimeout(() => {
        setShowMatch(false);
        moveToNext();
      }, 2000);
    } else {
      moveToNext();
    }
  };

  const handlePass = () => {
    moveToNext();
  };

  const handleSuperLike = () => {
    setShowMatch(true);
    setTimeout(() => {
      setShowMatch(false);
      moveToNext();
    }, 2000);
  };

  const moveToNext = () => {
    if (currentIndex < profiles.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0); // Loop back
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 safe-top shrink-0">
        <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-border/40 hover:bg-secondary transition-colors shadow-sm">
          <SlidersHorizontal className="w-5 h-5 text-foreground/70" />
        </button>

        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <h1 className="font-display text-2xl italic font-semibold text-royal-navy tracking-tight">
            VibeTribe
          </h1>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-2xl bg-white border border-border/40 hover:bg-secondary transition-colors relative shadow-sm">
          <Bell className="w-5 h-5 text-foreground/70" />
          <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-accent rounded-full border-2 border-white" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center px-4 pb-20 overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          {currentProfile && (
            <ProfileCard
              key={currentProfile.id}
              profile={currentProfile}
              onLike={handleLike}
              onPass={handlePass}
              onSuperLike={handleSuperLike}
            />
          )}
        </AnimatePresence>
      </main>

      {/* Match Animation Overlay */}
      <AnimatePresence>
        {showMatch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-royal-navy/95 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ type: "spring", damping: 12 }}
              className="text-center px-8"
            >
              <div className="relative mb-8">
                <motion.div
                  animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="text-7xl"
                >
                  💜
                </motion.div>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="absolute -top-2 -right-2 text-3xl"
                >
                  ✨
                </motion.div>
              </div>
              <h2 className="font-display text-5xl italic font-semibold text-white mb-4">
                It's a Match!
              </h2>
              <p className="text-white/70 font-body text-sm max-w-[200px] mx-auto leading-relaxed">
                You and {currentProfile?.name} have shared the same vibe
              </p>

              <Button variant="hero" className="mt-8 w-full py-6">
                Send a Message
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Navigation */}
      <BottomNav activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  );
};

export default DiscoverScreen;
