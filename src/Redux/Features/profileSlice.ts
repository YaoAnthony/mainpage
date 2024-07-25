// Assuming User, Award, and CustomizableProduct types are defined elsewhere
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


//tpes
import { Profile } from '../../Types/Profile';
import { Product,CartItem } from '../../Types/Product';


interface ProfileState {
    profile: Profile | null;
    isLoading: boolean;
}

// Initial state
const initialState: ProfileState = {
    profile: null,
    isLoading: false,
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        initialprofile(state) {
            console.log('initialprofile')
            state.profile = null;
            state.isLoading = false;
        },
        // Action to set the user profile
        setProfile(state, action: PayloadAction<Profile | null>) {
            state.profile = action.payload;
        },

        updateSimpleBackground(state, action: PayloadAction<string>) {
            if (state.profile) {
                state.profile.simpleBackground = action.payload;
            }
        },

        updateFullBackground(state, action: PayloadAction<string>) {
            if (state.profile) {
                state.profile.fullBackground = action.payload;
            }
        },

        addProduct(state, action: PayloadAction<Product>) {
            state.profile?.products.push(action.payload);
        },
        
        addCustomizablePlan(state, action: PayloadAction<Product>) {
            state.profile?.customizablePlans.push(action.payload);
        },
        
        addFavorite(state, action: PayloadAction<Product>) {
            //if state include the item then delete
            if(!state.profile){
                return;
            }
            const index = state.profile?.favorites.indexOf(action.payload);
            
            if (index !== -1) {
                state.profile?.favorites.splice(index, 1);
            } else {
                //if state not include the item then add
                state.profile?.favorites.push(action.payload);
            }
        },

        removeFavorite(state, action: PayloadAction<Product>) {
            if (state.profile) {
                //according profile id
                const index = state.profile.favorites.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.profile.favorites.splice(index, 1);
                }
            }
        },
        
        addToWishlist(state, action: PayloadAction<Product>) {
            state.profile?.wishlist.push(action.payload);
        },
        
        updateCart(state, action: PayloadAction<CartItem[]>) {
            if (state.profile) {
                state.profile.cart = action.payload;
            }

            //send to server
            
        },

        addMasterpiece(state, action: PayloadAction<Product>) {
            state.profile?.masterpieces?.push(action.payload);
        },

        updateProfileMasterpieces(state, action: PayloadAction<Product[]>) {
            console.log(action.payload)
            if (state.profile) {
                console.log(action.payload)
                state.profile.masterpieces = action.payload;
            }
        },

        // Action to start loading
        setLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },

        // Add more actions as needed
    },
});

  // Export actions
export const { 
    initialprofile,
    setProfile, 
    setLoading, 
    updateSimpleBackground,
    updateFullBackground,
    addProduct,
    addCustomizablePlan,
    addFavorite,
    addToWishlist,
    updateCart,
    addMasterpiece,
    updateProfileMasterpieces

} = profileSlice.actions;

// Export reducer
export default profileSlice.reducer;




