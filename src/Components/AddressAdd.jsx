import './Address.css'
import React,{useState, useEffect} from "react"
import toast from 'react-hot-toast'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useForm } from "react-hook-form"
import {useDispatch, useSelector} from 'react-redux'
import { selectCartOrderID, setOrderID } from '../Apps/cartSlice'
import { selectProfile, selectUser } from '../Apps/sessionSlice'
import Address from './UserDetail/Address'

import { Link, Navigate } from 'react-router-dom'
import Configs from '../../package.json'

export const AddressAdd = () =>{
    const Dispatch = useDispatch()
    
    const OrderID = useSelector(selectCartOrderID)
    const Profile = useSelector(selectProfile)
    const uName = useSelector(selectUser)
    
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [isAdded,setIsAdded] = useState(false)
    const [provName,setProvName] = useState('')
    const [amphoeName, setAmphoeName] = useState('')
    const [tambolName, setTambolName] = useState('')
    
    const handdleAddressAdd = data =>{
        postAddress(data)
        Dispatch(setOrderID('0'))
        setIsAdded(true)
    }

    const postAddress = async (data) =>{

        const datetime= getDateTime()
        const formData = new FormData()
        formData.append("orderID",OrderID)
        formData.append("addrNameSent",data.namesent)
        formData.append("addrDetail1",data.addrdetail)
        formData.append("addrProvinceName",provName)
        formData.append("addrAmphoeName",amphoeName)
        formData.append("addrTambolName",tambolName)
        formData.append("addrPostCode",postcode)
        formData.append("updateDate", datetime)

        try {
            const res = await fetch(Configs.webapi+'/address', {
                                method:'POST',
                                body: formData
                            })
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            toast.success("เพิ่มที่อยู่สลิปสำเร็จ")
            
        } catch (err) { console.log(err)    }
        
    }

    const getProvinceByID = async (pk) =>{
        let prov = ''
        try {
            const res = await fetch(Configs.webapi+'/province/'+pk)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            setProvName(data[0].pName) 
            
        } catch (err) { console.log(err.message) }

        return prov
    }

    const getAmphoeByID = async (pk) =>{
        let prov = ''
        try {
            const res = await fetch(Configs.webapi+'/amphoe/'+pk)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            setAmphoeName(data[0].aName) 
            
        } catch (err) { console.log(err.message) }

        return prov
    }

    const getTambolByID = async (pk) =>{
        let prov = ''
        try {
            const res = await fetch(Configs.webapi+'/tambol/'+pk)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            setTambolName(data[0].tName) 
            
        } catch (err) { console.log(err.message) }

        return prov
    }
    const getDateTime = () =>{
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return (date)
    }

    const [provinces,setProvinces] = useState([])
    const [amphoes,setAmphoes] = useState([])
    const [tambols,setTambols] = useState([])
    const [postcode, setPostCode] = useState('')
    const [custAddress, setCustAddress] = useState([])
    
    useEffect(()=>{
        
        getProvinces()
        getOrderAddress(Profile.id)
    },[])

    const getProvinces = async () =>{
        try {
            const res = await fetch(Configs.webapi+'/province')
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            if(data.length>0)
                setProvinces(data)
            
        } catch (err) { console.log(err.message) }
    }

    const getAmphoes = async (pCode) =>{
        try {
            const res = await fetch(Configs.webapi+'/province/amphoe/'+pCode)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            if(data.length>0)
                setAmphoes(data)
            
        } catch (err) { console.log(err.message) }
    }

    const getTambols = async (aCode) =>{
        try {
            const res = await fetch(Configs.webapi+'/province/tambol/'+aCode)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            if(data.length>0)
                setTambols(data)
            
        } catch (err) { console.log(err.message) }
    }

    const handleProvinceChange = (pCode) =>{
        //console.log(pCode)
        getAmphoes(pCode)
        setTambols([])
        setPostCode('')
        getProvinceByID(pCode)
    }

    const handleAmphoeChange = (aCode) =>{
        getTambols(aCode)
        setPostCode('')
        getAmphoeByID(aCode)
    }

    const handleTambolChange = (tCode) =>{
        tambols.map((tambal)=>{
           if(tambal.tCode==tCode){
            setPostCode(tambal.postCode)
            }
            
        })

        getTambolByID(tCode)
    }

    const getOrderAddress = async (id) =>{
        try {
            const res = await fetch(Configs.webapi+'/customer/'+ id)
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            if(data[0].orders[0].address.length>0)
                setCustAddress(data[0].orders[0].address)
            
        } catch (err) {
            console.log(err.message)
        }
    }  

    if(uName === "")
        return <Navigate to="/" replace={true} />
    
    return(
        <>
            <div className="addr-container">
                <div className="addr-section">
                    <div className='addr-topic'>ที่อยู่ในการจัดส่งสินค้า</div>
                    <div className='addr-control'>
                    
                    {custAddress.length>0?
                        <div className='addr-added'>
                            <Address AddressData={custAddress[0]}  />
                            <Link to="/Order">
                                    <Button variant="outline-primary"
                                        className='addr-added-btn'
                                        size='sm'>
                                        ใช้ที่อยู่นี้ในการจัดส่ง
                                    </Button>
                            </Link>
                        </div>
                         :""}

                    <Form onSubmit={handleSubmit(handdleAddressAdd)}>
                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                        <Form.Label>ชื่อผู้รับ</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="ส่งคุณ ผู้รับ"
                            name='namesent'

                            aria-invalid={errors.namesent ?  "true" : "false" }
                            {...register('namesent', { required: true})}
                            autoFocus
                        />
                        {errors.namesent && (
                            <span className='errorAlert'>
                            !!! กรุณากรอกชื่อผู้รับสินค้า
                            </span>
                        )}
                        </Form.Group>

                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                        <Form.Label>ที่อยู่</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="บ้านเลขที่ หมู่ที่ ถนน ซอย"
                            name='addrdetail'

                            aria-invalid={errors.addrdetail ?  "true" : "false" }
                            {...register('addrdetail', { required: true})}
                        />
                        {errors.addrdetail && (
                            <span className='errorAlert'>
                            !!! กรุณากรอกที่อยู่
                            </span>
                        )}
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>เลือกจังหวัด</Form.Label>
                            <Form.Select {...register("addrProvince")} onChange={e =>{handleProvinceChange(e.target.value)}}>
                                <option value="0">เลือกจังหวัด</option>
                                {provinces.map((province) =>(
                                    <option value={province.pCode}>{province.pName}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>เลือกอำเภอ</Form.Label>
                            <Form.Select {...register("addrAmphoe")} onChange={e =>{handleAmphoeChange(e.target.value)}}>
                            <option value="0">เลือกอำเภอ</option>
                                {amphoes.length > 0 ? 
                                    amphoes.map((amphoe) =>(
                                        <option value={amphoe.aCode}>{amphoe.aName}</option>
                                        )) : ""
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="form-group">
                            <Form.Label>เลือกตำบล</Form.Label>
                            <Form.Select {...register("addrTambol")} onChange={e =>{handleTambolChange(e.target.value)}}>
                            <option value="0">เลือกตำบล</option>
                                {tambols.length > 0 ? 
                                    tambols.map((tambal) =>(
                                        <option value={tambal.tCode}>{tambal.tName}</option>
                                        )) : ""
                                }
                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="form-group" controlId="exampleForm.ControlInput1">
                        <Form.Label>รหัสไปรษณีย์</Form.Label>
                        <Form.Control
                            type="text"
                            name='addrPostCode'
                            value={postcode}
                            {...register('addrPostCode')}
                        />
                        
                        </Form.Group>

                        <Form.Group className='fg-btn'>
                            
                            {isAdded?
                                    <Link to="/Order">
                                    <Button variant="outline-primary"
                                        size='sm'>
                                        ดูรายละเอียดการสั่งซื้อ
                                    </Button></Link>
                                    : <Button variant="outline-primary"
                                        size='sm'
                                        type='submit'>
                                        เพิ่มที่อยู่
                                    </Button>
                                }
                            
                            
                        </Form.Group>
                    </Form>
                    
                    </div>
                </div>
               
            </div>
            
        </>
    )
}
export default AddressAdd