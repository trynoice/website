const fetch = require("node-fetch");

/**
 * Queries the available subscription plans from the Noice API.
 *
 * @param {string} provider plan provider.
 * @param {string} currency ISO 4217 currency code for localised pricing.
 * @returns an array of `SubscriptionPlan` objects.
 */
async function listPlans(provider, currency = undefined) {
  let endpoint = `https://api.trynoice.com/v1/subscriptions/plans?provider=${provider}`;
  if (currency) {
    endpoint = `${endpoint}&currency=${currency}`;
  }

  const response = await fetch(endpoint);
  return await response.json();
}

module.exports = { listPlans };
