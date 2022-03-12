import { graphql, useStaticQuery } from "gatsby";
import React, { ReactElement } from "react";
import Helmet from "react-helmet";
import DefaultIcon from "../assets/icon-square.png";

interface PageMetaProps {
  description?: string;
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  title?: string;
  image?: any;
}

export default function PageMeta(props: PageMetaProps): ReactElement {
  const { site } = useStaticQuery(graphql`
    query HEAD {
      site {
        siteMetadata {
          name
          tagline
          description
          twitter
          site_url
        }
      }
    }
  `);

  const { name, tagline, description, twitter, site_url } = site.siteMetadata;
  const longName = `${name}: ${tagline}`
  const image = `${site_url}${props.image || DefaultIcon}`;

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={props.title}
      titleTemplate={`%s &ndash; ${name}`}
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
          content: props.image ? "summary_large_image" : "summary",
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
  );
}
