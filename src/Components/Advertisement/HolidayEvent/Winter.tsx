
//style
import style from './holidayStyle.module.scss'

//snowfall
import Snowfall from 'react-snowfall'

//motion
import { motion } from 'framer-motion'

//data
import { christmasEvent } from './holidayData'

//icon
import { RightOutlined } from '@ant-design/icons'


const Winter = () => {

    return (
        <div className={`w-full relative overflow-hidden shadow-product`}>
            <Snowfall />
            <div className='w-full flex gap-10 items-center rounded-md '>
                <div className={`${style.grid_holiday} title p-10`}>
                    <div className={`flex flex-col gap-3 col-start-1 col-end-3 justify-center`}>
                        <p className='text-sm text-gray-400'>Editors' Picks</p>
                        <h1 className='text-3xl text-dark font-bold whitespace-nowrap'>Christmas Time!  </h1>
                        <span className='text-accent text-4xl'>10% Off</span>
                        <p className='text-md'>See more <RightOutlined/> </p>
                    </div>
                    {christmasEvent.map((item,index) => (
                        <div key={index} className='flex gap-5 items-center'>
                            <motion.div 
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.9 }}
                                className="aspect-square md:w-[100px] 2xl:w-[150px] 3xl:w-[200px] rounded-md overflow-hidden">
                                <img src={item.image} alt="" className="w-full h-full object-cover"/>
                            </motion.div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Winter