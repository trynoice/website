import { Container, ContainerProps } from "@chakra-ui/react";
import { ReactElement } from "react";

/**
 * Enforces a standard max-width across all sections on all pages.
 *
 * @param props props to apply on the outer {@link Container}.
 * @returns a `6xl` container wrapped in a full-width {@link Container}.
 */
export default function Section(props: ContainerProps): ReactElement {
  return (
    <Container py={8} px={{ base: 4, md: 12 }} maxW={"full"} {...props}>
      <Container maxW={"6xl"} p={0}>
        {props.children}
      </Container>
    </Container>
  );
}
