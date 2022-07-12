import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useParams , useNavigate } from "react-router-dom";
import { addToCart  , removeFromCart} from "../actions/cartAction";
import Message from "../components/Message";

function CartScreen() {
  let [searchparmas] = useSearchParams();
  const { id } = useParams();
  const navigate = useNavigate()
  const qty = searchparmas.get("qty");
 
  const dispatch = useDispatch();
  
  const {userInfo} = useSelector(state => state.loginuser)
  if(userInfo == null){
    console.log('this should be redirected to login.')
    navigate('/login')
  }

  useEffect(() => {
    if (id) {
      dispatch(addToCart(id, qty));
    }
  }, [dispatch, id, qty]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  };

  //function for handling checkout 

  const handleCheckout = e => {
    
    navigate('/shipping')
  }

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  
  return (
    <div>
      <div className="container ">
        <h3 className="text-center mt-3 mb-5"> Your Cart</h3>
        {cartItems.length === 0 ? (
          <Message error="Your Cart is empty" />
        ) : (
          <div className="row">
            <div className="col-md-8">
              <ul className="list-group list-group-flush">
                {cartItems.map((item) => (
                  <li className="list-group-item" key={item.product}>
                    <div className="row">
                      <div className="col-md-2">
                        <img
                          src={item.image}
                          alt={item.image}
                          className="img-fluid"
                        />
                      </div>
                      <div className="col-md-3">
                        <strong>{item.name}</strong>
                      </div>
                      <div className="col-md-2">
                        <h6>${item.price}</h6>
                      </div>

                      <div className="col-md-2">
                        <form
                          onChange={(e) =>
                            dispatch(
                              addToCart(item.product, Number(e.target.value))
                            )
                          }
                        >
                          <select value={item.qty}>
                            {[...Array(item.countInStock).keys()].map((x) => (
                              <option key={x + 1}>{x + 1}</option>
                            ))}
                          </select>
                        </form>
                      </div>
                      <div className="col-md-2">
                        <button
                          className="btn-block btn-danger p-2"
                          onClick={() => removeFromCartHandler(item.product)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-md-4">
              <div className="card">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h2>
                      Total Items:{" "}
                      {cartItems.reduce(
                        (acc, item) => acc + Number(item.qty),
                        0
                      )}
                    </h2>
                  </li>

                  <li className="list-group-item">
                    <h5>
                      Total Price:{" "}
                      {cartItems.reduce(
                        (acc, item) => acc + (Number(item.qty) * item.price),0
                      ).toFixed(2)}
                    </h5>
                  </li>

                  <li className="list-group-item text-center">
                     <button className="btn-lg btn-dark " 
                     onClick={handleCheckout}
                     disabled = {cartItems.length === 0} >CHECKOUT</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CartScreen;
