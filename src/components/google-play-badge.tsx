import { Image, Link } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import PlayStoreBadgeIcon from "../assets/play-store-badge.png";

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
      aria-label={"Get it on Play Store"}
    >
      <Image src={PlayStoreBadgeIcon} alt={"Get it on Play Store"} />
    </Link>
  );
}
