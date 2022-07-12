import React, {useEffect, useState } from "react";
import FormContainer from "../components/Form";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router-dom";
import {  getUserDetails , userEdit } from "../actions/userAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { USER_EDIT_RESET } from "../constants/userConstants";
function RegisterPage() {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("")
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { error, loading, user } = userDetails;


  const UserEdit = useSelector((state) => state.userEdit);
  const { error: editError, loading: editLoading , success: successEdit } = UserEdit;

  useEffect(() => {
    if(successEdit){
      dispatch({
        type: USER_EDIT_RESET
        
      })

      navigate('/admin/userlists')
    }
    if( !user.name || user._id !== Number(id)){
      dispatch(getUserDetails(id))
    }else{
      setName(user.name)
      setEmail(user.email)
      setIsAdmin(user.isAdmin)
    }
  } , [user , id , dispatch , successEdit])

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userEdit({_id: user._id , name , email , isAdmin , }))
  };

  return (
    <>
      <FormContainer>
       
       
        <center>
          <h3 className="my-4">Edit User</h3>
          </center>

          {loading ?  (
            <Loader />
          ) : (
            <form onSubmit={handleSubmit}>
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
            isAdmin: 
            <input
              type="checkbox"
              checked={isAdmin}
              className= "mt-3"
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            <center>
              <input
                type="submit"
                value="Update"
                
                className="btn btn-warning my-5"
              />
            </center>
          </form>
          )}
        
         </FormContainer>
    
    </>
  )
}

export default RegisterPage;
