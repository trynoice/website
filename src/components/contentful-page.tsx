import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import Breadcrumbs from "./breadcrumbs";
import NavBar from "./nav-bar";
import ShellPage from "./shell-page";

interface ContentfulPageProps {
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  title: string;
  description?: string;
  publishedAt?: string;
  updatedAt?: string;
  children?: ReactNode;
}

export default function ContentfulPage(
  props: ContentfulPageProps
): ReactElement {
  const contentProps = {
    maxW: "4xl",
    mx: "auto",
    px: { base: 6, lg: 0 },
  };

  return (
    <ShellPage
      meta={props.meta}
      title={props.title}
      description={props.description}
      fontSize={{ base: "md", md: "lg" }}
      lineHeight={"tall"}
    >
      <NavBar />
      <Box as={"article"} py={{ base: 8 }}>
        <Container
          as={"header"}
          maxW={"full"}
          bg={"blackAlpha.50"}
          py={{ base: 8, md: 10 }}
          px={0}
        >
          <VStack
            {...contentProps}
            spacing={{ base: 4, lg: 6 }}
            alignItems={"stretch"}
            fontSize={{ base: "sm", md: "md" }}
          >
            <Breadcrumbs />

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
        </Container>
        <Container py={{ base: 8, md: 12 }} {...contentProps}>
          {props.children}
        </Container>
      </Box>
    </ShellPage>
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
    <VStack
      align={"start"}
      spacing={1}
      fontSize={{ base: "sm", md: "md" }}
      color={"black"}
    >
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
