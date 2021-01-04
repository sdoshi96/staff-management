import {
  FETCH_HR,
  FETCH_EMP,
  FETCH_EMP_PROFILE,
    SET_CURRENT_USER,
    USER_LOADING
  } from "../actions/types";
  
  const isEmpty = require("is-empty");
  
  const initialState = {
    isAuthenticated: false,
    user: {},
    hrDetails: [],
    empDetails: [],
    profileDetails: {},
    loading: false
  };
  export default function(state = initialState, action) {
    switch (action.type) {
      case SET_CURRENT_USER:
        return {
          ...state,
          isAuthenticated: !isEmpty(action.payload),
          user: action.payload
        };
      case USER_LOADING:
        return {
          ...state,
          loading: true
        };
      case FETCH_HR:
        return{ ...state,
          hrDetails : action.payload
        };
      case FETCH_EMP:
        return{
          ...state,
          empDetails: action.payload
        };
      case FETCH_EMP_PROFILE:
        return {
          ...state,
          profileDetails: action.payload
        }
      default:
        return state;
    }
  }