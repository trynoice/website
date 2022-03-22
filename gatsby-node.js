const { createFilePath } = require(`gatsby-source-filesystem`);
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

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === "MarkdownRemark") {
    createNodeField({
      node,
      name: "slug",
      value: createFilePath({
        node,
        getNode,
        trailingSlash: false,
      }),
    });
  }
};

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const result = await graphql(`
    {
      allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
        edges {
          node {
            id
            fields {
              slug
            }

            frontmatter {
              layout
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild("Error while running GraphQL query.");
    return;
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`src/layouts/${node.frontmatter.layout}.tsx`),
      context: {
        id: node.id,
      },
    });
  });
};
