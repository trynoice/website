import { ChevronRightIcon } from "@chakra-ui/icons";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from "@chakra-ui/react";
import { Location } from "@reach/router";
import { ReactElement } from "react";

export default function Breadcrumbs(): ReactElement {
  return (
    <Location>
      {(ctx) => <BreadcrumbsInternal path={ctx.location.pathname} />}
    </Location>
  );
}

interface BreadcrumbsInternalProps {
  path: string;
}

interface BreadcrumbItemData {
  label: string;
  path: string;
}

const breadcrumbLabels = new Map<string, string>([["faqs", "FAQs"]]);

function BreadcrumbsInternal(props: BreadcrumbsInternalProps): ReactElement {
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
  return (
    <Breadcrumb separator={<ChevronRightIcon color="gray.500" />}>
      {crumbs.map((crumb) => (
        <BreadcrumbItem>
          <BreadcrumbLink href={crumb.path}>{crumb.label}</BreadcrumbLink>
        </BreadcrumbItem>
      ))}
      <BreadcrumbItem />
    </Breadcrumb>
  );
}
