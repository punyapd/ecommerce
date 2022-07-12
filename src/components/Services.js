import React from 'react'
import Service from './Service'
function Services() {
  return (
    <div>
        <div className="container">
            <h5 className='text-center my-3'>Services</h5>
            <div className="row">
                
                <Service color = "skyblue" className = "fa-solid fa-retweet"  text = "15 days return"/>
                <Service color = "aqua" className = "fa-solid fa-lock" text = "secure payment" />
                <Service color = "lightblue" className = "fa-solid fa-truck-fast" text = "free shipment" />
                <Service color = "grey" className = "fa-brands fa-product-hunt"  text = "quality products" />
                
            </div>
        </div>
    </div>
  )
}

export default Services