import { Divider, Heading, Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect } from "react";
import DocumentPage from "../components/document-page";
import Page from "../components/page";
import Section from "../components/section";

export default function RedirectPage({ location }: any): ReactElement {
  const params = new URLSearchParams(location.search);
  const redirectTo = params.get("uri") || "/";
  useEffect(() => {
    window.location.href = redirectTo;
  });

  return (
    <DocumentPage
      title="Redirecting"
      meta={[
        {
          name: "robots",
          content: "noindex",
        },
      ]}
    >
      <Text textAlign={"center"}>
        If you are not redirected automatically, please follow{" "}
        <Link as={"a"} href={redirectTo} color={"primary.500"}>
          this link
        </Link>
        .
      </Text>
    </DocumentPage>
  );
}
