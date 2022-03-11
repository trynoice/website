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
          short_name
          description
          twitter
          site_url
        }
      }
    }
  `);

  const { name, short_name, description, twitter, site_url } =
    site.siteMetadata;
  const image = `${site_url}${props.image || DefaultIcon}`;

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={props.title}
      titleTemplate={`%s &ndash; ${short_name}`}
      defaultTitle={name}
      meta={(props.meta || []).concat([
        {
          name: "description",
          content: props.description || description,
        },
        {
          property: "og:site_name",
          content: short_name,
        },
        {
          property: "og:image",
          content: image,
        },
        {
          property: "og:title",
          content: props.title || name,
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
          content: props.title || name,
        },
        {
          name: "twitter:description",
          content: props.description || description,
        },
      ])}
    />
  );
}
