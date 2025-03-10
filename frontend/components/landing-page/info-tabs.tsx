"use client";

import { BookOpen, Brain, Compass, Sparkles } from "lucide-react";
import { FeatureCard } from "../ui/feature-card";
import { motion } from "framer-motion";

const features = [
  {
    icon: <Sparkles className="h-4 w-5 text-primary" />,
    title: "AI-Generated Stories",
    description: "Unique, personalized storylines that adapt to your choices",
  },
  {
    icon: <Compass className="h-5 w-5 text-primary" />,
    title: "Infinite Options",
    description:
      "Explore countless storylines, from fantasy kingdoms to sci-fi universes",
  },
  {
    icon: <BookOpen className="h-5 w-5 text-primary" />,
    title: "Your Story, Your Way",
    description:
      "Every decision shapes your adventure with endless branching paths",
  },
  {
    icon: <Brain className="h-5 w-5 text-primary" />,
    title: "Memory & Learning",
    description: "The AI remembers your choices and adapts to your prompts",
  },
];

export default function InfoTabs() {
  return (
    <motion.div
      className="bg-muted/40 rounded-xl p-4 border shadow-sm flex-1"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </motion.div>
  );
}
