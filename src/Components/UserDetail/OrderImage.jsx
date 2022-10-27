import React from "react"
import './UserDetail.css'


export const OrderImage = ({image:{id, imgName, imgUrl}}) =>{
    const imgSvr = "http://127.0.0.1:8000"
    return(
    <>
        <div className="order-product-img">
            <img src={imgSvr+imgUrl} alt="" />
        </div>
    </>)
}

export default OrderImage