import {
  GridItem,
  Heading,
  LinkBox,
  LinkOverlay,
  ResponsiveValue,
  SimpleGrid,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Link as GatsbyLink } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import { ReactElement } from "react";

interface BlogPostListItemProps {
  title: string;
  excerpt: string;
  category: string;
  publishedAt: string;
  href: string;
  imageData?: IGatsbyImageData;
  size: ResponsiveValue<"sm" | "md" | "lg" | null>;
}

export default function BlogPostListItem(
  props: BlogPostListItemProps
): ReactElement {
  const size =
    typeof props.size === "string"
      ? props.size
      : useBreakpointValue(props.size as any, { fallback: "sm" });

  return (
    <SimpleGrid
      as={(props: any) => <LinkBox as={"article"} {...props} />}
      w={"full"}
      columns={{ base: 1, md: size === "lg" ? 5 : 1 }}
      alignContent={"flex-start"}
      justifyContent={"flex-start"}
      spacingX={8}
      spacingY={6}
    >
      {props.imageData ? (
        <GridItem
          colSpan={{ base: 1, md: size === "lg" ? 3 : 1 }}
          h={size === "sm" ? "3xs" : size === "md" ? "2xs" : "xs"}
          rounded={size === "sm" ? "md" : size === "md" ? "lg" : "xl"}
          as={GatsbyImage}
          image={props.imageData}
          alt={""}
          aria-hidden={true}
        />
      ) : null}
      <GridItem
        colSpan={{ base: 1, md: size === "lg" ? 2 : 1 }}
        my={"auto"}
        as={VStack}
        align={"flex-start"}
        spacing={2}
      >
        <Text color={"gray.500"} fontSize={size === "sm" ? "xs" : "sm"}>
          <Text as={"span"} fontWeight={"medium"}>
            {props.category}
          </Text>{" "}
          &#x2022; {props.publishedAt}
        </Text>
        <Heading
          as={"h1"}
          size={size === "sm" ? "md" : size === "md" ? "lg" : "xl"}
          transition={"all 0.3s cubic-bezier(.17,.67,.83,.67)"}
          _hover={{ color: "primary.500" }}
        >
          <LinkOverlay as={GatsbyLink} to={props.href}>
            {props.title}
          </LinkOverlay>
        </Heading>
        <Text fontSize={size === "sm" ? "sm" : "md"} lineHeight={"tall"}>
          {props.excerpt}
        </Text>
      </GridItem>
    </SimpleGrid>
  );
}
