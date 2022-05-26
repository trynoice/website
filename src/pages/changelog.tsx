import {
  Link as ChakraLink,
  ListItem,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import DocumentPage from "../components/document-page";

interface ChangelogItem {
  title: string;
  date: string;
  slug: string;
}

export default function Changelog(): ReactElement {
  const { allMdx } = useStaticQuery(graphql`
    {
      allMdx(
        filter: { slug: { glob: "changelog/**" } }
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

  const posts: Array<ChangelogItem> = allMdx.nodes.map((n: any) => ({
    title: n.frontmatter.title,
    date: n.frontmatter.publishedAt,
    slug: n.slug,
  }));

  return (
    <DocumentPage
      title={"Changelog"}
      description={"Latest product updates about Noice"}
    >
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
