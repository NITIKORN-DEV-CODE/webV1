import React from "react"
import './UserDetail.css'

export const ImageSlip = ({image:{id, imgName, imgUrl}}) =>{
    const imgSvr = "http://127.0.0.1:8000"
    return(
        <>
            
            <div >
                <img src={imgSvr+imgUrl} alt="" className="slips" />
            </div>
   
        </>
    )
}

export default ImageSlip