import {
  Divider,
  Heading,
  Link as ChakraLink,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import Page from "../components/page";
import Section from "../components/section";

interface NewsItem {
  title: string;
  date: string;
  slug: string;
}

export default function News(): ReactElement {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { slug: { glob: "news/**" } }
        sort: { fields: frontmatter___publishedAt, order: DESC }
      ) {
        nodes {
          slug
          frontmatter {
            publishedAt(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  `);

  const posts: Array<NewsItem> = allMdx.nodes.map((n: any) => ({
    title: n.frontmatter.title,
    date: n.frontmatter.publishedAt,
    slug: n.slug,
  }));

  return (
    <Page title={"News"} description={"Latest updates on Noice"}>
      <Section maxW={"4xl"} py={{ base: 12, md: 16 }}>
        <Heading as={"h1"} size={"2xl"} color={"primary.500"}>
          Latest News
        </Heading>
        <Divider mt={2} mb={10} />
        <UnorderedList>
          {posts.map((p) => (
            <ListItem>
              <ChakraLink as={GatsbyLink} to={`/${p.slug}`}>
                {p.title}
              </ChakraLink>{" "}
              &mdash;{" "}
              <Text as={"small"} fontSize={"sm"}>
                {p.date}
              </Text>
            </ListItem>
          ))}
        </UnorderedList>
      </Section>
    </Page>
  );
}
