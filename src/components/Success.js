import React, { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getOrderDetails, payOrder } from "../actions/orderAction";


function Success() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [searchparams, setSearchParams] = useSearchParams();
  const oid = searchparams.get("oid");
  const refid = searchparams.get("refId");
  const amount = searchparams.get("amt");

  const dispatch = useDispatch();
  
  
  
  const handleClick = (e) => {
    dispatch(payOrder(id));

    navigate(`/order/${id}/`);
  };

  
 // payment verification for esewa
  
 

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-6 mx-auto">
            <ul className="list-group p-5">
              <li className="list-group-item">
              <div className="alert alert-success mt-4 p-3 text-center">
              Payment successfull!!!
            </div>
              </li>
              <li className="list-group-item">
                  <div className="row">
                      <div className="col">Order ID </div>
                      <div className="col">{oid}</div>
                  </div>
              </li>
              <li className="list-group-item">
              <div className="row">
                      <div className="col">Refreence ID </div>
                      <div className="col">{refid}</div>
                  </div>
              </li>
              <li className="list-group-item">
              <div className="row">
                      <div className="col">Amount </div>
                      <div className="col">{amount}</div>
                  </div>
              </li>
              <li className="list-group-item text-center">
              <button className="btn btn-outline-primary" onClick={handleClick}>
              Back to order Details
            </button>
              </li>
            </ul>
            

            
          </div>
        </div>
      </div>
    </>
  )
  
  }

export default Success;
