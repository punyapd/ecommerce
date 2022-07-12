import React from 'react'

function FormContainer({children}) {
  return (
   <>
         <div className="container">
                <div className="row">
                <div className="col-md-6 col-sm-12 mx-auto" >
                   { children}
                </div>
            </div>
         </div>
   </>
  )
}

export default FormContainer