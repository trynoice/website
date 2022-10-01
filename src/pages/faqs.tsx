import { Link as ChakraLink, ListItem, OrderedList } from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import ContentfulPage from "../components/contentful-page";

interface FAQItem {
  title: string;
  slug: string;
}

export default function FAQs(): ReactElement {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fields: { slug: { glob: "faqs/**" } } }
        sort: { fields: frontmatter___title }
      ) {
        nodes {
          frontmatter {
            title
          }

          fields {
            slug
          }
        }
      }
    }
  `);

  const posts: Array<FAQItem> = allMdx.nodes.map((n: any) => ({
    title: n.frontmatter.title,
    slug: n.fields.slug,
  }));

  return (
    <ContentfulPage
      title={"Frequently Asked Questions"}
      description={"Frequently asked questions about Noice."}
    >
      <OrderedList spacing={2}>
        {posts.map((p) => (
          <ListItem>
            <ChakraLink as={GatsbyLink} to={`/${p.slug}`}>
              {p.title}
            </ChakraLink>
          </ListItem>
        ))}
      </OrderedList>
    </ContentfulPage>
  );
}
