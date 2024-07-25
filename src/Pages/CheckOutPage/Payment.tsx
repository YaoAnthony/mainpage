import { useState, useMemo, useEffect, } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';

//antd
import {  Radio, Tooltip, Form, Spin, message } from 'antd';
import type { RadioChangeEvent } from 'antd';

//icon
import { LeftOutlined, LockOutlined, QuestionCircleOutlined } from '@ant-design/icons';

//framer-motion
import { motion } from 'framer-motion';

//types
import { RootState } from '../../Redux/store';
import { setProfile } from '../../Redux/Features/profileSlice';
import { Payment as PaymentType,Profile } from '../../Types/Profile';
import { useForm } from 'antd/es/form/Form';
import { validShippingMethod } from '../../Api/checkout';

type PaymentMethodRadioGroupProps = {
    value?: string
    card?: PaymentType
    onChange?: (e: RadioChangeEvent) => void
    onCardChange?: (value: PaymentType) => void
    showSelectedOnly?: boolean
}

export const PaymentMethodRadioGroup: React.FC<PaymentMethodRadioGroupProps> = (props) => {
    const { value, onChange, card, onCardChange, showSelectedOnly = false } = props
    const [selected, setSelected] = useState(value || undefined)
    const [cardNumber, setCardNumber] = useState(card?.cardNumber || '')
    const [cardName, setCardName] = useState(card?.nameOnCard || '')
    const [securityCode, setSecurityCode] = useState(card?.securityCode || '')
    const [expireDate, setExpireDate] = useState(card?.expirationDate || '')

    const onRadioChange = (e: RadioChangeEvent) => {
        setSelected(e.target.value)
        onChange && onChange(e)
    }

    const onUpdater = (updater: any) => {
        return (e: React.ChangeEvent<HTMLInputElement>) => {
            updater(e.target.value)
        }
    }

    useEffect(() => {
        onCardChange && onCardChange({
            type: selected as any,
            cardNumber,
            nameOnCard: cardName,
            expirationDate: expireDate,
            securityCode,
        })
    }, [cardName, cardNumber, securityCode, expireDate, selected])

    return (
        <div className='border border-gray-200 rounded-md shadow-product pt-2 mb-4'>
            <Radio.Group className='w-full' value={ selected } onChange={ onRadioChange }>
                {
                    !showSelectedOnly || (showSelectedOnly && selected === 'CREDIT') ?
                        <div className="flex items-center border-b border-b-gray-200 py-4 px-4">
                            <Radio className='flex-1' value='CREDIT'>Credit Card</Radio>
                            <div className='text-sm text-gray-400 flex items-center'>
                                <img className='w-10 mr-2' src="https://cdn.visa.com/v2/assets/images/logos/visa/blue/logo.png" alt="" />
                                <img className='w-10 mr-2' src="https://www.mastercard.com.cn/content/dam/public/mastercardcom/cn/cn/logos/mc-logo-52.svg" alt="" />
                                <span>and more...</span>
                            </div>
                        </div>
                        : null
                }
                <div className={ `transition-all text-lg bg-[#f1f1f1] ${selected === 'CREDIT' ? 'block' : 'hidden'}` }>
                    <div className='p-4'>
                        <div className='relative'>
                            <input type="text" value={ cardNumber } placeholder='Card number' onInput={ onUpdater(setCardNumber) } className='w-full flex-1 text-sm p-2 py-3 pr-10 mb-3 tracking-widest border border-gray-200 rounded-md' />
                            <LockOutlined className='absolute right-4 top-3.5' />
                        </div>
                        <div className='relative'>
                            <input type="text" value={ cardName } onInput={ onUpdater(setCardName) } placeholder='Name on card' className='w-full flex-1 text-sm p-2 py-3 mb-3 tracking-widest border border-gray-200 rounded-md' />
                        </div>
                        <div className='relative flex'>
                            <input type="text" value={ expireDate } onInput={ onUpdater(setExpireDate) } placeholder='Expiration date (MM/YY)' className='w-1/2 text-sm p-2 py-3 mb-3 tracking-widest border border-gray-200 rounded-md' />
                            <div className='relative w-1/2 ml-2'>
                                <input type="text" value={ securityCode } onInput={ onUpdater(setSecurityCode) } placeholder='Security code' className='w-full flex-1 text-sm p-2 py-3 mb-3 tracking-widest border border-gray-200 rounded-md' />
                                <Tooltip placement="topLeft" title='Security code'>
                                    <QuestionCircleOutlined className='absolute right-4 top-3.5' />
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
                {
                    !showSelectedOnly || (showSelectedOnly && selected === 'WECHAT') ?
                        <div className="flex items-center border-b border-b-gray-200 py-4 px-4">
                            <Radio className='flex-1' value='WECHAT'>Wechat</Radio>
                        </div>
                        : null

                }
                <div className={ `transition-all text-lg bg-[#f1f1f1] ${selected === 'WECHAT' ? 'block' : 'hidden'}` }>
                    <div className='p-4'>
                        <img className='block w-1/2 m-auto' src="https://th.bing.com/th/id/R.a530d7768ced7cd3d8b49a1e05e3a1b2?rik=sNZlAzQ0GnRkuA&riu=http%3a%2f%2fimage.videaba.com%2fFifiU784EvQBf5Qqyyv5OIqsCkgR&ehk=MqTfWlDjjSFTpSn8%2fMQh%2ffohyqK5KXRXc2dWHbZ%2fUjk%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    </div>
                </div>
                {
                    !showSelectedOnly || (showSelectedOnly && selected === 'ALIPAY') ?
                        <div className="flex items-center py-4 px-4">
                            <Radio className='flex-1' value='ALIPAY'>Ali Pay</Radio>
                        </div>
                        : null
                }
                <div className={ `transition-all text-lg bg-[#f1f1f1] ${selected === 'ALIPAY' ? 'block' : 'hidden'}` }>
                    <div className='p-4'>
                        <img className='block w-1/2 m-auto' src="https://th.bing.com/th/id/R.1e5871c9b34fc3bf72af08f3ca9cf38c?rik=izMAIOABpwShEA&riu=http%3a%2f%2fcache.mobanma.com%2fUploads%2fpro%2fcover%2f2017%2f02%2f08%2f201702082213457740FemOPA.png&ehk=c%2bvuGxzjrtyPEFLGt%2fo%2fARfphuxmo7mlhEp0x7tZshs%3d&risl=&pid=ImgRaw&r=0" alt="" />
                    </div>
                </div>
            </Radio.Group>
        </div>
    )
}

export const ShippingMethod = [
    {
        label: 'Canada Post Ground（4-7 business days）',
        value: 10,
        amount: 0,
    },
    {
        label: 'Canada Post Xpresspost（estimated 1-3 days）Due to service delays, we cannot guarantee on-time delivery',
        value: 11,
        amount: 15,
    }
]


interface PaymentProps {
    //function props, useState boolean function, set next step
    next: React.Dispatch<React.SetStateAction<number>>;
    prev: React.Dispatch<React.SetStateAction<number>>;
}

const Payment: React.FC<PaymentProps> = ({ next, prev }) => {

    const [form] = useForm()
    const [form2] = useForm()
    const profile = useSelector((state: RootState) => state.profile.profile);
    const [shippingSpin, setShippingSpin] = useState(false)


    const dispatch = useDispatch()
    const addressTxt = useMemo(() => {
        const addressObj = profile?.shippingAddress
        if (!addressObj) {
            return '-'
        }
        const { city, country, province, street } = addressObj[0]
        return [country, province, city, street].join(', ')

    }, [profile?.shippingAddress])

    const [shippingMethod, setShippingMethod] = useState(undefined)
    const [shippingMethodList, _] = useState([...ShippingMethod])

    const backPrev = () => {
        prev(1)
    }

    const onSubmit = () => {
        console.log(form.getFieldsValue())
        console.log(form2.getFieldsValue())
        const promises = [form.validateFields(), form2.validateFields()]
        Promise.all(promises)
            .then(() => {
                next(1)
                window.scrollTo(0, 0)
            })
        console.log(profile)
    }

    const onCardDataChange = (value: PaymentType) => {
        form2.setFieldValue('payment', {
            ...value
        })
        dispatch(setProfile({
            ...profile,
            payment: {
                ...value
            }
        } as Profile))
    }

    const onMethodChange = (e: RadioChangeEvent) => {
        setShippingSpin(true)
        setShippingMethod(e.target.value);
        form.setFieldValue('shippingMethod', e.target.value)

        validShippingMethod()
            .then(() => {
                dispatch(setProfile({
                    ...profile,
                    shippingAddress: {
                        ...profile?.shippingAddress,
                        method: e.target.value,
                        price: ShippingMethod.find(s => s.value === e.target.value)?.amount || 0
                    }
                } as Profile))
                setTimeout(() => {
                    message.success('Shipping Fee has already updated.')
                    setShippingSpin(false)
                }, 1500)
            })
    };
    const onPaymentMethodChange = (e: RadioChangeEvent) => {
        form2.setFieldValue('payment', {
            type: e.target.value
        })
        form2.validateFields()
        dispatch(setProfile({
            ...profile,
            payment: {
                type: e.target.value
            }
        } as Profile))
    };



    return (
        <div>
            <div className='border border-gray-200 rounded-md shadow-product py-2 px-6 mb-4'>
                <div className='flex items-center border-b border-b-gray-200 py-6'>
                    <div className='w-[70px] text-gray-500'>Contact</div>
                    <div className='flex-1 px-10'>{ profile?.email }</div>
                    <div className='cursor-pointer text-primary' onClick={ () => backPrev() }>Change</div>
                </div>
                <div className='flex items-center py-6'>
                    <div className='w-[70px] text-gray-500'>Ship to</div>
                    <div className='flex-1 px-10'>{ addressTxt }</div>
                    <div className='cursor-pointer text-primary' onClick={ () => backPrev() }>Change</div>
                </div>
            </div>

            <Form form={ form }>
                <div className='pt-4 pb-2'>
                    <div className='flex'>
                        <div className='pb-4 text-lg'>Shipping Method</div>
                        <Spin spinning={ shippingSpin } className='ml-4 mt-1'></Spin>
                    </div>
                    <Form.Item name="shippingMethod" rules={ [{ required: true, message: 'Please select shipping method!' }] }>
                        <div className='border border-gray-200 rounded-md shadow-product py-2 mb-4'>
                            <Radio.Group className='w-full' value={ shippingMethod } onChange={ onMethodChange }>
                                {
                                    shippingMethodList.map((e, index) => {
                                        return (
                                            <div key={ index } className={ `flex items-center ${index === shippingMethodList.length - 1 ? '' : 'border-b'} border-b-gray-200 py-4 px-4` }>
                                                <Radio className='flex-1' value={ e.value }>{ e.label }</Radio>
                                                <span className='text-lg font-bold'>{ e.amount ? '$' + e.amount.toFixed(2) : 'Free' }</span>
                                            </div>
                                        )
                                    })
                                }
                            </Radio.Group>
                        </div>
                    </Form.Item>
                </div>
            </Form>

            <Form form={ form2 }>
                <div className='pt-0 pb-2'>
                    <div className='pb-4 text-lg'>Payment Method</div>
                    <Form.Item name="payment" rules={ [
                        {
                            required: true, message: 'Please select payment method!'
                        },
                        //{ getFieldValue }
                        () => ({
                            validator(_, value) {
                                if (!value || !value?.type) {
                                    return Promise.reject(new Error('Please select payment method!'));
                                }
                                if (value?.type === 'CREDIT') {
                                    const values = [
                                        value.cardNumber,
                                        value.nameOnCard,
                                        value.expirationDate,
                                        value.securityCode,
                                    ]
                                    if (values.some(e => !e)) {
                                        return Promise.reject(new Error('The card info can not be empty!'));
                                    }
                                }
                                return Promise.resolve();
                            },
                        })
                    ] }>
                        <PaymentMethodRadioGroup
                            value={ profile?.payment?.type as string | undefined}
                            card={ profile?.payment }
                            onCardChange={ onCardDataChange }
                            onChange={ onPaymentMethodChange }
                        />
                    </Form.Item>
                </div>
            </Form>

            <div className='w-full flex justify-between items-center'>

                <motion.div
                    className='text-primary cursor-pointer flex gap-2 items-center'
                    onClick={ () => prev(1) }
                >
                    <LeftOutlined />
                    <span> Return to Shipping</span>
                </motion.div>

                <motion.button
                    whileHover={ { scale: 1.05 } }
                    whileTap={ { scale: 0.95 } }
                    onClick={ onSubmit }
                    className='bg-primary text-white rounded-md py-4 px-5'>
                    Continue to Confirm
                </motion.button>
            </div>
        </div>
    )
}

export default Payment;
