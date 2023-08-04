

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



//Login
export const fetchLogin = createAsyncThunk(
    'login/fetchLogin',
    async (user) => {
        try {
            const response = await fetch('http://localhost:3003/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            let data = await response.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    }
)


//Register
export const fetchRegister = createAsyncThunk(
    'login/fetchRegister',
    async (user) => {
        try {
            const response = await fetch('http://localhost:3003/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user)
            });
            const data = await response.json();
            return data;

        }
        catch (error) {
            console.log(error);
        }


    }
)

export const fetchDelete = createAsyncThunk(
    'login/fetchDelete',
    async (_, { getState, dispatch }) => {
        try {
            const response = await axios.delete('http://localhost:3003/delete', {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": "Bearer " + getState().login.userLogged.token,
                }
            });
            const { data } = response;
            dispatch(logout());
            console.log(data);
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
)


//*PATCH to update the avatar user
export const fetchUpdateAvatar = createAsyncThunk(
    'login/fetchUpdateAvatar',
    async (file, { getState }) => {
        try {
            const formData = new FormData();
            formData.append('avatar', file);

            const response = await axios.patch('http://localhost:3003/updateAvatar', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + getState().login.userLogged.token
                }
            });
            const { data } = response;
            return data;
        }
        catch (error) {
            console.log(error);
        }
    }
)





const initialState = {
    userLogged: JSON.parse(localStorage.getItem('user')) || null,
    codeRegister: null,
    loading: false,
    error: null
}


const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        logout: (state, action) => {
            localStorage.removeItem('user');
            state.userLogged = null;
        },
        setCodeRegister: (state, action) => {
            state.codeRegister = action.payload;
        },
        setUserLogged: (state, action) => {
            localStorage.setItem('user', JSON.stringify(action.payload));
            state.userLogged = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchLogin.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchLogin.fulfilled, (state, action) => {
                localStorage.setItem('user', JSON.stringify(action.payload));
                state.userLogged = action.payload;
                state.loading = false;
            })
            .addCase(fetchLogin.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchRegister.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchRegister.fulfilled, (state, action) => {
                state.codeRegister = action.payload;
                state.loading = false;
            })
            .addCase(fetchRegister.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchDelete.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchDelete.fulfilled, (state, action) => {
                state.isDeleteble = true;
                state.loading = false;
            })
            .addCase(fetchDelete.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
            .addCase(fetchUpdateAvatar.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(fetchUpdateAvatar.fulfilled, (state, action) => {
                state.userLogged.user = action.payload.user;
                localStorage.setItem('user', JSON.stringify(state.userLogged));
                state.loading = false;
            })
            .addCase(fetchUpdateAvatar.rejected, (state, action) => {
                state.error = action.error.message;
                state.loading = false;
            })
    }
})


export const { logout, setCodeRegister, setUserLogged } = loginSlice.actions;
export default loginSlice.reducer;
