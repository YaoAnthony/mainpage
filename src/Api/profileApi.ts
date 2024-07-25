//RTK Query
import { 
    createApi, 
    fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";


//types
import { Profile } from "../Types/Profile";



// 自定义 baseQuery 函数，添加 token 到请求头
const getProfileWithToken = async (args: any, api: any, extraOptions: any) => {
    // Get the token from local storage
    const token = localStorage.getItem('accessToken');
    // If the args is a string, convert it to an object
    if (typeof args === 'string') {
        args = { url: args };
    }
    args.headers = {
        ...args.headers,
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json',
    };

    const result = await fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_API_URL as string })(args, api, extraOptions);
    return result;
};

export const profileApi = createApi({
    reducerPath: "profileApi",
    baseQuery: getProfileWithToken,
    endpoints: (builder) => ({
        /**
         * Get the user profile, send the token to /profile/getProfile, and get the user profile
         */
        getProfile: builder.query<Profile, void>({
            
            query: () => ({
                url: "/profile/getProfile",
                method: "GET",
            }),
            
        }),
        /**
         * Update the user profile, send the token and the user profile to /profile/updateProfile, and get the user profile
         */
        // updateUserProfile: builder.mutation<Profile, User>({
        //     query: (user) => ({
        //         url: "/profile/updateProfile",
        //         method: "POST",
        //         body: user,
        //     }),
        // }),
        
    }),
});



export const { 
    useGetProfileQuery,
    //useUpdateUserProfileMutation,
} = profileApi;