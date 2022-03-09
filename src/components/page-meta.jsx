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

export default function PageMeta({ description, meta, title }) {
  const { site } = useStaticQuery(query);
  const { defaultTitle, defaultDescription, twitter } = site.siteMetadata;
  description = description || defaultDescription;

  return (
    <Helmet
      htmlAttributes={{ lang: "en" }}
      title={title}
      titleTemplate={`%s &ndash; ${defaultTitle}`}
      defaultTitle={defaultTitle}
      meta={[
        {
          name: "description",
          content: description,
        },
        {
          property: "og:title",
          content: title,
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
          content: title,
        },
        {
          name: "twitter:description",
          content: description,
        },
      ].concat(meta || [])}
    />
  );
}
