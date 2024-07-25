

//react
import { useState } from 'react';

//styles
import { pageSetting } from "../../style";

//components
import SearchBar from '../../Components/SearchBar';
import Footer from '../../Components/Footer';
import Header from '../../Components/Header';
import RecommendProduct from './RecommendProduct';
import RecommendCustomized from './RecommendCustomized';

//motion
import { motion } from 'framer-motion';


const typeList = [
    {type: 'Finished Products'},
    {type: 'Customized'}

]

const MainPage = () => {
    //产品类型

    const [ type, setType ] = useState('Finished Products');

    return(
        <div className={`${pageSetting.content} `}>
            <Header />
            <div className='h-32 pt-7 flex justify-center gap-10 z-50'>
                {
                    typeList.map((item, index) => (
                        <motion.div 
                            key={index} 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className={`text-2xl font-bold cursor-pointer ${type === item.type ? 'text-primary' : 'text-font'}`} 
                            onClick={() => setType(item.type)}>
                            {item.type}
                        </motion.div>
                    ))
                }
            </div>
            <div className={` w-full relative  min-h-[90vh] flex flex-col gap-5`}>
                <div className={`${pageSetting.padding} w-full mb-4`}>
                    <div className=' md:px-96'>
                        <SearchBar type='AI' displayPrompt='Say something' value=''/>
                    </div>
                </div>
                <hr className='text-font border '/>
                {
                    type === 'Finished Products' ? 
                    <div id='section2' className='relative z-0 w-full'><RecommendProduct /></div>
                    :
                    <div id='section2' className='relative z-0 w-full'><RecommendCustomized/></div>
                }
            </div>
            <Footer />
        </div>
    )
}

export default MainPage;