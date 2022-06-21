import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import Page from "./page";
import Section from "./section";

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

export default function DocumentPage(props: DocumentPageProps): ReactElement {
  return (
    <Page
      meta={props.meta}
      title={props.title}
      description={props.description}
      fontSize={{ base: "md", md: "lg" }}
      lineHeight={"tall"}
    >
      <Box as={"article"} py={{ base: 8, md: 12 }}>
        <Section
          as={"header"}
          bg={"gray.100"}
          py={{ base: 8, md: 12 }}
          textAlign={"center"}
        >
          <Heading
            as={"h1"}
            size={"2xl"}
            lineHeight={"shorter"}
            color={"primary.500"}
          >
            {props.title}
          </Heading>
          {props.publishedAt || props.updatedAt ? (
            <Text fontSize={{ base: "sm", md: "md" }} color={"black"} mt={6}>
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
        </Section>
        <Container maxW={"4xl"} p={{ base: 8, md: 12 }}>
          {props.children}
        </Container>
      </Box>
    </Page>
  );
}
