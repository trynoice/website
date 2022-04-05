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
import { FDroidBadge, PlayStoreBadge } from "./app-store-badge";
import Section from "./section";

export default function Footer() {
  const fgColor = "gray.300";
  const bgColor = "black";
  const year = new Date().getFullYear();

  return (
    <Section as={"footer"} bg={bgColor} color={fgColor} fontSize={"sm"}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 4 }} spacing={8} py={10}>
        <Stack align={"flex-start"}>
          <ListHeader>Get in touch</ListHeader>
          <ChakraLink
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSdEfOCyWfQ4QFMnLqlLj3BF27VKS1C-CQIokbmkXFchf6QZ6g/viewform"
            }
          >
            Submit Feedback
          </ChakraLink>
          <ChakraLink
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSdYhyYjxhJ7IKyiqdc3AE3uINSoRWBw8ROB003gkZ47KeSjWw/viewform"
            }
          >
            Report Issues
          </ChakraLink>
          <ChakraLink href={"mailto:trynoiceapp@gmail.com"}>
            Contact Us
          </ChakraLink>
        </Stack>

        <Stack align={"flex-start"}>
          <ListHeader>Community</ListHeader>
          <ChakraLink href={"https://hosted.weblate.org/engage/noice/"}>
            Translations
          </ChakraLink>
          <ChakraLink href={"https://github.com/trynoice"}>GitHub</ChakraLink>
          <ChakraLink href={"https://opencollective.com/noice"}>
            Open Collective
          </ChakraLink>
        </Stack>

        <Stack align={"flex-start"}>
          <ListHeader>Policies</ListHeader>
          <ChakraLink as={GatsbyLink} to={"/code-of-conduct"}>
            Community Guidelines
          </ChakraLink>
          <ChakraLink as={GatsbyLink} to={"/privacy-policy"}>
            Privacy Policy
          </ChakraLink>
          <ChakraLink href={"https://www.gnu.org/licenses/gpl-3.0.html"}>
            License
          </ChakraLink>
        </Stack>

        <Stack id={"install-app"} align={"flex-start"}>
          <PlayStoreBadge />
          <FDroidBadge />
        </Stack>
      </SimpleGrid>

      <Stack
        py={4}
        direction={{ base: "column", md: "row" }}
        justify={{ md: "space-between" }}
        align={"center"}
        spacing={4}
        borderTopWidth={1}
        borderStyle={"solid"}
        borderColor={fgColor}
      >
        <Text textAlign={"center"}>
          &copy; {year}, all rights reserved.
          <Text as="span" fontWeight={"500"}>
            {" "}
            Made with &hearts; in India.
          </Text>
        </Text>
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
