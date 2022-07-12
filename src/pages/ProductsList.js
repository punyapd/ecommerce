import React, { useEffect } from 'react'
import {deleteProduct, listProducts , createProduct} from '../actions/productAction'
import {useDispatch , useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Link , useNavigate } from 'react-router-dom'
import { PRODUCT_CREATE_RESET } from '../constants/productConstant'


function ProductsList() {

    const navigate = useNavigate()

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error , loading , products} = productList

    const loginuser = useSelector((state) => state.loginuser);
    const {userInfo} = loginuser

    const deleteproduct = useSelector(state => state.deleteproduct)
    const {loading: loadingdelete ,  success: deleteSuccess , error:errodelete} = deleteproduct

    const createdproduct = useSelector(state => state.addproduct)
    const {loading : loadingcreate , success: createsuccess , error: errorcreate , product: createdProduct} = createdproduct


    useEffect(() => {
        dispatch({
            type: PRODUCT_CREATE_RESET
        })
        if(!userInfo.isAdmin){
           navigate('/login')
        }
        if(createsuccess) {
            console.log('createsuccess: ' , createsuccess)
              navigate(`/admin/product/${createdProduct._id}/edit/`)
        }else{
            dispatch(listProducts())
        }
       
  } , [dispatch , userInfo ,navigate,  deleteSuccess , createsuccess , createdProduct])

  const handleDelete = (id) => {
       if(window.confirm("are you sure you want to delete this product? ")) {
        dispatch(deleteProduct(id))
       }
        
  }


  const createProductHandler = () => {
      dispatch(createProduct())
  }
    return loading ? (
        <Loader />
      ) : error ? (
        <div className="alert alert-danger mt-5">{error}</div>
      ) : (
        <div className="container">
            <div className="row">
                <div className="col">
                <h5 className="text-center mb-4 mt-5">PRODUCTS</h5>
                </div>
                <div className="col">
                    <button className='btn btn-outline-dark mb-4 mt-5' onClick={createProductHandler}>ADD NEW PRODUCT</button>
                </div>
            </div>
            {loadingdelete && (<Loader />)}
            {errodelete &&(
                <div className="alert alert-danger">{errodelete}</div>
            )}

            {loadingcreate && (<Loader />)}
            {errorcreate &&(
                <div className="alert alert-danger">{errorcreate}</div>
            )}
          <div className="row">

            <div className="col-md-11 col-sm-12 mx-auto">
              
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Id</th>
                    <th scope = "col">image</th>
                    <th scope="col">name</th>
                    <th scope="col">brand</th>
                    <th scope="col">price</th>
                    <th scope="col">category</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td className='p-1'><img src = {product.image} height="50px" width="50px"/></td>
                      <td>{product.name}</td>
                      <td>{product.brand}</td>
                      <td>${product.price}</td>
                      <td>{product.category}</td>
                     
                       <td>
                        <Link to = {`/admin/product/${product._id}/edit`}>
                        <button className="btn-sm"
                      >
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button></Link>
                        <button className="btn-sm" 
                        onClick={() => handleDelete(product._id)}>
                          <i
                            className="fa-solid fa-trash-can"b
                            style={{ color: "red" }}
                          ></i>
                        </button>
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

export default ProductsList