import { Box, ResponsiveValue, Spacer, VStack } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement, ReactNode } from "react";
import Helmet from "react-helmet";
import DefaultSocialCardImage from "../assets/social-card-image.png";
import Footer from "./footer";

interface PageProps {
  description?: string;
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  title?: string;
  image?: any;
  children?: ReactNode;
  fontSize?: ResponsiveValue<string>;
  lineHeight?: string;
}

export default function ShellPage(props: PageProps): ReactElement {
  const { site } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          name
          tagline
          description
          twitter
          siteUrl
        }
      }
    }
  `);

  const { name, tagline, description, twitter, siteUrl } = site.siteMetadata;
  const longName = `${name}: ${tagline}`;
  const image = `${siteUrl}${props.image || DefaultSocialCardImage}`;

  return (
    <VStack
      maxW={"full"}
      minH={"100vh"}
      bg={"white"}
      align={"stretch"}
      spacing={0}
    >
      <Box as={"main"} fontSize={props.fontSize} lineHeight={props.lineHeight}>
        {props.children}
      </Box>
      <Spacer />
      <Footer />
      <Helmet
        htmlAttributes={{ lang: "en" }}
        title={props.title}
        titleTemplate={`%s – ${name}`}
        defaultTitle={longName}
        meta={(props.meta || []).concat([
          {
            name: "description",
            content: props.description || description,
          },
          {
            property: "og:site_name",
            content: longName,
          },
          {
            property: "og:image",
            content: image,
          },
          {
            property: "og:title",
            content: props.title || longName,
          },
          {
            property: "og:description",
            content: props.description || description,
          },
          {
            property: "og:type",
            content: "website",
          },
          {
            name: "twitter:card",
            content: "summary_large_image",
          },
          {
            name: "twitter:creator",
            content: twitter,
          },
          {
            name: "twitter:site",
            content: twitter,
          },
          {
            name: "twitter:image",
            content: image,
          },
          {
            name: "twitter:title",
            content: props.title || longName,
          },
          {
            name: "twitter:description",
            content: props.description || description,
          },
        ])}
      />
    </VStack>
  );
}
