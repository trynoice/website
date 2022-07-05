declare module "*/api/subscriptions" {
  interface SubscriptionPlan {
    billingPeriodMonths: number;
    priceInIndianPaise: number;
    trialPeriodDays: number;
    priceInRequestedCurrency?: number;
    requestedCurrencyCode?: string;
  }

  export async function listPlans(
    provider: string,
    currency?: string
  ): Promise<SubscriptionPlan[]>;
}
