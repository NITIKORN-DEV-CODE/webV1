import nuttPic from '../images/nutt1.png'
import './Home.css'
import React, { useEffect, useState } from 'react'
import Product from './Product/Product'
import Configs from '../../package.json'
import Wave from '../images/Wave.mp4'

export const Home = ()=>{

    const [products, setProducts] = useState([])
    
    useEffect (() =>{
        refreshList()
    },[])

    const refreshList = async () =>{
        
        try {
            const res = await fetch(Configs.webapi+'/product')
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            setProducts(data)
            
        } catch (err) {
            console.log(err.message)
        }

    }
    
    
    return(
    <>
        <center>
            <div className="homeContainer">
                <div className="main-promotion">
                    <video className='videoBG' autoPlay loop muted>
                        <source src={Wave} type='video/mp4' />
                    </video>
                    <div className='pro-content'>
                        <div><img src={nuttPic} alt="" /></div>
                        <div className="pro-detail">
                            <label className="pro-topic">เมล็ดมะม่วงหิมพานต์</label>
                            <label className="pro-explain">สัมผัสรสชาติความอร่อย!!! กรอบนุ่มเคี้ยวเพลินของเมล็ดมะม่วงหิมพานต์สดใหม่กันทุกวัน </label>
                        </div>
                    </div>
                    
                </div>
                <div className="containerMain">
                        {
                            products.map((product)=>(
                                <Product product={product} key={product.id} />
                            ))
                        }
                </div>  
            </div>
        </center>
    </>
    )
    
}

export default Home;


