import 'react-i18next'
import type { Resources as MyResources } from './types'

declare module '@heroicons/*'

declare module 'react-i18next' {
  type Resources = MyResources
}
declare module 'next-auth/react' {
  interface Session {
    user: { email: string } // Or whatever shape you have
  }
}
