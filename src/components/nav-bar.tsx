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
import {
  Fragment,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import AppIcon from "../assets/app-icon";

export default function NavBar(): ReactElement {
  const { site }: Queries.NavBarQuery = useStaticQuery(graphql`
    query NavBar {
      site {
        siteMetadata {
          name
          tagline
          googlePlayUrl
        }
      }
    }
  `);

  const [isPinned, setPinned] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function listener() {
      setPinned(
        window.scrollY > 0 && ref.current?.getBoundingClientRect().top === 0
      );
    }

    window.addEventListener("scroll", listener);
    return function cleaup() {
      window.removeEventListener("scroll", listener);
    };
  });

  const transition = "all 0.5s cubic-bezier(.17,.67,.83,.67)";
  const pinnedMargin = { base: 1, md: 2 };

  return (
    <Box
      ref={ref}
      pos={"sticky"}
      top={0}
      zIndex={isPinned ? 2 : 0}
      w={"full"}
      px={isPinned ? pinnedMargin : 0}
      transition={transition}
    >
      <HStack
        as={"header"}
        w={"full"}
        maxW={"maxContentWidth"}
        mx={"auto"}
        my={isPinned ? pinnedMargin : 0}
        px={{
          base: "contentPaddingXDefault",
          md: "contentPaddingXMd",
          lg: "contentPaddingXLg",
          xl: "contentPaddingXXl",
        }}
        py={isPinned ? 4 : 8}
        spacing={{ base: 4, md: 8 }}
        bg={isPinned ? "whiteAlpha.600" : "transparent"}
        border={isPinned ? "1px" : "none"}
        borderColor={"blackAlpha.100"}
        backdropFilter={isPinned ? "auto" : "none"}
        backdropBlur={"md"}
        rounded={isPinned ? "2xl" : "sm"}
        boxShadow={isPinned ? "2xl" : "none"}
        transition={transition}
      >
        <ChakraLink
          as={GatsbyLink}
          to={"/"}
          aria-label={"Go to homepage"}
          title={`${site!.siteMetadata.name}: ${site!.siteMetadata.tagline}`}
          color={"black"}
          _hover={{ color: "primary.500" }}
        >
          <AppIcon
            w={{ base: 28, md: 32, lg: 36 }}
            h={"auto"}
            fill={"currentColor"}
          />
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
          href={site!.siteMetadata.googlePlayUrl}
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
    title: "Blog",
    href: "/blog",
  },
  {
    title: "FAQs",
    href: "/faqs",
  },
];

function HamburgerNavMenu(): ReactElement {
  interface MenuItemProps {
    href: string;
    partiallyActive: boolean;
    onClick: () => void;
    children?: ReactNode;
  }

  function MenuItem(props: MenuItemProps): ReactElement {
    return (
      <ChakraLink
        as={GatsbyLink}
        partiallyActive={props.partiallyActive}
        to={props.href}
        onClick={props.onClick}
        px={4}
        py={2}
        fontSize={"lg"}
        color={"white"}
        borderRadius={"lg"}
        _hover={{
          textDecoration: "none",
          color: "gray.200",
        }}
        activeClassName={"active"}
        sx={{
          "&.active": {
            bgGradient:
              "linear-gradient(90deg, rgba(0,0,0,0.1) 40%, transparent 95%)",
          },
        }}
      >
        {props.children}
      </ChakraLink>
    );
  }

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
            <MenuItem href={"/"} partiallyActive={false} onClick={onClose}>
              Home
            </MenuItem>
            {menuItems.map((item) => (
              <MenuItem
                key={`HamburgerNavMenu-${item.href}`}
                href={item.href}
                partiallyActive={true}
                onClick={onClose}
              >
                {item.title}
              </MenuItem>
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
          key={`HorizontalNavMenu-${item.href}`}
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
