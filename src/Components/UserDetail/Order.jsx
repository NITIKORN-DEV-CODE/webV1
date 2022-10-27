import React,{useState, useEffect} from "react"
import './UserDetail.css'
import {useSelector} from 'react-redux'
import { selectProfile, selectUser } from '../../Apps/sessionSlice'
import OrderDetail from "./OrderDetail"
import { Navigate } from "react-router-dom"

export const Order = () =>{
    const Profile = useSelector(selectProfile)
    const uName = useSelector(selectUser)

    const [custOrder, setCustOrder] = useState([])

    useEffect(()=>{
        getOrder(Profile.id)
    },[])

    const getOrder = async (id) =>{
        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/customer/'+ id)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            
            setCustOrder(data[0].orders)
            
        } catch (err) {
            console.log(err.message)
        }
    }  

    return(<>
        {uName==="" ? <Navigate to="/" replace={true} />:""}
        <div className="order-container">
            <div className="order-section">
                    <div className="order-topic">รายการซื้อสินค้า</div>
                    <div className="order-remark">หมายเหตุ* เราจะส่งสินค้าหลังจากท่านได้โอนเงินและอัปโหลดสลิปให้เราแล้ว</div>
                    
                    {custOrder.length>0?
                            custOrder.map((order) => (
                                <OrderDetail order={order} key={order.id} />
                                ))
                            : 
                            <div className="order-emty"> ไม่มีรายการสั่งซื้อสินค้า </div>
                    }

            </div>
        </div>
    </>)
}

export default Order