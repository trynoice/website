import {
  Divider,
  Heading,
  HeadingProps,
  HStack,
  Icon,
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { ReactElement } from "react";
import { IconType } from "react-icons";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import AppIcon from "../assets/app-icon";
import FDroidBadge from "./f-droid-badge";
import GooglePlayBadge from "./google-play-badge";

export default function Footer() {
  const fgColor = "gray.300";
  const bgColor = "black";
  const year = new Date().getFullYear();
  const contentPaddingX = {
    base: "contentPaddingXDefault",
    md: "contentPaddingXMd",
    lg: "contentPaddingXLg",
    xl: "contentPaddingXXl",
  };

  return (
    <VStack
      as={"footer"}
      w={"full"}
      pt={16}
      pb={6}
      spacing={4}
      bg={bgColor}
      color={fgColor}
      fontSize={"sm"}
    >
      <SimpleGrid
        w={"full"}
        maxW={"maxContentWidth"}
        px={contentPaddingX}
        columns={{ base: 1, sm: 2, md: 4 }}
        spacing={8}
      >
        <VStack align={"flex-start"} spacing={3}>
          <ListHeader>Support</ListHeader>
          <ChakraLink href={"mailto:trynoiceapp@gmail.com"}>
            Contact Us
          </ChakraLink>
          <ChakraLink
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSdYhyYjxhJ7IKyiqdc3AE3uINSoRWBw8ROB003gkZ47KeSjWw/viewform"
            }
          >
            Report Issues
          </ChakraLink>
          <ChakraLink
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSdEfOCyWfQ4QFMnLqlLj3BF27VKS1C-CQIokbmkXFchf6QZ6g/viewform"
            }
          >
            Submit Feedback
          </ChakraLink>
          <ChakraLink href={"https://status.trynoice.com"}>
            Operational Status
          </ChakraLink>
        </VStack>

        <VStack align={"flex-start"} spacing={3}>
          <ListHeader>Resources</ListHeader>
          <ChakraLink as={GatsbyLink} to={"/blog"}>
            Blog
          </ChakraLink>
          <ChakraLink as={GatsbyLink} to={"/faqs"}>
            Frequently Asked Questions
          </ChakraLink>
          <ChakraLink href={"https://github.com/trynoice/android-app/releases"}>
            Android App Release Notes
          </ChakraLink>
          <ChakraLink as={GatsbyLink} to={"/privacy-policy"}>
            Privacy Policy
          </ChakraLink>
          <ChakraLink as={GatsbyLink} to={"/terms-of-service"}>
            Terms of Service
          </ChakraLink>
        </VStack>

        <VStack align={"flex-start"} spacing={3}>
          <ListHeader>Community</ListHeader>
          <ChakraLink href={"https://hosted.weblate.org/engage/noice/"}>
            Translations
          </ChakraLink>
          <ChakraLink href={"https://github.com/trynoice"}>
            Open Source
          </ChakraLink>
          <ChakraLink href={"https://opencollective.com/noice"}>
            Open Collective
          </ChakraLink>
        </VStack>

        <VStack align={"flex-start"} spacing={6}>
          <HStack spacing={4}>
            <SocialIcon
              icon={FaTwitter}
              label={"Twitter"}
              href={"https://twitter.com/trynoice"}
              brandColor={"#1DA1F2"}
            />
            <SocialIcon
              icon={FaInstagram}
              label={"Instagram"}
              href={"https://instagram.com/trynoice"}
              brandColor={"#E1306C"}
            />
            <SocialIcon
              icon={FaFacebook}
              label={"Facebook"}
              href={"https://facebook.com/trynoice"}
              brandColor={"#3B5998"}
            />
            <SocialIcon
              icon={FaLinkedin}
              label={"LinkedIn"}
              href={"https://linkedin.com/company/trynoice"}
              brandColor={"#0A66C2"}
            />
            <SocialIcon
              icon={FaGithub}
              label={"GitHub"}
              href={"https://github.com/trynoice"}
              brandColor={"gray.50"}
            />
          </HStack>
          <GooglePlayBadge />
          <FDroidBadge />
        </VStack>
      </SimpleGrid>

      <HStack
        w={"full"}
        pt={12}
        pb={2}
        spacing={{ base: 4, md: 8, lg: 12 }}
        aria-hidden={true}
      >
        <Divider flexGrow={1} />
        <AppIcon
          w={{ base: 24, md: 28, lg: 32 }}
          h={"auto"}
          fill={"currentColor"}
        />
        <Divider flexGrow={1} />
      </HStack>

      <Stack
        w={"full"}
        maxW={"maxContentWidth"}
        px={contentPaddingX}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        spacing={{ base: 4, md: 24 }}
      >
        <Text w={"full"} textAlign={{ base: "center", md: "left" }}>
          &copy; {year}, all rights reserved.
          <Text as="span" fontWeight={"medium"}>
            {" "}
            Made with &hearts; in India.
          </Text>
          <br />
        </Text>
        <Text
          w={"full"}
          textAlign={{ base: "center", md: "right" }}
          fontSize={"xs"}
        >
          <ChakraLink as={GatsbyLink} to={"/sitemap-index.xml"}>
            Sitemap
          </ChakraLink>
          {" | "}
          <ChakraLink
            as={"a"}
            href={"https://thenounproject.com/icon/white-noise-1287855/"}
            isExternal
          >
            Logo by Juraj Sedlák
          </ChakraLink>
          {" | "}
          Illustrations from{" "}
          <ChakraLink as={"a"} href={"https://undraw.co"} isExternal>
            undraw.co
          </ChakraLink>
        </Text>
      </Stack>
    </VStack>
  );
}

function ListHeader(props: HeadingProps) {
  return <Heading size={"md"} {...props} />;
}

interface SocialIconProps {
  icon: IconType;
  href: string;
  label: string;
  brandColor: string;
}

function SocialIcon(props: SocialIconProps): ReactElement {
  return (
    <ChakraLink
      href={props.href}
      aria-label={props.label}
      textColor={"inherit"}
      _hover={{
        textColor: props.brandColor,
      }}
    >
      <Icon as={props.icon} boxSize={6} />
    </ChakraLink>
  );
}
