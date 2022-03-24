const fetch = require("node-fetch");
const path = require("path");

exports.sourceNodes = async ({
  actions: { createNode },
  createContentDigest,
}) => {
  const response = await fetch(
    // Both Stripe and Google Play plans should be identical.
    "https://api.trynoice.com/v1/subscriptions/plans?provider=stripe"
  );

  const data = await response.json();
  data.forEach((item) => {
    createNode({
      ...item,
      id: `${item.id}`,
      internal: {
        type: "Plans",
        contentDigest: createContentDigest(item),
      },
    });
  });
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMdx {
        nodes {
          id
          slug

          frontmatter {
            layout
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: node.slug,
      component: path.resolve(
        `src/layouts/${node.frontmatter.layout || "default"}.tsx`
      ),
      context: {
        id: node.id,
      },
    });
  });
};
