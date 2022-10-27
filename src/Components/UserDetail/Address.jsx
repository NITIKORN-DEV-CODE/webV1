import React from "react"
import './UserDetail.css'

export const Address = ({AddressData:{id, addrNameSent, addrDetail1,addrProvinceName,
                                addrAmphoeName,addrTambolName,addrPostCode}}) =>{

    return(
        <>
            <table className="order-address">
                <tr>
                    <td>{addrNameSent}</td>
                </tr>
                <tr><td>{addrDetail1}</td></tr>
                <tr><td>ต.{addrTambolName}</td></tr>
                <tr><td>อ.{addrAmphoeName}</td></tr>
                <tr><td>จ.{addrProvinceName}</td></tr>
                <tr><td>รหัสไปรษณีย์ {addrPostCode}</td></tr>
            </table>
        </>
    )
}

export default Address