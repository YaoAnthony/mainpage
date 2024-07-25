// CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

//redux
import { useSelector } from 'react-redux';

//type
import { RootState } from '../Redux/store';

//type
import { Product,CartItem } from '../Types/Product';

// 定义 Context 中的值的类型
interface CartContextType {
    isCartOpen: boolean;
    toggleCart: () => void;
    
    cart : CartItem[];
    addToCart: (cartItem: CartItem) => boolean;
    removeFromCart: (product: Product) => void;
    updateCartItem: (cartItem: CartItem) => void;
}


// 使用 createContext 时提供初始值的类型
const CartContext = createContext<CartContextType | undefined>(undefined);

// 自定义 Hook，用于在组件中方便地访问 Context
export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};

// CartProvider 的 props 类型定义
interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // 控制购物车抽屉的开关状态
    const [isCartOpen, setIsCartOpen] = useState(false);
    // 购物车
    const [cart, setCart] = useState<CartItem[]>([]);
    // 从 Redux store 中获取 profile
    const { profile } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        // 检查 localStorage 是否有购物车数据
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setCart(JSON.parse(storedCart));
        }
    }, []);

    useEffect(() => {
        // 如果 profile 存在且有购物车数据，合并购物车数据
        if (profile && profile.cart) {
            const storedCart = JSON.parse(localStorage.getItem('cart') || '[]');
            const mergedCart = mergeCarts(storedCart, profile.cart);
            setCart(mergedCart);
            localStorage.setItem('cart', JSON.stringify(mergedCart));

            // 更新 profile 中的购物车数据
            // updateCart(cart);
        }
    }, [profile]);

    const mergeCarts = (cart1: CartItem[], cart2: CartItem[]): CartItem[] => {
        const cartMap = new Map<string, CartItem>();

        cart1.forEach((item) => {
            cartMap.set(item.product.id, item);
        });

        cart2.forEach((item) => {
            if (!cartMap.has(item.product.id)) {
                cartMap.set(item.product.id, item);
            }
        });

        return Array.from(cartMap.values());
    };

    const addToCart = (cartItem: CartItem) => {

        let message = true;
        setCart((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.product.id === cartItem.product.id);
            let newItems;
            if (itemIndex > -1) {
                // 商品已存在，如果选项不同则更新选项，否则return false
                if (prevItems[itemIndex].option === cartItem.option) {
                    message = false;
                    return prevItems;
                }

                newItems = [...prevItems];
                newItems[itemIndex] = {
                    ...newItems[itemIndex],
                    option: cartItem.option // 更新选项
                };
                
            } else {
                // 商品不存在，添加新商品
                newItems = [...prevItems, cartItem];
            }
            localStorage.setItem('cart', JSON.stringify(newItems));
            //updateCart(cart);
            return newItems;
        });

        return message;
    };

    const removeFromCart = (product: Product) => {
        setCart((prevItems) => {
            const newItems = prevItems.filter((item) => item.product.id !== product.id);
            localStorage.setItem('cart', JSON.stringify(newItems));
            //updateCart(cart);
            return newItems;
        });
    };

    const updateCartItem = (cartItem: CartItem) => {
        setCart((prevItems) => {
            const itemIndex = prevItems.findIndex((item) => item.product.id === cartItem.product.id);
            let newItems;
            if (itemIndex > -1) {
                newItems = [...prevItems];
                newItems[itemIndex] = {
                    ...newItems[itemIndex],
                    option: cartItem.option // 更新选项
                };
            } else {
                newItems = prevItems;
            }
            localStorage.setItem('cart', JSON.stringify(newItems));
            //updateCart(cart);
            return newItems;
        });
    };

    const toggleCart = () => {
        setIsCartOpen(!isCartOpen);
    };

    return (
        <CartContext.Provider value={{ isCartOpen, toggleCart, addToCart, removeFromCart, updateCartItem, cart }}>
            {children}
        </CartContext.Provider>
    );
};