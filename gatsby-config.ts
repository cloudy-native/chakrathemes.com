import type { GatsbyConfig } from "gatsby";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// For client-side access, prefix environment variables with GATSBY_
process.env.GATSBY_GOOGLE_FONTS_API_KEY = process.env.GOOGLE_FONTS_API_KEY;

const config: GatsbyConfig = {
  siteMetadata: {
    title: `ChakraUI Themes Editor`,
    description: `A Chakra UI Themes Editor`,
    author: `@chakrathemes`,
    siteUrl: `https://chakrathemes.com`,
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-sitemap",
    "gatsby-plugin-robots-txt",
    "gatsby-plugin-catch-links",
    "gatsby-plugin-tsconfig-paths",
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 800,
              linkImagesToOriginal: false,
              showCaptions: true,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
          `gatsby-remark-copy-linked-files`,
          `gatsby-remark-smartypants`,
        ],
      },
    },
  ],
};

export default config;
