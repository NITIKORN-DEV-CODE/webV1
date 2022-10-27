import React, { useEffect } from "react"
import './Cart.css'
import CartCount from './Cart/CartCount'
import CartEmty from './Cart/CartEmty'
import CartItem from './Cart/CartItem'
import {useDispatch,useSelector} from 'react-redux'
import { setCartTotal, selectCartItems, selectCartState, setCloseCart,setClearCart, selectCartTotalAmount, selectCartTotalQuantity } from '../Apps/cartSlice'
import { Button } from "react-bootstrap"
import {Link} from 'react-router-dom'

export const Cart = () =>{

    const disPatch = useDispatch()
    const ifCartState = useSelector(selectCartState)
    const cartItems = useSelector(selectCartItems)
    const totalAmount = useSelector(selectCartTotalAmount)
    const totalQuantity = useSelector(selectCartTotalQuantity)

    const onCartToggle = () =>{
        disPatch(setCloseCart({cartState:false}))
    }

    return(
        <>
            <div className={ifCartState? "cartContainer active" : "cartContainer"}>
                <div className="cartComponent">
                    <CartCount onCartToggle={onCartToggle} totalQuantity={totalQuantity}/>
                    {cartItems.length === 0 ? <CartEmty onCartToggle={onCartToggle} />
                     : cartItems.map((item)=>(<CartItem item={item} key={item.id} />))}
                    
                </div>
                <div className="total">
                    <div className="subtotal">
                        <div>ราคารวมทั้งหมด</div>
                        <div>{totalAmount} บาท</div>
                    </div>
                    <div>
                    {cartItems.length === 0 ? 
                        <Button variant="dark" size="sm"
                                className="checkoutBtn"
                                onClick={()=>onCartToggle()}
                                disabled
                                >
                                
                            เช็คบิล
                        </Button> : 
                        <Link to="/OrderSummary">
                            <Button variant="dark" size="sm"
                                    className="checkoutBtn"
                                    onClick={()=>onCartToggle()}
                                    >
                                       
                                เช็คบิล
                            </Button>
                        </Link>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart