import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  useColorModeValue,
  Link as ChakraLink,
  VStack,
  HStack,
  Tag,
  Avatar,
  Flex,
} from "@chakra-ui/react";
import {
  HeadFC,
  PageProps,
  Link as GatsbyLink,
  graphql,
  useStaticQuery,
} from "gatsby";
import * as React from "react";

const BlogHero = () => {
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const accentColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("gray.700", "gray.100");

  return (
    <Box
      bg={useColorModeValue("blue.50", "gray.900")}
      bgGradient={bgGradient}
      pt={16}
      pb={10}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Stack spacing={6} textAlign="center">
        <Heading
          as="h1"
          fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
          fontWeight="bold"
          color={accentColor}
          lineHeight="1.2"
        >
          Blog
        </Heading>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          color={textColor}
          maxW="3xl"
          mx="auto"
          lineHeight="1.8"
        >
          Articles, tutorials, and updates about Gatsby, TypeScript, and Chakra
          UI development.
        </Text>
      </Stack>
    </Box>
  );
};

interface BlogPostCardProps {
  title: string;
  excerpt: string;
  date: string;
  author: {
    name: string;
    avatar?: string;
  };
  slug: string;
  tags?: string[];
  isFeatured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({
  title,
  excerpt,
  date,
  author,
  slug,
  tags = [],
  isFeatured = false,
}) => {
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.700", "gray.300");
  const tagBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box
      as={GatsbyLink}
      to={slug}
      display="block"
      _hover={{ textDecoration: "none" }}
    >
      <Box
        p={6}
        h="full"
        bg={cardBg}
        borderWidth="1px"
        borderColor={borderColor}
        borderRadius="lg"
        shadow="md"
        transition="all 0.3s"
        position="relative"
        _hover={{
          transform: "translateY(-4px)",
          shadow: "lg",
          borderColor: useColorModeValue("blue.300", "blue.500"),
        }}
      >
        {isFeatured && (
          <Tag
            position="absolute"
            top={3}
            right={3}
            colorScheme="blue"
            size="sm"
          >
            Featured
          </Tag>
        )}

        <VStack align="start" spacing={4}>
          <Heading as="h3" fontSize="xl" lineHeight="tight">
            {title}
          </Heading>

          <Text color={textColor} noOfLines={3}>
            {excerpt}
          </Text>

          <HStack spacing={2} mt={2} wrap="wrap">
            {tags.map((tag) => (
              <Tag key={tag} size="sm" bg={tagBg} my={1}>
                {tag}
              </Tag>
            ))}
          </HStack>

          <Flex justify="space-between" align="center" w="full" mt={2}>
            <HStack>
              <Avatar name={author.name} src={author.avatar} size="xs" />
              <Text fontSize="sm" fontWeight="medium">
                {author.name}
              </Text>
            </HStack>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.500", "gray.400")}
            >
              {date}
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};

const BlogPage: React.FC<PageProps> = () => {
  // Use GraphQL to query blog posts
  const data = useStaticQuery(graphql`
    query BlogPostsQuery {
      allMarkdownRemark(
        sort: { frontmatter: { date: DESC } }
        filter: { fileAbsolutePath: { regex: "/content/blog/" } }
      ) {
        nodes {
          id
          excerpt(pruneLength: 160)
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
            author
            tags
          }
        }
      }
    }
  `);

  const posts = data.allMarkdownRemark.nodes.map((node) => ({
    title: node.frontmatter.title,
    excerpt: node.frontmatter.description || node.excerpt,
    date: new Date(node.frontmatter.date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    author: {
      name: node.frontmatter.author || "Gatsby Team",
    },
    slug: node.fields.slug,
    tags: node.frontmatter.tags || [],
    // You could determine featured posts based on some criteria
    isFeatured: node.frontmatter.tags?.includes("Tutorial") || false,
  }));

  return (
    <>
      <BlogHero />

      <Container maxW="6xl" py={12}>
        <VStack spacing={10} align="stretch">
          {posts.length === 0 ? (
            <Text textAlign="center" fontSize="lg">
              No blog posts found. Check back soon!
            </Text>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
              {posts.map((post) => (
                <BlogPostCard key={post.slug} {...post} />
              ))}
            </SimpleGrid>
          )}
        </VStack>
      </Container>
    </>
  );
};

export default BlogPage;

export const Head: HeadFC = () => (
  <title>Blog | Gatsby TypeScript ChakraUI</title>
);
