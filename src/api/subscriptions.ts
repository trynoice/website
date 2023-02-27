import { API_ENDPOINT } from "./constants";

export interface SubscriptionPlan {
  id: string;
  billingPeriodMonths: number;
  priceInIndianPaise: number;
  trialPeriodDays: number;
  priceInRequestedCurrency?: number;
  requestedCurrencyCode?: string;
}

/**
 * Queries the available subscription plans from the Noice API.
 *
 * @param {string} provider plan provider.
 * @param {string} currency ISO 4217 currency code for localised pricing.
 * @returns an array of `SubscriptionPlan` objects.
 */
export async function listPlans(
  provider: "stripe" | "google_play",
  currency?: string
): Promise<SubscriptionPlan[]> {
  let endpoint = `${API_ENDPOINT}/v1/subscriptions/plans?provider=${provider}`;
  if (currency) {
    endpoint = `${endpoint}&currency=${currency}`;
  }

  const response = await fetch(endpoint);

  // convert plan id from a number to a string because we use this API call to
  // source GraphQL nodes for Gatsby and they only accept string ids.
  return (await response.json()).map(
    (plan: any): SubscriptionPlan => ({
      ...plan,
      id: plan.id.toString(),
    })
  );
}
