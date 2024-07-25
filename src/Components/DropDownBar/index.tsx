//react
import React from 'react';

//redux
import { useDispatch } from 'react-redux';
import { logout } from '../../Redux/Features/authSlice';
import { initialprofile } from '../../Redux/Features/profileSlice';
import { authApi } from '../../Api/authApi';
import { profileApi } from '../../Api/profileApi';

//router
import { useNavigate,useLocation,NavLink } from 'react-router-dom';

//antd
import { message } from 'antd';

//motion
import { motion } from 'framer-motion';
import { dropDown } from '../../Motion';

//icons
import { HeartOutlined, UserOutlined,HistoryOutlined,CommentOutlined,ShopOutlined } from '@ant-design/icons';
import { IoIosLogOut } from "react-icons/io";

//translation
import { useTranslation } from 'react-i18next';

//types
import { Profile } from '../../Types/Profile';

interface DropDownBarProps {
    isOpen: boolean;
    profile: Profile;
}


const DropDownBar : React.FC<DropDownBarProps> = ({isOpen,profile}) => {

    //hook
    const dispatch = useDispatch();
    const navigate = useNavigate(); //navigate to other page
    const location = useLocation(); //get the path


    //Sign out action
    const handleSignOut = () => {
        
        if(!isOpen){ return; }

        dispatch(logout());
        dispatch(initialprofile());
        dispatch(authApi.util.resetApiState());
        dispatch(profileApi.util.resetApiState());
        
        // 检查当前的路由
        if (location.pathname.startsWith('/user-profile/')) {
            // 如果在 user-profile/* 下面，跳转到主页
            navigate('/');
        }
        // // 如果在其他页面，此处可以添加其他的逻辑

        message.success("You have successfully logged out")
    }

    //translation
    const { t } = useTranslation();

    //style
    const itemStyle = "w-full flex gap-2 items-center text-left text-[1rem] px-5 py-2 text-font hover:bg-gray-200 hover:text-font rounded-md whitespace-nowrap"

    const SquareButton = ({to,count,title}: {to: string, count: number, title: string}) => {
        return(
        <NavLink to={to}>
            <motion.button
                className='flex flex-col items-center text-left border p-2 w-24 text-font hover:text-primary rounded-md whitespace-nowrap'
                whileTap={{ scale: 0.95 }}
                variants={dropDown.itemVariants}
            >
                <span className='text-lg font-medium'>{count}</span>
                <span className='text-xs'>{t(title)}</span>
            </motion.button>
        </NavLink>
        )
    }

    const ListButton = ({to,title,icon}: {to: string, title: string, icon: React.ReactNode}) => {

        return(
            <NavLink to={to}>
                <motion.button
                    className={itemStyle}
                    whileTap={{ scale: 0.95 }}
                    variants={dropDown.itemVariants}
                >
                    {icon}
                    {t(title)}
                </motion.button>
            </NavLink>
        )
    }

    return(
        <motion.div
            className="h-auto  px-5 py-2 rounded-[10px] bg-white text-font select-none shadow-product"
            variants={dropDown.containerVariants}
            initial="closed"
            animate={"open"}
        >
            <h1 className='text-center w-full text-xl my-5'>{profile.user.username}</h1>
            <div className='flex justify-between gap-3 my-5 mx-3 text-font'>
                <SquareButton to="/my-space/saleProduct" count={profile.followers.length} title={'Subscriptions'}/>
                <SquareButton to="/my-space/saleProduct" count={profile.following.length} title={'Followers'}/>
                <SquareButton to="/my-space/saleProduct" count={profile.orders.length} title={'order'}/>
            </div>
            <ListButton to="/my-space/saleProduct" title={'My Space'} icon={<UserOutlined />}/>
            <ListButton to="/dashboard" title={'My store'} icon={<ShopOutlined />}/>
            <ListButton to="/my-space/collection" title={'My collection'} icon={<HeartOutlined />}/>
            <ListButton to="/history" title={'History'} icon={<HistoryOutlined />}/>
            <ListButton to="/conversation" title={'Message'} icon={<CommentOutlined />}/>
            <div className="text-gray-200"><hr/></div>
            <motion.button
                className={itemStyle}
                whileTap={{ scale: 0.95 }}
                variants={dropDown.itemVariants}
                onClick={handleSignOut}
            >
                <IoIosLogOut />
                {t('Logout')}
            </motion.button>

        </motion.div>
    )
}


export default DropDownBar;