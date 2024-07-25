
//redux toolkit
import { createSlice,PayloadAction } from "@reduxjs/toolkit";

//types
import { User, AuthToken } from "../../Types/Auth";

type AuthState = {
    isLoggedIn: boolean;
    user: User | null;
    token: AuthToken | null;
};

const initialState: AuthState = {
    isLoggedIn: false,
    user: null,
    token: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<User>) {
            state.isLoggedIn = true;
            //TODO: Connect to the backend
            state.user = action.payload;
        },

        setToken(state, action: PayloadAction<AuthToken>) {
            state.token = action.payload;
            //save the access token to the local storage
            localStorage.setItem('accessToken', state.token.accessToken);
            //save the refresh token to the local storage
            localStorage.setItem('refreshToken', state.token.refreshToken);
            //save the expires in to the local storage
            localStorage.setItem('expiresIn', state.token.expireTime.toString());
        },

        logout(state) {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;

            //remove the all token from the local storage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('expiresIn');
        },
    },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;