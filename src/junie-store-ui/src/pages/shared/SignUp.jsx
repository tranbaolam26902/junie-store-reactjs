// Libraries
import { Link } from 'react-router-dom';

// Components
import { Button, Container } from '@components/shared';
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
                    <label htmlFor='username' className='flex gap-1 w-fit cursor-pointer'>
                        <span>Tên đăng nhập</span>
                        <span className='italic text-secondary/50'>(bắt buộc)</span>
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
                    <label htmlFor='password' className='flex gap-1 w-fit cursor-pointer'>
                        <span>Mật khẩu</span>
                        <span className='italic text-secondary/50'>(bắt buộc)</span>
                    </label>
                    <input
                        id='password'
                        type='password'
                        className='flex-1 px-4 py-3 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                        placeholder='Nhập mật khẩu'
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='confirm-password' className='flex gap-1 w-fit cursor-pointer'>
                        <span>Xác nhận mật khẩu</span>
                        <span className='italic text-secondary/50'>(bắt buộc)</span>
                    </label>
                    <input
                        id='confirm-password'
                        type='password'
                        className='flex-1 px-4 py-3 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                        placeholder='Xác nhận mật khẩu'
                        required
                    />
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor='email' className='flex gap-1 w-fit cursor-pointer'>
                        <span>Email</span>
                        <span className='italic text-secondary/50'>(bắt buộc)</span>
                    </label>
                    <input
                        id='email'
                        type='email'
                        className='flex-1 px-4 py-3 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                        placeholder='Nhập email'
                        required
                    />
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
