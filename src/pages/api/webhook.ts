/* eslint-disable @typescript-eslint/no-var-requires */
/// <reference types="stripe-event-types" />

import { buffer } from 'micro'
import * as admin from 'firebase-admin'
import type { NextApiRequest, NextApiResponse } from 'next'
import Stripe from 'stripe'
// Secure a connection du FIREBASE from to backend
const serviceAccount = JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
)
const app = !admin.apps.length
  ? admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
    })
  : admin.app()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2022-08-01',
})

const endpointSecret = process.env.STRIPE_SIGNING_SECRET as string

const fulfillOrder = async (session: Stripe.Checkout.Session) => {
  return app
    .firestore()
    .collection('users')
    .doc(session.metadata?.email as string)
    .collection('orders')
    .doc(session.id)
    .set({
      amount: (session.amount_total as number) / 100,
      amount_shipping: ((session.total_details?.amount_shipping as number) /
        100) as number,
      images: JSON.parse(session.metadata?.images as string),
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    })
    .then(() => {
      console.log(`SUCCESS: Order ${session.id} has been added to the DB`)
    })
    .catch((err) => {
      console.log(err)
    })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const requestBuffer = await buffer(req)
    const payload = requestBuffer.toString()

    const sig = req.headers['stripe-signature'] as Array<string>

    let event: Stripe.Event

    // Verify that the EVENT posted came from stripe
    try {
      event = stripe.webhooks.constructEvent(
        payload,
        sig,
        endpointSecret
      ) as Stripe.DiscriminatedEvent
    } catch (err) {
      return res.status(400).send(`Webhook error: ${err.message}`)
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object
      return fulfillOrder(session as Stripe.Checkout.Session)
        .then(() => {
          res.status(200)
        })
        .catch((err) => {
          res.status(400).send(`Webhook Error : ${err.message}`)
        })
    }
  }
}

export const config = {
  api: {
    bodyParser: false,
    externalResolver: true,
  },
}
