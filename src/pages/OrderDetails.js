import React, { useEffect, useState } from "react";
import { getOrderDetails, payOrder , deliverOrder } from "../actions/orderAction";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import Loader from '../components/Loader'
import Message from '../components/Message'
import { PayPalButtons } from "@paypal/react-paypal-js";
import Esewa from "../components/Esewa";
import { ORDER_DELIVER_RESET, ORDER_PAY_RESET } from "../constants/orderConstants";
import { Link } from "react-router-dom";
function OrderDetails() {
  const { id } = useParams();

 
  const navigate = useNavigate()

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.loginuser);

  const orderDetails = useSelector((state) => state.orderDetails);

  const { order, error, loading } = orderDetails
 
  
  const orderPay = useSelector((state) => state.orderPay);

  const { loading: loadingPay, success: successPay } = orderPay;


  const orderdeliver = useSelector((state) => state.orderDeliver);

  const { loading: loadingDeliver, success: successDeliver } = orderdeliver;


  if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc , item) => acc +( item.quantity * item.price) , 0 )
  }

  


 
  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
     if(!order || successPay ||successDeliver|| order._id !== Number(id)){
      dispatch({
        type:ORDER_PAY_RESET
        
      })
      dispatch({type:ORDER_DELIVER_RESET})

      dispatch(getOrderDetails(id))
     
     }
} , [id, order , dispatch , successPay , loadingPay , successDeliver])

const updateDeliverHanlder = (e) => {
  e.preventDefault()
  dispatch(deliverOrder(id))
}

  return  loading? (<Loader /> ):
   error ? (<Message > {{error}}</Message>) 
   : (
    <>
     <div className="container">
        <div className="row">
          <div className="col-md-8 mt-5">
            <ul className="list-group">
              <li className="list-group-item p-2">
                <h4 className="my-3">shipping</h4>
                <p>name: {userInfo.name}</p>
                <span>
                  Address : {order.shippingAddress.address} ,{" "}
                  {order.shippingAddress.city} ,{" "}
                  {order.shippingAddress.postalcode} ,
                  {order.shippingAddress.country}{" "}
                </span>
                <p><a href="www.gmail.com">{userInfo.email}</a></p>
                {order.isDelivered ? (
                          <div className="alert alert-success mt-2">Your order was delivered.</div>
                        ):(
                          <div className="alert alert-danger mt-2">Delivery is in process.</div>
                        )}
              </li>
              <li className="list-group-item p-2">
                <h4 className="my-3">Payment Method</h4>
                <span>{order.paymentMethod} </span>
                {order.isPaid? (
                          <div className="alert alert-success mt-2">payment completed on {order.paidAt}</div>
                        ):(
                          <div className="alert alert-danger mt-2">payment is due.</div>
                        )}
              </li>
              <li className="list-group-item p-2">
                <h4 className="my-3">ordered items</h4>
                <ul className="list-group list-group-flush">
                  {order.orderItems.map((item) => (
                    <li className="list-group-item" key={item.product}>
                      <div className="row">
                        <div className="col-md-1">
                          <img
                            src={item.image}
                            alt={item.image}
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-md-7">
                          <strong>{item.name}</strong>
                        </div>
                        <div className="col-md-4">
                          <h6>
                            {" "}
                            {item.qty} x {item.price}
                          </h6>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>

          <div className="col-md-4 mt-5">
            <ul className="list-group">
              <li className="list-group-item pt-4 text-center">
                <h5>PRICE SUMMARY</h5>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">item </div>
                  <div className="col">{order.itemsPrice}</div>
                </div>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">shipping</div>
                  <div className="col">{order.shippingPrice}</div>
                </div>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">tax </div>
                  <div className="col">{order.taxPrice} </div>
                </div>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">total </div>
                  <div className="col">{order.totalPrice} </div>
                </div>
              </li>
              
              {!order.isPaid && !userInfo.isAdmin &&(
              <li className="list-group-item p-3 text-center">

                <Esewa />
                </li>
              )}


              {userInfo && userInfo.isAdmin && order.isPaid  && !order.isDelivered && (
                 <li className="list-group-item p-3 text-center">

                 <button onClick={updateDeliverHanlder} className="btn btn-outline-warning"> UPDATE TO DELIVERED</button>
                 </li>
              )}


             
              
              
            </ul>
          </div>
        </div>
      </div> 
    </>
   )
   
  
}

export default OrderDetails;
