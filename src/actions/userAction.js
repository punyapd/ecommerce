import axios from 'axios'
import { useNavigate } from 'react-router-dom'

import {
     USER_LOGIN_SUCCESS , 
     USER_LOGIN_REQUEST , 
     USER_LOGIN_FAIL , 
     USER_LOGOUT , 

     USER_REGISTER_REQUEST , 
     USER_REGISTER_SUCCESS , 
     USER_REGISTER_FAIL ,

    USER_DETAILS_SUCCESS , 
    USER_DETAILS_REQUEST , 
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_UPDATE_SUCCESS ,
    USER_UPDATE_REQUEST,
    USER_UPDATE_FAIL , 
    USER_UPDATE_PROFILE_RESET, 

    USER_LIST_REQUEST,
    USER_LIST_SUCCESS,
    USER_LIST_FAIL,
    USER_LIST_RESET,

    USER_DELETE_REQUEST,
    USER_DELETE_SUCCESS,
    USER_DELETE_FAIL,

    USER_EDIT_REQUEST , 
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL , 
 } from '../constants/userConstants'

 import {MY_ORDER_LIST_RESET } from '../constants/orderConstants'

 //ACTION FOR LOGIIING IN USERS
 
 export const login = (email , password ) => async(dispatch) => {
    
     try{
         dispatch({
             type: USER_LOGIN_REQUEST })
             const sdata = {
                 headers: {
                     'Content-type': 'application/json'
                 }
             }
             const {data} = await axios.post('/api/users/login/' , 
              { 'username': email , 'password': password} , sdata
             )
            
             dispatch({
                type:USER_LOGIN_SUCCESS , 
                payload:data
            })


            localStorage.setItem('userInfo'  , JSON.stringify(data))
        }catch(error){
         dispatch({
             type: USER_LOGIN_FAIL,
             payload: error.response && error.response.data.detail
             ? error.response.data.detail
             : error.message,
         })
     }
 }

//ACTION FOR LOGIIN OUT
 export const logout = () => async(dispatch) => {
     localStorage.removeItem('userInfo')
     dispatch({
         type: USER_LOGOUT
        
     })
     dispatch({
         type:USER_DETAILS_RESET
     })

     dispatch({
         type:MY_ORDER_LIST_RESET
     })
 }

//ACTION FOR REGISTERING USERS
 export const register = (name , email , password ) => async(dispatch) => {
    
    try{
        dispatch({
            type: USER_REGISTER_REQUEST })
            const config = {
                method: "post" , 
                url : '/api/users/register/',
                headers: {
                    'Content-type': 'application/json'
                } , 
                data :  { 'name':name , 'email': email , 'password': password} 
            }
            const {data} = await axios(config)
            
           
          dispatch({
           type:USER_REGISTER_SUCCESS , 
           payload:data
       })

      dispatch({
        type:USER_LOGIN_SUCCESS , 
        payload:data
    })

       dispatch({
           type: USER_LOGOUT,
           payload: {}
       })

       localStorage.setItem('userInfo'  , JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


//action for getting user details fro profile page
export const getUserDetails = (id) => async(dispatch , getState) => {
    
    try{
        dispatch({
            type: USER_DETAILS_REQUEST })

            const{
                loginuser: {userInfo} 
            }  =  getState()
          
           
            const sdata = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.get(`/api/users/${id}/` , 
             sdata)
           
          dispatch({
           type:USER_DETAILS_SUCCESS , 
           payload:data
       })

     

    }catch(error){
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}


//Action for updating user profile 

export const updateProfile = (user) => async(dispatch , getState) => {
    
    try{
        dispatch({
            type: USER_UPDATE_REQUEST })

            const{
                loginuser: {userInfo} 
            }  =  getState()
          
           
            const sdata = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.put(`/api/users/profile/update/` , user,
             sdata)
           
          dispatch({
           type:USER_UPDATE_SUCCESS , 
           payload:data
       })

       dispatch({
        type:USER_LOGIN_SUCCESS , 
        payload:data
    })

     localStorage.setItem('userInfo'  , JSON.stringify(data))

    }catch(error){
        dispatch({
            type: USER_UPDATE_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}



// action for getting all the users from database to admin page.

export const userList = () => async(dispatch , getState) => {
    try{
        dispatch({
            type: USER_LIST_REQUEST,
            
        })
        const{
            loginuser: {userInfo} 
        }  =  getState()

       const config = {
           headers : {
               'data': 'application/json',
               Authorization: `Bearer ${userInfo.token}`
           }
                
        }
      const {data} = await axios.get('/api/users' , config)

    dispatch({
        type: USER_LIST_SUCCESS,
        payload: data
    })

    
    }catch(error){
        dispatch({
            type: USER_LIST_FAIL,
            payload: error.response && error.response.data.detail ?
            error.response.data.detail : error.message
        })
    }
}



//action for deleteing users from admin panel

export const deleteUser = (id) => async(dispatch , getState) => {
    try{
        dispatch({
            type: USER_DELETE_REQUEST,
        
        })
    
        const {
            loginuser: {userInfo}
        } = getState()
    
        const config = {
            headers: {
                'data': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            }
    
        
        }
    
        const {data} = await axios.delete(`api/users/delete/${id}` , config)
    
        dispatch({
            type:USER_DELETE_SUCCESS,
            payload:data
        })
    }catch(error){
        dispatch({
            type: USER_DELETE_FAIL,
            payload: error.response && error.response.data.detail ?
            error.response.data.detail : error.message
        })
    }
   
}


//action for editing user from admin panel.

export const userEdit = (user) => async(dispatch , getState) => {
    
    try{
        dispatch({
            type: USER_EDIT_REQUEST })

            const{
                loginuser: {userInfo} 
            }  =  getState()
          
           
            const sdata = {
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const {data} = await axios.put(`/api/users/update/${user._id}` , user,
             sdata)
           
          dispatch({
           type:USER_EDIT_SUCCESS , 
           payload:data
       })


   
    }catch(error){
        dispatch({
            type: USER_EDIT_FAIL,
            payload: error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
        })
    }
}



