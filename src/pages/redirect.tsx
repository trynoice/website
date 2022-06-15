import { Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import DocumentPage from "../components/document-page";

export default function RedirectPage(): ReactElement {
  const [redirectTo, setRedirectTo] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uri = params.get("uri") || "/";
    window.location.href = uri;
    setRedirectTo(uri);
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
