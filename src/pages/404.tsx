import { Button, Heading, Text, VStack } from "@chakra-ui/react";
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
      <VStack spacing={12}>
        <Text textAlign={"center"}>
          Oops! The page you're looking for seems to have disappeared into the
          calm. Head back to our homepage find your inner peace with Noice!
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
        <Button mx={"auto"} as={GatsbyLink} to={"/"} colorScheme={"primary"}>
          Return to Home
        </Button>
      </VStack>
    </BasicPage>
  );
}
