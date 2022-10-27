import React from "react"
import "./CartStyle.css"

export const CartCount = ({onCartToggle, totalQuantity}) =>{
    return(
        <>
            <div className="cartCountMain">
                <div className="count">
                    <div >
                        <button type="button" className="closeCartBtn" size="sm" onClick={()=>onCartToggle()}>
                            <div>&gt;&gt;</div>
                        </button>
                    </div>
                    <div>
                        <label>Your Cart <span>(สินค้า {totalQuantity} รายการ)</span></label>
                    </div>
                </div>
                <div>
                    <button type="button" className="closeCartBtnB" size="sm" onClick={()=>onCartToggle()}>
                        X
                    </button>
                </div>
            </div>
        </>
    )
}

export default CartCount