import axios from 'axios';
import * as types from './ActionType';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
    baseURL: API_BASE_URL,
});

apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllNotes = () => async (dispatch) => {
    dispatch({ type: types.GET_ALL_NOTES_REQUEST });
    try {
        const response = await apiClient.get('/notes');
        dispatch({ type: types.GET_ALL_NOTES_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_ALL_NOTES_FAILURE, payload: error.message });
    }
};

export const createNote = (noteData) => async (dispatch) => {
    dispatch({ type: types.CREATE_NOTE_REQUEST });
    try {
        const response = await apiClient.post('/notes', noteData);
        dispatch({ type: types.CREATE_NOTE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.CREATE_NOTE_FAILURE, payload: error.message });
    }
};

export const getNoteById = (noteId) => async (dispatch) => {
    dispatch({ type: types.GET_NOTE_BY_ID_REQUEST });
    try {
        const response = await apiClient.get(`/notes/${noteId}`);
        dispatch({ type: types.GET_NOTE_BY_ID_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_NOTE_BY_ID_FAILURE, payload: error.message });
    }
};

export const updateNote = (noteId, noteData) => async (dispatch) => {
    dispatch({ type: types.UPDATE_NOTE_REQUEST });
    try {
        const response = await apiClient.put(`/notes/${noteId}`, noteData);
        dispatch({ type: types.UPDATE_NOTE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.UPDATE_NOTE_FAILURE, payload: error.message });
    }
};

export const deleteNote = (noteId) => async (dispatch) => {
    dispatch({ type: types.DELETE_NOTE_REQUEST });
    try {
        await apiClient.delete(`/notes/${noteId}`);
        dispatch({ type: types.DELETE_NOTE_SUCCESS, payload: noteId });
    } catch (error) {
        dispatch({ type: types.DELETE_NOTE_FAILURE, payload: error.message });
    }
};

export const getPublicNote = (slug) => async (dispatch) => {
    dispatch({ type: types.GET_PUBLIC_NOTE_REQUEST });
    try {
        const response = await apiClient.get(`/notes/public/${slug}`);
        dispatch({ type: types.GET_PUBLIC_NOTE_SUCCESS, payload: response.data });
    } catch (error) {
        dispatch({ type: types.GET_PUBLIC_NOTE_FAILURE, payload: error.message });
    }
};