import {
    ORDER_ADD_ITEM_REQUEST,
    ORDER_ADD_ITEM_SUCCESS,
    ORDER_ADD_ITEM_FAIL , 
    ORDER_ITEM_RESET,
    ORDER_DETAILS_REQUEST , 
    ORDER_DETAILS_SUCCESS , 
    ORDER_DETAILS_FAIL,


    ORDER_PAY_REQUEST,
    ORDER_PAY_SUCCESS , 
    ORDER_PAY_FAIL,
    ORDER_PAY_RESET,

    MY_ORDER_LIST_REQUEST,
    MY_ORDER_LIST_SUCCESS,
    MY_ORDER_LIST_FAIL,
    MY_ORDER_LIST_RESET, 

    ORDER_LIST_REQUEST ,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL,
    ORDER_LIST_RESET , 


    ORDER_DELIVER_REQUEST,
    ORDER_DELIVER_SUCCESS , 
    ORDER_DELIVER_FAIL,
    ORDER_DELIVER_RESET
} from '../constants/orderConstants'


export const  orderAddItemReducer =  (state = {} , action) => {
    switch(action.type){
        case ORDER_ADD_ITEM_REQUEST:
            return {loading: true}
        case ORDER_ADD_ITEM_SUCCESS:
            return {loading:false , success : true , order: action.payload}
        case ORDER_ADD_ITEM_FAIL:
            return {loading: false , error: action.payload}
        case ORDER_ITEM_RESET:
            return {}
        default: 
        return state
    }
}


export const orderDetailsReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case ORDER_DETAILS_SUCCESS:
            return {
                loading: false,
                order: action.payload
            }

        case ORDER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload
            }


        default:
            return state
    }
}





export const  orderPayReducer =  (state = { }  , action) => {
    switch(action.type){
        case ORDER_PAY_REQUEST:
            return {loading: true}
        case ORDER_PAY_SUCCESS:
            return {loading:false  , success: true}
        case ORDER_PAY_FAIL:
            return {loading: false , error: action.payload}
        case ORDER_PAY_RESET:
            return {}
        default: 
          return state
    }
}




export const  myOrdersReducer = (state = {loading:true} , action) => {
    switch(action.type){
        case MY_ORDER_LIST_REQUEST:
            return {loading: true}
        case MY_ORDER_LIST_SUCCESS:
            return {loading :false , orders: action.payload}

        case MY_ORDER_LIST_FAIL:
            return {loading:false , error: action.payload}

        case MY_ORDER_LIST_RESET:
            return {}
        default:
            return state
    }
} 


//REDUCER FOR LISTING ALL THE ORDERS IN ADMIN PAGE

export const  lisOrdersReducer = (state = {loading:true} , action) => {
    switch(action.type){
        case ORDER_LIST_REQUEST:
            return {loading: true}
        case ORDER_LIST_SUCCESS:
            return {loading :false , orders: action.payload}

        case ORDER_LIST_FAIL:
            return {loading:false , error: action.payload}

        case ORDER_LIST_RESET:
            return {}
        default:
            return state
    }
} 

//REDUCER FOR UPDATING ORDER TO DELIVERED

export const  orderDeliverReducer =  (state = { }  , action) => {
    switch(action.type){
        case ORDER_DELIVER_REQUEST:
            return {loading: true}
        case ORDER_DELIVER_SUCCESS:
            return {loading:false  , success: true}
        case ORDER_DELIVER_FAIL:
            return {loading: false , error: action.payload}
        case ORDER_DELIVER_RESET:
            return {}
        default: 
          return state
    }
}

