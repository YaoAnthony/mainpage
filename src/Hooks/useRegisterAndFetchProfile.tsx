//react
import { useState } from "react";

//redux
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../Api/authApi";
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


const useRegisterAndFetchProfile = () => {

    //hook
    const dispatch = useDispatch<AppDispatch>();


    //register Info
    const [registerInfo, setRegisterInfo] = useState<Credentials>({ email: '', password: '', username: '' });
    
    //error message
    const [ errorMess, setErrorMess ] = useState<string>("");

    //register mutation
    const [register] = useRegisterMutation(); //register mutation

    //When the userProfile is fetched, set the userProfile to the redux store
    const handleRegister = async (registerInfo: Credentials) => {
        try{
            const { token, user } = await register(registerInfo).unwrap();

            if(isAuthToken(token)){
                //Set the token to the redux store
                dispatch(setToken(token));
                //Set the user information to the redux store
                dispatch(setUser(user));

                // Fetch the user profile
                const resultAction = await dispatch(profileApi.endpoints.getProfile.initiate(undefined));
                
                if ('data' in resultAction) {
                    console.log("data is here : ",resultAction.data);
                    // Set the user profile to the redux store
                    dispatch(setUserProfile(resultAction.data as Profile));
                    // Show the success message
                    message.success('Thanks for you join us, and you have been login!');

                    return 200;
                } else {
                    //TODO: handle the error
                    message.error('Failed to fetch user profile');
                }
            }
        } catch ( error ) {
            const err = error as AuthError;
            // Set the error message
            console.log(err.error.message);
            setErrorMess(err.error.message);
            return err.status;
        }
    }
    return {
        registerInfo, setRegisterInfo,
        errorMess, setErrorMess,
        handleRegister
    }
}


export default useRegisterAndFetchProfile;