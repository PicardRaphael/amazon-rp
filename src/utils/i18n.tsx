import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getStaticPropsTranslations = async (locale: string) => {
  return {
    ...(await serverSideTranslations(locale, [
      'header',
      'product',
      'checkout',
      'success',
      'orders',
    ])),
  }
}
