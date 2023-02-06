import {
  Button,
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  ResponsiveValue,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { GatsbyImage, getImage, IGatsbyImageData } from "gatsby-plugin-image";
import { ReactElement } from "react";
import ReadingBanner from "../assets/reading.png";
import Analytics from "../components/analytics";
import BasicPageHead from "../components/basic-page-head";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";

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

export default function BlogListLayout(props: any): ReactElement {
  const posts = props.data.allMdx.nodes;
  const { currentPage, totalPageCount, prevPageHref, nextPageHref } =
    props.pageContext;

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
        spacingX={8}
        spacingY={{
          base: 12,
          md: currentPage === 1 ? 16 : 12,
          lg: currentPage === 1 ? 24 : 16,
        }}
      >
        {posts.map((post: any, i: number) => (
          <GridItem
            colSpan={{
              base: 1,
              md: currentPage === 1 ? (i === 0 ? 6 : 3) : 3,
              lg:
                currentPage === 1 ? (i === 0 ? 6 : i > 0 && i < 3 ? 3 : 2) : 2,
            }}
          >
            <Post
              title={post.frontmatter.title}
              excerpt={post.excerpt}
              category={post.frontmatter.category}
              publishedAt={post.frontmatter.publishedAt}
              href={`/${post.fields.slug}`}
              isFeatured={currentPage === 1 && i === 0}
              imageData={getImage(post.frontmatter.image)}
              imageHeight={{
                base: "3xs",
                md: currentPage === 1 ? (i === 0 ? "xs" : "3xs") : "3xs",
                lg:
                  currentPage === 1
                    ? i === 0
                      ? "xs"
                      : i > 0 && i < 3
                      ? "2xs"
                      : "3xs"
                    : "3xs",
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
          to={prevPageHref}
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
          to={nextPageHref}
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

interface PostProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  href: string;
  isFeatured: boolean;
  imageData?: IGatsbyImageData;
  imageHeight: ResponsiveValue<"xs" | "2xs" | "3xs">;
}

function Post(props: PostProps): ReactElement {
  return (
    <SimpleGrid
      as={(props: any) => <LinkBox as={"article"} {...props} />}
      w={"full"}
      columns={{ base: 1, md: props.isFeatured ? 5 : 1 }}
      spacingX={12}
      spacingY={6}
    >
      <GridItem
        colSpan={{ base: 1, md: props.isFeatured ? 3 : 1 }}
        h={props.imageHeight}
        rounded={"lg"}
        as={GatsbyImage}
        image={props.imageData || ReadingBanner}
        alt={""}
        aria-hidden={true}
      />
      <GridItem
        colSpan={{ base: 1, md: props.isFeatured ? 2 : 1 }}
        my={"auto"}
        as={VStack}
        align={"flex-start"}
        spacing={2}
      >
        <Text color={"gray.500"} fontSize={"sm"}>
          <Text as={"span"} fontWeight={"medium"}>
            {props.category}
          </Text>{" "}
          &#x2022; {props.publishedAt}
        </Text>
        <Heading
          as={"h1"}
          size={"lg"}
          transition={"all 0.3s cubic-bezier(.17,.67,.83,.67)"}
          _hover={{ color: "primary.500" }}
        >
          <LinkOverlay as={GatsbyLink} to={props.href}>
            {props.title}
          </LinkOverlay>
        </Heading>
        <Text>{props.excerpt}</Text>
      </GridItem>
    </SimpleGrid>
  );
}

export const query = graphql`
  query blogListQuery($skip: Int!, $limit: Int!) {
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
