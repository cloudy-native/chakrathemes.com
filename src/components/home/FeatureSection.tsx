import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";
import { Check, Eye, FlaskConical, Palette, Star, SunMoon } from "lucide-react";

// Feature List Data
export const featureList: FeatureCardProps[] = [
  {
    title: "Genuinely Free Forever",
    description:
      "No catches here—completely free to use whenever you need it. No sign-ups, no usage limits, no restrictive licensing, and definitely no surprise premium tiers. Just advanced theme creation tools available to everyone.",
    icon: Star,
    badge: "Free",
  },
  {
    title: "Accessibility-First Design",
    description:
      "Create inclusive themes that work for everyone with built-in WCAG compliance checks. Our contrast ratio analyzer ensures your color combinations meet accessibility standards for both light and dark modes, with real-time visual feedback.",
    icon: Check,
  },
  {
    title: "Comprehensive Preview",
    description: `You can even theme this application interactively. Just name your color palettes "primary", "secondary", "accent", or "background" to see your changes instantly in the Theme Preview tab below. It's an easy way to realise you need to dial bright colors back a smidge.`,
    icon: Eye,
  },
  {
    title: "Advanced Color Science",
    description:
      "Our backroom boys know all about color science, so you don't have to. Create harmonious, accessible color palettes with ease like an expert. Generate balanced color shades, extract palettes from images, and visualize color relationships all in one tool.",
    icon: FlaskConical,
  },
  {
    title: "Light/Dark Mode Harmony",
    description:
      "Design themes that look great in both light and dark modes. Our intelligent shade mapping helps maintain consistent visual hierarchy and accessibility across modes, with automatic relationship suggestions.",
    icon: SunMoon,
  },
  {
    title: "Interactive Inspiration",
    description:
      "Never start from scratch again. Browse our curated collection of color palettes from various design categories, apply them instantly to your theme, and tweak them to match your brand perfectly.",
    icon: Palette,
  },
];

const FeatureSection: React.FC = () => {
  return (
    <Box>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        spacing={{ base: 6, md: 8 }}
        px={{ base: 0, md: 4 }}
      >
        {featureList.map((feature, index) => (
          <FeatureCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            badge={feature.badge}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeatureSection;
