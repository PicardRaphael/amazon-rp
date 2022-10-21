import Stripe from 'stripe'

export type Order = {
  id: string
  amount: number
  amountShipping: number
  images: Array<string>
  timestamp: number
  items: Stripe.LineItem[]
}
