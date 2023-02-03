import {
  Box,
  Button,
  Container,
  Divider,
  Heading,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink } from "gatsby";
import { GatsbyImage, getImage, getSrc } from "gatsby-plugin-image";
import { ReactElement, ReactNode } from "react";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons/lib";
import Analytics from "../components/analytics";
import BasicPageHead from "../components/basic-page-head";
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
        frontmatter: { image, title, category, publishedAt },
      },
      site: {
        siteMetadata: { siteUrl },
      },
    },
    children,
    path,
  } = props;

  const postUrl = `${siteUrl}${path}`;
  const imageData = getImage(image);
  const contentPaddingX = {
    base: "contentPaddingXDefault",
    md: "contentPaddingXMd",
    lg: "contentPaddingXLg",
    xl: "contentPaddingXXl",
  };

  return (
    <VStack as={"main"} w={"full"} minH={"100vh"} bg={"white"} spacing={0}>
      <NavBar />
      <VStack as={"article"} w={"full"} spacing={0}>
        <VStack
          as={"header"}
          w={"full"}
          maxW={"4xl"}
          px={contentPaddingX}
          pt={{ base: 8, md: 12 }}
          pb={{ base: 4, md: 6 }}
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
            maxHeight={"md"}
            image={imageData}
            alt={""}
            aria-hidden={true}
          />
        ) : (
          <Divider />
        )}
        <Container maxW={"4xl"} px={contentPaddingX} py={{ base: 12, md: 16 }}>
          <ChakraMDXProvider>{children}</ChakraMDXProvider>
        </Container>
        <Divider />
        <Text w={"full"} maxW={"4xl"} px={contentPaddingX} pt={8} pb={24}>
          Share:{" "}
          <ShareButton
            colorScheme={"twitter"}
            icon={FaTwitter}
            href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
              postUrl + "?ref=Twitter+Share"
            )}&text=${encodeURIComponent(title)}&via=trynoice&related=trynoice`}
          >
            Twitter
          </ShareButton>{" "}
          <ShareButton
            colorScheme={"facebook"}
            icon={FaFacebook}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
              postUrl + "?ref=Twitter+Share"
            )}`}
          >
            Facebook
          </ShareButton>{" "}
          <ShareButton
            colorScheme={"linkedin"}
            icon={FaLinkedinIn}
            href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
              postUrl + "?ref=LinkedIn+Share"
            )}`}
          >
            LinkedIn
          </ShareButton>
        </Text>
      </VStack>
      <Spacer />
      <Footer />
      <Analytics />
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
  children?: ReactNode;
}

function ShareButton(props: ShareButtonProps): ReactElement {
  return (
    <Button
      as={GatsbyLink}
      to={props.href}
      m={1}
      size={"sm"}
      colorScheme={props.colorScheme}
      leftIcon={<Icon as={props.icon} />}
    >
      {props.children}
    </Button>
  );
}

export const query = graphql`
  query ($id: String!) {
    mdx(id: { eq: $id }) {
      excerpt(pruneLength: 160)
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

    site {
      siteMetadata {
        siteUrl
      }
    }
  }
`;
