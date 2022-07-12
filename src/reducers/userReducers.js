import {
    USER_LOGIN_REQUEST , 
    USER_LOGIN_SUCCESS , 
    USER_LOGIN_FAIL , 
    USER_LOGOUT,

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
    USER_UPDATE_PROFILE_RESET ,  

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
    USER_EDIT_RESET ,





} from '../constants/userConstants'


export const userLoginReducer =  (state = { } , action) => {
    switch(action.type){
        case USER_LOGIN_REQUEST:
                return {loading: true}
        case USER_LOGIN_SUCCESS:
               return {loading: false , userInfo: action.payload}
        case USER_LOGIN_FAIL:
                return {loading: false , error: action.payload}
        case USER_LOGOUT:
             return {}
        default:
            return state
    }
}

export const userRegisterReducer =  (state = {} , action) => {
    switch(action.type){
        case USER_REGISTER_REQUEST:
                return {loading: true}
        case USER_REGISTER_SUCCESS:
               return {loading: false , userInfo: action.payload}
        case USER_LOGIN_SUCCESS:
              return {loading: false , userInfo: action.payload}
        case USER_REGISTER_FAIL:
                return {loading: false , error: action.payload}
        
        default:
            return state
    }
}



export const userDetailReducer =  (state = {user:{}} , action) => {
    switch(action.type){
        case USER_DETAILS_REQUEST:
                return {...state , loading: true}
        case USER_DETAILS_SUCCESS:
               return {loading: false , user: action.payload}
       
        case USER_DETAILS_FAIL:
                return {loading: false , error: action.payload}
        case USER_DETAILS_RESET:
            return { user: {}}
        default:
            return state
    }
}

export const useUpdateReducer =  (state = {} , action) => {
    switch(action.type){
        case USER_UPDATE_REQUEST:
                return {...state , loading: true}
        case USER_UPDATE_SUCCESS:
               return {loading: false , success:true , user: action.payload}
       
        case USER_UPDATE_FAIL:
                return {loading: false , error: action.payload}
        case USER_UPDATE_PROFILE_RESET:
            return { }
        
        default:
            return state
    }
}



//reducer for user list in admin page
export const userListReducer =  (state = {loading: true} , action) => {
    switch(action.type){
        case USER_LIST_REQUEST:
                return { loading: true}
        case USER_LIST_SUCCESS:
               return {loading: false , users: action.payload}
       
        case USER_LIST_FAIL:
                return {loading: false , error: action.payload}
        case USER_LIST_RESET:
            return { }
        
        default:
            return state
    }
}



//reducer for deleting user from admin panel
export const deleteUserReducer = (state  = {}  ,  action) => {
    switch(action.type){
        case USER_DELETE_REQUEST:
            return {loading: true} 
        case USER_DELETE_SUCCESS:
            return {loading: false  , success:true }
        case USER_DELETE_FAIL:
            return {loading: false , error: action.payload}
        default:
            return state
    }
}


//redducer for editing user from admin page

export const editUserReducer = (state  = {user: {}}  ,  action) => {
    switch(action.type){
        case USER_EDIT_REQUEST:
            return {loading: true} 
        case USER_EDIT_SUCCESS:
            return {loading: false  , success:true }
        case USER_EDIT_FAIL:
            return {loading: false , error: action.payload}
            case USER_EDIT_RESET:
                return  {}
        default:
            return state
    }
}
