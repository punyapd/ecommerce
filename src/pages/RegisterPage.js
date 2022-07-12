
import React, { useEffect ,  useState } from "react";
import FormContainer from "../components/Form"
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate } from 'react-router-dom'
import { register } from "../actions/userAction";
import Loader  from '../components/Loader'
import Message  from '../components/Message'
function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const[name , setName] = useState('');
    const[message , setMessage] = useState('')
    const[successmessage , setSuccessMessage] = useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()

   
   
    const userRegister = useSelector(state => state.registeruser)
    const {error , loading , userInfo} = userRegister
    
    const handleSubmit = (e)=> {
        e.preventDefault()
        if(password != confirmpassword){
            setMessage('passwords donot match')
        }else{
            dispatch(register(name  , email , password ))
            }
       }

    // useEffect(() => {
    //     if(userInfo){
    //         navigate('/')
    //     }
    // })

      
   
    

  return (
    <>
        <FormContainer>
        {error && <Message error = {error}> {error} </Message> }
       {message && <Message error  = {message}>  </Message> }
       {loading && <Loader />}
        <center>
          <h3 className="my-4">Register</h3>
        </center>
        <form  onSubmit={handleSubmit}>
            name: 
            <input
            type="text"
            placeholder="Enter Your name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          Email:
          <input
            type="text"
            placeholder="Enter Your email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          password:
          <input
            type="password"
            placeholder="Enter your password"
            className="form-control"
            value = {password}
            onChange={(e) => 
              
              setPassword(e.target.value)}
          />

password:
          <input
            type="password"
            placeholder="Enter your password"
            className="form-control"
            value = {confirmpassword}
            onChange={(e) => 
              
              setConfirmPassword(e.target.value)}
          />
          <center>
            <input
              type="submit"
              value="Register"
              className="btn btn-warning my-5"
              
            />
          </center>
        </form>
    </FormContainer>
    {userInfo && (
        < div className="text-center">
        
        <strong> Successfully registerd !!!! please<Link to = '/login' >  LOG IN</Link> to continue!!</strong>
        </div>
    )}
    </>
  )
}


export default RegisterPage