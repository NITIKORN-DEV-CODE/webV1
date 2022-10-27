import React from "react"
import "./CartStyle.css"
import { Button } from "react-bootstrap"
import {useDispatch} from 'react-redux'
import { setMoveItemFromCart, setIncreaseItem, setDecreaseItem,  setCartTotal } from "../../Apps/cartSlice"

export const CartItem = ({item}) =>{

    const disPatch = useDispatch()
    const removeItem = ()=>{
        disPatch(setMoveItemFromCart(item))
        disPatch(setCartTotal())
    }

    const increaseItem = () =>{
        disPatch(setIncreaseItem(item))
        disPatch(setCartTotal())
    }

    const decreaseItem = () =>{
        disPatch(setDecreaseItem(item))
        disPatch(setCartTotal())
    }

    const imgSvr = "http://127.0.0.1:8000"
    return(
        <>
            <div className="cartItemMain" key={item[0]}>
                {item[3].map((img)=>(
                    <img src={imgSvr+img.imgUrl} alt="" key={img.id} />
                    ))}
                
                <div className="itemMiddle">
                    <div>{item[1]}</div>    
                    <div className="itemQuantity">
                        <Button type="button"
                                size="sm"
                                variant="outline-primary"
                                onClick={()=>decreaseItem()}>
                            -
                        </Button>
                        <div>{item['cartQuantity']}</div>

                        <Button type="button"
                                size="sm"
                                variant="outline-primary"
                                onClick={()=>increaseItem()}>
                            +
                        </Button>
                    </div>
                </div>
                <div className="itemPrice">
                <div>{item[2]}</div>
                <button type="button" className="trashBtn"
                        onClick={()=>removeItem()}>
                            <i className="fa-solid fa-trash-can"></i>
                </button>
                </div>
                
            </div>
        </>
    )
}

export default CartItem