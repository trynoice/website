import {
  Container,
  Divider,
  Heading,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import Analytics from "./analytics";
import Breadcrumbs from "./breadcrumbs";
import Footer from "./footer";
import NavBar from "./nav-bar";

interface BasicPageProps {
  title: string;
  publishedAt?: string;
  updatedAt?: string;
  children?: ReactNode;
}

export default function BasicPage(props: BasicPageProps): ReactElement {
  const contentPaddingX = {
    base: "contentPaddingXDefault",
    md: "contentPaddingXMd",
    lg: "contentPaddingXLg",
    xl: "contentPaddingXXl",
  };

  return (
    <VStack as={"main"} w={"full"} minH={"100vh"} bg={"white"} spacing={0}>
      <NavBar />
      <VStack
        as={"article"}
        w={"full"}
        pt={12}
        pb={24}
        spacing={{ base: 12, lg: 16 }}
      >
        <VStack
          as={"header"}
          w={"full"}
          maxW={"maxContentWidth"}
          px={contentPaddingX}
          spacing={4}
          alignItems={"center"}
          textAlign={"center"}
          fontSize={{ base: "sm", lg: "md" }}
        >
          <Breadcrumbs showIfAtLeast={2} />
          <Heading
            as={"h1"}
            size={"2xl"}
            lineHeight={"base"}
            color={"primary.500"}
          >
            {props.title}
          </Heading>
          <ContentTimestamps
            publishedAt={props.publishedAt}
            updatedAt={props.updatedAt}
          />
        </VStack>
        <Divider />
        <Container maxW={"4xl"} px={contentPaddingX}>
          {props.children}
        </Container>
      </VStack>
      <Spacer />
      <Footer />
      <Analytics />
    </VStack>
  );
}

interface ContentTimestampsProps {
  publishedAt?: string;
  updatedAt?: string;
}

function ContentTimestamps(props: ContentTimestampsProps): ReactElement | null {
  if (!props.publishedAt && !props.updatedAt) {
    return null;
  }

  return (
    <VStack align={"start"} spacing={1} color={"black"}>
      <PublishedAt timestamp={props.publishedAt} />
      <UpdatedAt timestamp={props.updatedAt} />
    </VStack>
  );
}

function PublishedAt(props: {
  timestamp: string | undefined;
}): ReactElement | null {
  return props.timestamp ? (
    <Text as={"span"}>
      Published on{" "}
      <Text as={"span"} fontWeight={"medium"}>
        {props.timestamp}
      </Text>
    </Text>
  ) : null;
}

function UpdatedAt(props: {
  timestamp: string | undefined;
}): ReactElement | null {
  return props.timestamp ? (
    <Text as={"span"}>
      Last updated on{" "}
      <Text as={"span"} fontWeight={"medium"}>
        {props.timestamp}
      </Text>
    </Text>
  ) : null;
}
