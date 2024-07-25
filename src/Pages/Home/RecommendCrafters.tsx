import { useState, useEffect } from "react";

//styles
import { pageSetting } from "../../style";

//translate
import { useTranslation } from 'react-i18next';

//motion
import { motion } from 'framer-motion';

//icon
import { 
    RetweetOutlined,
    LeftOutlined,
    RightOutlined 
} from '@ant-design/icons';
import { NavLink } from "react-router-dom";
import { Divider, message } from "antd";

//api
import { getRecommendCrafters } from '../../Api/getPublicDataApi';

//types
import { User } from "../../Types/Auth";

type ButtonProps = {
    name: string;
};

const RecommendCrafters = () => {

    const [crafters, setCrafters] = useState<User[]>([]); // recommend products for people
    
    const { t } = useTranslation(); //translation
    const [ type, setType ] = useState('Trending');
    const [page, setPage] = useState(1); // 当前页码
    const [loading, setLoading] = useState(false);

    const fetchProducts = async () => {
        setLoading(true);
        const recommendedCrafters = await getRecommendCrafters(type);
        setCrafters(recommendedCrafters);
        setLoading(false);
    };

    useEffect(() => {
        
        fetchProducts();
    }, [type]);

    useEffect(() => {
        // 当类型变化时，重置产品列表和页码
        setCrafters([]);
        setPage(1);
        //fetchProducts();
    }, [type]);



    const ButtonType: React.FC<ButtonProps> = ({ name }) => (
        <motion.button 
            onClick={() => setType(name)}
            className={`text-sm font-semibold ${type === name ? 'text-white bg-font' : 'text-font bg-white hover:text-white hover:bg-font'} py-3 px-5 rounded-full shadow-product duration-300`}>
            {t(name)}
        </motion.button>
    )

    const CrafterCard: React.FC<{ member: User }> = ({ member }) => {

        return(
            <div className="flex flex-col gap-2">
                <div className="relative w-full h-72">
                    <img 
                        src={member.avatar}
                        alt="crafter avatar"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <h1 className="text-lg font-semibold">{member.username}</h1>
                    <p>{member.personalSignature}</p>
                </div>
            </div>
        )
    }


    return (
        <section 
            className={`relative w-full ${pageSetting.padding} flex flex-col gap-3`}>

            <div className="flex flex-col gap-2">
                <h1 className="text-3xl font-bold font-loraFont">DISCOVER CRAFTERS.</h1>
                <p>See our newest collections for gifts and interesting goods.</p>
            </div>

            <nav className="w-full flex justify-between items-center">
                <div className="flex gap-5">
                    <ButtonType name="Trending" />
                    <ButtonType name="Local" />
                </div>

                <NavLink to="/product" className="text-font text-sm font-semibold">
                    <span className="mr-3">{t("See More")}</span>
                </NavLink>
            </nav>
            <Divider />

            {
                loading ?
                <div className="w-full h-[300px] flex justify-center items-center">
                    Loading...
                </div>
                :
                crafters.length > 0 ? 
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {
                        crafters.map((crafter, index) => (
                            <CrafterCard 
                                key={index}
                                member={crafter}
                            />
                        ))
                    }
                </div>
                :
                <div className="w-full h-[300px] flex justify-center items-center text-font">
                    Loading Failed...&nbsp;&nbsp;
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => fetchProducts()}
                        className="cursor-pointer"
                    >
                        <RetweetOutlined style={{ fontSize: '36px' }} />
                    </motion.div>
                </div>
            }

            <div className=" self-end flex gap-5">
                <motion.div
                    onClick={() => {
                        if (page > 1) {
                            setPage(page - 1);
                        }else{
                            message.info('已经到底啦，试试右滑吧！');
                        }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer border border-font rounded-full flex justify-center items-center p-2 hover:bg-font hover:text-white">
                    <LeftOutlined style={{ fontSize: '24px' }} />
                </motion.div>

                <motion.div
                    onClick={() => setPage(page + 1)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="cursor-pointer border border-font rounded-full flex justify-center items-center p-2 hover:bg-font hover:text-white">
                    <RightOutlined style={{ fontSize: '24px' }} />
                </motion.div>
            </div>
        </section>
    );
}


export default RecommendCrafters;
