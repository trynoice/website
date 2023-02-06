const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { listPlans } = require("./src/api/subscriptions");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  // Both Stripe and Google Play plans should be identical.
  (await listPlans("stripe")).forEach((plan) => {
    createNode({
      ...plan,
      id: `${plan.id}`,
      internal: {
        type: "PremiumPlan",
        contentDigest: createContentDigest(plan),
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const { permalink } = node.frontmatter;
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

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  createTypes(`
    type Mdx implements Node {
      frontmatter: Frontmatter
    }

    type Frontmatter {
      redirect: Redirect
      publishedAt: Date @dateformat
      updatedAt: Date @dateformat
    }

    type Redirect {
      url: String!
      permanent: Boolean
    }
  `);
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;
  const result = await graphql(`
    {
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

  result.data.allMdx.nodes
    // only render markdown pages that specify a layout.
    .filter((node) => node.frontmatter?.layout)
    .forEach((node) => {
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
  const blogPostCount = result.data.allMdx.nodes.filter((node) =>
    node.fields?.slug?.startsWith("blog/")
  ).length;

  const blogPostsPerPage = 6;
  const blogListPageCount = Math.ceil(blogPostCount / blogPostsPerPage);

  for (let i = 0; i < blogListPageCount; i += 1) {
    createPage({
      path: i === 0 ? "/blog" : `/blog/page/${i + 1}`,
      component: path.resolve("src/layouts/blog-list.tsx"),
      context: {
        limit: blogPostsPerPage,
        skip: i * blogPostsPerPage,
        currentPage: i + 1,
        totalPageCount: blogListPageCount,
        prevPageHref: i === 0 ? null : i > 1 ? `/blog/page/${i}` : "/blog",
        nextPageHref: i + 2 > blogListPageCount ? null : `/blog/page/${i + 2}`,
      },
    });
  }

  result.data.allMdx.nodes
    .filter((node) => node.frontmatter && node.frontmatter.redirect)
    .forEach((node) => {
      createRedirect({
        fromPath: node.fields.slug,
        toPath: node.frontmatter.redirect.url,
        isPermanent: node.frontmatter.redirect.permanent,
      });
    });
};
