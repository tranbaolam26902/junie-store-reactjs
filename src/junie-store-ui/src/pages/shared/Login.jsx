// Libraries
import { Link } from 'react-router-dom';

// Components
import { Button, Container } from '@components/shared';
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
                    <label htmlFor='username' className='w-fit cursor-pointer'>
                        Tên đăng nhập
                    </label>
                    <input
                        id='username'
                        type='text'
                        className='flex-1 px-4 py-3 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                        placeholder='Nhập tên đăng nhập'
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='password' className='w-fit cursor-pointer'>
                        Mật khẩu
                    </label>
                    <input
                        id='password'
                        type='password'
                        className='flex-1 px-4 py-3 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                        placeholder='Nhập mật khẩu'
                        required
                    />
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
