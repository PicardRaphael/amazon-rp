import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit'
import { ProductCart } from '../../types/product.type'

export interface CartState {
  items: Array<ProductCart>
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (
      state: Draft<typeof initialState>,
      action: PayloadAction<ProductCart>
    ) => {
      state.items = [...state.items, action.payload]
    },
    removeFromCart: (
      state: Draft<typeof initialState>,
      action: PayloadAction<{ id: number }>
    ) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem.id === action.payload.id
      )

      const newCart = [...state.items]

      if (index >= 0) {
        newCart.splice(index, 1)
      } else {
        console.warn(
          `Cant remove product (id: ${action.payload.id}) as its not`
        )
      }

      state.items = newCart
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export const getItemsCartState = (state: { cart: CartState }) =>
  state.cart.items

export const getTotalCart = (state: { cart: CartState }) =>
  state.cart.items.reduce((total, item) => total + item.price, 0)

export default cartSlice.reducer
