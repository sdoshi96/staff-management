import axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
import {
  GET_ERRORS,
  SET_CURRENT_USER,
  USER_LOADING,
  FETCH_HR,
  FETCH_EMP,
  FETCH_EMP_PROFILE
} from "./types";


// Register Admin User
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/admin/signup", userData)
    .then(res => history.push("/admin-login")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//Create HR user
export const registerHrUser = (hrData, history) => dispatch => {
  axios
    .post("/admin-secure/createHr", hrData)
    .then(res => history.push("/dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
//Create Employee user
export const registerEmpUser = (id, empData, history) => dispatch => {
  axios
    .post(`/hr-secure/createEmp/${id}`, empData)
    .then(res => history.push("/hr-dashboard")) // re-direct to login on successful register
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
// Login - get user token
export const loginUser = userData => dispatch => {
  axios
    .post("/admin/login", userData)
    .then(res => {
      const { token } = res.data;
      Cookies.set('jwt', token);
      // Decode token to get user data
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//HR login - get hr user token
export const hrLoginUser = hrUserData => dispatch => {
  axios
    .post("/hr/hr-login", hrUserData)
    .then(res => {
      const { token } = res.data;
      Cookies.set('jwt', token);
      // Decode token to get user data
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
//EMP login - get emp user token
export const empLoginUser = empUserData => dispatch => {
  axios
    .post("/emp/emp-login", empUserData)
    .then(res => {
      const { token } = res.data;
      Cookies.set('jwt', token);
      // Decode token to get user data
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
}
//get HR Details
export const getHRDetails = () => async ( dispatch ) => {
  try {
      const { data } = await axios.get("/admin-secure/hrDetails");
      dispatch({ type: FETCH_HR, payload:data });
  } catch (error) {
      console.log(error) ;
  }
}
//get Employee Details
export const getEmployeeDetails = (id) => async ( dispatch ) => {
  try {
    const { data } = await axios.get(`/hr-secure/empDetails/${id}`);
    dispatch({type: FETCH_EMP, payload:data})
  } catch (error) {
    console.log(error);
  }
}
//get Employee profile Details
export const getEmpProfileDetails = (id) => async ( dispatch ) => {
  try {
    const { data } = await axios.get(`/emp-secure/profile/${id}`);
    dispatch({type: FETCH_EMP_PROFILE, payload:data})
  } catch (error) {
    console.log(error);
  }
}
// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING
  };
};
// Log user out
export const logoutUser = () => dispatch => {
  // Remove token from local storage
  Cookies.remove('jwt');
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};