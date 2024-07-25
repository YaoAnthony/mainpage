//react
import { useState } from 'react';

//redux
import { useSelector } from 'react-redux';

//components
import DropDownBar from '../DropDownBar';

//router
import { NavLink } from 'react-router-dom';

//types
import { RootState } from '../../Redux/store';

//antd
import { Avatar, Tooltip  } from 'antd';

//motion
import { motion } from 'framer-motion';
import { dropDown } from '../../Motion';

//icons
import {  ShoppingCartOutlined,CommentOutlined } from '@ant-design/icons';

//shopping cart controller
import { useCart } from '../../Context/ShoppingCartContext';

import { useModal } from '../../Context/SignInModalContext';

//translation
import { useTranslation } from 'react-i18next';




const NavigationBar = () => {

    const { toggleCart } = useCart();
    //modal
    const { showModal } = useModal();

    const isAuthenticated = useSelector((state:RootState) => state.auth.isLoggedIn);
    const currentUser = useSelector((state:RootState) => state.auth.user);
    const { profile } = useSelector((state:RootState) => state.profile);
    
    //set the user menu open or not
    const [isOpen, setIsOpen] = useState(false); 

    
    //translation
    const { t } = useTranslation();

    const handleSignIn = () => {
        showModal();
        //navigate('/auth', { state: { from: location } });
    }

    return(
        <nav className="relative flex gap-10 items-center text-lg tracking-wide font-sans">
            <motion.button
                whileTap={{ scale: 0.95 }}
                variants={dropDown.itemVariants}
                onClick={toggleCart}
                className='cursor-pointer'
            >
                <ShoppingCartOutlined className='text-2xl'/>
            </motion.button>
            {isAuthenticated && currentUser != null && profile ?
                <>
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        variants={dropDown.itemVariants}
                        className='cursor-pointer'
                    >
                        <NavLink to='/conversation'>
                            <CommentOutlined className='text-2xl'/>
                        </NavLink>
                    </motion.button>
                    
                    < Tooltip 
                        color='white'
                        //当离开tooltip，设置isOpen为false
                        onOpenChange={() => setIsOpen(false)}
                        fresh={true}
                        title={< DropDownBar isOpen={isOpen} profile={profile}/>}
                        overlayStyle={{ whiteSpace: 'normal', maxWidth: 'none', padding: 0 }}
                        >
                    <div 
                        onClick={() => setIsOpen(!isOpen)}
                        className="h-12 flex gap-2 items-center text-lg tracking-wide font-sans cursor-pointer">
                        <div onMouseEnter={() => setIsOpen(true)} className='flex items-center gap-2 select-none' >
                            <Avatar src={profile.user.avatar} alt='avatar' className='w-10 h-10 rounded-full'/>
                        </div>
                    </div>
                    </Tooltip>
                </>
                :
                <motion.div 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleSignIn}
                    className='select-none cursor-pointer py-3 px-5 border-2 rounded-full shadow-product whitespace-nowrap text-sm lg:text-lg '
                >{t('Sign In')}</motion.div>
            }
        </nav>
    )

}

export default NavigationBar;