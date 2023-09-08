// Libraries
import { Link } from 'react-router-dom';

// Components
import { Button, Container, Input } from '@components/shared';
import { Underline } from '@components/shared/animations';

export default function SignUp() {
    // Event handlers
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <Container className='flex flex-col gap-8 md:mx-auto my-32 md:max-w-2xl'>
            <span className='text-3xl font-thin text-center uppercase'>JUNIE VN</span>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <span className='text-2xl font-semibold uppercase'>Đăng ký</span>
                <div className='flex flex-col gap-1'>
                    <Input label='Tên đăng nhập' id='username' type='text' placeholder='Nhập tên đăng nhập' />
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label='Mật khẩu' id='password' type='password' placeholder='Nhập mật khẩu' />
                </div>
                <div className='flex flex-col gap-1'>
                    <Input
                        label='Xác nhận mật khẩu'
                        id='confirm-password'
                        type='password'
                        placeholder='Xác nhận mật khẩu'
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <Input label='Email' id='email' type='email' placeholder='Nhập email' />
                </div>
                <Button submit secondary full text='Đăng ký' />
                <div className='flex items-center justify-end gap-1'>
                    <span className='font-thin'>Đã có tài khoản?</span>
                    <Link to='/account/login' className='relative group'>
                        <span>Đăng nhập</span>
                        <Underline />
                    </Link>
                </div>
            </form>
        </Container>
    );
}
