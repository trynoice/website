import {
  Alert,
  Box,
  Code,
  Divider,
  Heading,
  HeadingProps,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { MDXProvider, MDXProviderComponents } from "@mdx-js/react";
import { Children, Fragment, ReactElement } from "react";

function DefaultHeading(props: HeadingProps): ReactElement {
  return <Heading mt={10} mb={4} {...props} />;
}

const MDXComponents: MDXProviderComponents = {
  h1: (props: any) => (
    <DefaultHeading as={"h1"} size={"2xl"} color={"primary.500"} {...props} />
  ),
  h2: (props: any) => <DefaultHeading as={"h2"} size={"xl"} {...props} />,
  h3: (props: any) => <DefaultHeading as={"h3"} size={"lg"} {...props} />,
  h4: (props: any) => <DefaultHeading as={"h4"} size={"md"} {...props} />,
  h5: (props: any) => <DefaultHeading as={"h5"} size={"sm"} {...props} />,
  h6: (props: any) => <DefaultHeading as={"h6"} size={"xs"} {...props} />,
  p: (props: any) => <Text my={4} lineHeight={"tall"} {...props} />,
  strong: (props: any) => (
    <Text as={"strong"} fontWeight={"semibold"} {...props} />
  ),
  inlineCode: (props: any) => <Code {...props} />,
  a: (props: any) => <Link color={"primary.500"} {...props} />,
  ul: (props: any) => <UnorderedList my={4} spacing={2} {...props} />,
  ol: (props: any) => <OrderedList my={4} spacing={2} {...props} />,
  li: (props: any) => <ListItem {...props} />,
  hr: (props: any) => <Divider {...props} />,
  blockquote: (props: unknown) => (
    <Alert
      my="4"
      role="none"
      status="warning"
      variant="left-accent"
      as="blockquote"
      rounded="4px"
      {...props}
    />
  ),
  wrapper: ({ children }: any) => {
    const updatedChildren = Children.map(children, (child: any) => {
      if (child.props.className !== "footnotes") {
        return child;
      }

      return (
        <Box mt={12} fontSize={"sm"}>
          <Heading as={"h4"} mb={4} size={"md"}>
            Footnotes
          </Heading>
          {child.props.children}
        </Box>
      );
    });

    return <Fragment>{updatedChildren}</Fragment>;
  },
};

export default function ChakraMDXProvider(props: any) {
  return <MDXProvider components={MDXComponents} {...props} />;
}
