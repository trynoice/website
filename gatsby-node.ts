import type { GatsbyNode } from "gatsby";
import { createFilePath } from "gatsby-source-filesystem";
import path from "path";
import { getLibraryManifest } from "./src/api/cdn";
import { listPlans } from "./src/api/subscriptions";
import { BlogListLayoutPageContext } from "./src/layouts/blog-list";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] =
  ({ actions: { createTypes } }) =>
    createTypes(`
      type Site {
        siteMetadata: SiteMetadata!
      }

      type SiteMetadata {
        name: String!
        tagline: String!
        description: String!
        twitter: String!
        siteUrl: String!
        googlePlayUrl: String!
      }

      type Mdx implements Node {
        frontmatter: Frontmatter
        fields: Fields!
      }

      type Frontmatter {
        redirect: Redirect
        publishedAt: Date @dateformat
        updatedAt: Date @dateformat
        permalink: String
      }

      type Redirect {
        url: String!
        permanent: Boolean
      }

      type Fields {
        slug: String!
      }

      type SoundLibraryInfo implements Node {
        totalSoundCount: Int!
        premiumSoundCount: Int!
        freeSoundCount: Int!
        freeSoundWithPremiumSegmentsCount: Int!
      }

      type PremiumPlan implements Node {
        billingPeriodMonths: Int!
        priceInIndianPaise: Int!
        trialPeriodDays: Int!
      }
  `);

export const sourceNodes: GatsbyNode["sourceNodes"] = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // Both Stripe and Google Play plans should be identical.
  (await listPlans("stripe")).forEach((plan) => {
    createNode({
      ...plan,
      internal: {
        type: "PremiumPlan",
        contentDigest: createContentDigest(plan),
      },
    });
  });

  const sounds = (await getLibraryManifest()).sounds;
  const premiumSoundCount = sounds.filter((sound) =>
    sound.segments.every((segment) => !segment.isFree)
  ).length;

  const freeSoundWithPremiumSegmentsCount = sounds.filter(
    (sound) =>
      sound.segments.some((segment) => segment.isFree) &&
      sound.segments.some((segment) => !segment.isFree)
  ).length;

  const libraryInfo = {
    totalSoundCount: sounds.length,
    premiumSoundCount: premiumSoundCount,
    freeSoundCount: sounds.length - premiumSoundCount,
    freeSoundWithPremiumSegmentsCount: freeSoundWithPremiumSegmentsCount,
  };

  createNode({
    id: createContentDigest(libraryInfo),
    ...libraryInfo,
    internal: {
      type: "SoundLibraryInfo",
      contentDigest: createContentDigest(libraryInfo),
    },
  });
};

export const onCreateNode: GatsbyNode["onCreateNode"] = ({
  node,
  actions: { createNodeField },
  getNode,
}) => {
  if (node.internal.type === `Mdx`) {
    const { permalink } = node.frontmatter as Queries.Frontmatter;
    const slug = (permalink || createFilePath({ node, getNode }))
      .replace(/\/$/, "") // remove trailing slash
      .replace(/^\//, ""); // remove leading slash

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

export const createPages: GatsbyNode["createPages"] = async ({
  actions: { createPage, createRedirect },
  graphql,
  reporter,
}) => {
  const result: { data?: Queries.AllMdxQuery; errors?: unknown } =
    await graphql(`
      query AllMdx {
        allMdx {
          nodes {
            id

            frontmatter {
              layout
              redirect {
                url
                permanent
              }
            }

            fields {
              slug
            }

            internal {
              contentFilePath
            }
          }
        }
      }
    `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  const { allMdx: { nodes } = { nodes: [] } } = result.data || {};
  nodes.forEach((node) => {
    // only render markdown pages that specify a layout.
    if (node.frontmatter?.layout == null) {
      return;
    }

    const layout = path.resolve(`src/layouts/${node.frontmatter.layout}.tsx`);
    createPage({
      path: node.fields.slug,
      component: `${layout}?__contentFilePath=${node.internal.contentFilePath}`,
      context: {
        id: node.id,
      },
    });
  });

  // render blog list
  const blogPostCount = nodes.filter((node) =>
    node.fields.slug.startsWith("blog/")
  ).length;

  const blogPostsPerPage = 6;
  const blogListPageCount = Math.ceil(blogPostCount / blogPostsPerPage);

  for (let i = 0; i < blogListPageCount; i += 1) {
    const pageContext: BlogListLayoutPageContext = {
      limit: blogPostsPerPage,
      skip: i * blogPostsPerPage,
      currentPage: i + 1,
      totalPageCount: blogListPageCount,
      prevPageHref: i === 0 ? null : i > 1 ? `/blog/page/${i}` : "/blog",
      nextPageHref: i + 2 > blogListPageCount ? null : `/blog/page/${i + 2}`,
    };

    createPage({
      path: i === 0 ? "/blog" : `/blog/page/${i + 1}`,
      component: path.resolve("src/layouts/blog-list.tsx"),
      context: pageContext,
    });
  }

  nodes.forEach((node) => {
    if (node.frontmatter?.redirect == null) {
      return;
    }

    createRedirect({
      fromPath: node.fields.slug,
      toPath: node.frontmatter.redirect.url,
      isPermanent: node.frontmatter.redirect.permanent ?? undefined,
    });
  });
};
