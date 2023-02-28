import { Link as ChakraLink, ListItem, OrderedList } from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import FAQBanner from "../assets/faq.png";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";

export function Head(): ReactElement {
  return (
    <BasicPageHead
      image={FAQBanner}
      title={"Frequently Asked Questions"}
      description={
        "Find answers to all your questions about the Noice app on our FAQ page. Enhance meditation, work environments and relaxation with our comprehensive information."
      }
    />
  );
}
interface FAQItem {
  title: string;
  slug: string;
}

export default function FAQs(): ReactElement {
  const { allMdx }: Queries.FAQsQuery = useStaticQuery(graphql`
    query FAQs {
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

  const posts: Array<FAQItem> = allMdx.nodes.map((n) => ({
    title: n.frontmatter!.title!,
    slug: n.fields.slug,
  }));

  return (
    <BasicPage title={"Frequently Asked Questions"}>
      <OrderedList spacing={2}>
        {posts.map((p) => (
          <ListItem key={`FAQs-${p.slug}`}>
            <ChakraLink as={GatsbyLink} to={`/${p.slug}`}>
              {p.title}
            </ChakraLink>
          </ListItem>
        ))}
      </OrderedList>
    </BasicPage>
  );
}
