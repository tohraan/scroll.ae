import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  ArrowLeft,
  Mail,
  Lock,
  User,
  GraduationCap,
  Sparkles,
  Heart,
  Camera,
  Check,
  Plus
} from "lucide-react";

interface OnboardingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

const steps = [
  { id: 1, title: "University Email", icon: Mail },
  { id: 2, title: "Create Password", icon: Lock },
  { id: 3, title: "About You", icon: User },
  { id: 4, title: "University", icon: GraduationCap },
  { id: 5, title: "Your Interests", icon: Heart },
  { id: 6, title: "Preferences", icon: Sparkles },
  { id: 7, title: "Photos", icon: Camera },
];

const universities = [
  "American University in Dubai",
  "NYU Abu Dhabi",
  "American University of Sharjah",
  "University of Sharjah",
  "Khalifa University",
  "Zayed University",
];

const interestOptions = [
  "Coffee ☕", "Beach 🏖️", "Gym 🏋️", "Travel ✈️", "Art 🎨",
  "Music 🎵", "Tech 💻", "Gaming 🎮", "Fashion 👗", "Reading 📚",
  "Photography 📸", "Yoga 🧘", "Foodie 🍜", "Cinema 🎬", "Nightlife ✨"
];

const OnboardingScreen = ({ onComplete, onBack }: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [selectedUni, setSelectedUni] = useState("");
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [ageRange, setAgeRange] = useState([18, 25]);
  const [distance, setDistance] = useState([20]);

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      onBack();
    }
  };

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(i => i !== interest));
    } else if (selectedInterests.length < 10) {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-body font-medium text-foreground/70 ml-1">
                Student Email
              </label>
              <Input
                type="email"
                placeholder="you@university.edu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 px-4 text-sm font-body bg-white border-border/60 focus:border-primary rounded-xl"
              />
              <p className="text-[10px] text-muted-foreground font-body leading-relaxed opacity-70">
                Only students from verified universities can join the tribe
              </p>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-body font-medium text-foreground/70 ml-1">
                Password
              </label>
              <Input
                type="password"
                placeholder="Secure your account"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 px-4 text-sm font-body bg-white border-border/60 focus:border-primary rounded-xl"
              />
              <p className="text-[10px] text-muted-foreground font-body leading-relaxed opacity-70">
                Use at least 8 characters with numbers and symbols
              </p>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-body font-medium text-foreground/70 ml-1">
                What's your name?
              </label>
              <Input
                type="text"
                placeholder="First Name only"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="h-12 px-4 text-sm font-body bg-white border-border/60 focus:border-primary rounded-xl"
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col h-full max-h-[300px]">
            <p className="text-xs font-body text-muted-foreground/70 mb-3">
              We'll help you find people nearby
            </p>
            <div className="space-y-2 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {universities.map((uni) => (
                <button
                  key={uni}
                  onClick={() => setSelectedUni(uni)}
                  className={`w-full text-left px-4 py-3.5 rounded-xl border transition-all duration-300 font-body text-[13px] ${selectedUni === uni
                      ? "border-primary bg-primary/5 text-primary shadow-sm"
                      : "border-border/40 bg-white text-foreground/80 hover:border-primary/30"
                    }`}
                >
                  {uni}
                </button>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="flex flex-col h-full max-h-[300px]">
            <p className="text-xs font-body text-muted-foreground/70 mb-3">
              Select 3-10 interests to find your vibe ({selectedInterests.length}/10)
            </p>
            <div className="flex flex-wrap gap-2 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-4">
              {interestOptions.map((interest) => (
                <button
                  key={interest}
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full border text-xs font-medium transition-all duration-300 flex items-center gap-1.5 ${selectedInterests.includes(interest)
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border/50 bg-white text-foreground/70 hover:border-primary/40"
                    }`}
                >
                  {interest}
                  {selectedInterests.includes(interest) && <Check className="w-3 h-3" />}
                </button>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="space-y-8 py-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-body font-medium text-foreground/70 ml-1">
                  Age Range
                </label>
                <span className="text-xs font-bold text-primary">{ageRange[0]} - {ageRange[1]}</span>
              </div>
              <Slider
                value={ageRange}
                onValueChange={setAgeRange}
                max={35}
                min={18}
                step={1}
                className="py-1"
              />
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <label className="text-xs font-body font-medium text-foreground/70 ml-1">
                  Maximum Distance
                </label>
                <span className="text-xs font-bold text-primary">{distance[0]} km</span>
              </div>
              <Slider
                value={distance}
                onValueChange={setDistance}
                max={100}
                min={1}
                step={1}
                className="py-1"
              />
            </div>

            <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
              <p className="text-[10px] text-primary/80 font-medium leading-relaxed italic text-center">
                "We'll prioritize matches within your university circle first"
              </p>
            </div>
          </div>
        );
      case 7:
        return (
          <div className="flex flex-col h-full max-h-[320px]">
            <p className="text-xs font-body text-muted-foreground/70 mb-4">
              Add at least 3 photos to verified your profile
            </p>
            <div className="grid grid-cols-3 gap-2 flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="aspect-[3/4] rounded-xl gradient-royal flex items-center justify-center relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80" alt="Profile" className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex items-center justify-center">
                  <span className="text-[10px] font-bold text-white uppercase tracking-wider">Primary</span>
                </div>
              </div>
              {[2, 3, 4, 5, 6].map((idx) => (
                <div key={idx} className="aspect-[3/4] rounded-xl border-2 border-dashed border-border/60 bg-white/50 flex flex-col items-center justify-center group hover:border-primary/40 transition-colors">
                  <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center mb-1 group-hover:bg-primary/10 transition-colors">
                    <Plus className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <span className="text-[9px] text-muted-foreground/60 font-medium">Add {idx}</span>
                </div>
              ))}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-4 safe-top shrink-0">
        <button
          onClick={handleBack}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-foreground/70" />
        </button>

        {/* Progress */}
        <div className="flex gap-1">
          {steps.map((step) => (
            <div
              key={step.id}
              className={`h-1 rounded-full transition-all duration-300 ${step.id <= currentStep ? "gradient-royal w-4" : "bg-border w-2"
                }`}
            />
          ))}
        </div>

        <div className="w-10" /> {/* Spacer */}
      </header>

      {/* Content */}
      <div className="flex-1 px-6 pt-4 pb-2 flex flex-col min-h-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 15 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -15 }}
            transition={{ duration: 0.25 }}
            className="flex flex-col h-full"
          >
            {/* Step Icon */}
            <div className="w-12 h-12 rounded-2xl gradient-royal flex items-center justify-center mb-5 shadow-lg shrink-0">
              {(() => {
                const StepIcon = steps[currentStep - 1].icon;
                return <StepIcon className="w-5 h-5 text-primary-foreground" />;
              })()}
            </div>

            {/* Step Title & Subtitle */}
            <div className="mb-6 shrink-0">
              <h2 className="font-display text-3xl italic font-semibold text-royal-navy leading-none mb-2">
                {steps[currentStep - 1].title}
              </h2>
              <div className="flex items-center gap-2">
                <div className="h-px w-6 bg-primary/30" />
                <p className="text-[11px] text-muted-foreground/60 font-body font-medium uppercase tracking-wider">
                  Phase {currentStep} of {steps.length}
                </p>
              </div>
            </div>

            {/* Form Content - This area is flex-1 and scrollable if needed */}
            <div className="flex-1 min-h-0">
              {renderStepContent()}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom CTA */}
      <div className="px-6 py-6 pb-10 safe-bottom shrink-0 bg-white shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.05)]">
        <Button
          onClick={handleNext}
          variant="hero"
          size="lg"
          className="w-full py-6 shadow-elegant transition-transform active:scale-95"
          disabled={currentStep === 4 && !selectedUni}
        >
          {currentStep === steps.length ? (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              Finalize my Profile
            </span>
          ) : (
            "Save & Continue"
          )}
        </Button>
      </div>
    </div>
  );
};

export default OnboardingScreen;
