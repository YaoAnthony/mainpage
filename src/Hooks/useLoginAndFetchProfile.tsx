//react
import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../Api/authApi";
import { setUser,setToken } from "../Redux/Features/authSlice";
import { setProfile as setUserProfile } from "../Redux/Features/profileSlice";
import { profileApi } from "../Api/profileApi";

//react-router-dom
// import { useNavigate,useLocation } from "react-router-dom";

//antd
import { message } from "antd";

//types
import { Profile } from "../Types/Profile";
import { Credentials } from "../Types/Auth";
import { AppDispatch } from "../Redux/store";
import { AuthToken, AuthError } from "../Types/Auth";

function isAuthToken(obj: any): obj is AuthToken {
    return 'accessToken' in obj && 'refreshToken' in obj && 'expireTime' in obj;
}

const useLoginAndFetchProfile = () => {

    //hook
    // const navigate = useNavigate();
    // const location = useLocation();
    const dispatch = useDispatch<AppDispatch>();

    //login Info
    const [loginInfo, setLoginInfo] = useState<Credentials>({ email: '', password: '' });
    
    //error message
    const [ errorMess, setErrorMess ] = useState<string>("");
    

    //orginal location
    //let from = location.state?.from?.pathname || "/";

    //login mutation
    const [ login ] = useLoginMutation();

    //When the userProfile is fetched, set the userProfile to the redux store
    const handleLogin = async (loginInfo: Credentials) => {
        try {
            // Connect to backend to login
            const { token, user } = await login(loginInfo).unwrap();

            // If the token is valid, set the token,user and user profile to the redux store
            if (isAuthToken(token)) {
                // Set the token to the redux store
                dispatch(setToken(token));
                // Set the user information to the redux store
                dispatch(setUser(user));
                // Fetch the user profile
                const resultAction = await dispatch(profileApi.endpoints.getProfile.initiate(undefined));
                
                if ('data' in resultAction) {
                    console.log(resultAction.data);
                    // Set the user profile to the redux store
                    dispatch(setUserProfile(resultAction.data as Profile));
                    // Show the success message
                    message.success('Login successfully!');
                    // Redirect to the original location
                    // navigate(from, { replace: true });
                    return 200;
                    
                } else {
                    //TODO: handle the error
                    message.error('Failed to fetch user profile');
                }
            }
        } catch ( error ) {
            const err = error as AuthError;
            // Set the error message
            setErrorMess(err.error.message);
            return err.status;
        }
    };

    return {
        loginInfo, setLoginInfo,
        errorMess, setErrorMess, 
        handleLogin 
    };
}

export default useLoginAndFetchProfile;