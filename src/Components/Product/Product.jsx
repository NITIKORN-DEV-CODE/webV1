import React from "react"
import { useDispatch } from "react-redux"
import { setAddItemsToCart, setCartTotal } from "../../Apps/cartSlice"
import './Product.css'
import Image from "./Image"

export const Product = ({product:{id, prodName,prodDetail, prodPrice, images}}) =>{
    const disPatch = useDispatch()
    
    const onAddToCart = () =>{
        const Item = [id, prodName,prodPrice,images.slice(0,1)]
        disPatch(setAddItemsToCart(Item))
        disPatch(setCartTotal())
    }

    
    return(
    <>
        <div className="product">
            {
                images.slice(0,1).map((image)=>(
                    <Image image={image} key={image.id} />
                ))
            }
           
           <button type="button" className="product-buy" onClick={()=>onAddToCart()} >
               ซื้อเลย
            </button>

            <div className="product-price">{prodPrice} บาท</div>
            <div className="product-name">{prodName}</div>
            <div className="product-detail">{prodDetail}</div>
        </div>
        
    </>)
}

export default Product