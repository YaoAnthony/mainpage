
//react
import { useState } from 'react'


//motion
import { motion } from 'framer-motion';

//translation
import { useTranslation } from 'react-i18next';

//icons
import { UpOutlined } from '@ant-design/icons';

type UpButtonProps = {
    fullpageApi : any;
}       

const UpButton: React.FC<UpButtonProps> = ({fullpageApi}) => {

    const { t } = useTranslation();
    const [isHovering, setIsHovering] = useState(false);

    return(
        <div
            onClick={() => fullpageApi.moveSectionUp()}
            className="cursor-pointer text-font flex flex-col gap-3 ">
            
            <motion.div
                onHoverStart={() => setIsHovering(true)}
                onHoverEnd={() => setIsHovering(false)}
        
                animate={{ 
                    y: ["0%", "10%", "0%"] 
                }}
                whileHover={{ y: "60%" }}
                className='flex justify-center'
                transition={
                isHovering ? 
                {
                    duration: 0.5,
                    ease: "easeInOut"
                }
                : 
                {
                    repeat: Infinity,
                    repeatType: "loop",
                    duration: 1,
                    ease: "easeInOut"
                }}
                >
                <UpOutlined style={{ fontSize: '24px' }} />
                
            </motion.div>

            <span>{t("AI search")}</span>
        </div>
    )
}

export default UpButton