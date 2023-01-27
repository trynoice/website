import { Heading, Link as ChakraLink, Text } from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { ReactElement } from "react";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";

export function Head(): ReactElement {
  return <BasicPageHead title={"Page Not Found"} />;
}

export default function NotFound(): ReactElement {
  return (
    <BasicPage title={"Page Not Found"}>
      <Text textAlign={"center"}>
        You seem to have clicked on a broken link. Please return to the{" "}
        <ChakraLink as={GatsbyLink} to={"/"} color={"primary.500"}>
          homepage
        </ChakraLink>{" "}
        or go back to the{" "}
        <ChakraLink href={"javascript:history.back()"} color={"primary.500"}>
          previous page
        </ChakraLink>
        .
      </Text>
      <Heading
        as={"h2"}
        size={"3xl"}
        color={"primary.500"}
        textAlign={"center"}
        mt={12}
      >
        (&#x2299;.&#x2609;)
      </Heading>
    </BasicPage>
  );
}
