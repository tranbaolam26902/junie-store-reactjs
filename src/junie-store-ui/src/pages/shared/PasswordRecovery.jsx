// Libraries
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Components
import { Button, Container, Input } from '@components/shared';
import { PageTransition, Underline } from '@components/shared/animations';

export default function PasswordRecovery() {
    // States
    const [errorMessages, setErrorMessages] = useState([]);
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    // Event handlers
    const handleRecoverPassword = (e) => {
        e.preventDefault();
    };

    return (
        <PageTransition>
            <Container className='flex flex-col gap-8 md:mx-auto my-32 md:max-w-2xl'>
                <span className='text-3xl font-thin text-center uppercase'>JUNIE VN</span>
                <form className='flex flex-col gap-4' onSubmit={handleRecoverPassword}>
                    <span className='text-2xl font-semibold uppercase'>Khôi phục mật khẩu</span>
                    {errorMessages.map((errorMessage, index) => (
                        <span key={index} className='text-sm text-red text-center'>
                            {errorMessage}
                        </span>
                    ))}
                    <div className='flex items-end gap-1'>
                        <Input
                            label='Email'
                            id='email'
                            placeholder='Nhập email của tài khoản'
                            autoFocus
                            onChange={(e) => {
                                setEmail(e.target.value);
                            }}
                        />
                        <Button secondary text='Gửi mã' className='h-fit' />
                    </div>
                    <Input
                        label='Mã xác nhận'
                        id='code'
                        placeholder='Nhập mã xác nhận'
                        onChange={(e) => {
                            setCode(e.target.value);
                        }}
                    />
                    <Button
                        submit
                        secondary
                        full
                        disabled={email.trim() === '' || code.trim() === ''}
                        text='Khôi phục'
                    />
                    <div className='flex items-center justify-end gap-1'>
                        <span className='font-thin'>Quay lại</span>
                        <Link to='/account/login' className='relative group'>
                            <span>Đăng nhập</span>
                            <Underline />
                        </Link>
                    </div>
                </form>
            </Container>
        </PageTransition>
    );
}
