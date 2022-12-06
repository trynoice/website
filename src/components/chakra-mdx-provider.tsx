import {
  Alert,
  Box,
  Code,
  Divider,
  Heading,
  HeadingProps,
  Image,
  Link,
  ListItem,
  OrderedList,
  Text,
  UnorderedList,
} from "@chakra-ui/react";
import { MDXProvider } from "@mdx-js/react";
import { Components } from "@mdx-js/react/lib";
import { Children, Fragment, ReactElement } from "react";

function DefaultHeading(props: HeadingProps): ReactElement {
  return <Heading mt={12} mb={6} {...props} />;
}

const MDXComponents: Components = {
  h1: (props: any) => (
    <DefaultHeading as={"h1"} size={"2xl"} color={"primary.500"} {...props} />
  ),
  h2: (props: any) => <DefaultHeading as={"h2"} size={"xl"} {...props} />,
  h3: (props: any) => <DefaultHeading as={"h3"} size={"lg"} {...props} />,
  h4: (props: any) => <DefaultHeading as={"h4"} size={"md"} {...props} />,
  h5: (props: any) => <DefaultHeading as={"h5"} size={"sm"} {...props} />,
  h6: (props: any) => <DefaultHeading as={"h6"} size={"xs"} {...props} />,
  p: (props: any) => <Text mt={8} mb={4} {...props} />,
  strong: (props: any) => (
    <Text as={"strong"} fontWeight={"semibold"} {...props} />
  ),
  inlineCode: (props: any) => <Code {...props} />,
  img: (props: any) => <Image maxW={"full"} mx={"auto"} my={16} {...props} />,
  a: (props: any) => <Link color={"primary.500"} {...props} />,
  ul: (props: any) => <UnorderedList mt={4} mb={8} {...props} />,
  ol: (props: any) => <OrderedList mt={4} mb={8} {...props} />,
  li: (props: any) => <ListItem {...props} />,
  hr: (props: any) => <Divider {...props} />,
  blockquote: (props: any) => (
    <Alert
      my={8}
      role={"none"}
      status={"warning"}
      variant={"left-accent"}
      as={"blockquote"}
      rounded={"xl"}
      fontSize={{ base: "sm", md: "md" }}
      sx={{
        "& > p": {
          my: 2,
        },
      }}
      {...props}
    />
  ),
  wrapper: ({ children }: any) => {
    const updatedChildren = Children.map(children, (child: any) => {
      if (child.props.className !== "footnotes") {
        return child;
      }

      return (
        <Box mt={8} fontSize={"0.877em"} color={"gray.700"}>
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
