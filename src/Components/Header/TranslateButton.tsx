


import { motion } from 'framer-motion';

import { useTranslation } from 'react-i18next';

import { FaLanguage } from 'react-icons/fa';

import { message,Tooltip } from 'antd';


const DropDownBar = () => {

    const { i18n } = useTranslation();

    const languages = [
        { code: 'en', name: 'English' },
        { code: 'zh', name: '中文' }
    ];

    const changeLanguage = (language: string) => {
        i18n.changeLanguage(language);

        //message alert success
        message.success('Language changed successfully');
    };
    

    return(
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full rounded shadow-lg bg-white text-dark p-1"
        >
            <ul>
            {languages.map(lang => (
                <li 
                    key={lang.code} 
                    className="p-2 hover:bg-gray-200 cursor-pointer text-sm text-black" 
                    onClick={() => changeLanguage(lang.code)}>
                    {lang.name}
                </li>
            ))}
            </ul>
        </motion.div>
    )
}


const TranslateButton = () => {

    const { t } = useTranslation();
    
    return (
        <div 
            className="relative inline-block text-left text-lg ">
            <Tooltip
                color='white'
                fresh={true}
                title={< DropDownBar/>}
                overlayStyle={{ whiteSpace: 'normal', maxWidth: 'none', padding: 0 }}
                >
                <div className="flex gap-2 items-center px-4 py-2 rounded focus:outline-none">
                    <FaLanguage />{t("Language")}
                </div>
            </Tooltip>
        </div>
    );

}

export default TranslateButton;