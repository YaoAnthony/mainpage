


/**
 *  Defines the structure of a product item with a detailed tag.
 */
export type Product = {
    id: string;
    name: string;
    authorId: string;
    authorName: string;
    authorAvatar: string;

    status: "normal" | "newPost" | "draft" | "unique" | "preorder" | "archived" | "soldout" ;
    shortIntroduction: string;
    description: string;
    properties: {
        name: string;
        specs: string;
    }[];
    includes: string[];
    keypoints: string[];
    price: number;
    discount: number;
    stock: number;
    postDate: string;

    view: number;
    likes: number;
    rate: number;
    image: string[]; // Replace `any` with the appropriate type for your project, such as `string` for image URLs.
    tag: Tag[];
    options: Option[];
    comments: Comment[];
};

export interface Comment {
    // General information from the backend
    _id: string;
    postDate: Date;

    userId: string;
    userName: string;
    avatar: string;
    content: string;
    replyFor?: string;  // 可选的回复对象ID
    parentId?: string;  // 可选的父评论ID
    comments?: Comment[];  // 子评论数组，使用相同的接口类型
}


/**
 * Represents a customizable product with various attributes.
 */
export type CustomizablePlan = {
    id: string;
    name: string;

    // Product information
    
    acceptTime: string;
    productionCycle : string;

    initialPrice: number;
    maxPrice: number;

    image: string[];
    description: string;
    shortIntroduction: string;
    price: number;
    postDate: string;
    
    tag: string[];
    steps: Option[];
    
    comments: Comment[];

}

/**
 * Order a customized item by the user.
 */
export type CustomizableProductOrder = {
    planId: string;
    options: Option[];
}

export type Option = {
    question: string;
    isNecessary: boolean;
    value: {
        name: string;
        price: number;
    }[];
}


export type Tag = {
    id?: string;
    _id: string;
    name: string;
    description: string;
};

export type CartItem = {
    product: Product;
    option: Option[];
}