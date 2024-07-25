
import { 
    ShoppingCartOutlined, 
    GiftOutlined, 
    ToolOutlined, 
    UsergroupDeleteOutlined,
    ShopFilled,
    HeartFilled,
    SettingFilled,
    SearchOutlined,
} from '@ant-design/icons';
import { AiFillFacebook, AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai'

export type IconKey =   "Material Sale" | 
                        "Final Products" | 
                        "DIY Supplies" | 
                        "Private Design" | 

                        "Facebook" | 
                        "Instagram" | 
                        "Twitter" |
                        
                        "Shop" |
                        "Heart" |
                        "Setting"|

                        "Search";
                        


export const iconMap: Record<IconKey, JSX.Element> = {
    "Material Sale": <ShoppingCartOutlined />,
    "Final Products": <GiftOutlined />,
    "DIY Supplies": <ToolOutlined />,
    "Private Design": <UsergroupDeleteOutlined />,
    "Facebook": <AiFillFacebook />,
    "Instagram": <AiFillInstagram />,
    "Twitter": <AiFillTwitterCircle />,
    "Shop": <ShopFilled />,
    "Heart": <HeartFilled />,
    "Setting": <SettingFilled />,
    "Search": <SearchOutlined />,
};

// 定义 Category 对象的结构
type Category = {
    name: string | IconKey;
    word: string;
};

// 使用类型注解来限定 categories 数组的结构
export const categories: Category[] = [
    {
        name: "Material Sale",
        word: "Obtaining any merchandise here"
    },
    {
        name: "Final Products",
        word: "Discover Unique handmade Art"
    },
    {
        name: "DIY Supplies",
        word: "Seeking skilled artisans and collaborating with them"
    },
    {
        name: "Private Design",
        word: "Face to Face design your own product"
    }
];


export const searchType = [
    {
        name: "Artisans",
        url: "/store",
    },
    {
        name: "Material",
        url: "/material",
    },
    {
        name: "Products",
        url: "/product",
    },
]

export const followUrl = [
    {
        name: "Facebook",
        link: "#"
    },
    {
        name: "Instagram",
        link: "#"
    },
    {
        name: "Twitter",
        link: "#"
    },
    {
        name: "Youtube",
        link: "#"
    }
]

export const getHelpUrl = [
    {
        name: "FAQ",
        link: "#"
    },
    {
        name: "Shipping policy",
        link: "#"
    },
    {
        name: "Vault card Policy",
        link: "#"
    },
    {
        name: "Payment Options",
        link: "#"
    }
]

export const companyUrl = [
    {
        name: "About Us",
        link: "#"
    },
    {
        name: "Our Services",
        link: "#"
    },
    {
        name: "Privacy Policy",
        link: "#"
    },
]

