import { Box, Container, Heading, Text } from "@chakra-ui/react";
import { ReactElement, ReactNode } from "react";
import Page from "./page";

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
  const contentProps = {
    maxW: "4xl",
    mx: "auto",
    px: { base: 6, lg: 0 },
  };

  return (
    <Page
      meta={props.meta}
      title={props.title}
      description={props.description}
      fontSize={{ base: "md", md: "lg" }}
      lineHeight={"tall"}
    >
      <Box as={"article"} py={{ base: 8, md: 12 }}>
        <Container
          as={"header"}
          maxW={"full"}
          bg={"gray.100"}
          py={{ base: 8, md: 12 }}
        >
          <Heading
            as={"h1"}
            size={"2xl"}
            textAlign={"center"}
            lineHeight={"shorter"}
            color={"primary.500"}
            {...contentProps}
          >
            {props.title}
          </Heading>
          {props.publishedAt || props.updatedAt ? (
            <Text
              mt={6}
              fontSize={{ base: "sm", md: "md" }}
              textAlign={"center"}
              color={"black"}
              {...contentProps}
            >
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
        </Container>
        <Container py={{ base: 8, md: 12 }} {...contentProps}>
          {props.children}
        </Container>
      </Box>
    </Page>
  );
}
