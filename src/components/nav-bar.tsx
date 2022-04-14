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
import AppIcon from "../assets/icon.inline.svg";
import Section from "./section";

export default function NavBar(): ReactElement {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          tagline
          playstoreUrl
        }
      }
    }
  `);

  return (
    <Section as="header" py={6}>
      <HStack align={"center"} spacing={2}>
        <Show below={"md"}>
          <HamburgerNavMenu />
        </Show>

        <IconButton
          as={GatsbyLink}
          to="/"
          variant={"link"}
          _focus={{ boxShadow: "none" }}
          aria-label={"Go to homepage"}
          title={`${site.siteMetadata.name}: ${site.siteMetadata.tagline}`}
          icon={
            <Box as={AppIcon} boxSize={{ base: 12, md: 16 }} fill={"black"} />
          }
        />

        <Spacer />

        <Show above={"md"}>
          <HorizontalNavMenu />
        </Show>

        <Button
          as={"a"}
          size={useBreakpointValue({ base: "sm", md: "md" })}
          colorScheme={"primary"}
          href={site.siteMetadata.playstoreUrl}
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
        variant={"ghost"}
        ref={btnRef}
        aria-label={"Toggle navigation menu"}
      />

      <Drawer
        size={"full"}
        isOpen={isOpen}
        onClose={onClose}
        placement={"left"}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent bg={"primary.500"} color={"white"}>
          <DrawerHeader alignItems={"flex-start"} px={8} py={6}>
            <Box as={AppIcon} boxSize={{ base: 12, md: 16 }} fill={"white"} />
            <DrawerCloseButton />
          </DrawerHeader>

          <DrawerBody as={VStack} py={12} spacing={2} alignItems={"stretch"}>
            {menuItems.map((item) => (
              <NavMenuItem
                href={item.href}
                onClick={() => {
                  console.log("clicked");
                  onClose();
                }}
                color={"white"}
                hoverColor={"gray.200"}
                activeBg={
                  "linear-gradient(90deg, transparent 5%, rgba(0,0,0,0.1) 40%)"
                }
                fontSize={"xl"}
              >
                {item.title}
              </NavMenuItem>
            ))}
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
        <NavMenuItem
          href={item.href}
          color={"gray.500"}
          hoverColor={"gray.900"}
          activeColor={"primary.500"}
        >
          {item.title}
        </NavMenuItem>
      ))}
    </HStack>
  );
}

interface NavMenuItemProps {
  href: string;
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
  color: string;
  hoverColor: string;
  activeColor?: string;
  activeBg?: string;
  fontSize?: string;
}

function NavMenuItem(props: NavMenuItemProps): ReactElement {
  const isAnchorLink = props.href.indexOf("#") > -1;
  return (
    <ChakraLink
      as={isAnchorLink ? AnchorLink : GatsbyLink}
      // @ts-ignore: Ignore the following error because of AnchorLink
      activeClassName={"active"}
      partiallyActive={true}
      to={props.href}
      onClick={isAnchorLink ? undefined : props.onClick}
      onAnchorLinkClick={isAnchorLink ? props.onClick : null}
      p={2}
      fontSize={props.fontSize}
      color={props.color}
      borderRadius={"lg"}
      _hover={{
        textDecoration: "none",
        color: props.hoverColor,
      }}
      sx={{
        "&.active": {
          color: props.activeColor,
          background: props.activeBg,
        },
      }}
    >
      {props.children}
    </ChakraLink>
  );
}
