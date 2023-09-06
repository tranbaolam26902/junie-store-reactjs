// Libraries
import { Link } from 'react-router-dom';

// Components
import { Button, Container, Input } from '@components/shared';
import { Underline } from '@components/shared/animations';

export default function Login() {
    // Event handlers
    const handleLogin = (e) => {
        e.preventDefault();
    };

    return (
        <Container className='flex flex-col gap-8 md:mx-auto my-32 md:max-w-2xl'>
            <span className='text-3xl font-thin text-center uppercase'>JUNIE VN</span>
            <form className='flex flex-col gap-4' onSubmit={handleLogin}>
                <span className='text-2xl font-semibold uppercase'>Đăng nhập</span>
                <div className='flex flex-col gap-1'>
                    <Input label='Tên đăng nhập' id='username' placeholder='Nhập tên đăng nhập' />
                </div>
                <div className='flex flex-col gap-1'>
                    <Input id='password' label='Mật khẩu' type='password' placeholder='Nhập mật khẩu' />
                </div>
                <Button submit secondary full text='Đăng nhập' />
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
