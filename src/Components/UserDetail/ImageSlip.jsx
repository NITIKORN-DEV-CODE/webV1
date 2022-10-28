import React from "react"
import './UserDetail.css'
import Configs from '../../../package.json'

export const ImageSlip = ({image:{id, imgName, imgUrl}}) =>{
    return(
        <>
            
            <div >
                <img src={Configs.webapi+imgUrl} alt="" className="slips" />
            </div>
   
        </>
    )
}

export default ImageSlip