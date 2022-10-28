import React,{useState, useEffect} from "react"
import './UserDetail.css'
import OrderProduct from "./OrderProduct"
import Button from 'react-bootstrap/Button'
import { PostSlip } from "./PostSlip"
import ImageSlip from "./ImageSlip"
import Address from "./Address"

export const OrderDetail = ({order:{id,address, imageslip, orderPaid,orderRecept,
                                    orderSent,orderTotal,orderproducts}}) =>{
   
    const [posted, setPosted] = useState(false)
    const [slipurl, setSlipUrl] = useState('')
    const [post, setPost] = useState(false)
    
    const togglePostSlip = (isPost, isPosted, slipPatch) =>{
        setPost(isPost)
        if(isPosted){
            setPosted(true)
            setSlipUrl(slipPatch)
        }
    }

    return(<>
        <div className="detail-container">
            <div className="detail-row">
                <div className="detail-name">โค๊ดการสั่งซัือ </div>
                <div className="detail-data">Order-{id}</div>
            </div>
            <div className="detail-row">
                <div className="detail-name">ยอดค่าสินค้า</div>
                <div className="detail-data">{orderTotal}</div>
            </div>
            <div className="detail-row">
                <div className="detail-name">การชำระเงิน</div>
                <div className="detail-data">
                    <div className="detail-payment">
                        {orderPaid=='N'? <pan>รอการชำระค่าสินค้า</pan> : <span>ชำระค่าสินค้าแล้ว</span>}
                        {imageslip.length>0? 
                                            imageslip.slice(0,1).map((image) =>(
                                                <ImageSlip image={image} key={image.id} />
                                            ))  : ""}
                         { posted || imageslip.length>0?  ""  :
                                            <Button variant="primary" className="postsliptbtn" size="sm" onClick={()=>togglePostSlip(true,false,'')}>
                                                <i className="fa-regular fa-upload"></i> อับโหลดสลิป
                                            </Button> 
                        } 

                        {slipurl!=''? <img className="detail-slip" src={slipurl} alt="" />:""}
                        
                    </div>
                </div>
            </div>
            <div className="detail-row">
                <div className="detail-name">การจัดส่ง</div>
                <div className="detail-data">{orderSent=='N'? "ยังไม่ได้จัดส่ง" : "ส่งสินค้าเรียบร้อยแล้ว"}</div>
            </div>
            <div className="detail-row">
                <div className="detail-name">การรับสินค้า</div>
                <div className="detail-data">{orderRecept=='N'? "ยังไม่ได้รับสินค้า" : "รับสินค้าแล้ว"}</div>
            </div>
            <div className="detail-row">
                <div className="detail-name">รายการสืนค้า</div>
                <div className="detail-data">
                
                {orderproducts.map((product)=>(
                        <OrderProduct ProductID={product.productID} Amount={product.productQuantity}/>
                       ))}
                    
                </div>
            </div>
            <div className="detail-row">
                <div className="detail-name">ที่อยู่</div>
                <div className="detail-data">
                    {address.length > 0 ? 
                                        address.map((addr)=>(
                                            <Address AddressData={addr} key={addr.id} />
                                        ))
                                        : "ไม่ได้ระบุที่อยู่"}</div>
            </div>
        </div>
        {post? <PostSlip togglePostSlip={togglePostSlip} OrderID={id} />:"" }
    </>)
}

export default OrderDetail