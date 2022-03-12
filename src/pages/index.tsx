import {
  Box,
  Heading,
  Image,
  Link,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import FDroidBadge from "../assets/f-droid-badge.png";
import HeroIllustration from "../assets/hero-illustration.svg";
import PlayStoreBadge from "../assets/play-store-badge.png";
import NavBar from "../components/nav-bar";
import PageMeta from "../components/page-meta";
import Section from "../components/section";

export default function Home(): ReactElement {
  return (
    <Box maxW={"full"} minH={"100vh"} bg={"gray.50"}>
      <PageMeta />
      <NavBar />
      <Hero />
    </Box>
  );
}

function Hero(): ReactElement {
  return (
    <Section>
      <Stack
        direction={{ base: "column", md: "row" }}
        align={"center"}
        spacing={24}
        py={{ base: 16, md: 36 }}
      >
        <HeroInfo flex={1} />
        <Image
          flex={1}
          src={HeroIllustration}
          w={"full"}
          maxW={{ base: "sm", md: "2xl" }}
        />
      </Stack>
    </Section>
  );
}

function HeroInfo(props: StackProps): ReactElement {
  const { site } = useStaticQuery(graphql`
    query HERO {
      site {
        siteMetadata {
          description
          playstore_url
          fdroid_url
        }
      }
    }
  `);

  const { description, playstore_url, fdroid_url } = site.siteMetadata;
  const descriptionStart = description.split(" ");
  const descriptionEnd = descriptionStart.splice(-3);

  return (
    <VStack
      spacing={{ base: 6, md: 10 }}
      align={{ base: "center", md: "flex-start" }}
      {...props}
    >
      <Heading
        maxW={{ base: "lg", md: "4xl" }}
        lineHeight={1.33}
        fontWeight={600}
        fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
        textAlign={{ base: "center", md: "left" }}
      >
        <Text as={"span"}>{descriptionStart.join(" ")}</Text>
        <Text as={"span"} textColor={"green.400"}>
          {` ${descriptionEnd.join(" ")}`}
        </Text>
      </Heading>
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={{ base: 4, md: 8 }}
      >
        <AppStoreBadge
          src={PlayStoreBadge}
          href={playstore_url}
          label={"Get it on Play Store"}
        />
        <AppStoreBadge
          src={FDroidBadge}
          href={fdroid_url}
          label={"Get it on F-Droid"}
        />
      </Stack>
    </VStack>
  );
}

interface AppStoreBadgeProps {
  src: string;
  href: string;
  label: string;
}

function AppStoreBadge(props: AppStoreBadgeProps): ReactElement {
  return (
    <Link
      w={"full"}
      maxW={{ base: 44, md: 52 }}
      href={props.href}
      aria-label={props.label}
    >
      <Image src={props.src} alt={props.label} />
    </Link>
  );
}
