import './App.css';

import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Navbar from './Components/Navbar'
import Cart from './Components/Cart'
import Home from './Components/Home'
import Payment from './Components/Payment'
import ContactUs from './Components/ContactUs'
import FAQ from './Components/Faqs'
import Return from './Components/Return'
import Policy from './Components/Policy'
import Service from './Components/Service'
import Footer from './Components/Footer'
import Profile from './Components/Profile'
import Order from './Components/UserDetail/Order'
import OrderSummary from './Components/OrderSummary'
import AddressAdd from './Components/AddressAdd'

function App() {
  return (
  <>
    <div className="App">
      <Router>
        <Navbar />
        <Cart />
          
        <Routes>
        <Route path='/' element={<Home />} />
          <Route path='/Service' element={<Service />} />
          <Route path='/ContactUs' element={<ContactUs />} />
          <Route path='/Return' element={<Return />} />
          <Route path='/Policy' element={<Policy />} />
          <Route path='/Payment' element={<Payment />} />
          <Route path='/FAQ' element={<FAQ />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Order' element={<Order />} />
          <Route path='/OrderSummary' element={<OrderSummary />} />
          <Route path='/AddressAdd' element={<AddressAdd />} />
          
        </Routes>
        
        <Footer />
      </Router>
    </div>
  </>
  )
}

export default App;
