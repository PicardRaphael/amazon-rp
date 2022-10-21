import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Flags = () => {
  const router = useRouter()
  const [display, setDisplay] = useState<boolean>(false)

  enum Flag {
    en = '/assets/images/usa.png',
    fr = '/assets/images/french.png',
  }

  const handleDisplay = () => setDisplay((prev) => !prev)
  const handleChangeLang = (lang: string) => {
    router.push(router.route, router.asPath, {
      locale: lang,
    })
    setDisplay(false)
  }
  return (
    <div className="relative">
      <button onClick={handleDisplay} className="hover:scale-125 mt-1 md:mt-0">
        <Image
          alt={router.locale}
          src={Flag[router.locale as string]}
          height={25}
          width={25}
          objectFit="contain"
        />
      </button>
      <ul className={`${display ? 'flex' : 'hidden'} absolute md:top-5 top-7 `}>
        {router.locales?.map(
          (local: string) =>
            router.locale !== local && (
              <li className="hover:scale-125" key={local}>
                <button onClick={() => handleChangeLang(local)}>
                  <Image
                    alt={local}
                    src={Flag[local as string]}
                    height={25}
                    width={25}
                    objectFit="contain"
                  />
                </button>
              </li>
            )
        )}
      </ul>
    </div>
  )
}

export default Flags
