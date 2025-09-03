import * as types from './ActionType';

const initialState = {
    notes: [],
    publicNote: null,
    loading: false,
    error: null,
};

export const noteReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_ALL_NOTES_REQUEST:
        case types.CREATE_NOTE_REQUEST:
        case types.UPDATE_NOTE_REQUEST:
        case types.DELETE_NOTE_REQUEST:
        case types.GET_PUBLIC_NOTE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case types.GET_ALL_NOTES_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: action.payload,
            };

        case types.CREATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: [action.payload, ...state.notes],
            };

        case types.UPDATE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.map(note =>
                    note.id === action.payload.id ? action.payload : note
                ),
            };

        case types.DELETE_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                notes: state.notes.filter(note => note.id !== action.payload),
            };

        case types.GET_PUBLIC_NOTE_SUCCESS:
            return {
                ...state,
                loading: false,
                publicNote: action.payload,
            };

        case types.GET_ALL_NOTES_FAILURE:
        case types.CREATE_NOTE_FAILURE:
        case types.UPDATE_NOTE_FAILURE:
        case types.DELETE_NOTE_FAILURE:
        case types.GET_PUBLIC_NOTE_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };

        default:
            return state;
    }
};

