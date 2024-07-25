//react
import { useLayoutEffect } from 'react'

//redux
import { useDispatch } from 'react-redux';
import { profileApi } from './Api/profileApi';
import { setUser } from './Redux/Features/authSlice';
import { setProfile } from './Redux/Features/profileSlice';
import { CartProvider } from './Context/ShoppingCartContext.tsx' // shopping cart context


//react route dom
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

//pages
import {
  Home,
} from './Pages'

import CheckOutPage from './Pages/CheckOutPage';

//types
import { AppDispatch } from './Redux/store';
import ShoppingCart from './Components/ShoppingCart';

//context
import { ModalProvider } from './Context/SignInModalContext';
import { Profile } from './Types/Profile';
import { User } from './Types/Auth';

// Scroll to the top of the page when the location changes
function ScrollToTop() {
  const location = useLocation();

  useLayoutEffect(() => {
    // Scroll to the top of the page when the location changes
    window.scrollTo(0, 0);
  }, [location]);

  // Return null as this component doesn't render anything
  return null;
}

const App = () => {
  //Access token from local storage
  const dispatch = useDispatch<AppDispatch>();
  //const [token, setToken] = useState<string | null>(null);

  // Check if accessToken exists in localStorage on mount
  const accessToken = localStorage.getItem('accessToken');
  if(accessToken){
    const profileLoading = async () => {
      try{
        const resultAction = await dispatch(profileApi.endpoints.getProfile.initiate(undefined));
        
        if ('data' in resultAction) {
          // Set the user profile to the redux store
          const userProfile = resultAction.data as Profile;
          dispatch(setUser(userProfile.user as User));
          dispatch(setProfile(userProfile as Profile));
        }else{
          //remove token from local storage if token is invalid
        }
      }catch(e){
        console.log(e);
        //remove token from local storage if token is invalid
      }
    }
    profileLoading();
    
  }


  return (
    <BrowserRouter>
      <ModalProvider>
        <CartProvider>
          <ScrollToTop />
          <ShoppingCart />
          
          <Routes>
            <Route path="*" element={<Home />} />
            <Route path="/" element={<Home />} />
            <Route path="/checkout" element={(<CheckOutPage />)} />
          </Routes>
          
        </CartProvider>
      </ModalProvider>
    </BrowserRouter>
  )
}

export default App