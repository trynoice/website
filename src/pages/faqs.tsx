import {
  Divider,
  Heading,
  Link as ChakraLink,
  ListItem,
  OrderedList,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import Page from "../components/page";
import Section from "../components/section";

interface FAQItem {
  title: string;
  slug: string;
}

export default function FAQs(): ReactElement {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { slug: { glob: "faqs/**" } }
        sort: { fields: frontmatter___title }
      ) {
        nodes {
          slug
          frontmatter {
            title
          }
        }
      }
    }
  `);

  const posts: Array<FAQItem> = allMdx.nodes.map((n: any) => ({
    title: n.frontmatter.title,
    slug: n.slug,
  }));

  return (
    <Page
      title={"FAQs"}
      description={"Frequently asked questions about Noice."}
      fontSize={{ base: "md", md: "lg" }}
      lineHeight={"tall"}
    >
      <Section maxW={"4xl"} py={{ base: 12, md: 16 }}>
        <Heading as={"h1"} size={"2xl"} color={"primary.500"}>
          Frequently Asked Questions
        </Heading>
        <Divider mt={4} mb={10} />
        <OrderedList lineHeight={"taller"}>
          {posts.map((p) => (
            <ListItem>
              <ChakraLink as={GatsbyLink} to={`/${p.slug}`}>
                {p.title}
              </ChakraLink>{" "}
            </ListItem>
          ))}
        </OrderedList>
      </Section>
    </Page>
  );
}
