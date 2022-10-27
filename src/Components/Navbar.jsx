import React,{useEffect,useState} from "react"
import './Navbar.css'
import logo from '../images/fishlogo.png'
import {useDispatch, useSelector} from 'react-redux'
import { selectCartTotalQuantity, setOpenCart } from '../Apps/cartSlice'
import Login from "./Login/Login"
import Register from "./Login/Register"
import { selectUser,selectIsLogedIn } from '../Apps/sessionSlice'
import User from "./Login/User"
import UserLogin from "./Login/UserLogin"
import { Link } from 'react-router-dom'

export const Navbar = () =>{
    const[navState, setNavState] = useState(false)
    const disPatch = useDispatch()
    const totalQuantity = useSelector(selectCartTotalQuantity)
    const uName = useSelector(selectUser)
    
    const GetName = () =>{
        uName = useSelector(selectIsLogedIn)
    }
    const onCartToggle = () =>{
        disPatch(setOpenCart({cartState:true}))
    }

    const onNavScoll = () =>{
        if(window.scrollY > 30){
            setNavState(true)
        } else{
            setNavState(false)
        }
    }

    useEffect(()=>{
        window.addEventListener('scroll',onNavScoll)

        return()=>{
            window.removeEventListener('scroll',onNavScoll)
        }
    })

    const [register, setRegister] = useState(false)
    const [login, setLogin] = useState(false)
    const toggleLogin = (isLogin, isRegister) =>{
        setLogin(isLogin)
        setRegister(isRegister)
        
        }

    const toggleRegister = (isLogin, isRegister) =>{
        setLogin(isLogin)
        setRegister(isRegister)
        }

    const onLogin = () =>{
            setLogin(true)
        }

    return(
        <>
            <div className="header">
                <nav className={!navState? "nav" : "nav navScroll"}>
                    <div className='logo'>
                        <Link to="/">
                        <button type="button" className="logoBtn">
                            <img src={logo} alt="" />
                            <label className="ma">ma</label>
                            <label className="nakhon">NAKHON.com</label>
                        </button>
                        </Link>
                    </div>
                    <ul>
                        <li className="userName">
                            {uName !== "" ? uName : ""}
                        </li>
                        <li>
                            {uName !== "" ? <User /> : <UserLogin onLogin={onLogin} /> }
                            
                            
                        </li>
                        <li>
                            <button type="button" className="navBtn" onClick={()=>onCartToggle()}>
                                <i className="fa-regular fa-cart-shopping"></i>
                                <div className="cartCount">{totalQuantity}</div>
                            </button>
                            
                        </li>
                    </ul>
                </nav>
            </div>
            {login? <Login toggleLogin={toggleLogin} /> :"" }
            {register? <Register toggleRegister={toggleRegister} /> :"" }
        </>
    )
}

export default Navbar