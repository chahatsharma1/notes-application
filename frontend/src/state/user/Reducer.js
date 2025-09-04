import * as types from './ActionType';

const initialState = {
    user: null,
    loading: false,
    error: null,
    jwt: localStorage.getItem('jwt') || null,
    registerSuccess: false,
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.REGISTER_REQUEST:
        case types.LOGIN_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };
        case types.REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                registerSuccess: true
            };
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                jwt: action.payload.jwt,
                user: action.payload.user,
            };
        case types.REGISTER_FAILURE:
        case types.LOGIN_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case types.LOGOUT:
            return {
                ...initialState,
                jwt: null,
            };
        default:
            return state;
    }
};