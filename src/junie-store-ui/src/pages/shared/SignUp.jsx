// Libraries
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// Components
import { Button, Container, Input } from '@components/shared';
import { PageTransition, Underline } from '@components/shared/animations';

// Hooks
import { useLogin } from '@hooks/shared';

// Services
import { axios } from '@services/shared';

export default function SignUp() {
    // Hooks
    const login = useLogin();
    const navigate = useNavigate();

    // States
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');
    const [emailMessage, setEmailMessage] = useState('');

    // Functions
    const validatePassword = () => {
        if (password === '' || confirmPassword === '') return;

        if (password !== confirmPassword) {
            setConfirmPasswordMessage('Mật khẩu và Xác nhận mật khẩu không chính xác.');

            return false;
        }

        return true;
    };
    const validateEmail = () => {
        if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            setEmailMessage('Email không đúng định dạng.');

            return false;
        }

        return true;
    };
    const validateSignUp = () => {
        let isValid = true;
        isValid = validatePassword();
        isValid = validateEmail();

        return isValid;
    };

    // Event handlers
    const handleLogin = async (e) => {
        e.preventDefault();
        if (!validateSignUp()) return;

        const { data } = await axios.post('/api/account/register', {
            email,
            username,
            password
        });

        if (data.isSuccess) {
            const loginResult = await login(username, password);

            if (loginResult.isSuccess) navigate('/');
        } else setErrorMessages(data.errors);
    };

    return (
        <PageTransition>
            <Container className='flex flex-col gap-8 md:mx-auto my-32 md:max-w-2xl'>
                <span className='text-3xl font-thin text-center uppercase'>JUNIE VN</span>
                <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                    <span className='text-2xl font-semibold uppercase'>Đăng ký</span>
                    {errorMessages.map((errorMessage, index) => (
                        <span key={index} className='text-sm text-red text-center'>
                            {errorMessage}
                        </span>
                    ))}
                    <Input
                        label='Tên đăng nhập'
                        id='username'
                        type='text'
                        value={username}
                        placeholder='Nhập tên đăng nhập'
                        autoFocus
                        onChange={(e) => {
                            setUsername(e.target.value);
                        }}
                    />
                    <Input
                        label='Mật khẩu'
                        id='password'
                        type='password'
                        value={password}
                        placeholder='Nhập mật khẩu'
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setConfirmPasswordMessage('');
                        }}
                    />
                    <Input
                        label='Xác nhận mật khẩu'
                        id='confirm-password'
                        type='password'
                        value={confirmPassword}
                        message={confirmPasswordMessage}
                        placeholder='Xác nhận mật khẩu'
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmPasswordMessage('');
                        }}
                        onBlur={validatePassword}
                    />
                    <Input
                        label='Email'
                        id='email'
                        type='email'
                        value={email}
                        message={emailMessage}
                        placeholder='Nhập email'
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailMessage('');
                        }}
                        onBlur={validateEmail}
                    />
                    <Button
                        submit
                        secondary
                        full
                        disabled={
                            username.trim() === '' ||
                            password.trim() === '' ||
                            confirmPassword.trim() === '' ||
                            email.trim() === '' ||
                            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email)
                        }
                        text='Đăng ký'
                    />
                    <div className='flex items-center justify-end gap-1'>
                        <span className='font-thin'>Đã có tài khoản?</span>
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
