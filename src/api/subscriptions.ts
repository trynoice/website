export interface SubscriptionPlan {
  id: number;
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
  let endpoint = `https://api.trynoice.com/v1/subscriptions/plans?provider=${provider}`;
  if (currency) {
    endpoint = `${endpoint}&currency=${currency}`;
  }

  const response = await fetch(endpoint);
  return await response.json();
}
