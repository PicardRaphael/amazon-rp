import Image from 'next/image'
import { MenuIcon, SearchIcon } from '@heroicons/react/outline'
import { useTranslation } from 'next-i18next'
import { signIn, signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { getItemsCartState } from '../../../store/slices/cartSlice'
import { useSelector } from '../../../store/store'

const Header = () => {
  const { t } = useTranslation('header')
  const { data: session } = useSession()
  const items = useSelector(getItemsCartState)

  const handleAuth = () => {
    !session ? signIn() : signOut()
  }

  return (
    <header>
      <div className="max-h-[60px] flex items-center bg-amazon_blue flex-grow">
        {/* Logo */}
        <div className="md:ml-[15px] flex items-center flex-grow-0 h-auto">
          <Link href="/">
            <a className="link pb-0 pt-px pr-1.5 md:pr-2 pl-[6px] flex items-center md:mr-1.5 h-[50px]">
              <div className="relative w-[97px] h-[30px]">
                <Image
                  alt="Logo Amazon"
                  src="/assets/images/logo_amazon.png"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <span className="text-white text-xs md:text-sm -mt-3 md:-ml-[7px] -ml-1">
                .fr
              </span>
            </a>
          </Link>
        </div>
        {/* Search */}
        <div className="hidden md:flex items-center h-10 rounded-md flex-grow cursor-pointer bg-yellow-400 hover:bg-yellow-500">
          <input
            className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none"
            type="text"
          />
          <SearchIcon className="h-12 p-4" />
        </div>
        {/* Right */}
        <div className="text-white flex items-center text-xs space-x-1 md:space-x-6 md:mx-6 whitespace-nowrap">
          <div onClick={handleAuth} className="link">
            <p className="leading-[15px]">
              {session?.user
                ? `${t('hello')} ${session.user.name}`
                : `${t('hello')}, ${t('signIn')}`}
            </p>
            <p className="leading-[15px] font-extrabold md:text-sm">
              {t('account')}
            </p>
          </div>

          <Link href={session ? '/orders' : '/'}>
            <a className="link">
              <p className="leading-[15px]">{t('return')}</p>
              <p className="leading-[15px] font-extrabold md:text-sm">
                {t('orders')}
              </p>
            </a>
          </Link>

          <Link href="/cart">
            <a className="link pb-0 pt-px md:pr-1.5 md:pl-[6px] flex items-center md:mr-1.5 h-[50px]">
              <div className="relative flex items-center">
                <span className="absolute top-0 left-[15px] h-5 w-4 text-yellow-500 text-center font-bold text-base">
                  {items.length}
                </span>
                <div className="relative h-10 w-10">
                  <Image
                    src="/assets/images/cart.png"
                    layout="fill"
                    objectFit="contain"
                    alt=""
                  />
                </div>
                <p className="hidden md:inline font-extrabold md:text-sm mt-2">
                  {t('cart')}
                </p>
              </div>
            </a>
          </Link>
        </div>
      </div>

      <div className="flex items-center bg-amazon_blue-light text-white text-sm pl-3">
        <p className="link p-1 flex items-center">
          <MenuIcon className="h-3.5 md:h-6 mr-1" />
          All
        </p>
        <p className="link p-1 my-1">Prime Video</p>
        <p className="link p-1 my-1">{t('amazonBusines')}</p>
        <p className="link p-1 my-1">{t('todayDeals')}</p>
        <p className="link p-1 my-1 hidden lg:inline-flex">{t('buyAgain')}</p>
        <p className="link p-1 my-1 hidden lg:inline-flex">{t('videoGames')}</p>
        <p className="link p-1 my-1 hidden lg:inline-flex">{t('software')}</p>
        <p className="link p-1 my-1 hidden lg:inline-flex">{t('prime')}</p>
        <p className="link p-1 my-1 hidden lg:inline-flex">
          {t('healthHousehold')}
        </p>
      </div>
    </header>
  )
}

export default Header
