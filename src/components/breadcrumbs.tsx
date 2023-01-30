import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Location } from "@reach/router";
import { Link as GatsbyLink } from "gatsby";
import { ReactElement } from "react";

interface BreadcrumbsProps {
  showIfAtLeast: number;
}

export default function Breadcrumbs(props: BreadcrumbsProps): ReactElement {
  return (
    <Location>
      {(ctx) => (
        <BreadcrumbsInternal
          path={ctx.location.pathname}
          showIfAtLeast={props.showIfAtLeast}
        />
      )}
    </Location>
  );
}

interface BreadcrumbsInternalProps {
  path: string;
  showIfAtLeast: number;
}

interface BreadcrumbItemData {
  label: string;
  path: string;
}

const breadcrumbLabels = new Map<string, string>([["faqs", "FAQs"]]);

function BreadcrumbsInternal(
  props: BreadcrumbsInternalProps
): ReactElement | null {
  const rootPath = `${__PATH_PREFIX__}/`;
  const crumbPath = props.path.startsWith(rootPath)
    ? props.path.slice(rootPath.length)
    : props.path;

  let currentPath = "";
  const crumbs: BreadcrumbItemData[] = crumbPath
    .split("/")
    .filter((fragment) => fragment) // filter empty fragments
    .slice(0, -1)
    .map((fragment) => {
      currentPath = `${currentPath}/${fragment}`;
      return {
        label: breadcrumbLabels.get(fragment) || "",
        path: currentPath,
      };
    })
    .filter((fragment) => fragment.label); // filter unrecognised crumbs

  crumbs.unshift({ label: "Home", path: "/" });
  if (crumbs.length < props.showIfAtLeast) {
    return null;
  }

  return (
    <Breadcrumb
      separator={<ChevronRightIcon color="gray.500" />}
      fontSize={"sm"}
    >
      {crumbs.map((crumb) => (
        <BreadcrumbItem>
          <BreadcrumbLink as={GatsbyLink} to={crumb.path} color={"gray.500"}>
            {crumb.label}
          </BreadcrumbLink>
        </BreadcrumbItem>
      ))}
      <BreadcrumbItem />
    </Breadcrumb>
  );
}
