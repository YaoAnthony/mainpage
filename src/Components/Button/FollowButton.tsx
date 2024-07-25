//react
import { useState } from 'react';

//framer motion
import { motion } from 'framer-motion';

//antd
import { message } from 'antd';


const FollowButton = () => {
    const [isFollowed, setIsFollowed] = useState(false);

    // 当按钮被点击时，切换状态并展示动画
    const toggleFollow = () => {
        message.success(isFollowed ? 'Unsubscribed successful' : 'Subscribed successful!')
        setIsFollowed(!isFollowed);
    };

    return (
        <motion.button
            whileTap={{ scale: 0.95 }} // 点击时的缩放动画
            onClick={toggleFollow}
            className={`px-5 py-2 rounded-md text-sm font-semibold ${isFollowed ? 'bg-primary text-white' : 'bg-white text-dark'}`}
            transition={{ duration: 0.5 }} // 动画过渡时间
            style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)' }} // 添加阴影
        >
            {isFollowed ? 'Followed ✓' : 'Follow'}
        </motion.button>
    );

}

export default FollowButton;