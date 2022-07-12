import React, { useEffect ,  useState } from "react";
import FormContainer from "../components/Form"
import { useDispatch, useSelector } from "react-redux";
import {Link , Navigate, useNavigate } from 'react-router-dom'
import { login } from "../actions/userAction";
import Loader  from '../components/Loader'
import Message  from '../components/Message'
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const loginuser  = useSelector(state => state.loginuser)
  const {error  , loading , userInfo} = loginuser
  
 const handleSubmit = (e) => {
      e.preventDefault()
       dispatch(login(email , password))
      }

  useEffect(() => {
    if(userInfo){
      navigate('/')
    }
  })

  

  

 
  return (
    <>
      <FormContainer>
       {error && <Message error = {error} />}
       {loading && <Loader />}
        <center>
          <h3 className="my-4">Login</h3>
        </center>
        <form  onSubmit={handleSubmit}>
          Email:{" "}
          <input
            type="text"
            placeholder="Enter Your email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          password:{" "}
          <input
            type="password"
            placeholder="Enter your password"
            className="form-control"
            value = {password}
            onChange={(e) => 
              
              setPassword(e.target.value)}
          />
          <center>
            <input
              type="submit"
              value="Login"
              className="btn btn-warning my-5"
              
            />
          </center>
        </form>
        <div className="row my-3">
              <div className="col">
                New Customer? <Link to  = '/register' > Register</Link>
              </div>
        </div>
      </FormContainer>
    </>
  );
}

export default LoginPage;
