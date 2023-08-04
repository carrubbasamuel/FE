import { combineReducers, configureStore } from '@reduxjs/toolkit';
import LoginSlice from './reducers/LoginSlice';
import PostSlice from './reducers/PostSlice';
import ReviewSlice from './reducers/ReviewSlice';

const reducerSlice = combineReducers({
    author: PostSlice,
    login: LoginSlice,
    review: ReviewSlice,
});


const store = configureStore({
    reducer: reducerSlice
})

export default store;