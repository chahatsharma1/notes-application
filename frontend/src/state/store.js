import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import { thunk } from 'redux-thunk';
import { authReducer } from '@/state/user/Reducer.js';
import {noteReducer} from "@/state/note/Reducer.js";

const rootReducer = combineReducers({
    auth: authReducer,
    note: noteReducer
});

export const store = createStore(
    rootReducer,
    applyMiddleware(thunk)
);
