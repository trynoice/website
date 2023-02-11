import {
  Box,
  Container,
  Divider,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link as ChakraLink,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { graphql } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { ReactElement } from "react";
import { FaFacebookF, FaLinkedinIn, FaShare, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import Analytics from "../components/analytics";
import BasicPageHead from "../components/basic-page-head";
import BlogPostListItem from "../components/blog-post-list-item";
import ChakraMDXProvider from "../components/chakra-mdx-provider";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";

export function Head({ data }: any): ReactElement {
  const {
    mdx: {
      frontmatter: { image, title, publishedAt },
      excerpt,
    },
  } = data;

  return (
    <BasicPageHead image={getSrc(image)} title={title} description={excerpt}>
      {publishedAt ? (
        <meta property={"article:published_time"} content={publishedAt} />
      ) : null}
    </BasicPageHead>
  );
}

export default function PostLayout(props: any): ReactElement {
  const {
    data: {
      mdx: {
        fields: { slug },
        frontmatter: { image, title, category, publishedAt },
      },
      allMdx: { nodes: recentPosts },
      site: {
        siteMetadata: { siteUrl },
      },
    },
    children,
  } = props;

  const postUrl = `${siteUrl}/${slug}`;
  const imageData = getImage(image);
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
      <VStack as={"article"} w={"full"} spacing={0}>
        <VStack
          as={"header"}
          w={"full"}
          maxW={"4xl"}
          px={contentPaddingX}
          py={{ base: 8, md: 12 }}
          spacing={2}
          alignItems={"flex-start"}
          textAlign={"left"}
          fontSize={"sm"}
        >
          <Text color={"gray.500"}>
            <Text as={"span"} fontWeight={"medium"}>
              {category}
            </Text>{" "}
            &#x2022; {formatDate(publishedAt)}
          </Text>
          <Heading
            as={"h1"}
            size={"2xl"}
            lineHeight={"shorter"}
            color={"primary.500"}
          >
            {title}
          </Heading>
        </VStack>
        {imageData ? (
          <Box
            as={GatsbyImage}
            w={"full"}
            maxH={"lg"}
            image={imageData}
            alt={""}
            aria-hidden={true}
          />
        ) : (
          <Divider />
        )}
        <Container maxW={"4xl"} px={contentPaddingX} py={12}>
          <ChakraMDXProvider>{children}</ChakraMDXProvider>
        </Container>
        <HStack
          w={"full"}
          maxW={"4xl"}
          px={contentPaddingX}
          pb={12}
          spacing={2}
          justifyContent={"flex-end"}
        >
          <Icon as={FaShare} color={"gray.400"} boxSize={5} mr={4} />
          <ShareButton
            colorScheme={"facebook"}
            icon={FaFacebookF}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              postUrl + "?ref=Twitter+Share"
            )}`}
            label={"Facebook"}
          />
          <ShareButton
            colorScheme={"linkedin"}
            icon={FaLinkedinIn}
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              postUrl + "?ref=LinkedIn+Share"
            )}`}
            label={"LinkedIn"}
          />
          <ShareButton
            colorScheme={"twitter"}
            icon={FaTwitter}
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              postUrl + "?ref=Twitter+Share"
            )}&text=${encodeURIComponent(title)}&via=trynoice&related=trynoice`}
            label={"Twitter"}
          />
        </HStack>
      </VStack>
      <Divider />
      <VStack
        maxW={"maxContentWidth"}
        px={contentPaddingX}
        pt={12}
        pb={24}
        align={"flex-start"}
        spacing={8}
      >
        <Heading as={"h2"} size={"lg"}>
          Explore our Latest Updates
        </Heading>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          spacingX={8}
          spacingY={16}
        >
          {recentPosts.map((post: any) => (
            <BlogPostListItem
              key={`RecentBlogPosts-${post.id}`}
              title={post.frontmatter.title}
              excerpt={post.excerpt}
              category={post.frontmatter.category}
              publishedAt={post.frontmatter.publishedAt}
              href={`/${post.fields.slug}`}
              imageData={getImage(post.frontmatter.image)}
              size={"sm"}
            />
          ))}
        </SimpleGrid>
      </VStack>
      <Spacer />
      <Footer />
    </VStack>
  );
}

function formatDate(date?: string): string | undefined {
  return date
    ? new Date(date).toLocaleDateString("en-gb", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : undefined;
}

interface ShareButtonProps {
  colorScheme: string;
  icon: IconType;
  href: string;
  label: string;
}

function ShareButton(props: ShareButtonProps): ReactElement {
  return (
    <IconButton
      as={ChakraLink}
      href={props.href}
      size={"md"}
      rounded={"full"}
      colorScheme={props.colorScheme}
      icon={<Icon as={props.icon} />}
      aria-label={props.label}
    />
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
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
        publishedAt
      }
    }

    allMdx(
      filter: { id: { ne: $id }, fields: { slug: { glob: "blog/**" } } }
      limit: 2
      sort: { frontmatter: { publishedAt: DESC } }
    ) {
      nodes {
        id
        excerpt(pruneLength: 160)
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
      }
    }

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
