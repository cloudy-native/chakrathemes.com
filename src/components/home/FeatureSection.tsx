import React from "react";
import { SimpleGrid } from "@chakra-ui/react";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";
import { Check, Palette, Star } from "lucide-react";

/**
 * featureList Array
 *
 * An array of FeatureCardProps objects defining the features to be displayed in the FeatureSection.
 * Each object represents a feature with a title, description, and icon.
 */
export const featureList: FeatureCardProps[] = [
  {
    title: "Free & Accessible Theme Creation",
    description:
      "Enjoy unlimited, free access to advanced theme creation tools. Design inclusive themes with built-in WCAG compliance checks and intelligent dark mode adaptation.",
    icon: Check,
  },
  {
    title: "Effortless Color Palette Design",
    description:
      "Create harmonious color palettes with ease. Generate balanced shades, extract colors from images, browse curated collections, and visualize color relationships—all in one place.",
    icon: Palette,
  },
  {
    title: "Truly Free, Forever",
    description:
      "No catches, no sign-ups, no usage limits, and no premium tiers. This app is free because we're passionate about creating tools that designers and developers love to use.",
    icon: Star,
  },
];

/**
 * FeatureSection Component
 *
 * This component displays a grid of FeatureCard components, showcasing the key features of the application.
 */
const FeatureSection: React.FC = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      spacing={{ base: 8, md: 10, lg: 12 }}
      width="100%"
    >
      {/* Map through the featureList array to create each FeatureCard. */}
      {featureList.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          icon={feature.icon}
        />
      ))}
    </SimpleGrid>
  );
};

export default FeatureSection;
