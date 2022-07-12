import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../actions/cartAction";
import { useNavigate } from "react-router";
import FormContainer from "../components/Form";
import CheckoutProgess from "./CheckoutProgess";
function PaymentPage() {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch()
  const navigate = useNavigate();

  const [paymentmethod, setPaymentMethod] = useState("esewa");
   
  const { userInfo } = useSelector((state) => state.loginuser);


  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
    else if(! shippingAddress){
      navigate("/shipping");
    }
  } , [userInfo , shippingAddress])
 
  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentmethod))
    navigate("/placeorder");
  };

  return (
    <>
      <FormContainer>
        <center>
          <CheckoutProgess step1 step2 step3 />
          <h5 className="my-3"> select payment method</h5>
          <form onSubmit={handleSubmit}>
            <input type="radio" name="paymentMethod" id="paypal"
             onChange={(e) => setPaymentMethod(e.target.id)} />
            paypal <br />
            <input type="radio" name="paymentMethod" id="esewa" checked 
             onChange={(e) => setPaymentMethod(e.target.id)} />
            esewa <br />
            <input type="radio" name="paymentMethod" id="khalti" 
             onChange={(e) => setPaymentMethod(e.target.id)}  />
            khalti <br />
            <input type="radio" name="paymentMethod" id="imepay"
             onChange={(e) => setPaymentMethod(e.target.id)}  />
            Imepay <br /> <br />
            <button className="btn btn-warning  my-3">submit</button>
          </form>
        </center>
      </FormContainer>
    </>
  );
}

export default PaymentPage;
