import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CheckoutProgess from "./CheckoutProgess";
import { addOrderItem } from "../actions/orderAction";
import { useNavigate } from "react-router-dom";
import {ORDER_ITEM_RESET} from '../constants/orderConstants'

function PlaceOrder() {
  const cart = useSelector((state) => state.cart);
  const { cartItems, shippingAddress } = cart;
  const navigate = useNavigate()
  const addOrder = useSelector((state) => state.orderAddItem);
  const { order, error, success } = addOrder;
  console.log(success)
  const dispatch = useDispatch();

  cart.itemsprice = cartItems
    .reduce((acc, item) => acc + Number(item.qty) * item.price, 0)
    .toFixed(2);
  cart.shippingprice = (cart.itemsprice > 200 ? 0 : 10).toFixed(2);
  cart.taxprice = Number((cart.itemsprice * 7.5) / 100).toFixed(2);
  cart.totalprice =
    Number(cart.itemsprice) +
    Number(cart.shippingprice) +
    Number(cart.taxprice);
 

 useEffect(() => {
  if(!cart.paymentMethod){
    
    
    navigate('/payment')
  }

   if(success){
    dispatch({
      type: ORDER_ITEM_RESET
    })
     navigate(`/order/${order._id}`)
     
   }
 })

 
  const handleClick = (e) => {
    e.preventDefault();
    dispatch(
      addOrderItem({
        paymentMethod: cart.paymentMethod,
        shippingPrice: cart.shippingprice,
        itemsprice: cart.itemsprice,
        taxPrice: cart.taxprice,
        totalPrice: cart.totalprice,
        orderItems: cartItems,
        shippingAddress: shippingAddress,
      })

      
    );
  };
  return (
    <>
      <div className="container">
        <div className="col-md-8 mx-auto">
          <CheckoutProgess step1 step2 step3 step4 />
        </div>
        <div className="row">
          <div className="col-md-8 mt-5">
            <ul className="list-group">
              <li className="list-group-item p-2">
                <h4 className="my-3">shipping</h4>
                <span>
                  Address : {shippingAddress.address} , {shippingAddress.city} ,{" "}
                  {shippingAddress.postalcode} ,{shippingAddress.country}{" "}
                </span>
              </li>
              <li className="list-group-item p-2">
                <h4 className="my-3">Payment Method</h4>
                <span>{cart.paymentMethod} </span>
              </li>
              <li className="list-group-item p-2">
                <h4 className="my-3">ordered items</h4>
                <ul className="list-group list-group-flush">
                  {cartItems.map((item) => (
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
                  <div className="col">{cart.itemsprice}</div>
                </div>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">shipping</div>
                  <div className="col">{cart.shippingprice}</div>
                </div>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">tax </div>
                  <div className="col">{cart.taxprice} </div>
                </div>
              </li>
              <li className="list-group-item p-3">
                <div className="row">
                  <div className="col">total </div>
                  <div className="col">{cart.totalprice} </div>
                </div>
              </li>

              <li className="list-group-item text-center p-3">
                <button className="btn btn-warning" onClick={handleClick}>
                  PLACE YOUR ORDER
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default PlaceOrder;
