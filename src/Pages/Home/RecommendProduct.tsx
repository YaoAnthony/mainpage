import React, { useState, useEffect } from "react";

//styles
import { pageSetting } from "../../style";

//redux
import { useSelector } from "react-redux";

//translate
import { useTranslation } from 'react-i18next';

//motion
import { motion } from 'framer-motion';

//icon
import { 
    RetweetOutlined,
} from '@ant-design/icons';

//components
import ProductCard from './../../Components/ProductCard';
import Advertisement from "../../Components/Advertisement";
import FilterBar from "../../Components/FilterBar";

//icons
import { MdComputer } from "react-icons/md";
import { FaRegKeyboard } from "react-icons/fa";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiDesk } from "react-icons/pi";
import { MdOutlineToys } from "react-icons/md";


//antd
import { Pagination } from "antd";

//api
import { getRecommendProductsWithAd } from '../../Api/getPublicDataApi';

//image
import { christmasDiscount } from "../../Assets";

//types
import { Product } from "../../Types/Product";
import { RootState } from "../../Redux/store";
import { ReactNode } from 'react';

type categoryType = {
    name: string,
    value: string,
    icon: ReactNode
}

type Ad = {
    id: string;
    size: 'one' | 'two' | 'full';
    component: React.FC<{ key: string }>;
}

const categories = [
    {name: '所有商品', value:"all",  icon: <MdComputer /> },
    {name: '键帽', value:"Keychain", icon: <FaRegKeyboard />},
    {name: '冰箱贴', value:"Fridge Magnet", icon: <CgSmartHomeRefrigerator />},
    {name: '针织玩具',value:"", icon: <MdOutlineToys /> },
    {name: '桌面摆设',value:"decoration", icon: <PiDesk /> },
]

//接收的广告数据 //TODO: 从后台获取广告数据
const Advertisements: Ad[] = [
    {id: '1', size: "two",component: ({ key }) => <Advertisement key={key} size='two' image={christmasDiscount} />},
    {id: '2', size: "full",component: ({ key }) => <Advertisement key={key} size='full' image={christmasDiscount} />},
]

const RecommendProduct = () => {

    //接受的产品数据
    const [products, setProducts] = useState<Product[]>([]); 
    //目录
    const [ category, setCategory ] = useState<categoryType>(categories[0]);
    //loading
    const [loading, setLoading] = useState(false); // loading state
    //真实打印给用户的数据
    const [items, setItems] = useState<( Product | Ad )[]>([]);
    //翻译
    const { t } = useTranslation(); //translation
    //用于发送后台请求的页数
    const [page, setPage] = useState(1);
    //用户收藏
    const favorites = useSelector((state: RootState) => state.profile.profile?.favorites) || [];

    const handleCategory = (type: categoryType) => {
        setCategory(type);
    }

    //Fetch products
    const fetchProducts = async () => {
        try{
            const { products: recommendedProducts } = await getRecommendProductsWithAd(category.value,page);
            setProducts(recommendedProducts);
        }catch(error){
            console.error(error);
        }
    };

    //Fetch advertisement, each time get one ad
    const fetchAd = async () => {
        //TODO: fetch ad from backend
    }

    const combineItems = () => {
        // 过滤产品
        const filterProducts = (products: Product[], category: categoryType) => {
            if (category.value === 'all') {
                return products;
            }
            return products.filter(product => product.tag[0].name === category.value);
        };
    
        // 获取当前列数
        const gridContainer = document.querySelector('.gridDIY');
        if (!gridContainer) return;
        const gridColumns = window.getComputedStyle(gridContainer).gridTemplateColumns.split(' ').length;
    
        // 广告信息
        const ads = Advertisements;
        const adSizes = { one: 1, two: 2, full: gridColumns }; // 广告大小对应的网格列数
    
        let adInserted = false; // 广告是否已插入
    
        // 过滤产品
        const filteredProducts = filterProducts(products, category);
    
        const combinedItems: (Product | Ad)[] = [];
        let currentRowItems = 0; // 当前行的项目数
    
        filteredProducts.forEach((product, index) => {
            const nextProduct = filteredProducts[index + 1];
    
            // 检查是否可以插入广告
            if (!adInserted) {
                //如果产品少于2排，就不插入广告了
                if (filteredProducts.length < 2) {
                    adInserted = true;
                }

                const ad = ads[Math.floor(Math.random() * ads.length)];
                const adSpan = adSizes[ad.size];
    
                // 判断是否可以插入广告
                if (ad.size === 'full' || currentRowItems + adSpan > gridColumns) {
                    if (currentRowItems > 0) {
                        // 当前行已满或广告是全宽，插入广告
                        combinedItems.push(ad);
                        currentRowItems = 0; // 重新开始新行
                        adInserted = true;
                    } else {
                        // 当前行为空，可以直接插入广告
                        combinedItems.push(ad);
                        currentRowItems = adSpan;
                        adInserted = true;
                    }
                }
            }
    
            // 添加当前产品
            combinedItems.push(product);
            currentRowItems++;
    
            // 如果当前行已满，重置当前行项目数
            if (currentRowItems >= gridColumns) {
                currentRowItems = 0;
            }
        });
    
        // 处理可能的剩余空间
        if (!adInserted && filteredProducts.length > 0) {
            const ad = ads[Math.floor(Math.random() * ads.length)];
            combinedItems.push(ad);
        }
        setItems(combinedItems);
    };
    

    //当用户第一次进入页面时，加载推荐产品
    useEffect(() => {
        fetchProducts();
        fetchAd();
    }, [category, page]);

    // 监听products的变化并调用combineItems
    useEffect(() => {
        combineItems();
    }, [products]);

    //根据是产品还是广告来渲染
    const renderGridItem = (item: Product | Ad) => {
        
        // 渲染广告
        if ('component' in item) {
            return item.component({ key: item.id.toString() as string });
        }

        // 渲染产品
        // check if the product is in the favorite list according id
        const isFavorite = favorites.some(favor => favor.id === item.id);
    
        // 渲染产品
        return (
            <ProductCard key={item.id.toString()} product={item} isFavor={isFavorite} />
        );
    };
    

    return (
        <section 
            className={`relative w-full ${pageSetting.padding} flex flex-col gap-3`}>
            <div className={`${pageSetting.padding} w-full mb-2`}>
                <FilterBar category={category} categories={categories} handleCategory={handleCategory}  />
            </div>
            {
                loading ?
                <div className="w-full h-[300px] flex justify-center items-center">
                    <span className="text-font text-2xl">I am trying my best to load...</span>
                </div>
                :
                products.length === 0 ? 
                <div className="w-full h-[300px] flex justify-center items-center text-font">
                    Loading Failed...&nbsp;&nbsp;
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => {
                            setLoading(true);
                            fetchProducts();
                            setLoading(false);
                        }}
                        className="cursor-pointer"
                    >
                        <RetweetOutlined style={{ fontSize: '24px' }} />
                    </motion.div>
                </div>
                :
                <div className="w-full gridDIY">
                    {items.map(renderGridItem)}
                </div>
            }
            <div className="flex justify-center mt-32">
                <Pagination 
                    current={page} 
                    onChange={(page) => setPage(page)} 
                    defaultCurrent={1} 
                    total={50} 
                />
            </div>
            {/* <p className='text-center text-sm text-gray-400 my-12'>{t('---到底了---')}</p> */}
        </section>
    );
}


export default RecommendProduct;