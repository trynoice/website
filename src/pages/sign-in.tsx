import { Button, ButtonGroup, Link, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import { FaAndroid } from "react-icons/fa";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";

export function Head(): ReactElement {
  return (
    <BasicPageHead title={"Sign In"}>
      <meta name={"robots"} content={"noindex"} />
    </BasicPageHead>
  );
}

export default function SignInPage(): ReactElement {
  const [token, setToken] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "null");
  });

  return (
    <BasicPage title={"Sign In"}>
      <VStack spacing={10} textAlign={"center"}>
        <Text>
          To complete the sign in process, please proceed to the appropriate
          app.
        </Text>
        <ButtonGroup gap={"4"} size={"lg"}>
          <Button
            as={"a"}
            href={`noice://sign-in?token=${token}`}
            colorScheme={"primary"}
            leftIcon={<FaAndroid />}
          >
            Android app
          </Button>
        </ButtonGroup>

        <Text fontSize={{ base: "sm", md: "md" }} pt={8}>
          If this link doesn't work on your device, please inform us at{" "}
          <Link
            as={"a"}
            href={"mailto:trynoiceapp@gmail.com"}
            color={"primary.500"}
          >
            trynoiceapp@gmail.com
          </Link>
          .
        </Text>
      </VStack>
    </BasicPage>
  );
}
