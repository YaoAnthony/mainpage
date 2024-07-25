import React from 'react'


//redux
import { useSelector } from 'react-redux';
// import { updateCartItemQuantity,removeCartItem } from '../../Features/profile/profileSlice';
// import { updateCartItemQuantity,removeCartItem } from '../../Redux/Features/profileSlice';

//antd
import { 
    Divider,
    message,
    Popconfirm,
} from 'antd';

//framer-motion
import { motion } from 'framer-motion';

//react
import { useState,useEffect } from 'react';

//cart
import { useCart } from '../../Context/ShoppingCartContext';

//router
import { NavLink } from 'react-router-dom';

//types
import { RootState } from '../../Redux/store';
import { Option, Product } from '../../Types/Product';

interface ProductElementProps {
    product: Product
    option: Option[]
    isInvalid?: boolean
}
const ProductElement: React.FC<ProductElementProps> = ({ product,option, isInvalid = false }) => {

    const { removeFromCart }   = useCart();

    //计算产品的价格
    const [ totalPrice, setTotalPrice ] = useState(0);

    //计算产品的价格
    useEffect(() => {
        // 计算基础价格
        const basePrice = product.discount ? product.price * product.discount : product.price;

        // 计算选项的额外价格
        const optionsPrice = option.reduce((acc, opt) => {
            const optionTotal = opt.value.reduce((optionAcc, item) => optionAcc + item.price, 0);
            return acc + optionTotal;
        }, 0);

        // 计算每个产品的总价
        const productTotalPrice = basePrice + optionsPrice;
        setTotalPrice(productTotalPrice);
    }, [product]);

    console.log('option: ', option)

    return (
        <div className={`flex gap-4 items-center justify-between ${isInvalid ? 'text-gray-300 line-through' : ''}`}>
            <div className='flex gap-5 items-center w-96 max-w-96'>
                <div className={`${isInvalid ? 'relative after:absolute' : ''} after:top-0 after:left-0 after:w-full after:h-full after:bg-opacity-80 after:bg-gray-300`}>
                    <img src={product.image[0]} alt={product.name} className='w-20 h-20 rounded-md object-cover'/>
                </div>
                <div className='flex flex-col justify-start gap-1'>
                    <NavLink to={`/asset/${product.id}`} className='text-lg font-semibold'>{product.name}</NavLink>
                    {
                        option.map((opt, index) => (
                            <div key={index} className='flex gap-2 text-sm text-font'>
                                <p>{opt.question}:</p>
                                <p>
                                {opt.value.map((e, index) => (
                                    <span key={index}>
                                    {e.name} {e.price !== 0 && ` ${e.price}`}
                                    </span>
                                ))}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
            <Popconfirm
                title="Delete it!"
                description="Are you sure to delete this product?"
                onConfirm={() => {
                    removeFromCart(product);
                }}
                okText="Yes"
                cancelText="No"
            >
                <motion.div
                    whileHover={{color: 'red'}}
                    whileTap={{ scale: 0.7 }}
                    transition={{ duration: 0.3 }}
                    className='rounded-full text-gray-400 w-7 h-7 flex justify-center items-center cursor-pointer'
                >
                    delete
                </motion.div>
            </Popconfirm>
            
            
            <div className='self-right w-8'>
                <p>${totalPrice}</p>
            </div>
        </div>
    )
}


const ProductTable = () => {
    //total price
    const [ totalPrice, setTotalPrice ] = useState(0);


    //invalid product ids, if product is invalid, it will be added to this array
    const [ invalidProdIds ] = useState<string[]>([]);

    //shipping price
    const [ shippingPrice ] = useState<number | undefined>(undefined)
    
    //get products from redux
    const { profile } = useSelector((state: RootState) => state.profile);

    
    const { cart } = useCart();

    // 使用 useEffect 计算总价
    useEffect(() => {
        // 从 cart 里面计算价格
        const calculateTotalPrice = () => {
            let price = 0;

            cart.forEach(cartItem => {
                const { product, option } = cartItem;

                // 计算基础价格
                const basePrice = product.discount ? product.price * product.discount : product.price;

                // 计算选项的额外价格
                const optionsPrice = option.reduce((acc, opt) => {
                    const optionTotal = opt.value.reduce((optionAcc, item) => optionAcc + item.price, 0);
                    return acc + optionTotal;
                }, 0);

                // 计算每个产品的总价
                const productTotalPrice = basePrice + optionsPrice;
                price += productTotalPrice;
            });

            setTotalPrice(price);
        };

        calculateTotalPrice();
    }, [cart]);

    useEffect(() => {
        // const ids = cart.map(e => e.product.id)
        // setInvalidProdIds([ids[1]])
        // const invalidProd = findProductsAndQuantities(cart.filter((e, index) => index === 1))
        // if (invalidProd?.length) {
        //     const txt = invalidProd.map(e => e.product.name).join('，')
        //     message.warning(txt + ' has no stock!')
        // }
        
        // validProduct(ids)
        //     .then(() => {
        //         const flag = Math.random() > 0.5
        //         if (flag) {
        //             setInvalidProdIds([ids[1]])
        //         }
        //     })
        // console.log('cart: ', cart)
    }, [profile?.cart])

    //tax 
    const tax =totalPrice * 0.13;
    
    //delivery fee
    const deliveryFee = 0;
    //Final payment
    const totalPayment = totalPrice + tax + deliveryFee;

    //handle coupon submit
    const handleCouponSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        message.success('coupon applied');
    }

    return(
        <div className='w-full flex flex-col gap-5'>
            {
                // findProductsAndQuantities(profile.cart).map((cartItem : CartItem, index) => (
                //     <div key={index}>
                //         <ProductElement data={cartItem.product} isInvalid={invalidProdIds.includes(product.product.id)} />
                //     </div>
                // ))

                cart.map((cartItem, index) => (
                    <ProductElement key={index} product={cartItem.product} option={cartItem.option} isInvalid={invalidProdIds.includes(cartItem.product.id)} />
                ))
            }
            <Divider />
            <form onSubmit={handleCouponSubmit} className='flex w-full gap-7'>
                <input type="text" placeholder="gift card or coupon code" className='flex-1 text-md font-thin p-2 border border-gray-200 rounded-md'/>
                <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type='submit'
                    className='w-1/3 p-2 bg-primary text-white rounded-md'>
                        Apply
                </motion.button>
            </form>

            <Divider />
            
            <div className='flex flex-col gap-5'>
                <div className='flex justify-between'>
                    <p>Subtotal</p>
                    <p>${totalPrice.toFixed(2)}</p>
                </div>
                <div className='flex justify-between'>
                    <p>Tax</p>
                    <p>${tax.toFixed(2)}</p>
                </div>
                
                <div className='flex justify-between'>
                    <p>Shipping</p>
                    {/* <p>Calculate at next step</p> */}
                    <p>
                        {shippingPrice === undefined ? 'Calculate at next step' : shippingPrice ? '$' + Number(shippingPrice).toFixed(2) : 'Free' }
                    </p>
                </div>
                <div className='flex justify-between'>
                    <p>Total</p>
                    <p>${totalPayment.toFixed(2)}</p>
                </div>

            </div>

            <Divider />

        </div>
    
    )
}


export default ProductTable;