import { StoreProduct } from '@/types'
import { createSlice } from '@reduxjs/toolkit'

interface nextState {
  productData: StoreProduct[]
  favouriteData: StoreProduct[]
  allProductData: StoreProduct[]
  userInfo: null | string
}
const initialState: nextState = {
  productData: [],
  favouriteData: [],
  allProductData: [],
  userInfo: null,
}

export const nextSlice = createSlice({
  name: 'next',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      )
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity
      } else {
        state.productData.push(action.payload)
      }
    },
    addToFavourite: (state, action) => {
      const existingProduct = state.favouriteData.find(
        (item: StoreProduct) => item._id === action.payload._id
      )
      if (existingProduct) {
        existingProduct.quantity += action.payload.quantity
      } else {
        state.favouriteData.push(action.payload)
      }
    },
    increaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      )
      existingProduct && existingProduct.quantity++
    },
    decreaseQuantity: (state, action) => {
      const existingProduct = state.productData.find(
        (item: StoreProduct) => item._id === action.payload._id
      )
      if (existingProduct?.quantity === 1) {
        existingProduct.quantity = 1
      } else {
        existingProduct!.quantity--
      }
    },
    removeItem: (state, action) => {
      state.productData = state.productData.filter(
        (item) => item._id !== action.payload
      )
    },
    removeFavourite: (state, action) => {
      state.favouriteData.filter(
        (item: StoreProduct) => item._id !== action.payload._id
      )
    },
    resetItem: (state) => {
      state.productData = []
    },
    resetFavourite: (state) => {
      state.favouriteData = []
    },
    addUser: (state, action) => {
      state.userInfo === action.payload
    },
    removeUser: (state) => {
      state.userInfo = null
    },
    setAllProductData: (state, action) => {
      state.allProductData === action.payload
    },
  },
})

export const {
  addToCart,
  addToFavourite,
  increaseQuantity,
  decreaseQuantity,
  removeItem,
  removeFavourite,
  resetItem,
  resetFavourite,
  addUser,
  removeUser,
  setAllProductData,
} = nextSlice.actions
export default nextSlice.reducer
