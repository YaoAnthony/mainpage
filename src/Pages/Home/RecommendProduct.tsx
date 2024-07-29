import React, { useState, useEffect, useRef } from "react";

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
    size: 'one' | 'two' | 'full' | 'three'; 
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
    {id: '3', size: "three",component: ({ key }) => <Advertisement key={key} size='three' image={christmasDiscount} />},
]

const RecommendProduct = () => {

    //接受的产品数据
    const [products, setProducts] = useState<Product[]>([]); 
    // ads
    const [ads, setAds] = useState<Ad[]>([]);
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
    const isLoadingMoreRef = useRef(false);


    const handleCategory = (type: categoryType) => {
        setProducts([]);
        setAds([]);
        setCategory(type);
    }

    //Fetch products
    const fetchProducts = async () => {
        try{
            const { products: recommendedProducts } = await getRecommendProductsWithAd(category.value,page);
            const randomAd: Ad = Object.assign((Math.random() > 0.5 ? Advertisements[1] : Math.random() > 0.5 ? Advertisements[0] : Advertisements[2]), { id: Math.random().toString() });
            setProducts((data) => [...data, ...recommendedProducts]);
            // setAds(() => [...ads, ad]);
            setAds((data) => {
                return [...data, randomAd]
            });
        }catch(error){
            console.error(error);
        }
    };

    //Fetch advertisement, each time get one ad
    const fetchAd = async () => {
        //TODO: fetch ad from backend
    }

    const combineItems = () => {
        // 获取当前列数
        const gridContainer = document.querySelector('.gridDIY');
        if (!gridContainer) return;
        const gridColumns = window.getComputedStyle(gridContainer).gridTemplateColumns.split(' ').length;
    
        // 广告信息
        // const ads = Advertisements;
        const combinedItems2: (Product | Ad)[] = [];
        const allAds: Ad[] = [...ads];
        let nextAdIndex = 0;
        let usedCols = 0;

        // 遍历每一个产品，检查产品当前的行、当前行剩余的位置
        // 如果产品每增加10、再找一下有没有广告、插入广告
        for (let i = 0; i < products.length; i++) {
            const index = i + usedCols
            const rowIndex = parseInt((index / gridColumns) + '')
            const rowRemainColumn = gridColumns - (index % gridColumns + 1);
            combinedItems2.push(products[i]);
            const nextAd = allAds[nextAdIndex];
            const canInsertAd = parseInt(i / 10 + '') > nextAdIndex;
            console.log('canInsertAd: ', rowIndex, rowRemainColumn, canInsertAd);
            if (canInsertAd && nextAd) {
                const isContinue = (nextAd.size === 'full' && rowRemainColumn !== 0) || (nextAd.size === 'two' && rowRemainColumn < 2) || (nextAd.size === 'three' && rowRemainColumn < 3);
                const isEnd = i + 1 === products.length;
                if (!isContinue || isEnd) {
                    if (nextAd.size !== 'full') {
                        const step = nextAd.size === 'two' ? 2 : nextAd.size === 'three' ? 3 : gridColumns;
                        usedCols += step;
                    }
                    combinedItems2.push(nextAd);
                    nextAdIndex++;
                }
            }
        }
        console.log(combinedItems2)
        
        setItems(combinedItems2);
    };
    

    //当用户第一次进入页面时，加载推荐产品
    useEffect(() => {
        fetchProducts()
        fetchAd();
    }, [category, page]);

    // 监听products的变化并调用combineItems
    useEffect(() => {
        combineItems();
    }, [products]);

    // 监听底部加载更多
    useEffect(() => {
        const allProducts = document.querySelectorAll('.product');
        const lastProduct = allProducts[allProducts.length - 1];
        const scrollHandler = async () => {
            const offset = lastProduct.getBoundingClientRect(); // vue中，使用this.$el获取当前组件的根元素
            const offsetTop = offset.top;
            const offsetBottom = offset.bottom;
            if (offsetTop <= window.innerHeight && offsetBottom >= 0) {
                // 进入底部可视区域，进行加载
                if (isLoadingMoreRef.current) return
                try{
                    isLoadingMoreRef.current = true;
                    const { products: recommendedProducts, ad } = await getRecommendProductsWithAd(category.value,page);
                    ad.id = Date.now();
                    setProducts((data) => [...data, ...recommendedProducts]);
                    setAds((data) => {
                        return [...data, Math.random() > 0.5 ? Advertisements[0] : Advertisements[2]]
                    });
                } catch(error){
                    console.error(error);
                } finally {
                    isLoadingMoreRef.current = false;
                }
            }
        }
        window.addEventListener('scroll', scrollHandler)
        return () => {
            window.removeEventListener('scroll', scrollHandler)
        }
    }, [items])

    //根据是产品还是广告来渲染
    const renderGridItem = (item: Product | Ad) => {
        
        // 渲染广告
        if ('component' in item) {
            // return item.component({ key: item.id.toString() as string });
            return item.component({ key: Math.random().toString() });
        }

        // 渲染产品
        // check if the product is in the favorite list according id
        const isFavorite = favorites.some(favor => favor.id === item.id);
    
        // 渲染产品
        return (
            // <ProductCard key={item.id.toString()} product={item} isFavor={isFavorite} />
            <ProductCard key={Math.random()} product={item} isFavor={isFavorite} />
        );
    };
    

    return (
        <section 
            className={`relative w-full ${pageSetting.padding} flex flex-col gap-3`}>
            <div className={`overflow-x-scroll md:overflow-x-auto ${pageSetting.padding} w-full mb-2`}>
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