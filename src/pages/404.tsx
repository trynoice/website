import {
  Divider,
  Heading,
  Link as ChakraLink,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { ReactElement } from "react";
import Page from "../components/page";
import Section from "../components/section";

export default function NotFound(): ReactElement {
  return (
    <Page title="Page not found">
      <Section maxW={"4xl"} py={{ base: 12, md: 16 }}>
        <VStack spacing={6} align={"flex-start"}>
          <Heading as={"h1"} size={"2xl"} color={"primary.500"}>
            (&#x2299;.&#x2609;)
          </Heading>
          <Heading as={"h2"} size={"xl"} color={"primary.500"}>
            Page not found
          </Heading>
          <Divider />
          <Text>
            You seem to have clicked on a broken link. Please return to the{" "}
            <ChakraLink as={GatsbyLink} to={"/"} color={"primary.500"}>
              homepage
            </ChakraLink>{" "}
            or go back to the{" "}
            <ChakraLink
              href={"javascript:history.back()"}
              color={"primary.500"}
            >
              previous page
            </ChakraLink>
            .
          </Text>
        </VStack>
      </Section>
    </Page>
  );
}
