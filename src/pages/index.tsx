import Head from 'next/head'
import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from './page.d'
import { getStaticPropsTranslations } from '../utils/i18n'
import Banner from '../components/banner/Banner'
import ProductFeed from '../components/productFeed/ProductFeed'
import type { Product } from '../types/product.type'
import { GetServerSideProps } from 'next'

type HomeProps = {
  products: Product[]
}

const Home: NextPageWithLayout<HomeProps> = ({ products }) => {
  return (
    <div className="bg-gray-100">
      <Head>
        <title>Amazon 2.0</title>
      </Head>

      <Banner />

      <ProductFeed products={products} />
    </div>
  )
}

export default Home

Home.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const products: Product[] = await fetch(
    'https://fakestoreapi.com/products'
  ).then((res) => res.json())
  return {
    props: {
      products,
      ...(await getStaticPropsTranslations(ctx.locale as string)),
    },
  }
}
