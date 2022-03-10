import { useStaticQuery, graphql } from "gatsby";
import React from "react";
import Helmet from "react-helmet";

const query = graphql`
  query HEAD {
    site {
      siteMetadata {
        defaultTitle: title
        defaultDescription: description
        twitter: twitterUsername
      }
    }
  }
`;

interface PageMetaProps {
  description?: string;
  meta?: React.DetailedHTMLProps<
    React.MetaHTMLAttributes<HTMLMetaElement>,
    HTMLMetaElement
  >[];
  title?: string;
}

export default function PageMeta(props: PageMetaProps) {
  const { site } = useStaticQuery(query);
  const { defaultTitle, defaultDescription, twitter } = site.siteMetadata;
  const description = props.description || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={props.title}
      titleTemplate={`%s &ndash; ${defaultTitle}`}
      defaultTitle={defaultTitle}
      meta={(props.meta || []).concat([
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: props.title || defaultTitle,
        },
        {
          property: "og:description",
          content: description,
        },
        {
          property: "og:type",
          content: "website",
        },
        {
          name: "twitter:card",
          content: "summary",
        },
        {
          name: "twitter:creator",
          content: twitter,
        },
        {
          name: "twitter:title",
          content: props.title || defaultTitle,
        },
        {
          name: "twitter:description",
          content: description,
        },
      ])}
    />
  );
}
