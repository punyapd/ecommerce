import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
        
import { ordersList} from "../actions/orderAction";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function OrderListPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orderlist = useSelector((state) => state.listorders);
  const { orders, error, loading } = orderlist;

  const loginuser = useSelector((state) => state.loginuser);
  const {userInfo} = loginuser

  

  useEffect(() => {
    if (userInfo && userInfo.isAdmin){
       dispatch(ordersList())
      } else{
          
          navigate('/login')
      }
     
  }, [ dispatch,userInfo ]);

  
   
  
  


  

  

  return loading ? (
    <Loader />
  ) : error ? (
    <div className="alert alert-danger mt-5">{error}</div>
  ) : (
    <div className="container">
      <div className="row">
        <div className="col-md-10 col-sm-12 mx-auto">
          <h5 className="text-center mb-4 mt-5">ORDERS</h5>
          <table className="table table-dark table-striped">
            <thead>
              <tr>
                <th scope="col">Id</th>
                <th scope = "col">User</th>
                <th scope="col">Date</th>
                <th scope="col">Total</th>
                <th scope="col">Paid</th>
                <th scope="col">delivered</th>
                <th scope="col">GoTo</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.user && order.user.name}</td>
                  <td>{order.createdAt.substring(0 , 10)}</td>
                  <td>{order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      <i
                        className="fas fa-check"
                        style={{ color: "green" }}
                      ></i>
                    ) : (
                      <i className="fas fa-times" style={{ color: "red" }} />
                    )}
                  </td>

                  <td>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
                        )}
                      </td>
                  <td>
                    <Link to = {`/order/${order._id}`}>
                    <button className="btn-sm"
                  >
                      Details
                    </button></Link>
                    
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
export default OrderListPage;
