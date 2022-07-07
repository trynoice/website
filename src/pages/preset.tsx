import { Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import ContentfulPage from "../components/contentful-page";

export default function Preset(): ReactElement {
  const [presetName, setPresetName] = useState<string>("");
  const [presetUri, setPresetUri] = useState<string>("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setPresetName(queryParams.get("n") || "");
    setPresetUri(`noice://preset${window.location.search}`);
  });

  return (
    <ContentfulPage title={`Play "${presetName}"`}>
      <Text textAlign={"center"}>
        To play the preset "{presetName}" using the Noice app, please follow{" "}
        <Link as={"a"} color={"primary.500"} href={presetUri}>
          this link
        </Link>
        .
      </Text>
    </ContentfulPage>
  );
}
