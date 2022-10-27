import React,{useState} from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import toast from 'react-hot-toast'
import { useForm } from "react-hook-form";

export const PostSlip = ({togglePostSlip,OrderID}) =>{
    
    const { register, handleSubmit, formState: { errors } } = useForm();
    const handdlePostSlip = data =>{
        PostSlip(data.fileName[0])
    }

    const PostSlip = async (fileName) =>{
        const datetime= getDateTime()
        const formData = new FormData()
        formData.append("orderId",OrderID)
        formData.append("imgName","สลิปคำสั่งซืัอ "+OrderID)
        formData.append("imgUrl",fileName,fileName.name)
        formData.append("updateDate", datetime)

        //for (const value of formData.values()) {
        //    console.log(value);
        //  }
        
        try {
            const webApi = 'http://127.0.0.1:8000'
            const res = await fetch(webApi+'/imageslip', {
                                method:'POST',
                                body: formData
                            })
            if (!res.ok) {
            const message = `An error has occured: ${res.status} - ${res.statusText}`
            throw new Error(message)
            }
    
            const data = await res.json()
            toast.success("อัปโหลดสลิปสำเร็จ")
            togglePostSlip(false,true,webApi+data.imgUrl)
            
        } catch (err) { console.log(err) }
    }   

    const getDateTime = () =>{
        var today = new Date()
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
        return (date)
    }

    const [show, setShow] = useState(true)
    return(
        <>
            <Modal dialogClassName='modalStyle' show={show} onHide={()=>togglePostSlip(false, '')}>
                <Modal.Header closeButton>
                <Modal.Title>อัปโหลดสลิปการโอนเงิน</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form onSubmit={handleSubmit(handdlePostSlip)}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>สลิป</Form.Label>
                    <Form.Control
                        type="file"
                        name='fileName'

                        aria-invalid={errors.phoneNumber ?  "true" : "false" }
                        {...register('fileName', { required: true})}
                        autoFocus
                    />
                    {errors.fileName && (
                        <span className='errorAlert'>
                        !!! กรุณากรอกเลือกไฟล์สลิป
                        </span>
                    )}
                    </Form.Group>
                    
                    <Form.Group>
                        <Modal.Footer>
                        
                        <Button variant="outline-secondary" onClick={()=>togglePostSlip(false, '')}>
                        ยกเลิก
                        </Button>
                        <Button variant="outline-primary" type='submit'>
                            อัปโหลด
                        </Button>
                        
                        </Modal.Footer>
                    </Form.Group>
                </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
