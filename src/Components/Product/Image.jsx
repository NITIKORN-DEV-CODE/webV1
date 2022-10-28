import React from "react"
import './Product.css'
import Configs from '../../../package.json'


export const Image = ({image:{id, imgName, imgUrl}}) =>{
    
    return(
    <>
        <div className="product-img">
            <img src={Configs.webapi+imgUrl} alt="" />
        </div>
    </>)
}

export default Image