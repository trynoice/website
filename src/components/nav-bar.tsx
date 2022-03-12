import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Image,
  Link as ChakraLink,
  Spacer,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { graphql, Link as GatsbyLink, useStaticQuery } from "gatsby";
import {
  Fragment,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import AppIcon from "../assets/icon.svg";
import Section from "./section";

export default function NavBar(): ReactElement {
  const [isScrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 0);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  });

  const { site } = useStaticQuery(graphql`
    query NAVBAR {
      site {
        siteMetadata {
          name
          tagline
          playstore_url
        }
      }
    }
  `);

  return (
    <Section
      as="header"
      position={"sticky"}
      top={0}
      py={isScrolled ? 3 : 6}
      bg={isScrolled ? "inherit" : "transparent"}
      boxShadow={isScrolled ? "sm" : "none"}
      transitionProperty={"box-shadow, padding, background-color"}
      transitionDuration={"0.5s"}
      transitionTimingFunction={"cubic-bezier(0.075, 0.82, 0.165, 1)"}
    >
      <HStack align={"center"} spacing={2}>
        <HamburgerNavMenu />
        <IconButton
          as={GatsbyLink}
          to="/"
          variant={"link"}
          _focus={{ boxShadow: "none" }}
          aria-label={"Go to homepage"}
          icon={
            <Image
              src={AppIcon}
              alt={`${site.siteMetadata.name}: ${site.siteMetadata.tagline}`}
              boxSize={[10, 12, 14]}
            />
          }
        />

        <Spacer minW={8} />
        <HorizontalNavMenu />

        <Button
          as={"a"}
          size={useBreakpointValue({ base: "sm", md: "md" })}
          colorScheme={"green"}
          href={site.siteMetadata.playstore_url}
          textTransform={"capitalize"}
        >
          {`Try ${site.siteMetadata.name}`}
        </Button>
      </HStack>
    </Section>
  );
}

interface MenuItem {
  title: string;
  href: string;
}

const MenuItems: Array<MenuItem> = [
  {
    title: "Pricing",
    href: "/#pricing",
  },
  {
    title: "Changelog",
    href: "/changelog",
  },
  {
    title: "News",
    href: "/news",
  },
];

function HamburgerNavMenu(): ReactElement {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef<HTMLButtonElement>(null);

  return (
    <Fragment>
      <IconButton
        display={{ base: "block", md: "none" }}
        icon={<HamburgerIcon boxSize={5} />}
        onClick={onOpen}
        variant={"ghost"}
        ref={btnRef}
        aria-label={"Toggle navigation menu"}
      />

      <Drawer
        size={"xs"}
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody py={8}>
            <VStack align={"stretch"} spacing={2}>
              {MenuItems.map((item) => (
                <NavMenuItem href={item.href} onClick={onClose}>
                  {item.title}
                </NavMenuItem>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Fragment>
  );
}

function HorizontalNavMenu(): ReactElement {
  return (
    <HStack display={{ base: "none", md: "flex" }} spacing={8} px={8}>
      {MenuItems.map((item) => (
        <NavMenuItem href={item.href}>{item.title}</NavMenuItem>
      ))}
    </HStack>
  );
}

interface NavMenuItemProps {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

function NavMenuItem(props: NavMenuItemProps): ReactElement {
  return (
    <ChakraLink
      as={GatsbyLink}
      activeClassName={"active"}
      to={props.href}
      onClick={props.onClick}
      p={2}
      color={"gray.500"}
      _hover={{
        textDecoration: "none",
        color: "gray.900",
      }}
      sx={{
        "&.active": {
          color: "green.500",
        },
      }}
    >
      {props.children}
    </ChakraLink>
  );
}
