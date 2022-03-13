const fetch = require("node-fetch");

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
      id: item.id + "", // gatsby requires a string
      internal: {
        type: "Plans",
        contentDigest: createContentDigest(item),
      },
    });
  });
};
