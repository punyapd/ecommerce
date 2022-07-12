import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getUserDetails, updateProfile } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import { myOrdersList } from "../actions/orderAction";

function ProfilePage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;

  const { userInfo } = useSelector((state) => state.loginuser);

  const { success } = useSelector((state) => state.userUpdate);

  const myOrders = useSelector((state) => state.myOrders);
  const { error: errorOrders, loading: loadingOrders, orders } = myOrders;
  
  useEffect(() => {
    if(!userInfo){
      navigate('/login')
    }
    
  if (!user || !user.name || success || userInfo._id !== user._id) {
        dispatch({
          type: USER_UPDATE_PROFILE_RESET,
        });

        dispatch(getUserDetails("profile"));
        dispatch(myOrdersList());
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    
  }, [dispatch, userInfo, user, success , navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmpassword) {
      setMessage("passwords donot match");
    } else {
      dispatch(
        updateProfile({
          id: user._id,
          name: name,
          email: email,
          password: password,
        })
      );
    }
  };
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h6 className="text-center mt-3">my Profile</h6>
            {loading && <Loader />}
            {error && <div className="alert alert-danger"> {error} </div>}
            <form onSubmit={handleSubmit}>
              name:
              <input
                type="text"
                placeholder="Enter Your name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              Email:
              <input
                type="text"
                placeholder="Enter Your email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              password:
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              confirm password:
              <input
                type="password"
                placeholder="Enter your password"
                className="form-control"
                value={confirmpassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <center>
                <input
                  type="submit"
                  value="Update"
                  className="btn btn-outline-info my-5"
                />
              </center>
            </form>
          </div>

          <div className="col-md-9">
            <h6 className="text-center mt-3">my orders {loadingOrders}</h6>
            {loadingOrders ? (
              <Loader />
            ) : errorOrders ? (
              <div className="alert alert-danager">{errorOrders}</div>
            ) : (
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Ordered At</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Paid</th>
                    <th scope="col">Delivered</th>
                    <th scope="col">GoTo</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.totalPrice}</td>
                      <td>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          />
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
                        <Link to={`/order/${order._id}`}>
                          <button className="btn-sm btn-info">Details</button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
