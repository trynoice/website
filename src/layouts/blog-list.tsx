import {
  Button,
  GridItem,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, PageProps } from "gatsby";
import { getImage, ImageDataLike } from "gatsby-plugin-image";
import { ReactElement } from "react";
import ReadingBanner from "../assets/reading.png";
import Analytics from "../components/analytics";
import BasicPageHead from "../components/basic-page-head";
import BlogPostListItem from "../components/blog-post-list-item";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";

export interface BlogListLayoutPageContext {
  readonly limit: number;
  readonly skip: number;
  readonly currentPage: number;
  readonly totalPageCount: number;
  readonly prevPageHref: string | null;
  readonly nextPageHref: string | null;
}

export function Head(): ReactElement {
  return (
    <BasicPageHead
      image={ReadingBanner}
      title={"Blog"}
      description={
        "Discover the secrets to improved meditation, productive work environments and relaxation on the official Noice blog. Expert tips and insights on meditation, sleep, productivity and more await you."
      }
    />
  );
}

export default function BlogListLayout({
  data: {
    allMdx: { nodes: posts },
  },
  pageContext: { currentPage, totalPageCount, prevPageHref, nextPageHref },
}: PageProps<
  Queries.BlogListLayoutQuery,
  BlogListLayoutPageContext
>): ReactElement {
  const contentPaddingX = {
    base: "contentPaddingXDefault",
    md: "contentPaddingXMd",
    lg: "contentPaddingXLg",
    xl: "contentPaddingXXl",
  };

  return (
    <VStack as={"main"} w={"full"} minH={"100vh"} bg={"white"} spacing={0}>
      <Analytics />
      <NavBar />
      <SimpleGrid
        w={"full"}
        maxW={"maxContentWidth"}
        px={contentPaddingX}
        py={12}
        columns={{ base: 1, md: 6 }}
        spacingX={{ base: 8, md: 12 }}
        spacingY={{
          base: 12,
          md: currentPage === 1 ? 16 : 12,
          lg: currentPage === 1 ? 24 : 16,
        }}
      >
        {posts.map((post, i) => (
          <GridItem
            key={`Blog-${post.fields.slug}`}
            colSpan={{
              base: 1,
              md: currentPage === 1 ? (i === 0 ? 6 : 3) : 3,
              lg:
                currentPage === 1 ? (i === 0 ? 6 : i > 0 && i < 3 ? 3 : 2) : 2,
            }}
          >
            <BlogPostListItem
              title={post.frontmatter!.title!}
              excerpt={post.excerpt!}
              category={post.frontmatter!.category!}
              publishedAt={post.frontmatter!.publishedAt!}
              href={`/${post.fields.slug}`}
              imageData={getImage(post.frontmatter!.image as ImageDataLike)}
              size={{
                base: "sm",
                md: currentPage === 1 && i === 0 ? "lg" : "sm",
                lg:
                  currentPage === 1
                    ? i === 0
                      ? "lg"
                      : i > 0 && i < 3
                      ? "md"
                      : "sm"
                    : "sm",
              }}
            />
          </GridItem>
        ))}
      </SimpleGrid>
      <Stack
        px={contentPaddingX}
        pt={12}
        pb={24}
        direction={{ base: "column", sm: "row" }}
        align={"center"}
        spacing={6}
      >
        <Button
          variant={"outline"}
          rounded={"full"}
          as={GatsbyLink}
          to={prevPageHref || "/blog"} // default to suppress null link error
          hidden={!prevPageHref}
        >
          Previous Posts
        </Button>
        <Text>
          Page {currentPage} of {totalPageCount}
        </Text>
        <Button
          variant={"outline"}
          rounded={"full"}
          as={GatsbyLink}
          to={nextPageHref || "/blog"} // default to suppress null link error
          hidden={!nextPageHref}
        >
          Next Posts
        </Button>
      </Stack>
      <Spacer />
      <Footer />
    </VStack>
  );
}

export const query = graphql`
  query BlogListLayout($skip: Int!, $limit: Int!) {
    allMdx(
      filter: { fields: { slug: { glob: "blog/**" } } }
      sort: { frontmatter: { publishedAt: DESC } }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        fields {
          slug
        }

        frontmatter {
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }

          title
          category
          publishedAt(formatString: "MMMM DD, YYYY")
        }

        excerpt(pruneLength: 160)
      }
    }
  }
`;
