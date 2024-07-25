//react
import { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';

//animation
import { motion } from "framer-motion";
//comoonents
import NavigationBar from './NavigationBar';
import LOGO from './LOGO';

import SearchBar from './../SearchBar';

//style
import { pageSetting } from '../../style';

import TranslateButton from './TranslateButton';


const HeaderPC = () => {

    // GET the current path
    const location = useLocation(); //get the path
    const path = location.pathname;
    const [ currentPath, setCurrentPath ] = useState(path); //set the active path
    const [ bgColor, setBgColor ] = useState('bg-none text-tertiary'); //set the background color

    useEffect(() => {

        const handleScroll = () => {
            // 如果页面的垂直滚动偏移量大于0，即页面不在最顶部
            if (window.scrollY > 500) {
              setBgColor('bg-white text-font'); // 设置背景色为白色
            } else {
              setBgColor('bg-none text-tertiary'); // 否则设置为透明
            }
        };
        // 组件挂载时添加滚动事件监听
        window.addEventListener('scroll', handleScroll);
        setCurrentPath(path);
        // 组件卸载时移除滚动事件监听
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [path]);
   

    const RenderContentBasedOnLocation = () => {
        switch (currentPath) {
            case '/':
                return (
                    <div className={`${pageSetting.padding} md:bg-white border-b py-5 flex w-full items-center justify-between duration-500 gap-10`}>
                        <LOGO />
                        {bgColor === 'bg-white text-font' && 
                            <motion.div 
                                initial='hidden'
                                animate='visible'
                                className='flex-1'
                            >
                                {/* <SearchBar type='Normal' value=''/> */}
                            </motion.div>
                        }
                        <div className='flex gap-3'>
                            <TranslateButton />
                            <NavigationBar />
                        </div>
                    </div>
                )
            case '/ai-search':
                // ai界面不要显示普通的search bar
                return (
                    <div className={`${pageSetting.padding} md:bg-none flex w-full items-center justify-between duration-500 gap-10`}>
                        <LOGO />
                        <NavigationBar />
                    </div>
                )
            case '/dashboard':
                // 登录页面的 Header 内容 
                return (
                    <></>
                )
            case '/my-space':
                return <div>主页面特定内容</div>;
            default:
                return (
                    <div className={`bg-white ${pageSetting.padding} md:bg-none border-b py-6 flex w-full items-center justify-between duration-500 gap-10`}>
                        <LOGO />
                        <div className='xl:px-32 flex-1'><SearchBar type='Normal' displayPrompt='' value=''/></div>
                        <NavigationBar />
                    </div>
                ) 
        }
    }
    
    return(
        <header className={`z-50 fixed top-0 left-0 w-full hidden md:flex `} >
            <RenderContentBasedOnLocation />
        </header>
    )
}

export default HeaderPC;