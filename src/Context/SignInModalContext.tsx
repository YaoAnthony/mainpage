import React, { createContext, useState, useContext, ReactNode } from 'react';

import {  Modal, Alert } from 'antd';

//motion
import { motion } from 'framer-motion';

//login hook
import useLoginAndFetchProfile from '../Hooks/useLoginAndFetchProfile';
import useRegisterAndFetchProfile from '../Hooks/useRegisterAndFetchProfile';

//i18n
import { useTranslation } from 'react-i18next';

//antd
import { Input } from 'antd';


//types
import { AuthError } from '../Types/Auth';
import { NavLink } from 'react-router-dom';



interface ModalContextType {
    showModal: () => void;
    closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

interface FormProps {
    closeModal: () => void;
}


const LoginForm: React.FC<FormProps> = ({ closeModal }) => {
    //tranlation
    const { t } = useTranslation();

    // Login hook
    const { loginInfo, setLoginInfo , handleLogin, errorMess, setErrorMess } = useLoginAndFetchProfile();

    //Handle the input change
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value
        });
    };

    //Handle the form submit
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const feedbackNumber = await handleLogin(loginInfo) as number;
            console.log(feedbackNumber);
            if (feedbackNumber >= 200 && feedbackNumber < 300) {
                console.log(feedbackNumber);
                //set the login status as inital
                setLoginInfo({ email: '', password: '' });

                closeModal();
            } 
        } catch (error) {
            console.log(error);
            const err = error as AuthError;
            setErrorMess(err.error.message);
        }
    };

    return(
        <form 
            onSubmit={onSubmit}
            className='w-full flex flex-col gap-6 font-erode'>
            <h1 className='text-2xl text-black font-semibold'>{t('Login in Waku Waku')}</h1>
            <Input 
                name='email'
                type='email' 
                className='w-full p-3 bg-transparent border rounded-lg text-font text-lg' 
                onChange={onChange}
                placeholder='Email'
                required
            />
            <Input.Password 
                name='password'
                type="password" 
                placeholder="Password" 
                className='w-full p-3 bg-transparent border rounded-lg text-font text-lg' 
                onChange={onChange}
                required
            />
            {/** Checkbox */}
            <div className='flex items-center gap-2'>
                <input type='checkbox' className='w-5 h-5'/>
                <span>Remember me</span>
            </div>
            <NavLink to='/auth/forgot-password' className='text-primary'>Forgot password?</NavLink>
            {errorMess && <Alert message={errorMess} type="error" closable onClose={()=>setErrorMess("")}/>}
            <button className='w-full p-4 rounded-lg my-2 bg-primary text-white text-xl'>Login</button>

        </form>
    )
}


const RegisterForm: React.FC<FormProps> = ({ closeModal }) => {
    //tranlation
    const { t } = useTranslation();

    // register hook
    const { registerInfo , handleRegister, errorMess, setErrorMess, setRegisterInfo } = useRegisterAndFetchProfile();

    //Handle the input change
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setRegisterInfo({
            ...registerInfo,
            [e.target.name]: e.target.value
        });
    };

    //Handle the form submit
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {

            const feedbackNumber = await handleRegister(registerInfo) as number;
            if(feedbackNumber >= 200 && feedbackNumber < 300) {
                setRegisterInfo({ email: '', password: '', username: '' });
                closeModal();
            }
        } catch (error) {
            console.log(error);
            const err = error as AuthError;
            setErrorMess(err.error.message);
        }
    };

    return(
        <form 
            onSubmit={onSubmit}
            className='w-full flex flex-col gap-6 font-erode'>
            <h1 className='text-2xl text-black font-semibold'>{t('Register in Waku Waku')}</h1>
            <Input 
                name='email'
                type='email' 
                className='w-full p-3 bg-transparent border rounded-lg text-font text-lg' 
                onChange={onChange}
                placeholder='Email'
                required
            />
            <Input.Password 
                name='password'
                type="password" 
                placeholder="Password" 
                className='w-full p-3 bg-transparent border rounded-lg text-font text-lg' 
                onChange={onChange}
                required
            />
            <Input 
                name='username'
                type="text" 
                placeholder="Username" 
                className='w-full p-3 bg-transparent border rounded-lg text-font text-lg' 
                onChange={onChange}
            />
            {/** Checkbox */}
            <div className='flex items-center gap-2'>
                <input type='checkbox' className='w-5 h-5'/>
                <span>I Agree the Terms & Conditions</span>
            </div>
            {errorMess && <Alert message={errorMess} type="error" closable onClose={()=>setErrorMess("")}/>}
            <button className='w-full p-4 rounded-lg my-2 bg-primary text-white text-xl'>register</button>
        </form>
    )
}




export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    //Modal control part
    const [isModalOpen, setIsModalOpen] = useState(false);

    //form change
    const [ isLoginform, setForm ] = useState(true);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setForm(true);
        setIsModalOpen(false);
    };

    

    return (
        <ModalContext.Provider value={{ showModal, closeModal }}>
            {children}
            <Modal
                //width={800}
                open={isModalOpen}
                onCancel={closeModal}
                footer={null}
                centered
                className="p-6 rounded-lg"
                //className="frosted-glass-modal top-64"
            >
                <div className='relative w-full p-5 text-font flex flex-col gap-12 justify-center items-center'>


                    {/* Sign in with email */}
                    {isLoginform ? (
                        <LoginForm closeModal={closeModal} />
                        ) : (
                        <RegisterForm closeModal={closeModal} />
                        )
                    } 
                    
                    {/* Icon: Facebook google apple */}
                    <div className='flex justify-center gap-5'>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='rounded-md p-4 shadow-product cursor-pointer'>
                            <img 
                                src="https://img.icons8.com/color/452/facebook-new.png"
                                alt="facebook" 
                                className='w-9 h-9'
                            />
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='rounded-md  p-4 shadow-product cursor-pointer'>
                            <img
                                //search from internet
                                src="https://img.icons8.com/color/452/google-logo.png"
                                alt="google" className='w-8 h-8'/>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='rounded-md  p-4 shadow-product cursor-pointer'>
                            <img 
                                src="https://img.icons8.com/ios/455/mac-os.png"
                                alt="apple" className='w-8 h-8'
                            />
                        </motion.div>
                    </div>
                    <div className='flex flex-col gap-5'>
                        <motion.div 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={()=>setForm(!isLoginform)}
                            className='p-4 rounded-lg cursor-pointer bg-secondary text-white'>
                            {isLoginform ? 'To Register' : 'To Login'}
                        </motion.div>
                    </div>
                    
                    
                </div>
            </Modal>
        </ModalContext.Provider>
    );
};

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext);
    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }
    return context;
};
