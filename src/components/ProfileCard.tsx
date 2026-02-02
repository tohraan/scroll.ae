import { motion } from "framer-motion";
import { MapPin, GraduationCap, Sparkles, Heart, X, Star, Users, Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  profile: {
    id: string;
    name: string;
    age: number;
    university: string;
    major: string;
    bio: string;
    image: string;
    matchScore: number;
    interests: string[];
    verified: boolean;
    mutualFriends?: number;
    vibeStatus?: string;
  };
  onLike: () => void;
  onPass: () => void;
  onSuperLike: () => void;
}

const ProfileCard = ({ profile, onLike, onPass, onSuperLike }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, type: "spring", damping: 20 }}
      className="relative w-full max-w-[340px] h-[580px] flex flex-col mx-auto"
    >
      {/* Main Card Container */}
      <div className="flex-1 relative bg-white rounded-[2.5rem] overflow-hidden shadow-elegant border border-border/40">
        {/* Image Section */}
        <div className="relative h-[65%] w-full">
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
          />

          {/* Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/30 to-transparent" />

          {/* Top Badges */}
          <div className="absolute top-5 left-5 flex flex-col gap-2">
            {profile.verified && (
              <div className="bg-white/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-white/20 flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-accent-mint animate-pulse" />
                Verified Student
              </div>
            )}
            {profile.vibeStatus && (
              <div className="bg-primary/20 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider border border-primary/20 flex items-center gap-1.5">
                <Flame className="w-3 h-3 text-orange-400" />
                {profile.vibeStatus}
              </div>
            )}
          </div>

          <div className="absolute top-5 right-5">
            <div className="bg-accent/90 backdrop-blur-md text-accent-foreground px-3 py-2 rounded-2xl font-body text-xs font-bold shadow-lg border border-accent/20 flex flex-col items-center">
              <Sparkles className="w-4 h-4 mb-0.5" />
              <span>{profile.matchScore}%</span>
            </div>
          </div>

          {/* Name and Basic Info Overlay */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h2 className="font-display text-3xl italic font-semibold leading-none mb-2">
              {profile.name}, {profile.age}
            </h2>
            <div className="flex flex-wrap gap-2 opacity-90">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-medium border border-white/10">
                <GraduationCap className="w-3 h-3 shrink-0" />
                <span className="truncate max-w-[120px]">{profile.major}</span>
              </div>
              {profile.mutualFriends && profile.mutualFriends > 0 && (
                <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-medium border border-white/10">
                  <Users className="w-3 h-3 shrink-0" />
                  <span>{profile.mutualFriends} Mutuals</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="h-[35%] p-6 flex flex-col bg-white">
          <div className="flex items-center gap-1.5 text-muted-foreground/60 text-[10px] font-bold uppercase tracking-widest mb-3 shrink-0">
            <MapPin className="w-3 h-3" />
            <span>{profile.university}</span>
          </div>

          <p className="text-foreground/80 font-body text-xs leading-relaxed line-clamp-2 mb-4 italic italic">
            "{profile.bio}"
          </p>

          {/* Interest Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {profile.interests.slice(0, 4).map((interest) => (
              <span
                key={interest}
                className="px-2.5 py-1 bg-primary/5 text-primary border border-primary/10 rounded-lg text-[10px] font-body font-semibold"
              >
                {interest}
              </span>
            ))}
            {profile.interests.length > 4 && (
              <span className="px-2 py-1 bg-secondary text-muted-foreground/60 rounded-lg text-[10px] font-bold">
                +{profile.interests.length - 4}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons Container */}
      <div className="flex items-center justify-between px-8 py-6 shrink-0 h-24">
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, rotate: -5 }}
          onClick={onPass}
          className="w-14 h-14 rounded-2xl bg-white border border-border/40 flex items-center justify-center shadow-md hover:border-red-200 hover:text-red-400 transition-all text-muted-foreground/40"
        >
          <X className="w-7 h-7" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, y: -2 }}
          onClick={onSuperLike}
          className="w-12 h-12 rounded-2xl gradient-gold flex items-center justify-center shadow-gold hover:shadow-xl transition-all"
        >
          <Star className="w-5 h-5 text-accent-foreground" />
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1, rotate: 5 }}
          onClick={onLike}
          className="w-14 h-14 rounded-2xl gradient-royal flex items-center justify-center shadow-xl hover:shadow-2xl transition-all"
        >
          <Heart className="w-7 h-7 text-white fill-white" />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
