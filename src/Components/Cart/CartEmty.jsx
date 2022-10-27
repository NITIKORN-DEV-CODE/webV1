import React from "react"
import "./CartStyle.css"
import svgEmty from '../../images/empty-cart.png'
import Button from 'react-bootstrap/Button';

export const CartEmty = ({onCartToggle}) =>{
    return(
        <>
            <div className="cartEmtyMain">
                <img src={svgEmty} alt="" />
                <span className="emtyWord">ไม่มีสินค้าในตะกรัา</span>
                <Button type="button" variant="outline-primary" size="sm" onClick={()=>onCartToggle()}>
                &lt;&lt; เลือกสินค้าต่อ
                </Button>
            </div>
        </>
    )
}

export default CartEmty