//react
import { useState } from 'react';

//search icon from antd
import { SearchOutlined } from '@ant-design/icons';

const HeaderSearchBar = () => {

    const [search, setSearch] = useState<string>('');

    const setSearchValue = (value: string) => {
        setSearch(value);
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }


    return (
        <form 
            onSubmit={handleSubmit}
            className="flex-1 flex max-w-[1000px] border border-font rounded-full pl-8">
            <input 
                type="text" 
                value={search}
                placeholder="Search for products"
                className="flex-1 py-4 h-full w-full border-none outline-none bg-transparent" 
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <button className="px-5 text-font text-lg hover:bg-font hover:text-white duration-300 rounded-full">
                <SearchOutlined />
            </button>
        </form>
    );
}

export default HeaderSearchBar;