import { StarIcon } from '@heroicons/react/solid'
import Image from 'next/image'
import { ProductCart } from '../../types/product.type'
import Currency from 'react-currency-formatter'
import { useTranslation } from 'next-i18next'
import { useDispatch } from '../../store/store'
import { addToCart, removeFromCart } from '../../store/slices/cartSlice'

type CartProductProps = ProductCart

const CartProduct = ({
  id,
  title,
  category,
  description,
  image,
  rating,
  price,
  hasPrime,
}: CartProductProps) => {
  const { t } = useTranslation('product')
  const dispatch = useDispatch()
  const handleAddItemToCart = () => {
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

  const removeItemToCart = () => {
    dispatch(removeFromCart({ id }))
  }
  return (
    <div className="grid grid-cols-5">
      <Image
        src={image}
        width={200}
        height={200}
        alt={title}
        objectFit="contain"
      />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(Math.floor(rating.rate))
            .fill(0)
            .map((_, i) => (
              <StarIcon key={i} className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3">{description}</p>

        <Currency quantity={price} currency="EUR" />

        {hasPrime && (
          <div className="flex items-center space-x-2">
            <Image
              width={48}
              height={48}
              src="/assets/images/prime.png"
              alt="prime"
            />
            <p className="text-xs text-gray-500">{t('delivery')}</p>
          </div>
        )}
      </div>

      <div className="flex flex-col space-y-2 mx-auto justify-end">
        <button onClick={handleAddItemToCart} className="button">
          {t('addBasket')}
        </button>
        <button onClick={removeItemToCart} className="button">
          {t('removeBask')}
        </button>
      </div>
    </div>
  )
}

export default CartProduct
