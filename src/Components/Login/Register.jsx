import React,{useState}  from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useForm } from "react-hook-form"
import './Login.css'
import toast from 'react-hot-toast';
import {useSelector, useDispatch} from 'react-redux'
import { selectProfile, setUserRegisted } from '../../Apps/sessionSlice'

export const Register = (props)=>{
    const Profile = useSelector(selectProfile)
    const Dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handdleLogin = data =>{
        const datetime = getDateTime()
        PostProfile(datetime, data)
        props.toggleRegister(false, false)        
    }

    const PostProfile = async (datetime,data) =>{
        let Body = JSON.stringify({
        "custName": data.username,
        "custPhoneNumber": data.phoneNumber,
        "custEmail": data.emailAddress,
        "custPassword": data.pwd,
        "updateDate": datetime,
        "lastLoginDate": datetime
        })

        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/customer', {
                                method:'POST',
                                headers: {
                                    'Content-Type':'application/json'
                                },
                                body:Body
                            })
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
            
            const data = await res.json()
           
            Dispatch(setUserRegisted(data))
            toast.success("ลงทะเบียนสำเร็จ")
            
        } catch (err) {
            console.log(err.message)
        }
    }
    const getDateTime = () =>{
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return (date+"T"+time)
    }

    const [show, setShow] = useState(true)
    return(<>
            <div>

            <Modal dialogClassName='modalStyle' show={show} onHide={()=>props.toggleRegister(false, false)}>
            <Modal.Header closeButton>
            <Modal.Title>สมัครสมาชิก</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit(handdleLogin)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>ชื่อ - นามสกุล</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ชื่อ นามสกุล"
                    name='username'

                    aria-invalid={errors.username ?  "true" : "false" }
                    {...register('username', { required: true, maxLength:100})}
                    autoFocus
                />
                {errors.username && (
                    <span className='errorAlert'>
                    !!! กรุณากรอก ชื่อ - นามสกุล ของท่าน
                    </span>
                )}
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>เบอร์โทรศัพท์</Form.Label>
                <Form.Control
                    type="text"
                    className='phoneInput'
                    placeholder="0818888888"
                    name='phoneNumber'

                    aria-invalid={errors.phoneNumber ?  "true" : "false" }
                    {...register('phoneNumber', { required: true, pattern: /[0-9]{10}/ ,maxLength:10})}
                    autoFocus
                />
                {errors.phoneNumber && (
                    <span className='errorAlert'>
                    !!! กรุณากรอกหมายเลขโทรศัพท์ 10 หลัก
                    </span>
                )}
                </Form.Group>
                <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
                >
                <Form.Label>อีเมล์</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="example@google.com"
                    name='emailAddress'
                    {...register('emailAddress',{})}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control   
                    type="password" 
                    placeholder="รหัสผ่าน" 
                    name='pwd' 
                    aria-invalid={errors.pwd ?  "true" : "false" }
                    {...register('pwd', { required: true, minLength:6 , maxLength:20})}
                    />
                    {errors.pwd && (
                    <span className='errorAlert'>
                    !!! รหัสผ่านยาว 6 ถึง 20 ตัวอักษร 
                    </span>
                )}
                </Form.Group>

                <Form.Group>
                    <Modal.Footer>
                    <Button variant="outline-secondary" 
                    onClick={()=>props.toggleRegister(false, false)}>
                        ยกเลิก
                    </Button>
                    <Button variant="outline-primary" type='submit'>
                        ลงทะเบียน
                    </Button>
                    </Modal.Footer>
                </Form.Group>
            </Form>
            </Modal.Body>
           
            
        </Modal>
            </div>
        </>)
}

export default Register