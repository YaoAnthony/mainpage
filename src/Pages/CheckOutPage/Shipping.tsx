import { useEffect, useState } from 'react';

//redux
import { useDispatch, useSelector } from 'react-redux';

//router
import { NavLink } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

//antd
import { Divider, Form,message } from 'antd';

//icon
import { LeftOutlined } from '@ant-design/icons';

//cart
import { useCart } from '../../Context/ShoppingCartContext';

//framer-motion
import { motion } from 'framer-motion';

//types
import { RootState } from '../../Redux/store';
import { setProfile } from '../../Redux/Features/profileSlice';
import { Profile } from '../../Types/Profile';
import { useForm } from 'antd/es/form/Form';

interface ShippingProps {
    //function props, useState boolean function, set next step
    next: React.Dispatch<React.SetStateAction<number>>;
}


const Shipping : React.FC<ShippingProps> = ({next}) => {

    //hook
    const navigate = useNavigate();
    const location = useLocation();
    const [ form ] = useForm()
    const { cart } = useCart();

    const { profile } = useSelector((state: RootState) => state.profile);
    console.log('prf: ', profile)
    const dispatch = useDispatch()

    const emptyAddress = {
        firstName: '',
        lastName: '',

        street: '',
        city: '',
        province: '',
        country: '',
        postalCode: '',
    };

    const [ collectData, setCollectData ] = useState({
        email: profile?.email || '',
        address: profile?.shippingAddress[0] || emptyAddress,
    });

    useEffect(() => {
        setCollectData({
            email: profile?.email || '',
            address: profile?.shippingAddress[0] || emptyAddress,
        })
        form.setFieldsValue({
            ...profile?.shippingAddress,
            email: profile?.email,
        })
    }, [profile])

    const from = location.state?.from?.pathname || "/";

    const onSubmit = () => {
        //TODO: Check cart is not empty
        if (cart.length === 0) {
            message.error('Cart is empty');
            return;
        }

        //TODO: Check if the email is valid

        //TODO: Check if the address is valid
        form.validateFields().then(() => {
            const { email, address } = collectData
            dispatch(setProfile({
                ...profile,
                email,
                user: {
                    ...profile?.user,
                },
                shippingAddress: 
                [{ ...address, method: 'standard', price:0 }]
            } as Profile))
            next(1);
            window.scrollTo(0, 0)
            console.log(form.getFieldsValue())

        })
    }
    


    return(
        <div>
            <div className=''>
                <legend>Express Checkout</legend>
                <div className='flex h-12 flex-col gap-2 justify-center items-center'>
                    no express shipping available
                </div>
            </div>

            <div className='w-full flex gap-5 items-center'>
                <div className='flex-1'><Divider/></div>
                <p className='text-gray-200'>OR</p>
                <div className='flex-1'><Divider/></div>
            </div>

            <Form
                form={form}
                initialValues={{
                    email: ''
                }}
            >
                <div className='w-full flex flex-col gap-12'>
                    <div className='flex flex-col gap-3'>
                        <div className='text-lg'>Contact information</div>
                        <Form.Item name="email" rules={[{ required: true, message: 'Please input your email!' }]}>
                            <input
                                type='email'
                                placeholder='Email'
                                value={collectData.email}
                                onChange={(e) => {
                                    form.setFieldValue('email', e.target.value)
                                    setCollectData({ ...collectData, email: e.target.value })
                                }}
                                className='w-full h-12 border border-gray-200 rounded-md p-3'
                            />
                        </Form.Item>
                    </div>

                    <div className='flex flex-col gap-5'>
                        <div className='text-lg'>Shipping address</div>
                        <Form.Item name="country" rules={[{ required: true, message: 'Please input your Country!' }]}>
                            <input
                                type='text'
                                placeholder='Country'
                                value={collectData.address.country}
                                onChange={(e) => {
                                    setCollectData({ ...collectData, address: { ...collectData.address, country: e.target.value } })
                                    form.setFieldValue('country', e.target.value)
                                }}
                                className='w-full h-12 border border-gray-200 rounded-md p-3'
                            />
                        </Form.Item>
                        <div className='flex gap-5 -my-5'>
                            <Form.Item name="firstName" rules={[{ required: true, message: 'Please input!' }]}>
                                <input
                                    type='text'
                                    placeholder='First name'
                                    value={collectData.address.firstName}
                                    onChange={(e) => {
                                        setCollectData({ ...collectData, address: { ...collectData.address, firstName: e.target.value } })
                                        form.setFieldValue('firstName', e.target.value)
                                    }}
                                    className='w-full h-12 border border-gray-200 rounded-md p-3'
                                />
                            </Form.Item>
                            <Form.Item className='flex-1' name="lastName" rules={[{ required: true, message: 'Please input!' }]}>
                                <input
                                    type='text'
                                    placeholder='Last name'
                                    value={collectData.address.lastName}
                                    onChange={(e) => {
                                        setCollectData({ ...collectData, address: { ...collectData.address, lastName: e.target.value } })
                                        form.setFieldValue('lastName', e.target.value)
                                    }}
                                    className='w-full h-12 border border-gray-200 rounded-md p-3'
                                />
                            </Form.Item>
                        </div>

                        <Form.Item name="street" rules={[{ required: true, message: 'Please input!' }]}>
                            <input
                                type='text'
                                placeholder='Address'
                                value={collectData.address.street}
                                onChange={(e) => {
                                    setCollectData({ ...collectData, address: { ...collectData.address, street: e.target.value } })
                                    form.setFieldValue('street', e.target.value)
                                }}
                                className='w-full h-12 border border-gray-200 rounded-md p-3'
                            />
                        </Form.Item>
                        <div className='flex gap-5 -my-5'>
                            <Form.Item name="city" rules={[{ required: true, message: 'Please input!' }]}>
                                <input
                                    type='text'
                                    placeholder='City'
                                    value={collectData.address.city}
                                    onChange={(e) => {
                                        setCollectData({ ...collectData, address: { ...collectData.address, city: e.target.value } })
                                        form.setFieldValue('city', e.target.value)
                                    }}
                                    className='w-full h-12 border border-gray-200 rounded-md p-3'
                                />
                            </Form.Item>
                            <Form.Item name="province" rules={[{ required: true, message: 'Please input!' }]}>
                                <input
                                    type='text'
                                    placeholder='Province'
                                    value={collectData.address.province}
                                    onChange={(e) => {
                                        setCollectData({ ...collectData, address: { ...collectData.address, province: e.target.value } })
                                        form.setFieldValue('province', e.target.value)
                                    }}
                                    className='w-full h-12 border border-gray-200 rounded-md p-3'
                                />
                            </Form.Item>
                            <Form.Item name="postalCode" className='flex-1' rules={[{ required: true, message: 'Please input!' }]}>
                                <input
                                    type='text'
                                    placeholder='Postal code'
                                    value={collectData.address.postalCode}
                                    onChange={(e) => {
                                        setCollectData({ ...collectData, address: { ...collectData.address, postalCode: e.target.value } })
                                        form.setFieldValue('postalCode', e.target.value)
                                    }}
                                    className='w-full h-12 border border-gray-200 rounded-md p-3'
                                />      
                            </Form.Item>
                        </div>
                    </div>
                    <div className='w-full flex justify-between items-center'>

                        <motion.div
                            className='text-primary cursor-pointer flex gap-2 items-center'
                            onClick={() => navigate(from, { replace: true })}
                        >
                            <LeftOutlined />
                            <span> Return to shopping</span>
                        </motion.div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={onSubmit}
                            className='bg-primary text-white rounded-md py-4 px-5'>
                                Continue to Payment
                        </motion.button>
                    </div>

                    <Divider/>

                    <div className='flex gap-8 text-sm flex-wrap'>
                        <NavLink to='/policy/return' className="text-primary cursor-pointer">
                            <p>Return policy</p>
                        </NavLink>
                        <NavLink to='/policy/shipping' className="text-primary cursor-pointer">
                            <p>Shipping policy</p>
                        </NavLink>
                        <NavLink to='/policy/privacy' className="text-primary cursor-pointer">
                            <p>Privacy policy</p>
                        </NavLink>
                        <NavLink to='/policy/terms' className="text-primary cursor-pointer">
                            <p>Terms of service</p>
                        </NavLink>
                        <NavLink to='/policy/terms' className="text-primary cursor-pointer">
                            <p>Purchase options cancellatiopn policy</p>
                        </NavLink>
                    </div>
                </div>
            </Form>
                    
        </div>
    )
}

export default Shipping;