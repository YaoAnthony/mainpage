//RTK Query
import { 
    createApi, 
    fetchBaseQuery,
    FetchBaseQueryError
} from "@reduxjs/toolkit/query/react";

//types
import { AuthToken,Credentials,User } from "../Types/Auth";

interface ResponseData {
    token: AuthToken;
    user : User;
}

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API_URL as string }),
    endpoints: (builder) => ({
        /**
         *  This is Login api, send the email and password to the backend, and get the token
         *  If the login is successful, the token will be returned
         *  If the login is failed, the error will be returned. e.g. {status: 401, error: "The email and password is not matched."}
         *  @param email
         *  @param password
         *  @returns AuthToken
         *  @throws FetchBaseQueryError
         * 
         */
        login: builder.mutation<ResponseData, Credentials>({
            queryFn: async ({ email, password }, _queryApi, _extraOptions, baseQuery) => {
                console.log("Login: send the data to backend")
                const response = await baseQuery({
                    url: "/auth/login",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: "POST",
                    body: { email, password },
                })

                if (response.error) {
                    return { 
                        error: { 
                            status: response.error.status, error: response.error.data } as FetchBaseQueryError 
                    };
                }
                console.log("Login success, return the token");
                return { data: response.data as ResponseData };
            },
        }),
        /**
         * This is Register api, send the email, password and username to the backend, and get the token
         * If the register is successful, the token will be returned
         * If the register is failed, the error will be returned. 
         * e.g. {status: 401, error: "Email is exist."}
         * 
         * @param email
         * @param password
         * @param username
         * @returns AuthToken
         * @throws FetchBaseQueryError
         * 
         */
        register: builder.mutation<ResponseData, Credentials>({
            queryFn: async ({email, password, username}, _queryApi, _extraOptions, baseQuery) => {
                console.log("Register: send the data to backend")
                const response = await baseQuery({
                    url: '/auth/register',
                    method: 'POST',
                    body: { 
                        email, 
                        password, 
                        username 
                    }
                });
        
                if (response.error) {
                    return { error: { status: response.error.status, error: response.error.data } as FetchBaseQueryError };
                }
        
                return { data: response.data as ResponseData };
            },
        }),


        //TODO: Google login
    }),
});




export const { 
    useLoginMutation, 
    useRegisterMutation,
} = authApi;
