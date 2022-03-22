import { Heading, HeadingProps, Text } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import { ReactElement } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function DefaultHeading(props: HeadingProps): ReactElement {
  return <Heading {...props} mt={10} mb={4} />;
}

const newTheme = {
  p: ({ children }: any) => (
    <Text my={4} lineHeight={"tall"} children={children} />
  ),
  h1: ({ children }: any) => (
    <DefaultHeading size={"2xl"} children={children} />
  ),
  h2: ({ children }: any) => <DefaultHeading size={"xl"} children={children} />,
  h3: ({ children }: any) => <DefaultHeading size={"lg"} children={children} />,
  h4: ({ children }: any) => <DefaultHeading size={"md"} children={children} />,
  h5: ({ children }: any) => <DefaultHeading size={"sm"} children={children} />,
  h6: ({ children }: any) => <DefaultHeading size={"xs"} children={children} />,
};

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer(
  props: MarkdownRendererProps
): ReactElement {
  return (
    <ReactMarkdown
      components={ChakraUIRenderer(newTheme)}
      remarkPlugins={[remarkGfm]}
      children={props.content}
    />
  );
}
