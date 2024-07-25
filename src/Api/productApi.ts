//basic url
const baseUrl = import.meta.env.VITE_BACKEND_API_URL as string;

//axios
import axios from 'axios';
import { Comment } from '../Types/Product';

//Send comment
export const sendComment = async (productId : string, commentData: Partial<Comment>) => {

    try {
        const response = await axios.post(`${baseUrl}/product/sendComment`, {productId, commentData}, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //包含 id和postDate的评论
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}

// 发送评论回复
export const sendReply = async (productId: string, commentData: Partial<Comment>) => {
    try {
        const response = await axios.post(`${baseUrl}/product/reply`, { productId, commentData }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        //包含 id和postDate的评论
        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error:', error.response?.data);
        } else {
            console.error('Unexpected error:', error);
        }
        throw error;
    }
}
