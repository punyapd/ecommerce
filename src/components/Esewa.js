import React from 'react'
import {useDispatch , useSelector} from 'react-redux'
import {useNavigate} from 'react-router'

function Esewa() {
const orderDetails = useSelector(state => state.orderDetails)
const {order , error , loading} = orderDetails


const navigate = useNavigate()

if(!loading && !error){
    order.itemsPrice = order.orderItems.reduce((acc , item) => acc +( item.quantity * item.price) , 0 )
  }



var path="https://uat.esewa.com.np/epay/main";
 const params= {
    amt: order.itemsPrice,
    psc: 0,
    pdc: order.shippingPrice,
    txAmt: order.taxPrice,
    tAmt: order.totalPrice,
    pid: 'exve45335432',
    scd: "EPAYTEST",
    su: `http://127.0.0.1:3000/order/success/${order._id}`,
    fu: `http://127.0.0.1:3000/failure/${order._id}` ,
}
console.log('amt' , params.tAmt)

const post = (path, params , e) =>  {
    e.preventDefault()
    var form = document.createElement("form");
    form.setAttribute("method", "POST");
    form.setAttribute("action", path);

    for(var key in params) {
        var hiddenField = document.createElement("input");
        hiddenField.setAttribute("type", "hidden");
        hiddenField.setAttribute("name", key);
        hiddenField.setAttribute("value", params[key]);
        form.appendChild(hiddenField);
    }

    document.body.appendChild(form);
    form.submit()
}
  return (
    <>
    <form action="https://uat.esewa.com.np/epay/main" method="POST" onSubmit = {post}>
    <input value={params.tAmt} name="tAmt" type="hidden" />
    <input value={params.amt} name="amt" type="hidden" />
    <input value={params.txAmt} name="txAmt" type="hidden" />
    <input value={params.psc} name="psc" type="hidden" />
    <input value={params.pdc} name="pdc" type="hidden" />
    <input value="EPAYTEST" name="scd" type="hidden" />
    <input value={order._id} name="pid" type="hidden" />
    <input value= {params.su} type="hidden" name="su" />
    <input value = {params.fu} type="hidden" name="fu" />
    <input value="pay with esewa" type="submit"  className='btn btn-success mt-3'/> 
    </form>
    </>
  )
}

export default Esewa