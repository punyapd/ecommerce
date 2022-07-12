import React from 'react'
import {Link} from "react-router-dom"
function CheckoutProgess({step1 , step2 ,step3 , step4}) {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            
        <div>
      <ul className="navbar-nav ">
        <li className="nav-item mx-5">
            {step1 ?  ( 
                 <Link className="nav-link"  to = '/login' >login</Link>
            ):(<Link className="nav-link disabled"  to = '/login' >login</Link>)
            
            }
         
        </li>
        <li className="nav-item mx-5">
        {step2 ?  ( 
                 <Link className="nav-link "  to = '/shipping' >shipping</Link>
            ):(<Link className="nav-link disabled"  to = '/shipping' >shipping</Link>)
            
            }
        </li>
        <li className="nav-item mx-5">
        {step3 ?  ( 
                 <Link className="nav-link "  to = '/payment' >payment</Link>
            ):(<Link className="nav-link disabled"  to = '/payment' >payment</Link>)
            
            }
        </li>
        <li className="nav-item mx-5" >
        {step4 ?  ( 
                 <Link className="nav-link"  to = '/placeorder' >placeorder</Link>
            ):(<Link className="nav-link disabled"  to = '/placeorder' >placeorder</Link>)
            
            }
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}

export default CheckoutProgess