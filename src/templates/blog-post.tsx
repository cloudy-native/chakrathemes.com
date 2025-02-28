import * as React from "react";
import { graphql, Link, HeadFC } from "gatsby";
import { GatsbyImage, getImage } from "gatsby-plugin-image";
import {
  Box,
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  VStack,
  HStack,
  Tag,
  Flex,
  Button,
  Divider,
} from "@chakra-ui/react";
import { FaArrowLeft, FaFacebook, FaLinkedin, FaTwitter } from "react-icons/fa";

const BlogPostHeader = ({ post }) => {
  const bgGradient = useColorModeValue(
    "linear(to-b, blue.50, white)",
    "linear(to-b, gray.900, gray.800)"
  );

  const accentColor = useColorModeValue("blue.600", "blue.300");
  const textColor = useColorModeValue("gray.700", "gray.100");
  const tagBg = useColorModeValue("blue.50", "blue.900");

  return (
    <Box
      bg={useColorModeValue("blue.50", "gray.900")}
      bgGradient={bgGradient}
      pt={16}
      pb={10}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
    >
      <Container maxW="4xl">
        <VStack spacing={6} textAlign="center">
          <Box>
            {post.frontmatter.tags && (
              <HStack spacing={2} justify="center" mb={3} wrap="wrap">
                {post.frontmatter.tags.map((tag) => (
                  <Tag key={tag} size="md" bg={tagBg}>
                    {tag}
                  </Tag>
                ))}
              </HStack>
            )}
            
            <Heading
              as="h1"
              fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
              fontWeight="bold"
              color={accentColor}
              lineHeight="1.2"
              mb={4}
            >
              {post.frontmatter.title}
            </Heading>
            
            <Text
              fontSize="md"
              color={useColorModeValue("gray.600", "gray.400")}
              mb={4}
            >
              {new Date(post.frontmatter.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })} • {Math.ceil(post.wordCount.words / 200)} min read
            </Text>
            
            <Flex justify="center" align="center">
              <Text fontWeight="medium">{post.frontmatter.author || "Gatsby Team"}</Text>
            </Flex>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
};

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark;
  
  const textColor = useColorModeValue("gray.700", "gray.300");
  const accentColor = useColorModeValue("blue.600", "blue.300");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  
  return (
    <>
      <BlogPostHeader post={post} />
      
      <Container maxW="4xl" py={12}>
        <VStack spacing={8} align="start">
          <Button
            as={Link}
            to="/blog"
            variant="ghost"
            leftIcon={<FaArrowLeft />}
            size="sm"
            color={accentColor}
          >
            Back to Blog
          </Button>
          
          {/* Feature image would go here */}
          
          <Box 
            className="blog-post-content"
            sx={{
              "h2, h3, h4, h5, h6": {
                color: accentColor,
                fontWeight: "bold",
                marginTop: "1.5rem",
                marginBottom: "1rem",
              },
              "h2": { 
                fontSize: { base: "xl", md: "2xl" },
                borderBottom: "1px solid",
                borderColor: borderColor,
                paddingBottom: "0.5rem",
              },
              "h3": { fontSize: { base: "lg", md: "xl" } },
              "p": { 
                marginY: "1rem",
                lineHeight: "tall",
                color: textColor,
                fontSize: "lg",
              },
              "ul, ol": { 
                paddingLeft: "2rem",
                marginY: "1rem",
              },
              "li": {
                marginY: "0.5rem",
                color: textColor,
              },
              "a": {
                color: accentColor,
                textDecoration: "underline",
              },
              "blockquote": {
                borderLeftWidth: "4px",
                borderLeftColor: accentColor,
                paddingLeft: "1rem",
                fontStyle: "italic",
                marginY: "1.5rem",
              },
              "pre": {
                bg: useColorModeValue("gray.100", "gray.800"),
                padding: "1rem",
                borderRadius: "md",
                overflowX: "auto",
                marginY: "1.5rem",
              },
              "img": {
                maxWidth: "100%",
                height: "auto",
                borderRadius: "md",
                marginY: "1.5rem",
              },
              "hr": {
                marginY: "2rem",
                borderColor: borderColor,
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
          
          <Divider borderColor={borderColor} my={8} />
          
          <Box w="full">
            <Heading as="h3" size="md" mb={4}>
              Share this article
            </Heading>
            <HStack spacing={4}>
              <Button leftIcon={<FaTwitter />} colorScheme="twitter" variant="outline">
                Twitter
              </Button>
              <Button leftIcon={<FaFacebook />} colorScheme="facebook" variant="outline">
                Facebook
              </Button>
              <Button leftIcon={<FaLinkedin />} colorScheme="linkedin" variant="outline">
                LinkedIn
              </Button>
            </HStack>
          </Box>
        </VStack>
      </Container>
    </>
  );
};

export default BlogPostTemplate;

export const Head: HeadFC = ({ data }) => (
  <title>{data.markdownRemark.frontmatter.title} | Gatsby TypeScript ChakraUI Blog</title>
);

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      excerpt(pruneLength: 160)
      html
      wordCount {
        words
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
`;