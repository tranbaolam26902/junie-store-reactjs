// Libraries
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Hooks
import { useLogin, useRefreshToken } from '@hooks/shared';

// Components
import { Button, Container, Input } from '@components/shared';
import { Underline } from '@components/shared/animations';

export default function Login() {
    // Hooks
    const login = useLogin();
    const navigate = useNavigate();
    const refresh = useRefreshToken();

    // States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);

    // Event handlers
    const handleLogin = async (e) => {
        e.preventDefault();

        const loginResult = await login(username.trim(), password.trim());
        if (loginResult.isSuccess) {
            console.log(loginResult);
        } else setErrorMessages(loginResult.errors);
    };

    const test = async () => {
        const bruh = await refresh();
        console.log(bruh);
    };
    return (
        <Container className='flex flex-col gap-8 md:mx-auto my-32 md:max-w-2xl'>
            <span className='text-3xl font-thin text-center uppercase'>JUNIE VN</span>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <span className='text-2xl font-semibold uppercase'>Đăng nhập</span>
                {errorMessages.map((errorMessage, index) => (
                    <span key={index} className='text-sm text-red text-center'>
                        {errorMessage}
                    </span>
                ))}
                <div className='flex flex-col gap-1'>
                    <Input
                        label='Tên đăng nhập'
                        id='username'
                        placeholder='Nhập tên đăng nhập'
                        autoFocus
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Input
                        label='Mật khẩu'
                        id='password'
                        type='password'
                        placeholder='Nhập mật khẩu'
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                    />
                </div>
                <Button
                    submit
                    secondary
                    full
                    disabled={username.trim() === '' || password.trim() === ''}
                    text='Đăng nhập'
                />
                <button type='button' onClick={test}>
                    Click
                </button>
                <div className='flex items-center justify-between'>
                    <Link className='transition duration-200 opacity-50 hover:opacity-100'>Quên mật khẩu?</Link>
                    <div className='flex items-center gap-1'>
                        <span className='font-thin'>Chưa có tài khoản?</span>
                        <Link to='/account/sign-up' className='relative group'>
                            <span>Đăng ký ngay</span>
                            <Underline />
                        </Link>
                    </div>
                </div>
            </form>
        </Container>
    );
}
