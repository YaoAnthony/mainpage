
//types
import { Product } from "../Types/Product";

//basic url
const baseUrl = import.meta.env.VITE_BACKEND_API_URL as string;

//axios
import axios from 'axios';

//get Material array by id array
export const uploadItem = async (itemData: Product) => {
    try {
        const response = await axios.post(`${baseUrl}/product`, itemData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};