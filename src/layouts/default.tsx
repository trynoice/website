import { Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ChakraMDXProvider from "../components/chakra-mdx-provider";
import Page from "../components/page";
import Section from "../components/section";

export default function DefaultLayout({ data }: any) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;
  return (
    <Page
      title={frontmatter.title}
      description={excerpt}
      fontSize={{ base: "md", md: "lg" }}
      lineHeight={"tall"}
    >
      <Section as={"article"} maxW={"4xl"} py={{ base: 12, md: 16 }}>
        <VStack as={"header"} mb={10} spacing={2} align={"flex-start"}>
          <Heading
            as={"h1"}
            size={"2xl"}
            lineHeight={"shorter"}
            color={"primary.500"}
          >
            {frontmatter.title}
          </Heading>
          <Text>
            {frontmatter.publishedAt ? (
              <Text as={"span"}>
                Published on{" "}
                <Text as={"span"} fontWeight={"medium"}>
                  {frontmatter.publishedAt}
                </Text>
              </Text>
            ) : null}
            {frontmatter.updatedAt ? (
              <Text as={"span"}>
                , last updated on{" "}
                <Text as={"span"} fontWeight={"medium"}>
                  {frontmatter.updatedAt}
                </Text>
              </Text>
            ) : null}
          </Text>

          <Divider />
        </VStack>
        <ChakraMDXProvider>
          <MDXRenderer>{body}</MDXRenderer>
        </ChakraMDXProvider>
      </Section>
    </Page>
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
