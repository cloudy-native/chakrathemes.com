import React from "react";
import { Box, SimpleGrid } from "@chakra-ui/react";
import FeatureCard, { FeatureCardProps } from "./FeatureCard";
import { Check, Eye, FlaskConical, Heart, Palette, Star } from "lucide-react";

// Feature List Data
export const featureList: FeatureCardProps[] = [
  {
    title: "Genuinely Free Forever",
    description:
      "No catches here—completely free to use whenever you need it. No sign-ups, no usage limits, no restrictive licensing, and definitely no surprise premium tiers. Just advanced theme creation tools available to everyone.",
    icon: Star,
  },
  {
    title: "Accessibility & Dark Mode Harmony",
    description:
      "Create inclusive themes that work for everyone with built-in WCAG compliance checks. Our intelligent shade mapping ensures color combinations meet accessibility standards across both light and dark modes, maintaining consistent visual hierarchy with automatic relationship suggestions.",
    icon: Check,
  },
  {
    title: "Comprehensive Preview",
    description: `You can even theme this application interactively. Just name your color palettes "primary", "secondary", "accent", and "background" to see your changes instantly in the Preview tab above. It's an easy way to realise you need to dial bright colors back a smidge.`,
    icon: Eye,
  },
  {
    title: "Advanced Color Science",
    description:
      "Our backroom boys know all about color science, so you don't have to. Create harmonious, accessible color palettes with ease like an expert. Generate balanced color shades, extract palettes from images, and visualize color relationships all in one tool.",
    icon: FlaskConical,
  },
  {
    title: "Interactive Inspiration",
    description:
      "Never start from scratch again. Browse our curated collection of color palettes from various design categories, apply them instantly to your theme, and tweak them to match your brand perfectly.",
    icon: Palette,
  },
  {
    title: "Made With Love",
    description:
      "This app is free because we're passionate about creating tools that designers and developers actually love to use. We believe great design should be accessible to everyone, and your success is our ultimate reward.",
    icon: Heart,
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
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeatureSection;
