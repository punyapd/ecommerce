import React, { useState , useEffect } from 'react'
import {useNavigate , useSearchParams , useLocation} from 'react-router-dom'
import Product from '../components/Product'
import Services from '../components/Services'
import {listProducts} from '../actions/productAction'
import {useDispatch , useSelector} from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Carousel from '../components/Carousel'

function Homescreen() {
    const location = useLocation()
    const [searchParams , setSearchParams] = useSearchParams()
    let key  = location.search
    console.log('key' , location)
    

    const dispatch = useDispatch()
    const productList = useSelector(state => state.productList)
    const {error , loading , products} = productList


    useEffect(() => {
          dispatch(listProducts(key))
    } , [dispatch , key])

    
    
  return (
    <>
     {!key && (
         <div>
        <Carousel />
        <Services />
        </div>
        )}
     
    <div className="container">
       
        <h3 className='text-center mt-4'>Latest Products</h3>
        {
            loading ? <Loader  />
            :error ? <Message error = {error} />
            :
            <div className="row">
           
             {
                 products.map((product) => (
                    <div  key = {product._id} className="col-sm-6 col-md-3 my-3">
                        <Product  product = {product} />
                    </div>
                 ))
             }
            </div>

        }
        
        
    </div>
   </>
  )
            }
export default Homescreen