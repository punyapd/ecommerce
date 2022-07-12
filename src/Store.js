import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";


import { cartItemReducer } from "./reducers/cartReducers";

import {
  productListReducer,
  productDetailsReducer,
  productDeleteReducer,
  createProductReducer , 
  editProductReducer , 
  createProductReviewReducer,
  getTopProductreducer

}from "./reducers/productReducers";

import {
  userLoginReducer,
  userRegisterReducer,
  userDetailReducer,
  useUpdateReducer,
  userListReducer,
  deleteUserReducer,
  editUserReducer,
} from "./reducers/userReducers";
import {
  orderAddItemReducer,
  orderDetailsReducer,
  orderPayReducer,
  myOrdersReducer, 
  lisOrdersReducer , 
  orderDeliverReducer
} from "./reducers/orderReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartItemReducer,
  loginuser: userLoginReducer,
  registeruser: userRegisterReducer,
  userDetails: userDetailReducer,
  userUpdate: useUpdateReducer,
  orderAddItem: orderAddItemReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  myOrders: myOrdersReducer,
  usersList: userListReducer , 
  userDelete: deleteUserReducer,
  userEdit : editUserReducer,
  deleteproduct : productDeleteReducer,
  addproduct: createProductReducer,
  editproduct: editProductReducer,
  listorders: lisOrdersReducer,
  orderDeliver : orderDeliverReducer , 
  reviewCreate : createProductReviewReducer,
  topProducts: getTopProductreducer,
});

const cartItemsInStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoInStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressInStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

console.log("itemsinstorage: ", cartItemsInStorage);
const initialState = {
  cart: {
    cartItems: cartItemsInStorage,
    shippingAddress: shippingAddressInStorage,
  },
  loginuser: { userInfo: userInfoInStorage },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
