import { graphql } from "gatsby";
import { MDXRenderer } from "gatsby-plugin-mdx";
import ChakraMDXProvider from "../components/chakra-mdx-provider";
import DocumentPage from "../components/document-page";

export default function DefaultLayout({ data }: any) {
  const { mdx } = data;
  const { frontmatter, body, excerpt } = mdx;
  return (
    <DocumentPage
      title={frontmatter.title}
      description={excerpt}
      publishedAt={frontmatter.publishedAt}
      updatedAt={frontmatter.updatedAt}
    >
      <ChakraMDXProvider>
        <MDXRenderer>{body}</MDXRenderer>
      </ChakraMDXProvider>
    </DocumentPage>
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
