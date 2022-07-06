const path = require("path");
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

  result.data.allMdx.nodes
    // only render markdown pages that specify a layout.
    .filter((node) => node.frontmatter && node.frontmatter.layout)
    .forEach((node) => {
      createPage({
        path: node.slug,
        component: path.resolve(`src/layouts/${node.frontmatter.layout}.tsx`),
        context: {
          id: node.id,
        },
      });
    });
};
