import { Box, Container, Heading, Text, VStack } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import Breadcrumbs from "./breadcrumbs";
import NavBar from "./nav-bar";
import ShellPage from "./shell-page";

interface DocumentPageProps {
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

export default function ContentfulPage(props: DocumentPageProps): ReactElement {
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
      <Box as={"article"} py={{ base: 8, md: 12 }}>
        <Container
          as={"header"}
          maxW={"full"}
          bg={"blackAlpha.50"}
          py={{ base: 8, md: 12 }}
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
              lineHeight={"shorter"}
              color={"primary.500"}
            >
              {props.title}
            </Heading>

            {props.publishedAt || props.updatedAt ? (
              <Text fontSize={{ base: "sm", md: "md" }} color={"black"}>
                {props.publishedAt ? (
                  <Text as={"span"}>
                    Published on{" "}
                    <Text as={"span"} fontWeight={"medium"}>
                      {props.publishedAt}
                    </Text>
                  </Text>
                ) : null}
                {props.updatedAt ? (
                  <Text as={"span"}>
                    , last updated on{" "}
                    <Text as={"span"} fontWeight={"medium"}>
                      {props.updatedAt}
                    </Text>
                  </Text>
                ) : null}
              </Text>
            ) : null}
          </VStack>
        </Container>
        <Container py={{ base: 8, md: 12 }} {...contentProps}>
          {props.children}
        </Container>
      </Box>
    </ShellPage>
  );
}
