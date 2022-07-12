import React from 'react'
import products from '../Product'

function Service (props) {
  return (
    <div className='col-md-3 col-sm-6 my-3 '>

        <div className="service mx-auto p-3 shadow-lg" style = {{backgroundColor:props.color}}>
        <center><i className= {props.className}></i></center>
            <h6 className='text-center'>{props.text}</h6>
        </div>
    </div>
  )
}

export default  Service