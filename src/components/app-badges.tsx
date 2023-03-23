import { Link, Image } from "@chakra-ui/react";
import { useStaticQuery, graphql } from "gatsby";
import { ReactElement } from "react";
import GooglePlayBadgeIcon from "../assets/google-play-badge.png";
import FDroidBadgeIcon from "../assets/f-droid-badge.png";
import WebBrowserBadgeIcon from "../assets/web-browser-badge.png";

const maxBadgeW = "204px";
const maxBadgeH = "60px";

export function GooglePlayBadge(): ReactElement {
  const { site }: Queries.GooglePlayBadgeQuery = useStaticQuery(graphql`
    query GooglePlayBadge {
      site {
        siteMetadata {
          googlePlayUrl
        }
      }
    }
  `);

  return (
    <Link
      href={site!.siteMetadata.googlePlayUrl}
      aria-label={"Get it on Google Play"}
    >
      <Image
        w={"full"}
        maxW={maxBadgeW}
        maxH={maxBadgeH}
        src={GooglePlayBadgeIcon}
        alt={"Get it on Google Play"}
      />
    </Link>
  );
}

export function FDroidBadge(): ReactElement {
  return (
    <Link
      href={"https://f-droid.org/en/packages/com.github.ashutoshgngwr.noice/"}
      aria-label={"Get it on F-Droid"}
    >
      <Image
        w={"full"}
        maxW={maxBadgeW}
        maxH={maxBadgeH}
        src={FDroidBadgeIcon}
        alt={"Get it on F-Droid"}
      />
    </Link>
  );
}

export function WebBrowserBadge(): ReactElement {
  return (
    <Link
      href={"https://app.trynoice.com"}
      aria-label={"Use it in your Web Browser"}
    >
      <Image
        w={"full"}
        maxW={maxBadgeW}
        maxH={maxBadgeH}
        src={WebBrowserBadgeIcon}
        alt={"Use it in your Web Browser"}
      />
    </Link>
  );
}
