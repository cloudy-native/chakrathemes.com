const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");

// Create blog post pages
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Define templates
  const blogPostTemplate = path.resolve("./src/templates/blog-post-simple.tsx");

  // Get all markdown blog posts sorted by date
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { frontmatter: { date: DESC } }, limit: 1000) {
        nodes {
          id
          fields {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`, result.errors);
    return;
  }

  const posts = result.data.allMarkdownRemark.nodes;

  // Create blog posts pages
  if (posts.length > 0) {
    posts.forEach((post, index) => {
      const previousPostId = index === 0 ? null : posts[index - 1].id;
      const nextPostId =
        index === posts.length - 1 ? null : posts[index + 1].id;

      createPage({
        path: post.fields.slug,
        component: blogPostTemplate,
        context: {
          id: post.id,
          slug: post.fields.slug,
          previousPostId,
          nextPostId,
        },
      });
    });

    // Pagination could be added here if needed in the future
  }
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: "slug",
      node,
      value: `/blog${value}`,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  // Define the schema for frontmatter
  createTypes(`
    type SiteSiteMetadata {
      title: String!
      description: String!
      author: String!
      siteUrl: String!
    }

    type MarkdownRemarkFrontmatter {
      title: String!
      description: String
      date: Date! @dateformat
      author: String
      tags: [String!]
      featuredImage: File @fileByRelativePath
    }

    type MarkdownRemarkFields {
      slug: String!
    }

    type MarkdownRemark implements Node {
      frontmatter: MarkdownRemarkFrontmatter!
      fields: MarkdownRemarkFields!
      excerpt: String!
      html: String!
      wordCount: WordCount!
    }

    type WordCount {
      words: Int!
    }
  `);
};
