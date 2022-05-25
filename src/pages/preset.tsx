import { Link, Text } from "@chakra-ui/react";
import { ReactElement } from "react";
import DocumentPage from "../components/document-page";

interface PresetPageProps {
  location: Location;
}

export default function Preset(props: PresetPageProps): ReactElement {
  const queryParams = new URLSearchParams(props.location.search);
  const presetName = queryParams.get("n");
  const presetUri = `noice://preset${location.search}`;
  return (
    <DocumentPage title={`Play "${presetName}"`}>
      <Text textAlign={"center"}>
        To play the preset "{presetName}" using the Noice app, please follow{" "}
        <Link as={"a"} color={"primary.500"} href={presetUri}>
          this link
        </Link>
        .
      </Text>
    </DocumentPage>
  );
}
