import {Link} from 'react-router-dom'
import logoIcon from '../images/fishlogo.png'
import './Footer.css'

export const Footer = ()=> {
    
    return(
    <>
        <div className='footer'>
            <div className="logoIcon-footer">
                <Link to="/">
                    <img src={logoIcon} alt="" width="80px"></img>
                </Link>
                <label>&copy;maNakhon</label>
            </div>
            <div className='navFooter'>
                <ul>
                    <li><Link to="/">หน้าแรก</Link></li>
                    <li><Link to="/Service">การให้บริการ</Link></li>
                    <li><Link to="/ContactUs">ติดต่อเรา</Link></li>
                    <li><Link to="/Policy">นโยบายของเรา</Link></li>
                    <li><Link to="/Return">การคืนสินค้า</Link></li>
                    <li><Link to="/Payment">การชำระเงิน/การจัดส่ง</Link></li>
                    <li><Link to="/Faq"> FAQ คำถาม-คำตอบ</Link></li>
                </ul>
            </div>
           
        </div>
    </>
    )
}

export default Footer