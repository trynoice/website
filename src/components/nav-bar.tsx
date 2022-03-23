import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Hide,
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
import { AnchorLink } from "gatsby-plugin-anchor-links";
import {
  Fragment,
  MouseEventHandler,
  ReactElement,
  ReactNode,
  useRef,
} from "react";
import AppIcon from "../assets/icon.svg";
import Section from "./section";

export default function NavBar(): ReactElement {
  const { site } = useStaticQuery(graphql`
    query {
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
    <Section as="header" py={6}>
      <HStack align={"center"} spacing={2}>
        <Hide above={"md"}>
          <HamburgerNavMenu />
        </Hide>

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
              boxSize={{ base: 10, md: 12 }}
            />
          }
        />

        <Spacer />

        <Hide below={"md"}>
          <HorizontalNavMenu />
        </Hide>

        <Button
          as={"a"}
          size={useBreakpointValue({ base: "sm", md: "md" })}
          colorScheme={"primary"}
          href={site.siteMetadata.playstore_url}
          target={"_blank"}
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

const menuItems: Array<MenuItem> = [
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
              {menuItems.map((item) => (
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
    <HStack spacing={8} px={8}>
      {menuItems.map((item) => (
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
      as={props.href.indexOf("#") > 0 ? AnchorLink : GatsbyLink}
      // @ts-ignore: Ignore the following error because of AnchorLink
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
          color: "primary.500",
        },
      }}
    >
      {props.children}
    </ChakraLink>
  );
}
