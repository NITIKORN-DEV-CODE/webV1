import { configureStore } from '@reduxjs/toolkit'
import cartSlice from './cartSlice'
import sessionSclice from './sessionSlice'

export default configureStore({
  reducer: {
    cart: cartSlice,
    session: sessionSclice,
  }
})