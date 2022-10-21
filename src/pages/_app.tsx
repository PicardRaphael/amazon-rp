import { AppProps } from 'next/app'
import { Provider } from 'react-redux'
import { persistor, store } from '../store/store'
import '../styles/globals.css'
import { NextPageWithLayout } from './page.d'
import { appWithTranslation } from 'next-i18next'
import { SessionProvider } from 'next-auth/react'
import { Session } from 'next-auth'
import { PersistGate } from 'redux-persist/integration/react'

interface AppPropsWithLayout
  extends AppProps<{
    session: Session
  }> {
  Component: NextPageWithLayout
}

const MyApp = ({
  Component,
  pageProps: { session, ...pageProps },
}: AppPropsWithLayout) => {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <SessionProvider session={session}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {getLayout(<Component {...pageProps} />)}
        </PersistGate>
      </Provider>
    </SessionProvider>
  )
}

export default appWithTranslation(MyApp as React.FC)
