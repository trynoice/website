import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  IconButton,
  Link as ChakraLink,
  Show,
  Spacer,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import { Fragment, ReactElement, useEffect, useRef, useState } from "react";
import AppIcon from "../assets/app-icon";

export default function NavBar(): ReactElement {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          tagline
          googlePlayUrl
        }
      }
    }
  `);

  const [isScrolled, setScrolled] = useState(false);
  useEffect(() => {
    const listener = () => setScrolled(window.pageYOffset > 0);
    window.addEventListener("scroll", listener);
    return () => window.removeEventListener("scroll", listener);
  }, []);

  return (
    <Box
      pos={"sticky"}
      top={0}
      zIndex={"1"}
      w={"full"}
      py={isScrolled ? 0 : 4}
      bg={isScrolled ? "whiteAlpha.600" : "transparent"}
      backdropFilter={isScrolled ? "auto" : "none"}
      backdropBlur={"md"}
      boxShadow={isScrolled ? "sm" : "none"}
      transition={"all 0.5s cubic-bezier(.17,.67,.83,.67)"}
    >
      <HStack
        as={"header"}
        w={"full"}
        maxW={"maxContentWidth"}
        mx={"auto"}
        px={{
          base: "contentPaddingXDefault",
          md: "contentPaddingXMd",
          lg: "contentPaddingXLg",
          xl: "contentPaddingXXl",
        }}
        py={4}
        spacing={{ base: 4, md: 8 }}
      >
        <ChakraLink
          as={GatsbyLink}
          to={"/"}
          aria-label={"Go to homepage"}
          title={`${site.siteMetadata.name}: ${site.siteMetadata.tagline}`}
          color={"black"}
          _hover={{ color: "primary.500" }}
        >
          <AppIcon w={{ base: 28, md: 36 }} h={"auto"} fill={"currentColor"} />
        </ChakraLink>

        <Spacer />

        <Show above={"md"}>
          <HorizontalNavMenu />
        </Show>

        <Button
          as={"a"}
          size={"sm"}
          px={4}
          colorScheme={"primary"}
          href={site.siteMetadata.googlePlayUrl}
          target={"_blank"}
          rounded={"full"}
        >
          Try for Free
        </Button>

        <Show below={"md"}>
          <HamburgerNavMenu />
        </Show>
      </HStack>
    </Box>
  );
}

interface MenuItem {
  title: string;
  href: string;
}

const menuItems: Array<MenuItem> = [
  {
    title: "Pricing",
    href: "/#pricing",
  },
  {
    title: "FAQs",
    href: "/faqs",
  },
];

function HamburgerNavMenu(): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Fragment>
      <IconButton
        icon={<HamburgerIcon boxSize={5} />}
        onClick={onOpen}
        size={"sm"}
        variant={"outline"}
        colorScheme={"blackAlpha"}
        ref={btnRef}
        aria-label={"Toggle navigation menu"}
      />

      <Drawer
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
        placement={"right"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"primary.500"} color={"white"}>
          <DrawerHeader px={8} py={6}>
            <AppIcon w={{ base: 24, md: 32 }} h={"auto"} fill={"white"} />
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody as={VStack} py={12} spacing={2} alignItems={"stretch"}>
            {[{ title: "Home", href: "/" }].concat(menuItems).map((item) => (
              <ChakraLink
                as={GatsbyLink}
                activeClassName={"active"}
                partiallyActive={true}
                to={item.href}
                onClick={() => onClose()}
                px={4}
                py={2}
                fontSize={"lg"}
                color={"white"}
                borderRadius={"lg"}
                _hover={{
                  textDecoration: "none",
                  color: "gray.200",
                }}
                sx={{
                  "&.active": {
                    bgGradient:
                      "linear-gradient(90deg, rgba(0,0,0,0.1) 40%, transparent 95%)",
                  },
                }}
              >
                {item.title}
              </ChakraLink>
            ))}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

function HorizontalNavMenu(): ReactElement {
  return (
    <HStack spacing={4}>
      {menuItems.map((item) => (
        <Button
          as={GatsbyLink}
          to={item.href}
          activeClassName={"active"}
          size={"sm"}
          px={4}
          variant={"ghost"}
          partiallyActive={true}
          rounded={"full"}
          colorScheme={"blackAlpha"}
          sx={{
            "&.active": {
              color: "primary.500",
            },
          }}
        >
          {item.title}
        </Button>
      ))}
    </HStack>
  );
}
