import { graphql, useStaticQuery } from "gatsby";
import { Fragment, ReactElement, ReactNode } from "react";
import DefaultSocialCardImage from "../assets/social-card-image.png";

interface BasicPageHeadProps {
  title?: string;
  description?: string;
  image?: any;
  children?: ReactNode;
}

export default function BasicPageHead(props: BasicPageHeadProps): ReactElement {
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
  const title = props.title ? `${props.title} • ${name}` : longName;

  return (
    <Fragment>
      <html lang="en" />
      <title>{title}</title>
      <meta name={"description"} content={props.description || description} />

      <meta property={"og:site_name"} content={longName} />
      <meta property={"og:type"} content={"website"} />
      <meta property={"og:image"} content={image} />
      <meta property={"og:title"} content={title} />
      <meta
        property={"og:description"}
        content={props.description || description}
      />

      <meta name={"twitter:card"} content={"summary_large_image"} />
      <meta name={"twitter:creator"} content={twitter} />
      <meta name={"twitter:site"} content={twitter} />
      <meta name={"twitter:image"} content={image} />
      <meta name={"twitter:title"} content={title} />
      <meta
        name={"twitter:description"}
        content={props.description || description}
      />

      {props.children}
    </Fragment>
  );
}
