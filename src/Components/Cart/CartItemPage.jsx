import React from "react"
import "./CartStyle.css"
import { Button } from "react-bootstrap"
import {useDispatch} from 'react-redux'
import { setMoveItemFromCart, setIncreaseItem, setDecreaseItem,  setCartTotal } from "../../Apps/cartSlice"
import Configs from '../../../package.json'

export const CartItemPage = ({item}) =>{

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

   return(
        <>
            <div className="cartItemMain" key={item[0]}>
               <div className="ItemPage-item">
                    {item[3].slice(0,1).map((img)=>(
                    <img src={Configs.webapi+img.imgUrl} alt="" key={img.id} />
                    ))} 

                    <div>{item[1]}</div>  

                    <div className="amount-set">
                        <Button size="sm"
                                variant="outline-primary"
                                onClick={()=>decreaseItem()}>
                                    -
                        </Button>
                        <div>{item['cartQuantity']}</div>
                        <Button size="sm"
                                variant="outline-primary"
                                onClick={()=>increaseItem()}>
                                +
                        </Button>
                    </div>  

                    <div>{item[2]*item['cartQuantity']}</div>
                </div>  

            </div>
        </>
    )
}

export default CartItemPage