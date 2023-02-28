import { Image, Link } from "@chakra-ui/react";
import { graphql, useStaticQuery } from "gatsby";
import { ReactElement } from "react";
import FDroidBadgeIcon from "../assets/f-droid-badge.png";

export default function FDroidBadge(): ReactElement {
  const { site }: Queries.FDroidBadgeQuery = useStaticQuery(graphql`
    query FDroidBadge {
      site {
        siteMetadata {
          fDroidUrl
        }
      }
    }
  `);

  return (
    <Link
      w={"full"}
      maxW={48}
      href={site!.siteMetadata.fDroidUrl}
      aria-label={"Get it on F-Droid"}
    >
      <Image src={FDroidBadgeIcon} alt={"Get it on F-Droid"} />
    </Link>
  );
}
