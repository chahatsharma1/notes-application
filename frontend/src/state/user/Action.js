import axios from 'axios';
import * as types from './ActionType';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = (userData) => async (dispatch) => {
    dispatch({ type: types.REGISTER_REQUEST });
    try {
        await axios.post(`${API_BASE_URL}/auth/register`, userData);
        dispatch({ type: types.REGISTER_SUCCESS });
    } catch (error) {
        dispatch({
            type: types.REGISTER_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const login = (userData) => async (dispatch) => {
    dispatch({ type: types.LOGIN_REQUEST });
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, userData);
        const authResponse = response.data;

        localStorage.setItem('jwt', authResponse.jwt);

        dispatch({
            type: types.LOGIN_SUCCESS,
            payload: authResponse,
        });
    } catch (error) {
        dispatch({
            type: types.LOGIN_FAILURE,
            payload: error.response?.data?.message || error.message,
        });
    }
};

export const logout = () => (dispatch) => {
    localStorage.removeItem('jwt');
    dispatch({ type: types.LOGOUT });
};

