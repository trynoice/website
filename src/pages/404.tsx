import { Button, HStack, Image, Spacer, Text, VStack } from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import { FaGooglePlay, FaHome } from "react-icons/fa";
import PageNotFoundIllustration from "../assets/page-not-found.svg";
import Analytics from "../components/analytics";
import BasicPageHead from "../components/basic-page-head";
import Footer from "../components/footer";
import NavBar from "../components/nav-bar";

export function Head(): ReactElement {
  return <BasicPageHead title={"Page Not Found"} />;
}

export default function NotFound(): ReactElement {
  const {
    site: {
      siteMetadata: { googlePlayUrl },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          googlePlayUrl
        }
      }
    }
  `);

  return (
    <VStack as={"main"} w={"full"} minH={"100vh"} spacing={0} bg={"white"}>
      <Analytics />
      <NavBar />
      <VStack
        maxW={"maxContentWidth"}
        px={{
          base: "contentPaddingXDefault",
          md: "contentPaddingXMd",
          lg: "contentPaddingXLg",
          xl: "contentPaddingXXl",
        }}
        pt={12}
        pb={24}
        spacing={12}
      >
        <Image src={PageNotFoundIllustration} maxW={"lg"} />
        <Text textAlign={"center"} maxW={"2xl"}>
          Whoops! It looks like you've stumbled upon a page that doesn't exist.
          But don't let that ruin your day. Download the Noice app on your
          Android device to instantly transport yourself to a world of peaceful
          sounds. From the sounds of nature to the hum of a city, there's
          something for everyone.
        </Text>
        <HStack spacing={4}>
          <Button
            as={GatsbyLink}
            to={googlePlayUrl}
            colorScheme={"primary"}
            leftIcon={<FaGooglePlay />}
          >
            Download Noice
          </Button>
          <Button as={GatsbyLink} to={"/"} leftIcon={<FaHome />}>
            Return to Home
          </Button>
        </HStack>
      </VStack>
      <Spacer />
      <Footer />
    </VStack>
  );
}
