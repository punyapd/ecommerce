import {
  ORDER_ADD_ITEM_REQUEST,
  ORDER_ADD_ITEM_SUCCESS,
  ORDER_ADD_ITEM_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  MY_ORDER_LIST_REQUEST,
  MY_ORDER_LIST_SUCCESS,
  MY_ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_RESET,

  ORDER_DELIVER_REQUEST,
  ORDER_DELIVER_SUCCESS , 
  ORDER_DELIVER_FAIL,
  ORDER_DELIVER_RESET
} from "../constants/orderConstants";

import axios from "axios";
import { CART_CLEAR_ITEM } from "../constants/cartConstants";

export const addOrderItem = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_ADD_ITEM_REQUEST,
    });

    const {
      loginuser: { userInfo },
    } = getState();

    const sdata = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post("/api/orders/addorder/", order, sdata);

    dispatch({
      type: ORDER_ADD_ITEM_SUCCESS,
      success: true,
      payload: data,
    });

    dispatch({
      type: CART_CLEAR_ITEM,
      payload: data,
    });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: ORDER_ADD_ITEM_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//action for gettinig order details of users
export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      loginuser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/${id}/`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


//ACTION FOR UPDATING ORDER PAY STATUS
export const payOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      loginuser: { userInfo },
    } = getState();
    const token = userInfo.token;
    const config = {
      method: "put",
      url: `/api/orders/${id}/pay/`,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios(config);

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//action for showing orders list in profile page

export const myOrdersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: MY_ORDER_LIST_REQUEST,
    });

    const {
      loginuser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/myorders/`, config);

    dispatch({
      type: MY_ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MY_ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

//ACTION FOR LISTING ALL THE ORDERS IN ADMIN PAGE
export const ordersList = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_LIST_REQUEST,
    });

    const {
      loginuser: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/orderslist/`, config);

    dispatch({
      type: ORDER_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};


//ACTION FOR UPDATING ORDER DELVIER STATUS

export const deliverOrder = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DELIVER_REQUEST,
    });

    const {
      loginuser: { userInfo },
    } = getState();
    const token = userInfo.token;
    const config = {
      method: "put",
      url: `/api/orders/${id}/deliver/`,
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    };

    const { data } = await axios(config);

    dispatch({
      type: ORDER_DELIVER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DELIVER_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};




