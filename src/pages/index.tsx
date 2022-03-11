import { Box, Center } from "@chakra-ui/react";
import { ReactElement } from "react";
import NavBar from "../components/nav-bar";
import PageMeta from "../components/page-meta";

export default function Home(): ReactElement {
  return (
    <Box maxW={"full"} bg={"gray.50"}>
      <PageMeta />
      <NavBar />
      <Hero />
    </Box>
  );
}

function Hero(): ReactElement {
  return (
    <Center w={"full"} minH={"100vh"} p="8">
      Hello world!
    </Center>
  );
}
