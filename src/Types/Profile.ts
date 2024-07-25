import { User } from "./Auth";
// import { Conversation } from "./message";
import { CustomizableProductOrder, Product,CartItem } from "./Product";


/**
 * Defines the profile structure of a user within the application.
 */
export interface Profile {
    user: User;

    // Personal information
    simpleBackground: string;
    fullBackground: string;
    email: string;

    // Sale product
    masterpieces: Product[]; // Optional array of the user's masterpieces.
    products: Product[]; // Array of product IDs created by the user.
    materials: Product[]; // Array of product IDs sold by the user.
    customizablePlans: Product[]; // Array of customizable products created by the user.

    favorites: Product[]; // Array of product favorited by the user.
    wishlist: Product[]; // Array of product in the user's wishlist.
    history: Product[]; // Array of product in the user's purchase history.
    cart: CartItem[]; // Array of product in the user's cart.
    orders: Order[]; // Array of order in the user's order history.

    // Social information
    followers: User[]; // Array of user following the user.
    following: User[]; // Array of user the user is following.
    rate: number; // The user's rating.

    tags: string[]; // Array of tag IDs for the user.
    roles: string[]; // Array of roles for the user.

    payment: Payment; // The user's payment information.
    // Shipping information
    shippingAddress: Address[]; // The user's shipping address.
}


export type Order = {
    id: string;
    cart: CartItem[] | CustomizableProductOrder;

    // Shipping information
    buyerId: string;
    sellerId: string;
    status: "processing" | "shipped" | "delivered" | "canceled";
    orderDate: string;

    // Payment information
    transactionId: string;
    paymentMethod: 'creditCard' | 'debitCard' | 'paypal' | 'alipay' | 'wechatPay' | 'applePay' | 'googlePay' | 'unionPay' | 'cash' | 'check' | 'cryptocurrency' | 'other';
    paymentStatus: "pending" | "paid" | "refunded" | "canceled";
    paymentDate?: string;

    // Shipping information
    shippingInfo: ShippingInfo;
}

export type ShippingInfo = {
    shippingId: string;
    method: 'standard' | 'express';
    cost: number;
    address: Address;
    recipient: string;
    trackingNumber?: string;
    status: 'preparing' | 'shipped' | 'delivered';
};


export type Address = {
    firstName: string;
    lastName: string;

    country: string;
    province: string;
    city: string;
    street: string;
    postalCode: string;
    method: string
    price?: number
};

export type Payment = {
    type: PaymentMethod
    cardNumber?: string
    nameOnCard?: string
    expirationDate?: string
    securityCode?: string
}

export enum PaymentMethod {
    CreditCard,
    Wechat,
    ALiPay
}