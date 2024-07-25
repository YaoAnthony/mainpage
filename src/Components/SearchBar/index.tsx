
//icon
import { SearchOutlined, RetweetOutlined } from '@ant-design/icons';


//motion
import { AnimatePresence,motion } from 'framer-motion';

//router
import { useNavigate } from 'react-router';

//translate
import { useTranslation } from 'react-i18next';

//antd
import { message, Tooltip } from 'antd';

//types
import { useState,useEffect } from "react";

//context
import { useSearchResults } from '../../Context/AISearchContext';

import HeaderSearchBar from './HeaderSearchBar';

//data
import data from './searchKeyWord.json';

type SearchType = {
    type: 'AI' | 'Normal' | 'Header';
    displayPrompt : string;
    value: string;
}


const typeList = [
    {type: 'AI', url: '/ai-search'},
    {type: 'Normal', url: '/search'}
]


const SearchBar: React.FC<SearchType> = ({type, displayPrompt,value}) => {

    if(type === 'Header') return <HeaderSearchBar />

    //hook load
    const navigate = useNavigate(); //navigate to other page
    const { setSearchResults } = useSearchResults(); //AI search result

    //tramslate
    const { t } = useTranslation();

    //search type : AI or Normal
    const [ search, setSearch ] = useState<SearchType>({
        type, 
        displayPrompt,
        value: value
    });

    const [list, setList] = useState<string[]>([]);

    const animatedPlaceholder = t(displayPrompt);

    //search list
    useEffect(() => {
        const res = data.names.filter((name) =>
            name.toLowerCase().includes(search.value.toLowerCase())
        );
        setList([...res]);
    }, [search.value]);

    // 如果是AI搜索，切换Normal，反之亦然
    const handleSelect = (option : 'AI' | 'Normal' | 'Header') => {
        setSearch({
            ...search, // 正确使用展开操作符来保留其他属性
            type: option === 'AI' ? 'Normal' : 'AI'
        });
        message.info(`Switch to ${option} search`);
    };

    const setSearchValue = (value: string) => {
        setSearch({
            ...search,
            value
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        //AI search
        if(search.type === 'AI') {
            //save the result
            const newResult = { id: Date.now(), title: search.value };
            setSearchResults(prevResults => [...prevResults, newResult]);

            //navigate to AI search bar
            navigate(typeList[0].url);
        }

        //Normal search
        if(search.type === 'Normal') {
            navigate(`${typeList[1].url}/?search=${search.value}`);
        }
    }

    // 动画展示 placeholder 文本
    useEffect(() => {
        if (search.value) {
            setSearch({
                ...search,
                displayPrompt : '',
            });
            return;
        }
        const chars = animatedPlaceholder.split('');
        let displayedText = '';
        const interval = setInterval(() => {
            if (chars.length > 0) {
                displayedText += chars.shift();
                setSearch({
                    ...search,
                    displayPrompt : displayedText,
                });
            } else {
                clearInterval(interval);
            }
        }, 50); // 每个字符的显示间隔

        return () => clearInterval(interval);
    }, [search.value]); // 依赖于输入值，当输入改变时重新触发

    return(
        <div className='relative w-full flex flex-col'>

            <form 
                onSubmit={handleSubmit}
                className={`relative shadow-search w-full rounded-full duration-100 flex items-center text-font pl-12 pr-2 py-1`}>
                
                <Tooltip title={`Click to Switch`}>
                    <div 
                        onClick={() => handleSelect(search.type)}
                        className="relative h-full cursor-pointer text-sm md:text-lg flex justify-start items-center gap-2 md:gap-3"
                        >
                        <span className=' duration-150'>{search.type}</span> 
                        <RetweetOutlined />
                    </div>
                </Tooltip>
                

                <div className='relative w-full text-md font-light lg:tracking-wider flex'>
                    <input 
                        type="text" 
                        value={search.value}
                        className="flex-1 py-4 h-full w-full border-none outline-none bg-transparent text-font font-normal text-lg px-4 md:px-6" 
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                        <button 
                            type="submit"
                            onClick={handleSubmit}
                            className='w-12 h-12 rounded-full m-1 bg-secondary hover:bg-primary duration-100 flex justify-center items-center'>
                            <SearchOutlined className=" text-white text-2xl font-bold"/>
                        </button>
                    {search.value === '' && (
                    <AnimatePresence>
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="absolute top-4 left-6 w-1/2 pointer-events-none text-font overflow-hidden whitespace-nowrap"
                        >
                            {search.displayPrompt}
                        </motion.span>
                    </AnimatePresence>
                    )}
                </div>
            </form>

            {search.value && list.length !== 0 && search.value !== list[0] &&(
                <motion.div layout className='absolute top-16 w-full border rounded-md mt-7 min-h-16 max-h-64 py-2 px-2 md:px-4 bg-white shadow-product overflow-auto'>
                
                    {list.map((name) => (
                    <motion.div 
                        layout key={name} 
                        className="py-[10px] px-[20px] text-font rounded-xl select-none cursor-pointer hover:bg-gray-200  transition-all duration-150" 
                        onClick={()=>{
                            setSearchValue(name);
                            setList([]);
                        }}>
                        {name}
                    </motion.div>
                    ))}
                </motion.div>
            )}
        </div>
    )
}

export default SearchBar;