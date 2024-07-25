
// redux toolkit
import { configureStore, ThunkAction, Action  } from "@reduxjs/toolkit";

//redux toolkit
import authReducer from './Features/authSlice';
import profileReducer from "./Features/profileSlice";
import socketReducer from "./Features/socketSlice";

//redux toolkit api
import { authApi } from "../Api/authApi";
import { profileApi } from "../Api/profileApi";

export const store = configureStore({
    reducer: {
        // Manage the state of the auth state
        auth: authReducer,
        [authApi.reducerPath]: authApi.reducer, // add RTK Query reducers

        // Manage the state of the profile state
        profile: profileReducer,
        [profileApi.reducerPath]: profileApi.reducer, // add RTK Query reducers

        // Manage the state of the socket state
        socket: socketReducer,

    },
    //Middleare
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(
            authApi.middleware,
            profileApi.middleware,
        ),
});


// RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// AppThunk type
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;

