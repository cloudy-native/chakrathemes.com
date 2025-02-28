import React from "react"
import { Link, graphql } from "gatsby"
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  VStack,
  useColorModeValue
} from "@chakra-ui/react"

const BlogPostTemplate = ({ data }) => {
  const post = data.markdownRemark
  const { previous, next } = data
  const accentColor = useColorModeValue("blue.600", "blue.300")

  return (
    <Container maxW="4xl" py={10}>
      <VStack spacing={8} align="stretch">
        <article>
          <header>
            <Heading as="h1" mb={2} color={accentColor}>
              {post.frontmatter.title}
            </Heading>
            <Text fontSize="sm" color="gray.500" mb={8}>
              {post.frontmatter.date}
            </Text>
          </header>
          <Box
            className="blog-content"
            sx={{
              "h2, h3, h4, h5, h6": {
                mt: 8,
                mb: 4,
                fontWeight: "bold",
              },
              p: {
                mb: 4,
              },
              ul: {
                pl: 8,
                mb: 4,
              },
              li: {
                mb: 2,
              },
              blockquote: {
                pl: 4,
                borderLeftWidth: "4px",
                borderLeftColor: accentColor,
                fontStyle: "italic",
                mb: 4,
              },
            }}
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
        
        <Box>
          <Button as={Link} to="/blog" colorScheme="blue" variant="outline">
            Back to Blog
          </Button>
        </Box>
      </VStack>
    </Container>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($id: String!, $previousPostId: String, $nextPostId: String) {
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        description
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`