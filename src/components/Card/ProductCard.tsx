import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import type { Product as ProductType } from '../../types/product.type'
import Currency from 'react-currency-formatter'
import { useTranslation } from 'next-i18next'
import { useDispatch } from '../../store/store'
import { addToCart } from '../../store/slices/cartSlice'

type PorductCardProps = ProductType
const ProductCard = ({
  id,
  title,
  category,
  description,
  image,
  rating,
  price,
}: PorductCardProps) => {
  const { t } = useTranslation('product')
  const [hasPrime, setHasPrime] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    setHasPrime(Math.random() < 0.5)
  }, [])

  const handleAddProductToCart = () => {
    const product = {
      id,
      title,
      category,
      description,
      image,
      rating,
      price,
      hasPrime,
    }

    dispatch(addToCart(product))
  }

  return (
    <div className="relative flex flex-col m-5 bg-white z-30 p-10">
      <p className="absolute top-2 right-2 text-xs italic text-gray-400">
        {category}
      </p>
      <Image
        alt={title}
        src={image}
        width={200}
        height={200}
        objectFit="contain"
      />

      <h4 className="my-3">{title}</h4>

      <div className="flex">
        {Array(Math.floor(rating.rate))
          .fill(0)
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500" />
          ))}
      </div>

      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price} currency="EUR" />
      </div>

      {hasPrime && (
        <div className="flex items-center space-x-2 -mt-5">
          <Image
            width={48}
            height={48}
            src="/assets/images/prime.png"
            alt="prime"
          />
          <p className="text-xs text-gray-500">{t('delivery')}</p>
        </div>
      )}

      <button onClick={handleAddProductToCart} className="mt-auto button">
        {t('addBasket')}
      </button>
    </div>
  )
}

export default ProductCard
