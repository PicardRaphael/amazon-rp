import PrimaryLayout from '../components/layouts/primary/PrimaryLayout'
import { NextPageWithLayout } from './page.d'
import { getStaticPropsTranslations } from '../utils/i18n'
import { CheckCircleIcon } from '@heroicons/react/solid'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'

const Success: NextPageWithLayout = () => {
  const { t } = useTranslation('success')
  return (
    <div className="bg-gray-100 h-screen">
      <div className="flex flex-col p-10 bg-white">
        <div className="flex items-center space-x-2 mb-5">
          <CheckCircleIcon className="text-green-500 h-10" />
          <h1 className="text-3xl">{t('confirmed')}</h1>
        </div>
        <p>{t('text')}</p>
        <Link href="/orders">
          <a className="button mt-8 text-center">{t('goOrders')}</a>
        </Link>
      </div>
    </div>
  )
}

export default Success

Success.getLayout = (page) => <PrimaryLayout>{page}</PrimaryLayout>

export const getServerSideProps = async ({ locale }: { locale: string }) => {
  return {
    props: {
      ...(await getStaticPropsTranslations(locale)),
    },
  }
}
