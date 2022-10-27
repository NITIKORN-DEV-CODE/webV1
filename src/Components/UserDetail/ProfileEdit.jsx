import React,{useState}  from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import { useForm } from "react-hook-form"
import {useSelector, useDispatch} from 'react-redux'
import { selectProfile, setUserEdit } from '../../Apps/sessionSlice'

import toast from 'react-hot-toast';

export const ProfileEdit = ({ToggleEdit})=>{
    const Profile = useSelector(selectProfile)
    const Dispatch = useDispatch()

    const { register, handleSubmit, formState: { errors } } = useForm();

    const handdleEdit = data =>{
       
        const lastLoginDate = Profile.lastLoginDate
        const datetime = getDateTime()
        PutProfile(lastLoginDate,datetime, data)
        ToggleEdit(false)       
    }

    const PutProfile = async (lastLoginDate,datetime,data) =>{
        let Body = JSON.stringify({"id": Profile.id,
        "custName": data.username,
        "custPhoneNumber": data.phoneNumber,
        "custEmail": data.emailAddress,
        "custPassword": data.pwd,
        "updateDate": datetime,
        "lastLoginDate": lastLoginDate
        })

        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/profile', {
                                method:'PUT',
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
           
            Dispatch(setUserEdit(data))
            toast.success("แก้ไขสำเร็จ")
            
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

            <Modal dialogClassName='modalStyle' show={show} onHide={()=>ToggleEdit(false)}>
            <Modal.Header closeButton>
            <Modal.Title>แก้ไขโปรไฟล์</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmit(handdleEdit)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>ชื่อ - นามสกุล</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="ชื่อ นามสกุล"
                    name='username'
                    defaultValue={Profile.custName}
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
                    defaultValue={Profile.custPhoneNumber}
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
                    defaultValue={Profile.custEmail}
                    {...register('emailAddress',{})}
                />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                <Form.Label>รหัสผ่าน</Form.Label>
                <Form.Control   
                    type="password" 
                    placeholder="รหัสผ่าน" 
                    name='pwd' 
                    defaultValue={Profile.custPassword}
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
                    onClick={()=>ToggleEdit(false)}>
                        ยกเลิก
                    </Button>
                    <Button variant="outline-primary" type='submit'>
                        แก้ไข
                    </Button>
                    </Modal.Footer>
                </Form.Group>
            </Form>
            </Modal.Body>
           
            
        </Modal>
            </div>
        </>)
}

export default ProfileEdit