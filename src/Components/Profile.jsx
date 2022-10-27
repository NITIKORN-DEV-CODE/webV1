import React, {useState} from "react"
import {useSelector} from 'react-redux'
import { selectProfile, selectUser } from '../Apps/sessionSlice'
import './Profile.css'
import  Button  from 'react-bootstrap/Button'
import ProfileEdit from "./UserDetail/ProfileEdit"
import { Navigate } from "react-router-dom"

export const Profile = () =>{
    const Profile = useSelector(selectProfile)
    const uName = useSelector(selectUser)

    const [edit, setEdit] = useState(false)
    const ToggleEdit = (isEdit) =>{
        setEdit(isEdit)
        }

    return(
        <>
            {uName==="" ? <Navigate to="/" replace={true} />:""}
            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        โปรไฟล์
                    </div>
                    <div className="profile-content">
                        <span className="profile-title">ชื่อ</span>
                        <span className="profile-detail">{Profile.custName}</span>
                    </div>
                    <div className="profile-content">
                        <span className="profile-title">เบอร์โทรศัพท์</span>
                        <span className="profile-detail">{Profile.custPhoneNumber}</span>
                    </div>
                    <div className="profile-content">
                        <span className="profile-title">อีเมล์</span>
                        <span className="profile-detail">{Profile.custEmail}</span>
                    </div>
                    <div className="profile-footer">
                        <Button className="editBtn" variant="outline-primary" onClick={()=>ToggleEdit(true)} >
                            <i className="fa-solid fa-pen-to-square"></i> แก้ไข
                        </Button>
                    </div>
                </div>
            </div>

            {edit? <ProfileEdit ToggleEdit={ToggleEdit} /> : "" }
        </>
    )
}

export default Profile