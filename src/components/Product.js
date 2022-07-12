import React from "react";
import Rating from "./Rating";
import { Link } from "react-router-dom";
function Product(props) {
  return (
    <div>
      <div className="card">
        <Link to={`/product/${props.product._id}`}>
          <img
            src={props.product.image}
            className="card-img-top img-fluid"
            alt="..."
            style={{ maxHeight: "175px" }}
          />
        </Link>
        <div className="card-body d-flex justify-content-center flex-column">
        <Link to={`/product/${props.product._id}`} style={{textDecoration: "none" , color:"inherit"}}>
          <h6 className="card-title" >{props.product.name}</h6>
        </Link>
          <div className="rating my-3">
            <Rating
              value={props.product.rating}
              text={`${props.product.numReviews} reviews`}
              color={"#f8e825"}
            />
          </div>
          <div className="price mt-2">
            <h5>${props.product.price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
