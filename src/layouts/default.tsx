import { graphql } from "gatsby";
import { ReactElement } from "react";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";
import ChakraMDXProvider from "../components/chakra-mdx-provider";

export function Head({ data }: any): ReactElement {
  const {
    mdx: {
      frontmatter: { title, publishedAt, updatedAt },
      excerpt,
    },
  } = data;

  return (
    <BasicPageHead title={title} description={excerpt}>
      {publishedAt ? (
        <meta property={"article:published_time"} content={publishedAt} />
      ) : null}

      {updatedAt ? (
        <meta property={"article:modified_time"} content={updatedAt} />
      ) : null}
    </BasicPageHead>
  );
}

export default function DefaultLayout(props: any): ReactElement {
  const {
    data: {
      mdx: {
        frontmatter: { title, publishedAt, updatedAt },
      },
    },
    children,
  } = props;

  return (
    <BasicPage
      title={title}
      publishedAt={formatDate(publishedAt)}
      updatedAt={formatDate(updatedAt)}
    >
      <ChakraMDXProvider>{children}</ChakraMDXProvider>
    </BasicPage>
  );
}

function formatDate(date: string): string | undefined {
  return date
    ? new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
      frontmatter {
        title
        publishedAt
        updatedAt
      }
    }
  }
`;
