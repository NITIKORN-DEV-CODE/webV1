import React from "react"
import './UserDetail.css'
import Configs from '../../../package.json'


export const OrderImage = ({image:{id, imgName, imgUrl}}) =>{
    return(
    <>
        <div className="order-product-img">
            <img src={Configs.webapi+imgUrl} alt="" />
        </div>
    </>)
}

export default OrderImage