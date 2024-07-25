
//react
import React from 'react';
import { NavLink} from 'react-router-dom';

//component


//animation
import { motion } from "framer-motion";

import { profile,logo,cart,happy } from '../../Assets';

const HeaderMobile : React.FC = () => {

    //hook load
    //console.log('HeaderMobile loaded',cart);


    return(
        <header className='absolute bottom-0 flex md:hidden w-full border z-50 bg-white justify-between px-5 py-2 glas'>
            <NavLink to='/'>
                <motion.div
                    className='flex-1 flex flex-col gap-0 justify-center items-center'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={happy} alt="cart" className='w-12' />
                    <span className='text-sm text-font'>test</span>
                </motion.div>
            </NavLink>
            <NavLink to='/search'>
                <motion.div
                    className='flex-1 flex flex-col gap-0 justify-center items-center'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={logo} alt="cart" className='w-12' />
                    <span className='text-sm text-font'>test</span>
                </motion.div>
            </NavLink>
            <NavLink to='/cart'>
                <motion.div
                    className='flex-1 flex flex-col gap-0 justify-center items-center'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={cart} alt="cart" className='w-12' />
                    <span className='text-sm text-font'>test</span>
                </motion.div>
            </NavLink>
            <NavLink to='/profile'>
                <motion.div
                    className='flex-1 flex flex-col gap-0 justify-center items-center'
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <img src={profile} alt="cart" className='w-12' />
                    <span className='text-sm text-font'>test</span>
                </motion.div>
            </NavLink>
        </header>
    )
}

export default HeaderMobile;