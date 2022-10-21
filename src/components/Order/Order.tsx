import { Order as OrderType } from '../../types/order.type'
import Currency from 'react-currency-formatter'
import { CURRENCY } from '../../config'
import { useTranslation } from 'next-i18next'

type OrderProps = OrderType
const Order = ({ id, amount, images, timestamp, items }: OrderProps) => {
  const { t } = useTranslation('orders')
  return (
    <div className="relative border rounded-md">
      <div className="flex items-center space-x-10 p-5 bg-gray-200 text-sm text-gray-600">
        <div>
          <p className="font-bold text-xs uppercase">{t('orderPlace')}</p>
          <p>{timestamp}</p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase">{t('total')}</p>
          <p>
            <Currency quantity={amount} currency={CURRENCY} />
          </p>
        </div>
        <p className="text-sm whitespace-nowrap sm:text-xl self-end flex-1 text-right text-blue-500">
          {items.length} {t('items')}
          {items.length > 1 && 's'}
        </p>
        <p className="absolute top-2 right-2 w-40 lg:w-72 truncate whitespace-nowrap">
          <span className="uppercase">{t('orderNumber')}</span> {id}
        </p>
      </div>
      <div className="p-5 md:p-10">
        <div className="flex space-x-6 overflow-x-auto">
          {images.map((image, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img src={image} alt="" className="h-20 md:h-32 object-contain" />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Order
