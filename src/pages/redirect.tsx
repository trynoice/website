import { Divider, Heading, Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";
import Page from "../components/page";
import Section from "../components/section";

export default function RedirectPage({ location }: any): ReactElement {
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("uri") || "/";
  useEffect(() => {
    window.location.href = redirectTo;
  });

  return (
    <Page
      title="Redirecting"
      meta={[
        {
          name: "robots",
          content: "noindex",
        },
      ]}
    >
      <Section maxW={"4xl"} py={{ base: 12, md: 16 }}>
        <Heading as={"h1"} size={"2xl"} color={"primary.500"}>
          Redirecting
        </Heading>
        <Divider mt={4} mb={10} />
        <Text>
          If you are not redirected automatically, please follow{" "}
          <Link as={"a"} href={redirectTo} color={"primary.500"}>
            this link
          </Link>
          .
        </Text>
      </Section>
    </Page>
  );
}
