import { Link as ChakraLink, ListItem, OrderedList } from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";

export function Head(): ReactElement {
  return (
    <BasicPageHead
      title={"Frequently Asked Questions"}
      description={"Frequently asked questions about Noice."}
    />
  );
}
interface FAQItem {
  title: string;
  slug: string;
}

export default function FAQs(): ReactElement {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { fields: { slug: { glob: "faqs/**" } } }
        sort: { frontmatter: { title: ASC } }
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
    <BasicPage title={"Frequently Asked Questions"}>
      <OrderedList spacing={2}>
        {posts.map((p) => (
          <ListItem>
            <ChakraLink as={GatsbyLink} to={`/${p.slug}`}>
              {p.title}
            </ChakraLink>
          </ListItem>
        ))}
      </OrderedList>
    </BasicPage>
  );
}
