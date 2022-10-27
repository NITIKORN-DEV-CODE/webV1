import React from "react"
import './Product.css'


export const Image = ({image:{id, imgName, imgUrl}}) =>{
    const imgSvr = "http://127.0.0.1:8000"
    return(
    <>
        <div className="product-img">
            <img src={imgSvr+imgUrl} alt="" />
        </div>
    </>)
}

export default Image