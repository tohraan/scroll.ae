import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

const WelcomeScreen = ({ onGetStarted }: WelcomeScreenProps) => {
  return (
    <div className="h-full flex flex-col gradient-subtle overflow-hidden">
      {/* Hero Section */}
      <div className="flex-[1.5] flex flex-col items-center justify-center px-6 pt-8">
        {/* Logo Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="relative"
        >
          {/* Decorative Elements */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 opacity-30"
          >
            <div className="w-full h-full rounded-full border border-dashed border-primary" />
          </motion.div>

          <div className="w-20 h-20 rounded-full gradient-royal flex items-center justify-center shadow-lg relative z-10">
            <Sparkles className="w-8 h-8 text-primary-foreground" />
          </div>
        </motion.div>

        {/* Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-6"
        >
          <h1 className="font-display text-4xl italic font-semibold text-royal-navy tracking-tight">
            VibeTribe
          </h1>
          <div className="h-0.5 w-12 gradient-royal mx-auto mt-2 rounded-full opacity-50" />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-body text-muted-foreground text-center text-sm mt-4 max-w-[240px] leading-relaxed"
        >
          Find your vibe on campus where real connections happen through shared experiences
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-2 mt-6 max-w-xs"
        >
          {["University Exclusive", "Verified Students", "Smart Matching"].map((feature, i) => (
            <motion.span
              key={feature}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
              className="px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-border/50 rounded-full text-[10px] font-body font-medium text-foreground/80 shadow-sm"
            >
              {feature}
            </motion.span>
          ))}
        </motion.div>
      </div>

      {/* Bottom CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        className="flex-1 flex flex-col justify-end px-6 pb-10"
      >
        <Button
          onClick={onGetStarted}
          variant="hero"
          size="lg"
          className="w-full py-6 text-base font-semibold shadow-xl"
        >
          Explore the Tribe
        </Button>

        <p className="text-center text-muted-foreground text-[11px] font-body mt-4">
          Already have an account?{" "}
          <button className="text-primary font-semibold hover:underline">
            Sign In
          </button>
        </p>

        {/* University Logos Placeholder */}
        <div className="mt-6 text-center">
          <p className="text-[10px] text-muted-foreground/60 font-body mb-2 uppercase tracking-widest font-medium">
            Trusted by students at
          </p>
          <div className="flex justify-center items-center gap-4 opacity-40 grayscale">
            <span className="text-[10px] font-body font-bold text-foreground">AUD</span>
            <div className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[10px] font-body font-bold text-foreground">NYU Abu Dhabi</span>
            <div className="w-1 h-1 rounded-full bg-border" />
            <span className="text-[10px] font-body font-bold text-foreground">AUS</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeScreen;
