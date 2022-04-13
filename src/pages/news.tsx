import {
  Link as ChakraLink,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import DocumentPage from "../components/document-page";

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
    <DocumentPage title={"News"} description={"Latest updates on Noice"}>
      <UnorderedList spacing={2}>
        {posts.map((p) => (
          <ListItem>
            <ChakraLink as={GatsbyLink} to={`/${p.slug}`}>
              {p.title}
            </ChakraLink>{" "}
            &mdash; <Text as={"small"}>{p.date}</Text>
          </ListItem>
        ))}
      </UnorderedList>
    </DocumentPage>
  );
}
