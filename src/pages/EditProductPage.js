import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import FormContainer from "../components/Form";
import Loader from "../components/Loader";

import { editProduct, listProductDetails } from "../actions/productAction";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstant";

import axios  from "axios";





function EditProductPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [uploading , setUploading] = useState(false)

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productEdit = useSelector((state) => state.editproduct);
  const {
    loading: updateLoading,
    error: updateError,
    success: successUpdate,
  } = productEdit;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      navigate("/admin/products/");

    }else {
        if(!product.name || product._id !== Number(id)){
            dispatch(listProductDetails(id))
            console.log('successupdate : ' , successUpdate)
        }else{
            console.log('this is not working') 
            setName(product.name);
            setBrand(product.brand);
            setCategory(product.category);
            setPrice(product.price);
            setImage(product.image);
            setCountInStock(product.countInStock);
            setDescription(product.description);
    
        }
    }
   
    
   
      
  
  }, [product.name , product.brand , product.category , product.price , product.countInStock ,
    product.description , product.image , product._id , id ,  dispatch, successUpdate,navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editProduct({
        _id: id,
        name,
        brand,
        price,
        image,
        category,
        description,
        countInStock,
      })
    );
  };


  const imageUploadHandler = async(e) => {
    console.log("image upload handler acitvated")
    const file = e.target.files[0]
    console.log('file : ' , file)
    const formdata  = new FormData()

    formdata.append('image' , file)
    formdata.append('product_id' , id)

    setUploading(true)
   
    try{
      const config = {
        method: "post",
        url: `/api/products/upload/`,
        headers: {
          "Content-type": "mulitpart/form-data",
         
        } , 
        data : formdata
      }
     const {data} = await axios(config)
      
      setImage(data)
  
      setUploading(false)
      
    }catch(error){
      console.log('error' , error)
      setUploading(false)
    }

    

  }
  return (
    <>
      <FormContainer>
        <center>
          <h3 className="my-4">Edit Product</h3>
        </center>
        {updateLoading && <Loader />}
        {updateError && <div className="alert alert-danger">{updateError}</div>}
        {loading ? (
          <Loader />
        ) : (
          <form onSubmit={handleSubmit}>
            name:
            <input
              type="text"
              placeholder="Enter product name"
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            image:
            <input
              type="text"
              placeholder="Enter image name"
              className="form-control"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
            <input type="file"
             name="image"
             id="image"
             className="mt-2"
             onChange={imageUploadHandler}
             /> {uploading && (<Loader />)} <br />
            category:
            <input
              type="text"
              placeholder="Enter category name"
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            Price:
            <input
              type="number"
              value={price}
              className="form-control"
              onChange={(e) => setPrice(Number(e.target.value))}
            />
            stock:
            <input
              type="number"
              value={countInStock}
              className="form-control"
              onChange={(e) => setCountInStock(e.target.value)}
            />
            description:
            <input
              type="textarea"
              value={description}
              className="form-control"
              onChange={(e) => setDescription(e.target.value)}
            />
            <center>
              <input
                type="submit"
                value="Update"
                className="btn btn-warning my-5"
              />
            </center>
          </form>
        )}
      </FormContainer>
    </>
  );
}

export default EditProductPage;
