import { Divider, Heading, Text, VStack } from "@chakra-ui/react";
import { graphql } from "gatsby";
import MarkdownRenderer from "../components/markdown-renderer";
import Page from "../components/page";
import Section from "../components/section";

export default function NewsLayout({ data }: any) {
  const { markdownRemark } = data;
  const { frontmatter, rawMarkdownBody, excerpt } = markdownRemark;
  return (
    <Page title={frontmatter.title} description={excerpt}>
      <Section as={"article"} maxW={"4xl"} py={{ base: 12, md: 16 }}>
        <VStack as={"header"} mb={10} spacing={2} align={"flex-start"}>
          <Heading as={"h1"} size={"2xl"}>
            {frontmatter.title}
          </Heading>
          <Text>{frontmatter.date}</Text>
          <Divider />
        </VStack>

        <MarkdownRenderer content={rawMarkdownBody} />
      </Section>
    </Page>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    markdownRemark(id: { eq: $id }) {
      rawMarkdownBody
      excerpt(format: PLAIN, pruneLength: 160)
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        title
      }
    }
  }
`;
