import { Box, Link as ChakraLink } from "@chakra-ui/react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ChakraMDXProvider from "../components/chakra-mdx-provider";
import DocumentPage from "../components/document-page";

export default function FAQLayout({ data }: any) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;
  return (
    <DocumentPage
      title={frontmatter.title}
      description={excerpt}
      publishedAt={frontmatter.publishedAt}
      updatedAt={frontmatter.updatedAt}
    >
      <ChakraMDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </ChakraMDXProvider>
      <Box as={"footer"} pt={8} fontSize={{ base: "sm", md: "md" }}>
        <ChakraLink as={GatsbyLink} to={"/faqs"} color={"primary.500"}>
          &larr; Go to FAQs list
        </ChakraLink>
      </Box>
    </DocumentPage>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        publishedAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
