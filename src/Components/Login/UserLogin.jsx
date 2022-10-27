import React from "react"

export const UserLogin = ({onLogin}) =>{
    return(
        <>
            <button  type="button" className="navBtn" onClick={()=>onLogin()}>
                <i className="fa-regular fa-user"></i>
            </button>
        </>
    )
}

export default UserLogin