//style
import { pageSetting } from '../../style'

//antd
import { 
    Steps, 
} from 'antd';

//Header
import Header from '../../Components/Header';

//framer-motion
import { motion } from 'framer-motion';
//react
import { useState } from 'react';


//component
import Shipping from './Shipping';
import Confirm from './Confirm';
import Payment from './Payment';
import Complete from './Complete';

import ProductTable from './ProductTable';


const CheckOutPage = () => {

    //step control
    const [current, setCurrent] = useState(0);

    const next = () => {
        setCurrent(current + 1);
    };

    const prev = () => {
        setCurrent(current - 1);
    };

    const steps = [
        {
            title: 'Shipping',
            content: <Shipping next={next}/>,
        },
        {
            title: 'Payment',
            content: <Payment next={next} prev={prev} />,
        },
        {
            title: 'Confirm',
            content: <Confirm next={next} prev={prev}/>,
        },
        {
            title: 'Complete',
            content: <Complete next={next} prev={prev}/>,
        },
    ];
    //step props
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className={`relative w-full mt-36 ${pageSetting.padding} flex gap-16`}>
            <Header />
            <motion.div 
                className='flex-1 border border-gray-200 rounded-xl shadow-product p-10'
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <ProductTable/>
            </motion.div>

            <motion.div 
                className='flex-1 flex flex-col gap-10'
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Steps current={current} items={items} />
                <div>{steps[current].content}</div>
            </motion.div>
        </div>
    ) 
}

export default CheckOutPage