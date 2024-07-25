import { useMemo } from 'react';

//redux
import {  useSelector } from 'react-redux';

//types
import { RootState } from '../../Redux/store';

interface CompleteProps {
    //function props, useState boolean function, set next step
    prev: React.Dispatch<React.SetStateAction<number>>;
    next: React.Dispatch<React.SetStateAction<number>>;
}

const Complete: React.FC<CompleteProps> = () => {
    const profile = useSelector((state: RootState) => state.profile.profile);
    const addressTxt = useMemo(() => {
        const addressObj = profile?.shippingAddress
        if (!addressObj) {
            return '-'
        }
        const { city, country, province, street } = addressObj[0]
        return [country, province, city, street].join(', ')

    }, [profile?.shippingAddress])
    const infoList = useMemo(() => {
        return [
            {
                label: 'Contact',
                value: profile?.email,
            },
            {
                label: 'Order Status',
                value: 'Finished'
            },
            {
                label: 'Order Amount',
                value: '$15.00'
            },
            {
                label: 'Pay Method',
                value:  profile?.payment.type
            },
            {
                label: 'Shipping Method',
                value:  '-' //ShippingMethod.find(e => e.value === profile?.shippingAddress?.method)?.label || '-'
            },
            {
                label: 'Shipping Fee',
                render: () => <span>Free</span>
            },
            {
                label: 'Ship to',
                value: addressTxt,
            },
        ]
    }, [profile])
    return (
        <div>
            <div>
                <div className='border border-gray-200 rounded-md shadow-product py-2 px-6 mb-4'>
                    {
                        infoList.map((e, index) => {
                            return (
                                <div key={index} className={`flex items-center py-6 ${index !== infoList.length - 1 ? 'border-b border-b-gray-200' : ''}`}>
                                    <div className='w-[140px] text-gray-500'>{e.label}</div>
                                    <div className='flex-1 px-10'>{ e.value || (e?.render?.()) || '-'}</div>
                                </div>
                            )
                        })
                    }
                    {/* <div className='flex items-center border-b border-b-gray-200 py-6'>
                        <div className='w-[70px] text-gray-500'>Contact</div>
                        <div className='flex-1 px-10'>{ profile?.user?.email }</div>
                    </div>
                    <div className='flex items-center border-b border-b-gray-200 py-6'>
                        <div className='w-[70px] text-gray-500'>Ship to</div>
                        <div className='flex-1 px-10'>{ addressTxt }</div>
                    </div>
                    <div className='flex items-center py-6'>
                        <div className='w-[70px] text-gray-500'>Shipping Method</div>
                        <div className='flex-1 px-10'>{ '1' }</div>
                    </div> */}
                </div>

                {/* <div className='w-full flex justify-between items-center'>

                    <motion.div
                        className='text-primary cursor-pointer flex gap-2 items-center'
                        onClick={ () => prev(1) }
                    >
                        <LeftOutlined />
                        <span> Return to Payment</span>
                    </motion.div>

                    <motion.button
                        whileHover={ { scale: 1.05 } }
                        whileTap={ { scale: 0.95 } }
                        onClick={() => {}}
                        className='bg-primary text-white rounded-md py-4 px-5'>
                        Confirm
                    </motion.button>
                </div> */}
            </div>
        </div>
    )
}

export default Complete;
