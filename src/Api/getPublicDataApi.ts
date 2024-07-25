
//type
import { Product,CustomizablePlan, Tag } from "../Types/Product";
import { User } from "../Types/Auth";
import { Profile } from "../Types/Profile";
import data from './data.json';

//basic url
const baseUrl = import.meta.env.VITE_BACKEND_API_URL as string;

//axios
import axios from 'axios';


function downloadJSON(data, fileName) {
    // 将数据转换为JSON字符串
    const jsonString = JSON.stringify(data, null, 2); // null, 2用于格式化JSON字符串，使其更易读
    
    // 创建一个Blob对象，表示一个不可变、原始数据的类文件对象
    const blob = new Blob([jsonString], { type: 'application/json' });
    
    // 创建一个指向Blob对象的URL
    const url = URL.createObjectURL(blob);
    
    // 创建一个<a>元素
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;
    
    // 将<a>元素添加到DOM中
    document.body.appendChild(a);
    
    // 触发下载
    a.click();
    
    // 释放URL对象
    URL.revokeObjectURL(url);
    
    // 移除<a>元素
    document.body.removeChild(a);
}


//get recommend product
export const getRecommendProducts = async (category:string,page:number): Promise<Product[]> => {

    //url baseUrl/public/recommentProducts
    const url = `${baseUrl}/public/recommendProducts`;
    
    //axios get
    const response = await axios.get(url);
    return response.data;
}

export const getRecommendProductsWithAd = async (category: string, page: number) => {
    const response = await axios.get(`${baseUrl}/public/recommend-products`, {
        params: {
            category,
            page
        }
    });
    //get data from data.json
    return data;

    //return response.data;
};

export const getTag = async (): Promise<Tag[]> => {
    //url baseUrl/public/tags
    const url = `${baseUrl}/public/tags`;

    //axios get
    const response = await axios.get(url);
    return response.data;
}

//get recommend crafters
export const getRecommendCrafters = async (type: string): Promise<User[]> => {

    console.log(type)

    //url baseUrl/public/recommentCrafters
    const url = `${baseUrl}/public/recommendCrafters`;

    //axios get
    const response = await axios.get(url);
    return response.data;
}

//get product by id
export const getProductById = async (id: string): Promise<Product> => {
    const url = `${baseUrl}/product/getProductById?id=${id}`;
    const response = await axios.get(url);
    return response.data;
}

//get product array by id array
export const getProductsByIds = async (ids: string[]): Promise<Product[]> => {
    //url baseUrl/public/getProductsByIds
    const url = `${baseUrl}/public/getProductsByIds`;

    //axios post
    const response = await axios.post(url, { ids });
    return response.data;
}

//get Material by id array
export const getMaterialById = async (id: string): Promise<Product> => {
    //url baseUrl/public/getMaterialById
    const url = `${baseUrl}/public/getMaterial?id=${id}`;

    //axios get
    const response = await axios.get(url);
    return response.data;
}


//get Material array by id array
export const getMaterialsByIds = async (ids: string[]): Promise<Product[]> => {
    //url baseUrl/public/getMaterialsByIds
    const url = `${baseUrl}/public/getMaterialsByIds`;

    //axios post
    const response = await axios.post(url, { ids });
    return response.data;
}

//get DIY Plan array by id array
export const getDIYPlansByIds = async (ids: string[]): Promise<CustomizablePlan[]> => {
    //url baseUrl/public/getDIYPlansByIds
    const url = `${baseUrl}/public/getDIYPlansByIds`;

    //axios post
    const response = await axios.post(url, { ids });
    return response.data;
}

//get crafter by id
export const getCrafterById = async (id: string): Promise<User> => {
    //url baseUrl/public/crafter/id
    const url = `${baseUrl}/user/getCrafter?id=${id}`;

    //axios get
    const response = await axios.get(url);
    return response.data;
}

export const findUserProfileById = async (id: string): Promise<Profile> => {
    //url baseUrl/public/getUserProfileById
    const url = `${baseUrl}/profile/getUserProfileById?id=${id}`;

    //axios get
    const response = await axios.get(url);
    return response.data;
}

//get recommend products by type
export const getRelativeProductsByTag = async (type: string): Promise<Product[]> => {
    //url baseUrl/public/recommendProducts/type
    const url = `${baseUrl}/public/relativeProducts?id=${type}`;

    //axios get
    const response = await axios.get(url);
    return response.data;
}
