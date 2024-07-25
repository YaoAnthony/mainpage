import { Flex } from 'antd';

import { ReactNode } from 'react';
interface categoriesTypes {
    name: string,
    value: string,
    icon: ReactNode
}


interface FilterBarProps {
    category: categoriesTypes;
    categories : categoriesTypes[];
    handleCategory: (type: categoriesTypes) => void;
}


const FilterBar: React.FC<FilterBarProps> = ({category, categories,handleCategory}) => {


    //If catergory is less than 10, using flex justify-center to center the items, else using flex justify-between to make the items align to the left and right
    const justify = categories.length < 10 ? 'justify-center' : 'justify-between';

    return(
        <div className="bg-white p-2">
            <Flex className={`gap-12 ${justify}`}>
                {categories.map((item, index) => (
                    <div 
                        key={index} 
                        className={`flex flex-col gap-2 items-center hover:text-primary duration-75 pb-2 cursor-pointer ${category.name === item.name ? "border-b-2 border-primary text-primary": "hover:border-b border-font"}`}
                        onClick={() => handleCategory(item)}>
                        <span className='text-2xl'>{item.icon}</span>
                        <span>{item.name}</span>
                    </div>
                ))}
            </Flex>
        </div>
    )
}

export default FilterBar;