import { ReactElement } from "react";
import PageMeta from "../components/page-meta";
import { Center } from "@chakra-ui/react";

export default function Home(): ReactElement {
  return (
    <div>
      <PageMeta />
      <Hero />
    </div>
  );
}

function Hero(): ReactElement {
  return (
    <Center w={"full"} minH={"100vh"} p="8">
      Hello world!
    </Center>
  );
}
