import { Link, Text } from "@chakra-ui/react";
import { ReactElement, useEffect, useState } from "react";
import BasicPage from "../components/basic-page";
import BasicPageHead from "../components/basic-page-head";

export function Head(): ReactElement {
  return (
    <BasicPageHead title={"Play Preset"}>
      <meta name={"robots"} content={"noindex"} />
    </BasicPageHead>
  );
}

export default function Preset(): ReactElement {
  const [presetName, setPresetName] = useState<string>("");
  const [presetUri, setPresetUri] = useState<string>("");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    setPresetName(queryParams.get("n") || "");
    setPresetUri(`noice://preset${window.location.search}`);
  });

  return (
    <BasicPage title={`Play "${presetName}"`}>
      <Text textAlign={"center"}>
        To play the preset "{presetName}" using the Noice app, please follow{" "}
        <Link as={"a"} color={"primary.500"} href={presetUri}>
          this link
        </Link>
        .
      </Text>
    </BasicPage>
  );
}
