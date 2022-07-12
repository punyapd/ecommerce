import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { GetTopProducts } from "../actions/productAction";
import Loader from "./Loader";
function Carousel() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.topProducts);

  const { error, loading, top } = products;

  useEffect(() => {
    dispatch(GetTopProducts());
  }, [dispatch]);
  return loading ? (
    <Loader />
  ) : error ? (
    <div className="alert alert-danger">{error}</div>
  ) : (
    <div className="container">
      <div
        id="carouselExampleInterval"
        className="carousel carousel-dark slide"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner mt-5">
          {top.map((product , index) => (
            <div  data-bs-interval="1000" className= {index == 0 ? 'carousel-item active' : 'carousel-item' }  >
              <div className="row">
                
                <div className="col-md-6 mx-auto " >
                  <center>
                 <img
                    src={product.image}
                    className="img-fluid rounded-circle"
                    alt="..."
                    // style={{marginLeft:"200px" ,  marginTop:"200px;"}}
                  />
                  <p className="mt-5">{product.name}</p>
                  <strong>{product.price}</strong>
                  </center>
                </div>

                <div className="col d-flex justify-content-center flex-column text-center">
                    <h4 style={{color:"blue"}}>SPECIAL OFFER ONLY FOR YOU</h4>
                    <h6> HURRY UP AND BUY AT 10% DISCOUNT</h6>

                    
                      <center> <Link to = {`/product/${product._id}/`} ><button className="btn btn-outline-warning mt-5">SEE PRODUCT DETAILS</button></Link></center>

                     <p style={{color:'blue'}} className="mt-5">OFFER IS VALID ONLY FOR 3 DAYS</p>
                    
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleInterval"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
}

export default Carousel;
