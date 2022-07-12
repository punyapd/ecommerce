import React from 'react'
import {useNavigate , useParams} from 'react-router'
function Failure() {
    const navigate = useNavigate()
    const {id} = useParams()

    const handleClick = (e) => {
        navigate(`/order/${id}/`)

    }
  return (
   <>
      <div className="container">
          <div className="row">
              <div className="col-md-6 mx-auto mt-5">
                  <div className="alert alert-danger">Unfortunately!!! your paymnet was failed..</div>
                  <button className='btn btn-primary' onClick={handleClick}>Go Back </button>
              </div>
          </div>
      </div>
   </>
  )
}

export default Failure