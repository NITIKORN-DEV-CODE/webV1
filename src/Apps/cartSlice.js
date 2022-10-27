import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-hot-toast'

export const counterSlice = createSlice({
  name: 'cart',
  initialState: {
    cartState: false,
    cartItems: localStorage.getItem("cart")? JSON.parse(localStorage.getItem("cart")) : [],
    cartTotalAmount:0,
    cartTotalQuantity:0,
    cartOrderID:0
  },
  reducers: {
    setOrderID: (state, action) =>{
      state.cartOrderID = action.payload
    },
    setOpenCart: (state, action) =>{
        state.cartState = action.payload.cartState
    },
    setCloseCart: (state, action)  =>{
        state.cartState = action.payload.cartState
    },
    setAddItemsToCart: (state, action) =>{
      const ItemIdex = state.cartItems.findIndex((item) => item[0] === action.payload[0])
      if(ItemIdex >=0){
        state.cartItems[ItemIdex].cartQuantity +=1
        toast.success(`${action.payload[1]} ใส่ตะกร้าเพิ่มอีก 1 ชิ้นแล้ว`) 
      }else{
        const temp = {...action.payload, cartQuantity:1}
        state.cartItems.push(temp)
        
        toast.success(`${action.payload[1]} ใส่ตะกร้าแล้ว`) 
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    setMoveItemFromCart: (state, action)  =>{
      const removeItem = state.cartItems.filter((item) => item[0] !== action.payload[0])
      state.cartItems = removeItem

      localStorage.setItem("cart",JSON.stringify(state.cartItems))
      toast.success(`${action.payload[1]} ลบสินค้าจากตะกร้าแล้ว`) 
    },
    setIncreaseItem: (state, action)  =>{
      const ItemIdex = state.cartItems.findIndex((item) => item[0] === action.payload[0])
      if(ItemIdex >=0){
        state.cartItems[ItemIdex].cartQuantity +=1
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    setDecreaseItem: (state, action)  =>{
      const ItemIdex = state.cartItems.findIndex((item) => item[0] === action.payload[0])
      if(ItemIdex >=0 && state.cartItems[ItemIdex].cartQuantity>1){
        state.cartItems[ItemIdex].cartQuantity -=1
      }

      localStorage.setItem("cart", JSON.stringify(state.cartItems))
    },
    setClearCart: (state, action)  =>{
      state.cartItems = []
      localStorage.setItem("cart", JSON.stringify(state.cartItems))
      
      toast.success("เช็คบิล")
    },
    
    setCartTotal:(state) =>{
      state.cartTotalAmount = 0
      state.cartTotalQuantity = 0

      state.cartItems.map(
        (cartItem)=>{
          const price= cartItem[2]
          const quantity = cartItem['cartQuantity']
          const totalPrice = price * quantity
          
          state.cartTotalAmount += totalPrice
          state.cartTotalQuantity += quantity
        })

    }

  }
})

// Action creators are generated for each case reducer function
export const {setOpenCart, setCloseCart, setAddItemsToCart, 
            setMoveItemFromCart, setIncreaseItem, 
            setDecreaseItem, setClearCart,
            setCartTotal,setOrderID} = counterSlice.actions
export const selectCartOrderID = (state) => state.cart.cartOrderID            
export const selectCartState = (state) => state.cart.cartState
export const selectCartItems = (state) => state.cart.cartItems
export const selectCartTotalAmount = (state) => state.cart.cartTotalAmount
export const selectCartTotalQuantity = (state) => state.cart.cartTotalQuantity
export default counterSlice.reducer