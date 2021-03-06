import {
  Link as ChakraLink,
  SimpleGrid,
  Stack,
  Text,
  TextProps,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { ReactElement } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";
import GooglePlayBadge from "./google-play-badge";
import Section from "./section";

export default function Footer() {
  const fgColor = "gray.300";
  const bgColor = "black";
  const year = new Date().getFullYear();

  return (
    <Section as={"footer"} bg={bgColor} color={fgColor} fontSize={"sm"}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} py={10}>
        <Stack align={"flex-start"} spacing={3}>
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
        </Stack>

        <Stack align={"flex-start"} spacing={3}>
          <ListHeader>Resources</ListHeader>
          <ChakraLink as={GatsbyLink} to={"/faqs"}>
            Frequently Asked Questions
          </ChakraLink>
          <ChakraLink href={"https://github.com/trynoice/android-app/releases"}>
            Android App Release Notes
          </ChakraLink>
          <ChakraLink href={"https://www.gnu.org/licenses/gpl-3.0.html"}>
            License
          </ChakraLink>
          <ChakraLink as={GatsbyLink} to={"/privacy-policy"}>
            Privacy Policy
          </ChakraLink>
          <ChakraLink as={GatsbyLink} to={"/terms-of-service"}>
            Terms of Service
          </ChakraLink>
        </Stack>

        <Stack align={"flex-start"} spacing={3}>
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
        </Stack>

        <Stack
          id={"install-app"}
          align={"flex-start"}
          justify={"center"}
          spacing={6}
        >
          <Stack direction={"row"} spacing={4}>
            <SocialIcon
              icon={<FaTwitter />}
              label={"Twitter"}
              href={"https://twitter.com/trynoice"}
              brandColor={"#1DA1F2"}
            />
            <SocialIcon
              icon={<FaLinkedin />}
              label={"LinkedIn"}
              href={"https://linkedin.com/company/trynoice"}
              brandColor={"#0A66C2"}
            />
            <SocialIcon
              icon={<FaInstagram />}
              label={"Instagram"}
              href={"https://instagram.com/trynoice"}
              brandColor={"#E1306C"}
            />
            <SocialIcon
              icon={<FaGithub />}
              label={"GitHub"}
              href={"https://github.com/trynoice"}
              brandColor={"gray.50"}
            />
          </Stack>
          <GooglePlayBadge />
        </Stack>
      </SimpleGrid>

      <Stack
        py={4}
        direction={{ base: "column", md: "row" }}
        align={"center"}
        spacing={{ base: 4, md: 24 }}
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={fgColor}
      >
        <Text w={"full"} textAlign={{ base: "center", md: "left" }}>
          &copy; {year}, all rights reserved.
          <Text as="span" fontWeight={"500"}>
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
          <ChakraLink as={GatsbyLink} to={"/sitemap/sitemap-index.xml"}>
            Sitemap
          </ChakraLink>
          {" | "}
          <ChakraLink
            as={"a"}
            href={"https://thenounproject.com/icon/white-noise-1287855/"}
            isExternal
          >
            White Noise icon by Juraj Sedl??k
          </ChakraLink>
          {" | "}
          Illustrations from{" "}
          <ChakraLink as={"a"} href={"https://undraw.co"} isExternal>
            undraw.co
          </ChakraLink>{" "}
          and{" "}
          <ChakraLink
            as={"a"}
            href={
              "https://www.freepik.com/free-vector/flat-geometric-background_13900618.htm"
            }
            isExternal
          >
            freepik.com
          </ChakraLink>
        </Text>
      </Stack>
    </Section>
  );
}

function ListHeader(props: TextProps) {
  return <Text {...props} fontWeight={"500"} fontSize={"md"} mb={2} />;
}

interface SocialIconProps {
  icon: ReactElement;
  href: string;
  label: string;
  brandColor: string;
}

function SocialIcon(props: SocialIconProps): ReactElement {
  return (
    <ChakraLink
      href={props.href}
      aria-label={props.label}
      fontSize={"2xl"}
      textColor={"inherit"}
      _hover={{
        textColor: props.brandColor,
      }}
    >
      {props.icon}
    </ChakraLink>
  );
}
