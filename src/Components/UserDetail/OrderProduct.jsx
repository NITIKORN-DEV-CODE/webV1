import React,{useState,useEffect} from "react"
import OrderImage from "./OrderImage"
import './UserDetail.css'
import Configs from '../../../package.json'

export const OrderProduct = ({ProductID, Amount}) =>{
    const[product, setProduct] = useState([])

    useEffect(()=>{
        getProduct(ProductID)
    },[])

    const getProduct = async (id) =>{
        try {
            const res = await fetch(Configs.webapi+'/product/'+ id)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            setProduct(data)
            
        } catch (err) {
            console.log(err.message)
        }
    }  

    return(
    <>
        <div> รายการที่ {ProductID}</div>
       
        {   product.length > 0?
            <div className="order-product">
                {product[0].images.slice(0,1).map((image)=>(
                        <OrderImage image={image} key={image.id} />
                    ))}
                <div className="order-product-price">{product[0].prodPrice} บาท</div>
                <div>จำนวน {Amount}</div>
                <div className="order-product-name">{product[0].prodName}</div>
            </div> : ""
    }
   
    </>)
}

export default OrderProduct