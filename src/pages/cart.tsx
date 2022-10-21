import { useTranslation } from 'next-i18next'
import Image from 'next/image'
import CartProduct from '../components/CartProduct/CartProduct'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { getItemsCartState, getTotalCart } from '../store/slices/cartSlice'
import { useSelector } from '../store/store'
import { getStaticPropsTranslations } from '../utils/i18n'
import { NextPageWithLayout } from './page'
import Currency from 'react-currency-formatter'
import { signIn, useSession } from 'next-auth/react'
import { loadStripe } from '@stripe/stripe-js'
import axios, { AxiosResponse } from 'axios'

const stripePromise = loadStripe(process.env.stripe_public_key as string)

const Checkout: NextPageWithLayout = () => {
  const { t } = useTranslation('checkout')
  const items = useSelector(getItemsCartState)
  const total = useSelector(getTotalCart)
  const { data: session } = useSession()

  const handleToCheckout = () => {
    !session ? signIn() : createCheckoutSession()
  }

  const createCheckoutSession = async () => {
    const stripe = await stripePromise
    const email = session?.user?.email

    const checkoutSession: AxiosResponse<{ id: string }> = await axios.post(
      '/api/create-checkout-session',
      {
        items: items,
        email: email,
      }
    )

    const result = await stripe?.redirectToCheckout({
      sessionId: checkoutSession.data.id,
    })

    if (result?.error) alert(result?.error.message)
  }

  return (
    <div className="bg-gray-100 flex">
      {/* Left */}
      <div className="flex-grow m-5 shadow-sm">
        <Image
          alt=""
          src="/assets/images/good_day.png"
          width={1020}
          height={250}
          objectFit="contain"
        />

        <div className="flex flex-col p-5 space-y-10 bg-white">
          <h1 className="text-3xl border-b pb-4">
            {items.length !== 0 ? t('shoppingCart') : t('shoppingCartEmpty')}
          </h1>

          {items.map((item) => (
            <CartProduct key={item.id} {...item} />
          ))}
        </div>
      </div>

      <div className="flex flex-col bg-white p-10 shadow-md">
        {items.length > 0 && (
          <>
            <h2 className="whitespace-nowrap">
              {`${t('total')} (${items.length} ${t('item')}${
                items.length > 1 ? 's' : ''
              }) : `}
              <span className="font-bold">
                <Currency quantity={total} currency="EUR" />
              </span>
            </h2>
            <button
              role="link"
              className="button mt-2"
              onClick={handleToCheckout}
            >
              {t('checkout')}
            </button>
          </>
        )}
      </div>
    </div>
  )
}

Checkout.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>
export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
    },
  }
}
export default Checkout
