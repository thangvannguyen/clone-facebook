import notiReducer from './noti';
import likeReducer from './like';
import { combineReducers } from 'redux';
import { useReducer } from 'react';
import userReducer from './user';

const rootReducer = combineReducers({
    noti: notiReducer,
    like: likeReducer,
    user: userReducer,
});

export default rootReducer;