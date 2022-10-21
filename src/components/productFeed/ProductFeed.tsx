import type { Product as ProductType } from '../../types/product.type'
import ProductCard from '../Card/ProductCard'

type ProductFeedProps = {
  products: ProductType[]
}

const ProductFeed = ({ products }: ProductFeedProps) => {
  return (
    <div className="grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto">
      {products.slice(0, 4).map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
      <img
        className="w-full md:col-span-full"
        src="/assets/images/discover.jpg"
        alt=""
      />
      <div className="md:col-span-2">
        {products.slice(4, 5).map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {products.slice(5, products.length).map((product) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </div>
  )
}

export default ProductFeed
