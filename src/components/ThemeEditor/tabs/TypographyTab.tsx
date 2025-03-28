import { Box, Link, Text, Icon } from "@chakra-ui/react";
import { ExternalLink } from "lucide-react";
import React from "react";

export const TypographyTab: React.FC = () => {
  return (
    <Box p={4}>
      <Text mb={4}>
        For managing and integrating custom fonts into your Chakra UI application, please refer to
        the official Chakra UI documentation{" "}
        <Link
          href="https://v2.chakra-ui.com/community/recipes/using-fonts"
          isExternal
          textDecoration="underline"
        >
          Chakra UI Custom Fonts Instructions <Icon as={ExternalLink} />
        </Link>{" "}
        and to{" "}
        <Link href="https://fonts.google.com" isExternal textDecoration="underline">
          Google Fonts <Icon as={ExternalLink} />
        </Link>{" "}
        for selecting a typeface for your brand. It's a fool's errand to try and improve or even
        replicate the not-too-shabby Google Fonts UI here.
      </Text>
      <Text>
        By the way, the word <em>typeface</em> refers to the overall design of a set of characters,
        like Open Sans, while <em>font</em> a particular variation, like bold. But font is commonly
        used to mean both. And while we're at it, <em>italic</em> and <em>oblique</em> are
        definitely not the same thing.
      </Text>
    </Box>
  );
};

export default TypographyTab;

// https://fonts.google.com/
