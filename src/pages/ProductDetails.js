import React, { createRef, useEffect, useState } from "react";
import products from "../Product";
import { Link, useParams, useNavigate } from "react-router-dom";
import Rating from "../components/Rating";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstant";

function ProductDetails({}) {
  const { id } = useParams();
  const navigate = useNavigate();
  console.log(navigate);
  const [Qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();
  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const { userInfo } = useSelector((state) => state.loginuser);

  const productreview = useSelector((state) => state.reviewCreate);
  const {
    error: reviewError,
    loading: reviewLoading,
    success: successReview,
    reviews,
  } = productreview;

  useEffect(() => {
    if (successReview) {
      
      setRating(0);
      setComment('');
      
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    
      dispatch(listProductDetails(id));
  
   
  } , [dispatch , id , successReview]);

  const handleAddToCart = (e) => {
    navigate(`/cart/${id}?qty=${Qty}`);
  };

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(id, 
      { rating, comment }));
  };
  return (
    <>
      <div className="container">
        {loading ? (
          <Loader />
        ) : error ? (
          <Message error={error} />
        ) : (
          <div>
            <div className="row my-5">
              <div className="col-md-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <h6>{product.name}</h6>
                  </li>
                  <li className="list-group-item">
                    <Rating
                      value={product.rating}
                      text={`${product.numReviews} reviews`}
                      color={"#f8e825"}
                    />
                  </li>
                  <li className="list-group-item">
                    <h3> price: ${product.price}</h3>
                  </li>
                  <li className="list-group-item">
                    <p> Description: {product.description}</p>
                  </li>
                  <li className="list-group-item text-center">
                    <Link to="/" className="btn btn-danger">
                      Go Back
                    </Link>
                  </li>
                </ul>
              </div>

              <div className="col-md-6">
                <img src={product.image} className="img-fluid" height="100px" />
              </div>

              <div className="col-md-3">
                <ul className="list-group list-group-flush">
                  <li className="list-group-item">
                    <strong> price:${product.price}</strong>
                  </li>
                  <li className="list-group-item">
                    <strong>
                      status:{" "}
                      {product.countInStock > 0
                        ? `${product.countInStock} pieces remaining`
                        : "out of stock"}
                    </strong>
                  </li>

                  {product.countInStock > 0 && (
                    <li className="list-group-item">
                      <div className="row">
                        <div className="col">
                          <strong>quantity</strong>
                        </div>
                        <div className="col">
                          <form onChange={(e) => setQty(e.target.value)}>
                            <select>
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1}>{x + 1}</option>
                                )
                              )}
                            </select>
                          </form>
                        </div>
                      </div>
                    </li>
                  )}

                  <li className="list-group-item text-center">
                    <button
                      className="btn btn-outline-warning"
                      disabled={product.countInStock == 0}
                      onClick={handleAddToCart}
                    >
                      {" "}
                      Add To Cart
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12">
                <center>
                  {" "}
                  <h5>Reviews</h5>
                  {product.reviews.length === 0 && (
                    <div className="alert alert-info">No Reviews Yet.</div>
                  )}
                </center>
                <ul className="list-group">
                  {product.reviews.map((review) => (
                    <li className="list-group-item" key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} color="#f8e825" />
                      <p> {review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </li>
                  ))}

                  <li className="list-group-item">
                    <h6>GIVE YOUR HONEST REVIEW</h6>
                    {reviewLoading && <Loader />}
                    {reviewError && (
                      <div className="alert alert-danger">{reviewError}</div>
                    )}
                  </li>

                  {userInfo ? (
                    <form onSubmit={submitHandler} className="mb-5">
                      <label>chosse your rating: </label>
                      <select onChange={(e) => setRating(e.target.value)}>
                        <option value = "1">bad</option>
                        <option value = "2"> not bad</option>
                        <option value = "2">good </option>
                        <option value = "4">very good</option>
                        <option value = "5">excellent</option>
                      </select><br></br>
                       <label>Comment </label>
                      <textarea className="form-control"  onChange={(e) => setComment(e.target.value) }/>
                      <button className="btn btn-outline-info">submit</button>
                    </form>
                  ) : (
                   <div className="alert alert-info">Please <Link to = '/login' >login</Link> to review the product.</div>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProductDetails;
