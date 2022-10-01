import { graphql } from "gatsby";
import { ReactElement } from "react";
import ChakraMDXProvider from "../components/chakra-mdx-provider";
import ContentfulPage from "../components/contentful-page";

export default function DefaultLayout(props: any): ReactElement {
  const {
    data: {
      mdx: {
        frontmatter: { title, publishedAt, updatedAt },
        excerpt,
      },
    },
    children,
  } = props;

  return (
    <ContentfulPage
      title={title}
      description={excerpt}
      publishedAt={publishedAt}
      updatedAt={updatedAt}
    >
      <ChakraMDXProvider>{children}</ChakraMDXProvider>
    </ContentfulPage>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        publishedAt(formatString: "MMMM DD, YYYY")
        updatedAt(formatString: "MMMM DD, YYYY")
      }
    }
  }
`;
