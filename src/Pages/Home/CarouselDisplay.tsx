import React, { useState } from 'react';
// Ensure you import Carousel, SearchBar, and mainPageBG from their respective modules
import { Carousel } from 'antd'; // Adjust this import to your actual Carousel component's source

//components
import SearchBar from '../../Components/SearchBar'; // Adjust this import according to your file structure
import { mainPageBG } from '../../Assets'; // Adjust this import to the actual path of your image

//translate
import { useTranslation } from 'react-i18next';

//frame motion
import { motion } from 'framer-motion';

//icon
import { DownOutlined } from '@ant-design/icons';
import { pageSetting } from '../../style';

type CarouselDisplayProps = {
    fullpageApi : any;
}

const ProductButton: React.FC<CarouselDisplayProps> = ({fullpageApi}) => {

    const { t } = useTranslation();
    const [isHovering, setIsHovering] = useState(false);

    return(
        <div 
            onClick={() => fullpageApi.moveSectionDown()}
            className="cursor-pointer text-white absolute bottom-10 flex flex-col gap-3">
                
            <span>{t("Shop for Products")}</span>
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
                <DownOutlined style={{ fontSize: '24px' }} />
            </motion.div>
        </div>
    )
}


const CarouselDisplay: React.FC<CarouselDisplayProps> = ({fullpageApi}) => {

    const { t } = useTranslation();
    
    const height = 'h-[100vh]';

    return (
        <div className={`w-full ${height}`}>
                <Carousel 
                    effect="fade" 
                    autoplay 
                    dots={false}
                    style={{
                        width: "100%",
                        position: "absolute",
                        top: 0,
                        left: 0,
                    }}>
                    <div>
                        <div className="relative">
                            <img src={mainPageBG} alt="mainPageBG" className={`${height} w-full object-cover`} />
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 2 }}
                                className="overlay">    
                            </motion.div>
                            
                        </div>
                    </div>
                </Carousel>
            
            <div className={`relative w-full ${height} ${pageSetting.padding} flex justify-center items-center`}>
                <div className="w-full flex flex-col items-center gap-12 z-10">
                    <h1 className="text-white text-xl md:text-3xl font-semibold text-center font-erode">{t("Describe your exceptional idea to AI to create a one-of-a-kind gift")}</h1>
                    <div className="w-full lg:w-[80%] xl:w-[70%] 2xl:w-[65%] h-full flex justify-center items-center">
                        <SearchBar type="AI" displayPrompt="I want an eva model which inlcude ayanami..." value='' />
                    </div>
                    
                    <ProductButton fullpageApi={fullpageApi} />
                </div>
            </div>
        </div>
    );
};

export default CarouselDisplay;
