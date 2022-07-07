import { Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import ContentfulPage from "../components/contentful-page";

export default function RedirectPage(): ReactElement {
  const [redirectTo, setRedirectTo] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uri = params.get("uri") || "/";
    window.location.href = uri;
    setRedirectTo(uri);
  });

  return (
    <ContentfulPage
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
    </ContentfulPage>
  );
}
