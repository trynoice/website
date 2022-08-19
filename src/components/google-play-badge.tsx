import { Image, Link } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import GooglePlayBadgeIcon from "../assets/google-play-badge.png";

export default function GooglePlayBadge(): ReactElement {
  const {
    site: {
      siteMetadata: { googlePlayUrl },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          googlePlayUrl
        }
      }
    }
  `);

  return (
    <Link
      w={"full"}
      maxW={48}
      href={googlePlayUrl}
      aria-label={"Get it on Google Play"}
    >
      <Image src={GooglePlayBadgeIcon} alt={"Get it on Google Play"} />
    </Link>
  );
}
