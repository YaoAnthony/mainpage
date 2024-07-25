
//style
import { pageSetting } from "../../style";

//motion
import { motion } from 'framer-motion';

//NavLink
import { NavLink } from "react-router-dom";

//icons
import { iconMap } from "../../Constants";

//footer url
import { getHelpUrl,followUrl, companyUrl } from "../../Constants";

//types
import { IconKey } from "../../Constants";

const Footer = () => {

    const footerStyle = {
        title : "text-2xl font-bold text-dark pb-3 border-b-2 border-primary text-capitalize"
    }

    return (
        <div className={`${pageSetting.padding} w-full flex flex-col md:flex-row justify-between gap-8 md:gap-24 lg:gap-36 xl:gap-64 2xl:gap-96 py-8 md:py-32 `} >
            <div className='flex flex-col gap-6 min-w-36'>
                <h2 className={footerStyle.title}>Company</h2>
                <div className="text-text flex flex-col gap-5">
                {companyUrl.map((item, index) => (
                    <NavLink key={index} to={item.link} className="">
                    <motion.div 
                        whileHover={{ x : 5, transition: { duration: 0.2 }}}
                        whileTap={{ scale: 0.9 }}>
                        {item.name}
                    </motion.div>
                    </NavLink>
                ))}
                </div>
            </div>
        
            <div className='flex flex-col gap-6 min-w-36'>
                <h2 className={footerStyle.title}>Get Help</h2>
                <div className="text-text flex flex-col gap-5">
                {getHelpUrl.map((item, index) => (
                    <NavLink key={index} to={item.link} className="">
                    <motion.div 
                    whileHover={{ x : 5, transition: { duration: 0.2 }}}
                    whileTap={{ scale: 0.9 }}>
                    {item.name}
                    </motion.div>
                </NavLink>
                ))}
                </div>
            </div>
        
            <div className='flex flex-col gap-6 min-w-36'>
                <h2 className={footerStyle.title}>Follow us</h2>
                <div className="text-text flex flex-col gap-5">
                {followUrl.map((item, index) => (
                    <NavLink
                    key={index}
                    to={item.link}
                    className="flex items-center gap-2">
                    <motion.div
                        whileHover={{ x : 5,transition: { duration: 0.2 }}}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center gap-2"
                    >
                        {iconMap[item.name as IconKey]}
                        {item.name}
                    </motion.div>
                    
                    </NavLink>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Footer;

