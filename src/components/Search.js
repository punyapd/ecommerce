import React ,  {useEffect , useState} from 'react'
import {useNavigate , useLocation} from 'react-router-dom'
function Search() {
    const[key , setKey] = useState('')
    const navigate = useNavigate()
    const location = useLocation()
    const submitHandler = (e) => {
        e.preventDefault()
        if(key){
            navigate(navigate(`/?search=${key}`))
        }else{
            navigate('/')
        }
        
       
    }
  return (
    <>
       <form onSubmit = {submitHandler}>
           <input type="text" onChange={(e) => setKey(e.target.value)}/>
            <button className='btn-sm  btn-info ms-2' > Search</button>
       </form>
    </>
  )
}

export default Search
