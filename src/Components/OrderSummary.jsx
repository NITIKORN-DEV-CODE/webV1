import './OrderSummary.css'
import React,{useState , useEffect} from "react"
import toast from 'react-hot-toast'
import {useDispatch, useSelector} from 'react-redux'

import Login from "./Login/Login"
import Register from "./Login/Register"

import { selectUser, selectProfile } from '../Apps/sessionSlice'
import { selectCartItems, selectCartTotalAmount, setCartTotal, setClearCart, setOrderID } from '../Apps/cartSlice'

import CartItemPage from './Cart/CartItemPage'
import Button from 'react-bootstrap/Button'
import { Link, Navigate } from 'react-router-dom'

export const OrderSummary = () =>{
    const uName = useSelector(selectUser)
    const Profile = useSelector(selectProfile)

    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const [navigate, setNavigate] = useState(false)
    const toggleLogin = (isLogin, isRegister) =>{
        setLogin(isLogin)
        setRegister(isRegister)
        if(!isLogin && !isRegister && uName=='')
            setNavigate(true)
    }
    const toggleRegister = (isLogin, isRegister) =>{
        setLogin(isLogin)
        setRegister(isRegister)
        }

    useEffect(()=>{
        uName ==='' ? setLogin(true) :  setLogin(false)
    },[setLogin])
    
    const DistPatch = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const totalAmount = useSelector(selectCartTotalAmount)

    const ToggleOrder = ()=>{
        AddOrder()
        DistPatch(setClearCart())
        DistPatch(setCartTotal())
    }

    const AddOrder = async () =>{
        const datetime= getDateTime()
        const formData = new FormData()
        formData.append("custID",Profile.id)
        formData.append("orderName","คำสั่งซืัอ "+ Profile.custName)
        formData.append("orderTotal", totalAmount)
        formData.append("updateDate", datetime)

        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/order', {
                                method:'POST',
                                body: formData
                            })
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            DistPatch(setOrderID(data.id))
            AddOrderProduct(data.id)
            toast.success("สั่งซื้อสำเร็จ เราจะดำเนินการส่งสินค้าหลังจากท่านได้อับสลิปการโอนเงินแล้ว")
        } catch (err) {
            console.log(err)
        }
    }

    const AddOrderProduct = async (orderID) =>{
        cartItems.map((item)=>(
            AddProduct(orderID, item))
        )
    }

    const AddProduct = async (orderID, item) =>{
        const datetime= getDateTime()
        const formData = new FormData()
        formData.append("orderID",orderID)
        formData.append("productID", item[0])
        formData.append("orderProduct", item[1])
        formData.append("productQuantity", item['cartQuantity'])
        formData.append("updateDate", datetime)
        
        //for (const value of formData.values()) {
        //    console.log(value);
        //}

        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/orderproduct', {
                                method:'POST',
                                body: formData
                            })
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            
        } catch (err) {
            console.log(err)
        }
    }

    const getDateTime = () =>{
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return (date+"T"+time)
    }
    return(
        <>
            <div className="orderSummary-container">
                <div className="orderSummary-section">
                    <div>สรุปรายการสินค้า</div>
                    {cartItems.length > 0 ? cartItems.map((item)=>(<CartItemPage item={item} key={item.id} />)) :""}
                    <div className="summary-subtotal">
                        <div>ราคารวมทั้งหมด</div>
                        <div>{totalAmount} บาท</div>
                        <div>
                        <Link to="/AddressAdd">
                                <Button variant='primary'
                                        size="sm"
                                        onClick={()=>ToggleOrder()}
                                        >
                                    สั่งซื้อสินค้า
                                </Button>
                         </Link>
                        </div>
                    </div>
                </div>
            </div>
            {login? <Login toggleLogin={toggleLogin} /> :"" }
            {register? <Register toggleRegister={toggleRegister} /> :"" }
            {navigate ? <Navigate to="/" replace={true} />:""}
        </>
    )
}
export default OrderSummary