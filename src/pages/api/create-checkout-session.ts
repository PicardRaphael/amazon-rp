import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
import { CURRENCY } from '../../config'
import { ProductCart } from '../../types/product.type'
import { formatAmountForStripe } from '../../utils/stripe-helpers'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-08-01',
})

interface ExtendedNextApiRequest extends NextApiRequest {
  body: {
    items: ProductCart[]
    email: string
  }
}

export default async function handler(
  req: ExtendedNextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { items, email } = req.body

      const transformedItems = items.map((item: ProductCart) => ({
        quantity: 1,
        price_data: {
          unit_amount: formatAmountForStripe(item.price, CURRENCY),
          currency: CURRENCY,
          product_data: {
            name: item.title,
            images: [item.image],
            description: item.description,
          },
        },
      }))

      const paramsCheckoutSessions: Stripe.Checkout.SessionCreateParams = {
        payment_method_types: ['card'],
        line_items: transformedItems,
        shipping_options: [
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 6,
                currency: CURRENCY,
              },
              display_name: 'Next-Day Shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 3,
                },
              },
            },
          },
        ],
        shipping_address_collection: {
          allowed_countries: ['FR', 'US', 'GB'],
        },
        mode: 'payment',
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/cart`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      }

      const checkoutSession: Stripe.Checkout.Session =
        await stripe.checkout.sessions.create(paramsCheckoutSessions)

      res.status(200).json({ id: checkoutSession.id })
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}
