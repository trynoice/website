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
    <Page title={frontmatter.title} description={excerpt}>
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
          {frontmatter.date ? <Text>{frontmatter.date}</Text> : null}
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
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
