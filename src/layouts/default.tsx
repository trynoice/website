import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import { ReactElement } from "react";
import ChakraMDXProvider from "../components/chakra-mdx-provider";
import ContentfulPage from "../components/contentful-page";

export default function DefaultLayout(props: any): ReactElement {
  const {
    data: {
      mdx: {
        frontmatter: { title, publishedAt, updatedAt },
        body,
        excerpt,
      },
    },
  } = props;

  return (
    <ContentfulPage
      title={title}
      description={excerpt}
      publishedAt={publishedAt}
      updatedAt={updatedAt}
    >
      <ChakraMDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </ChakraMDXProvider>
    </ContentfulPage>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      body
      excerpt(pruneLength: 160)
      frontmatter {
        title
        publishedAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
