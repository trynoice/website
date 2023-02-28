import { graphql, PageProps } from "gatsby";
import { ReactElement } from "react";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";
import ChakraMDXProvider from "../components/chakra-mdx-provider";

export function Head(
  props: PageProps<Queries.DefaultLayoutQuery>
): ReactElement {
  const { title, publishedAt, updatedAt } = props.data.mdx?.frontmatter || {};
  const { excerpt } = props.data.mdx!;

  return (
    <BasicPageHead title={title!} description={excerpt ?? undefined}>
      {publishedAt ? (
        <meta property={"article:published_time"} content={publishedAt} />
      ) : null}

      {updatedAt ? (
        <meta property={"article:modified_time"} content={updatedAt} />
      ) : null}
    </BasicPageHead>
  );
}

export default function DefaultLayout(
  props: PageProps<Queries.DefaultLayoutQuery>
): ReactElement {
  const { title, publishedAt, updatedAt } = props.data.mdx?.frontmatter || {};

  return (
    <BasicPage
      title={title!}
      publishedAt={formatDate(publishedAt)}
      updatedAt={formatDate(updatedAt)}
    >
      <ChakraMDXProvider>{props.children}</ChakraMDXProvider>
    </BasicPage>
  );
}

function formatDate(date?: string | null): string | undefined {
  return date
    ? new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;
}

export const query = graphql`
  query DefaultLayout($id: String!) {
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
