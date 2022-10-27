import './Province.css'
import React from "react"

export const Province = ({Province:{id, pCode, pName }}) =>{
    
    return(
    <>
        <option value={pCode} key={id}>{pName}</option>
    </>)
}

export default Province