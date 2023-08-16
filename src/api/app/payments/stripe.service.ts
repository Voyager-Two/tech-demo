import { Injectable } from '@nestjs/common';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import CancelSubscriptionDto from '@app/payments/dto/cancel-subscription.dto';
import CreateSubscriptionDto from '@app/payments/dto/create-subscription.dto';

// Hard-coded to make things simple
const customerId = 'cus_LNf3c2Z5iH782C';

// Ideally we would fetch these from Stripe's API and map it that way
const planMap: any = {
  A: {
    // monthly recurring
    price: 'price_1KiPhuJWgbT8maYiqFg0iH7n',
  },
  B: {
    // annual recurring
    price: 'price_1KiPjnJWgbT8maYiobbUHTi3',
  },
};

@Injectable()
export default class StripeService {
  constructor(@InjectStripeClient() private stripeClient: Stripe) {}

  async createSubscription(paymentInfo: CreateSubscriptionDto): Promise<object> {
    const planId = paymentInfo.plan;
    const planInfo = planMap[<string>planId];
    const taxRates = ['txr_1KiPsiJWgbT8maYiNuZP2yLz'];

    // Create payment intent, then we can use the token to accept payment in the frontend
    const subscription = await this.stripeClient.subscriptions.create({
      customer: customerId,
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
      // TODO: verify discountCode via mapped array
      coupon: <string>paymentInfo?.discountCode || '',
      items: [
        {
          price: planInfo.price,
          tax_rates: taxRates,
        },
      ],
    });

    // TODO: add logger
    // console.log(subscription);

    const paymentIntent = (<Stripe.Invoice>subscription.latest_invoice)
      .payment_intent as Stripe.PaymentIntent;

    return {
      subscriptionId: subscription.id,
      clientSecret: paymentIntent.client_secret,
      rawResponse: subscription,
    };
  }

  async cancelSubscription(refundInfo: CancelSubscriptionDto): Promise<object> {
    const subscription: Stripe.Subscription = await this.stripeClient.subscriptions.retrieve(
      <string>refundInfo.subscriptionId,
      {
        expand: ['latest_invoice'],
      }
    );
    let cancel = null;
    // Only cancel if it's not already cancelled (which is done automatically above for nonrecurring)
    if (subscription.status !== 'canceled') {
      cancel = await this.stripeClient.subscriptions.del(<string>refundInfo.subscriptionId);
    }
    const refund = await this.stripeClient.refunds.create({
      charge: (<Stripe.Invoice>subscription.latest_invoice).charge as string,
    });
    return { cancel, refund };
  }
}
