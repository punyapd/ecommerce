import {
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS,
    PRODUCT_LIST_FAIL,

    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL ,

    PRODUCT_DELETE_REQUEST,
    PRODUCT_DELETE_SUCCESS,
    PRODUCT_DELETE_FAIL , 

    PRODUCT_CREATE_REQUEST , 
    PRODUCT_CREATE_SUCCESS,
    PRODUCT_CREATE_FAIL , 
    PRODUCT_CREATE_RESET , 


    PRODUCT_UPDATE_REQUEST,
    PRODUCT_UPDATE_SUCCESS ,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET ,

    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,

    PRODUCT_TOP_REQUEST,
    PRODUCT_TOP_SUCCESS,
    PRODUCT_TOP_FAIL,
    PRODUCT_TOP_RESET,

} from '../constants/productConstant'

//reducer for showing the products
export const productListReducer = (state = {products : []} , action) => {
    switch(action.type){
        case PRODUCT_LIST_REQUEST:
            return {loading:true , products: []}
        case PRODUCT_LIST_SUCCESS:
            return {loading:false ,products: action.payload}
        case PRODUCT_LIST_FAIL:
            return {loading:false , error: action.payload}
        
        default :
           return state
               

    }
}





//reducer for displaying detils of products
export const productDetailsReducer = (state = {product :{reviews:[]} , loading:false}, action) => {
    switch(action.type){
        case PRODUCT_DETAILS_REQUEST:
            return {loading:true , ...state}
        case PRODUCT_DETAILS_SUCCESS:
            return {loading:false , product: action.payload}
        case PRODUCT_DETAILS_FAIL:
            return {loading:false , error: action.payload}
        default :
           return state
               

    }
}



//for showing product list in admin panel

export const productDeleteReducer = (state = {}, action) => {
    switch(action.type){
        case PRODUCT_DELETE_REQUEST:
            return {loading:true}
        case PRODUCT_DELETE_SUCCESS:
            return {loading:false , success: true}
        case PRODUCT_DELETE_FAIL:
            return {loading:false , error: action.payload}
        default :
           return state
               

    }
}



//reduer for creating a new product 

export const createProductReducer = (state = {product : []  , success:false} , action) => {
    switch(action.type){
        case PRODUCT_CREATE_REQUEST:
            return {loading:true }
        case PRODUCT_CREATE_SUCCESS:
            return {loading:false ,success: true ,  product: action.payload}
        case PRODUCT_CREATE_FAIL:
            return {loading:false , error: action.payload}
         case PRODUCT_CREATE_RESET:
                return { }
        default :
           return state
               

    }
}



//REUCER FOR EDITING A PRODUCT FROM ADMIN PANEL

export const editProductReducer = (state = {products :{} , success:false }, action) => {
    switch(action.type){
        case PRODUCT_UPDATE_REQUEST:
            return {loading:true }
        case PRODUCT_UPDATE_SUCCESS:
            return {loading:false ,success: true ,  products: action.payload}
        case PRODUCT_UPDATE_FAIL:
            return {loading:false , error: action.payload}
         case PRODUCT_UPDATE_RESET:
                return {product : {}}
        default :
           return state
               

    }
}


//REDUCER FOR CREATING PRODUCT REVIEW
export const createProductReviewReducer = (state = {review: {}} , action) => {
    switch(action.type){
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {loading:true }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return {loading:false ,success: true ,  review: action.payload}
        case PRODUCT_CREATE_REVIEW_FAIL:
            return {loading:false , error: action.payload}
         case PRODUCT_CREATE_REVIEW_RESET:
                return { }
        default :
           return state
               

    }
}


//REDUCER FOR FETCHING TOP PRODUCTS FROM DATABASE

export const getTopProductreducer = (state = {top: []}, action) => {
    switch(action.type){
        case PRODUCT_TOP_REQUEST:
            return {loading:true }
        case PRODUCT_TOP_SUCCESS:
            return {loading:false ,success: true ,  top: action.payload}
        case PRODUCT_TOP_FAIL:
            return {loading:false , error: action.payload}
         case PRODUCT_TOP_RESET:
                return { }
        default :
           return state
               

    }
}




 