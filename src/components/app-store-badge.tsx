import { Image, Link } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import FDroidBadgeIcon from "../assets/f-droid-badge.png";
import PlayStoreBadgeIcon from "../assets/play-store-badge.png";

enum UrlKey {
  PlayStore = "playstore_url",
  FDroid = "fdroid_url",
}

interface AppStoreBadgeProps {
  icon: string;
  urlKey: UrlKey;
  label: string;
}

function AppStoreBadge(props: AppStoreBadgeProps): ReactElement {
  const { site } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          playstore_url
          fdroid_url
        }
      }
    }
  `);

  return (
    <Link
      w={"full"}
      maxW={48}
      href={site.siteMetadata[props.urlKey]}
      aria-label={props.label}
    >
      <Image src={props.icon} alt={props.label} />
    </Link>
  );
}

export function PlayStoreBadge(): ReactElement {
  return (
    <AppStoreBadge
      icon={PlayStoreBadgeIcon}
      urlKey={UrlKey.PlayStore}
      label={"Get it on Play Store"}
    />
  );
}

export function FDroidBadge(): ReactElement {
  return (
    <AppStoreBadge
      icon={FDroidBadgeIcon}
      urlKey={UrlKey.FDroid}
      label={"Get it on F-Droid"}
    />
  );
}
