
//react
import { useState } from 'react';

//motion
import { motion } from 'framer-motion';

//antd
import { Avatar, message } from 'antd';

//style
import style from './style.module.scss';

//react-router-dom
import { NavLink } from 'react-router-dom';

//redux
import { useDispatch,useSelector } from 'react-redux';

//hook
import { useModal } from '../../Context/SignInModalContext';

//icons
import { HeartOutlined,HeartFilled } from '@ant-design/icons';

//types
import { Product } from '../../Types/Product';
import { RootState } from '../../Redux/store';

// Define props interface
interface ShowProduct {
    product: Product;
    isFavor: boolean;
}

const ProductCard: React.FC<ShowProduct> = ({product,isFavor}) => {

    const dispatch = useDispatch();
    //modal
    const { showModal } = useModal();
    //hook
    const [isFavorite, setIsFavorite] = useState(isFavor);
    
    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    const handleLike = ()  => {
        if (!isLoggedIn) {
            message.info('We are happly to see you join us!');
            // 这里需要根据你的路由配置来导航到登录页
            showModal();
            return;
        }
        if(isFavorite){
            dispatch({ type: 'profile/removeFavorite', payload: product });
            
            message.success('Remove from favorite');
            setIsFavorite(false);
            return;
        }else{
            dispatch({ type: 'profile/addFavorite', payload: product });
            
            message.success('Add to favorite');
            setIsFavorite(true);
        }  // 假设总是成功，实际开发中需要处理失败情况
    }

    return(
        <motion.div className={`product flex flex-col justify-start gap-2 hover:shadow-product p-3 duration-100`}>

            <div className="relative bg-gray-200 rounded-xl overflow-hidden border">
                <motion.div 
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`${style.glassmorphism} absolute top-2 right-3 w-9 h-9 flex justify-center items-center text-white hover:text-heart text-xl rounded-full border cursor-pointer`}>
                    { isFavorite ? <HeartFilled className='text-accent '/> : <HeartOutlined /> }
                </motion.div>
                <NavLink to={`/asset/${product.id}`}>
                    <img src={product.image[0]} alt="" className='product_picture aspect-square'/>
                </NavLink>
            </div>

            <div className='flex gap-3 '>
                <NavLink to={`/space/${product.authorId}`}>
                    <Avatar src={product.authorAvatar} size={48} />
                </NavLink>
                <div className='flex flex-col gap-1 justify-start items-start'>
                    <NavLink 
                        to={`/asset/${product.id}`}
                        className="w-full text-start text-black text-lg font-semibold">
                        <span>{product.name}</span>
                    </NavLink>
                    <NavLink
                        to={`/user-profile/${product.authorId}`}
                        className="text-xs">
                        {product.authorName}
                    </NavLink>
                    <p className="text-font text-sm font-semibold">${product.price} CAD</p>

                    {product.tag && product.tag.length > 0 && (
                        <div className='flex gap-2'>
                        {
                            // 根据 tag 的 id 生成链接, 最多显示 3 个 tag
                            product.tag.slice(0, 3).map((tag) => (
                                <NavLink
                                    key={tag._id}
                                    to={`/search/${tag.id}`}>
                                    <span className="bg-white text-font hover:bg-font hover:text-white text-xs py-1 px-4 rounded-full duration-300 border select-none cursor-pointer border-font">{tag.name}</span>
                                </NavLink>  
                            ))
                        }   
                        </div>
                    )}

                    
                </div>
            </div>

            

        </motion.div>
    )
}

export default ProductCard;