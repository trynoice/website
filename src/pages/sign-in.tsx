import { Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import ContentfulPage from "../components/contentful-page";

export default function SignInPage(): ReactElement {
  const [token, setToken] = useState<string>();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setToken(params.get("token") || "null");
  });

  return (
    <ContentfulPage
      title="Sign In"
      meta={[
        {
          name: "robots",
          content: "noindex",
        },
      ]}
    >
      <Text textAlign={"center"}>
        Please open the sign-in link using the Noice Android app. If you're
        already on the same device as the Noice app, please follow{" "}
        <Link
          as={"a"}
          href={`noice://sign-in?token=${token}`}
          color={"primary.500"}
        >
          this link
        </Link>{" "}
        to complete the sign-in process.
        <br />
        <br />
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
    </ContentfulPage>
  );
}
