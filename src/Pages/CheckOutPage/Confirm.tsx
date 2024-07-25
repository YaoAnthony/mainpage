import { useState, useMemo } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';


//antd
import {  Spin } from 'antd';

//icon
import { LeftOutlined } from '@ant-design/icons';

//framer-motion
import { motion } from 'framer-motion';

//types
import { RootState } from '../../Redux/store';
import { PaymentMethodRadioGroup } from './Payment';
import { Payment as PaymentType, Profile } from '../../Types/Profile';
import { setProfile } from '../../Redux/Features/profileSlice';


interface ConfirmProps {
    //function props, useState boolean function, set next step
    next: React.Dispatch<React.SetStateAction<number>>;
    prev: React.Dispatch<React.SetStateAction<number>>;
}

const Confirm : React.FC<ConfirmProps> = ({next, prev}) => {
    
    const { profile } = useSelector((state: RootState) => state.profile);
    const [spinning, setSpinning] = useState<boolean>(false);
    const dispatch = useDispatch()
    const shippingMethodText = useMemo(() => {
        //const type = profile?.shippingAddress[0]?.method
        const label = '-'
        return label
    }, [profile?.shippingAddress])
    const addressTxt = useMemo(() => {
        const addressObj = profile?.shippingAddress
        if (!addressObj) {
            return '-'
        }
        const { city, country, province, street } = addressObj[0]
        return [country, province, city, street].join(', ')

    }, [profile?.shippingAddress])
    const paymentData = useMemo(() => {
        return profile?.payment
    }, [profile])

    const onCardDataChange = (value: PaymentType) => {
        dispatch(setProfile({
            ...profile,
            payment: {
                ...value
            }
        } as Profile))
    }

    const backPrev = () => {
        prev(1)
    }

    const onSubmit = () => {
        console.log(profile)
        setSpinning(true)
        setTimeout(() => {
            setSpinning(false)
            next(1)
            window.scrollTo(0, 0)
        }, 3000)
    }




    return(
        <div>
            <Spin spinning={spinning} fullscreen />
            <div className='border border-gray-200 rounded-md shadow-product py-2 px-6 mb-4'>
                <div className='flex items-center border-b border-b-gray-200 py-6'>
                    <div className='w-[70px] text-gray-500'>Contact</div>
                    <div className='flex-1 px-10'>{profile?.email}</div>
                    <div className='cursor-pointer text-primary' onClick={() => backPrev()}>Change</div>
                </div>
                <div className='flex items-center border-b border-b-gray-200 py-6'>
                    <div className='w-[70px] text-gray-500'>Ship to</div>
                    <div className='flex-1 px-10'>{addressTxt}</div>
                    <div className='cursor-pointer text-primary' onClick={() => backPrev()}>Change</div>
                </div>
                <div className='flex items-center py-6'>
                    <div className='w-[70px] text-gray-500'>Shipping Method</div>
                    <div className='flex-1 px-10'>{shippingMethodText}</div>
                    <div className='cursor-pointer text-primary' onClick={() => backPrev()}>Change</div>
                </div>
            </div>

            <div className='pt-4 pb-2'>
                <legend className='pb-4'>Payment Method</legend>
                <PaymentMethodRadioGroup 
                    showSelectedOnly 
                    onCardChange={onCardDataChange} 
                    value={paymentData?.type as string | undefined} 
                    card={paymentData} 
                />
            </div>

            <div className='w-full flex justify-between items-center'>

                    <motion.div
                        className='text-primary cursor-pointer flex gap-2 items-center'
                        onClick={() => prev(1)}
                    >
                        <LeftOutlined />
                        <span> Return to Payment</span>
                    </motion.div>

                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onSubmit}
                        className='bg-primary text-white rounded-md py-4 px-5'>
                            Confirm
                    </motion.button>
                </div>
        </div>
    )
}


export default Confirm;
