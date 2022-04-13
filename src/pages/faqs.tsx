import { Link as ChakraLink, ListItem, OrderedList } from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import DocumentPage from "../components/document-page";

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
    <DocumentPage
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
    </DocumentPage>
  );
}
