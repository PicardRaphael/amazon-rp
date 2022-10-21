type ProductRating = {
  rate: number
  count: number
}
export type Product = {
  id: number
  title: string
  price: number
  description: string
  category: string
  image: string
  rating: ProductRating
}
export type ProductCart = Product & { hasPrime: boolean }
