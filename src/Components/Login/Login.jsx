import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useForm } from "react-hook-form";
import {React, useState ,useEffect} from 'react'
import './Login.css'
import {useDispatch} from 'react-redux'
import { setUser } from '../../Apps/sessionSlice'
import toast from 'react-hot-toast';

export const Login = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const Dispatch = useDispatch()

    const [show, setShow] = useState(true)
    
    const handdleLogin = data =>{
        getUser(data.phoneNumber, data.pwd)
        props.toggleLogin(false, false)
    }

    const getUser = async (phone, password) =>{
        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/profile', {
                                method:'POST',
                                headers: {
                                    'Content-Type':'application/json'
                                },
                                body:JSON.stringify({
                                    custPhoneNumber : phone,
                                    custPassword : password
                                })
                            })
            
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            if(data.length>0){
                Dispatch(setUser(data))
                toast.success("เข้าสู่ระบบสำเร็จ")
            }else{
                toast.error("เบอร์โทรศัพท์หรือรหัสผ่านไม่ถูกต้อง")
            }
            
        } catch (err) {
            console.log(err.message)
        }
    }                        

    return(
        <>
        <div>
            <Modal dialogClassName='modalStyle' show={show} onHide={()=>props.toggleLogin(false, false)}>
                <Modal.Header closeButton>
                <Modal.Title>เข้าสู่ระบบ</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit(handdleLogin)}>
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
                        
                        <Button variant="outline-secondary" onClick={()=>props.toggleLogin(false, false)}>
                        ยกเลิก
                        </Button>
                        <Button variant="outline-primary" type='submit'>
                            ล็อกอิน
                        </Button>
                        <Button variant='outline-primary'
                                className='signupBtn'
                                onClick={()=>props.toggleLogin(false, true)}
                                > สมัครสมาชิกใหม่ 
                        </Button>
                        </Modal.Footer>
                    </Form.Group>
                </Form>
                </Modal.Body>
                
                
               
                
            </Modal>
        </div>
        </>
    )
}

export default Login