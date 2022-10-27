import React from "react"
import { Link } from "react-router-dom"
import Dropdown from 'react-bootstrap/Dropdown'
import {useDispatch} from 'react-redux'
import { setUserLogout } from '../../Apps/sessionSlice'
import toast from "react-hot-toast"
import './Login.css'

export const User = (props) =>{
    const Dispatch = useDispatch()

    const SignOut = () =>{
        Dispatch(setUserLogout())
        toast.success("ออกจากระบบสำเร็จ")
        //window.location.replace("/")
    }

    return(
        <>
     <Dropdown>
      <Dropdown.Toggle variant="outline-primary" size="sm" id="dropdown-basic">
        <i className="fa-regular fa-user"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu >
        <Dropdown.Item as={Link} to="/Profile">โปรไฟล์</Dropdown.Item>
        <Dropdown.Item as={Link} to="/Order">รายการสั่งซื้อ</Dropdown.Item>
        <Dropdown.Divider />
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Dropdown.Item as="button" size="sm" onClick={SignOut} className="itemBtn">ออกจากระบบ</Dropdown.Item>
        </Link>
      </Dropdown.Menu>
    </Dropdown>
        </>
    )
}

export default User