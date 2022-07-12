import React, { useEffect ,  useState } from "react";
import FormContainer from "../components/Form"
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartAction";
import {useNavigate} from'react-router'
import CheckoutProgress from '../pages/CheckoutProgess'



function ShippingPage() {

    const dispatch  = useDispatch()
     const Address = useSelector(state => state.cart)
     const {shippingAddress} = Address

    const {userInfo} = useSelector(state => state.loginuser)
    
    const navigate = useNavigate()


    const[address , setAddress] = useState(shippingAddress.address)
    const[city , setCity] = useState(shippingAddress.city)
    const[postalcode , setPostalcode] = useState(shippingAddress.postalcode)
    const[country , setCountry] = useState(shippingAddress.country)
    

    useEffect( () => {
      if(!userInfo){
        navigate('/login')
      }
    } , [userInfo])
   
     
    const handleSubmit =  (e) => {
            e.preventDefault()
            dispatch(saveShippingAddress({address , city , postalcode , country}))
            navigate('/payment')
    }
      return (
          <>
          <FormContainer>
              <CheckoutProgress  step1 step2/>
              <center><h4 className = "mb-4">shipping Address</h4></center>
              <form onSubmit={handleSubmit}>
              Address
            <input
            type="text"
            placeholder="Enter Your Address"
            className="form-control"
            value={address? address : ''}
            onChange={(e) => setAddress(e.target.value)}
          />

           city
          <input
          type="text"
          placeholder="Enter Your city"
          className="form-control"
          value={city? city : ''}
          onChange={(e) => setCity(e.target.value)}
        />

            Postal code
        <input
            type="text"
            placeholder="Enter Your Address"
            className="form-control"
            value={postalcode ? postalcode : ''}
            onChange={(e) => setPostalcode(e.target.value)}
          />

             Country
            <input
            type="text"
            placeholder="Enter Your country"
            className="form-control"
            value={country? country :  ''}
            onChange={(e) => setCountry(e.target.value)}
          />

          <center><button className="btn btn-warning mt-5"> continue</button></center>



              </form>
          </FormContainer>
          
          
          </>
  )
}

export default ShippingPage