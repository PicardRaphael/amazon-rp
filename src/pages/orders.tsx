import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from './page.d'
import { getStaticPropsTranslations } from '../utils/i18n'
import { useTranslation } from 'next-i18next'
import { getSession, useSession } from 'next-auth/react'
import Stripe from 'stripe'

import { db } from '../../firebase'
import moment from 'moment'
import { Order as OrderType } from '../types/order.type'
import { collection, getDocs } from 'firebase/firestore'
import Order from '../components/Order/Order'
import { GetServerSideProps } from 'next'

type OrdersProps = {
  orders: OrderType[]
}
const Orders: NextPageWithLayout<OrdersProps> = ({ orders }) => {
  const { t } = useTranslation('orders')
  const { data: session } = useSession()

  return (
    <div className="mx-5 md:mx-0">
      <h1 className="text-3xl border-b mb-2 pb-1 border-yellow-400">
        {t('yourOrders')}
      </h1>
      {session ? (
        <h2>
          {orders.length} {t('orders')} {orders.length > 1 && 's'}
        </h2>
      ) : (
        <h2>{t('signInOrders')}</h2>
      )}

      <div className="mt-5 space-y-4">
        {orders?.map((order) => (
          <Order key={order.id} {...order} />
        ))}
      </div>
    </div>
  )
}

export default Orders

Orders.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2022-08-01',
  })

  const session = await getSession(ctx)
  if (!session) {
    return {
      props: {
        ...(await getStaticPropsTranslations(ctx.locale || '')),
      },
    }
  }

  const collectionRef = collection(
    db,
    'users',
    `${session.user?.email}`,
    'orders'
  )
  const collectioSnap = await getDocs(collectionRef)
  const orders = await Promise.all(
    collectioSnap.docs.map(async (order) => ({
      id: order.id,
      amount: order.data().amount,
      amountShipping: order.data().amount_shipping,
      images: order.data().images,
      timestamp: moment(order.data().timestamp.toDate()).format('DD MMM YYYY'),
      items: await (
        await stripe.checkout.sessions.listLineItems(order.id)
      ).data,
    }))
  )
  return {
    props: {
      orders,
      ...(await getStaticPropsTranslations(ctx.locale as string)),
    },
  }
}
