import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


export const fetchAddReview = createAsyncThunk(
    'review/fetchAddReview',
    (review, { getState }) => {
        const token = getState().login.userLogged.token;
        const response = axios.post('http://localhost:3003/addReview', review, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }
        });
        const { data } = response;
        return data;
    }
);

export const fetchGetReviews = createAsyncThunk(
    'review/fetchGetReviews',
    async (_, { getState }) => {
        const token = getState().login.userLogged.token;
        const id = getState().review.postToReview;
        try {
            const response = await axios.get(`http://localhost:3003/getReviews/${id}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to fetch reviews.');
        }
    }
);

export const fetchDeleteReview = createAsyncThunk(
    'review/fetchDeleteReview',
    async (reviewId, { getState }) => {
        const token = getState().login.userLogged.token;
        try {
            const response = await axios.delete(`http://localhost:3003/deleteReview/${reviewId}`,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to delete review.');
        }
    }
);

export const fetchEditReview = createAsyncThunk(
    'review/fetchEditReview',
    async (review, { getState }) => {
        const token = getState().login.userLogged.token;
        try {
            const response = await axios.patch(`http://localhost:3003/editReview/${review.reviewId}`, review,{
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            });
            return response.data;
        } catch (error) {
            throw Error('Failed to edit review.');
        }
    }
);


const initialState = {
    reviews: [],
    showModal: false,
    postToReview: null,
    showModalEditMode: null,
    reviewToEdit: null,
    rating: 0,
    loading: false,
    error: null,
};


const reviewSlice = createSlice({
    name: 'review',
    initialState,
    reducers: {
        setShowModal(state, action) {
            state.showModal = action.payload;
        },
        setPostToReview(state, action) {
            state.postToReview = action.payload;
        },
        setShowModalEditMode(state, action) {
            state.showModalEditMode = action.payload;
        },
        setRating(state, action) {
            state.rating = action.payload;
        },
        setReviewToEdit(state, action) {
            state.reviewToEdit = action.payload;
        },
    },
    extraReducers: builder => {
        builder
            .addCase(fetchGetReviews.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchGetReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviews = action.payload;
            })
            .addCase(fetchGetReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
    }
});



export const { setShowModal, setReviewToEdit, setShowModalEditMode, setRating, setPostToReview } = reviewSlice.actions;
export default reviewSlice.reducer;
