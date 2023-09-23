// Libraries
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Hooks
import { useLogout } from '@hooks/shared';

// Redux
import { setShowCartSidebar, setShowMobileNavbar, setShowSearchSidebar } from '@redux/features/client/header';
import { selectAuth } from '@redux/features/shared/auth';

// Components
import { Container } from '@components/shared';
import { Fade, Underline } from '@components/shared/animations';
import MobileNavbar from './MobileNavbar';
import SearchSidebar from './SearchSidebar';
import CartSidebar from './CartSidebar';

// Temp categories
const categories = [
    {
        id: 1,
        name: 'Mới',
        slug: '/categories/moi'
    },
    {
        id: 2,
        name: 'Bông tai',
        slug: '/categories/bong-tai'
    },
    {
        id: 3,
        name: 'Dây chuyền',
        slug: '/categories/day-chuyen'
    },
    {
        id: 4,
        name: 'Vòng tay',
        slug: '/categories/vong-tay'
    },
    {
        id: 5,
        name: 'Nhẫn',
        slug: '/categories/nhan'
    },
    {
        id: 6,
        name: 'Sale',
        slug: '/categories/sale'
    }
];

export default function Header() {
    // Hooks
    const logout = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // States
    const auth = useSelector(selectAuth);
    const [showAccountOptions, setShowAccountOptions] = useState(false);

    // Refs
    const accountButtonRef = useRef(null);

    // Event handlers
    const handleShowMobileNavbar = () => {
        dispatch(setShowMobileNavbar());
    };
    const handleToggleShowAccountOptions = () => {
        setShowAccountOptions((state) => !state);
    };
    const handleHideAccountOptions = () => {
        setShowAccountOptions(false);
    };
    const handleLogout = async () => {
        const logoutResult = await logout();

        if (logoutResult.isSuccess) navigate('/account/login', { state: { from: location } });
    };
    const handleShowSearchSidebar = () => {
        dispatch(setShowSearchSidebar());
    };
    const handleShowCartSidebar = () => {
        dispatch(setShowCartSidebar());
    };

    /* Hide account options when clicking outside */
    useEffect(() => {
        const handleHideAccountOptionsWhenClickOutside = (e) => {
            if (e.target.closest('button') !== accountButtonRef.current) handleHideAccountOptions();
        };

        document.addEventListener('mousedown', handleHideAccountOptionsWhenClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleHideAccountOptionsWhenClickOutside);
        };
    }, []);
    /* Debounce search keyword */

    return (
        <header className='sticky z-10 left-0 right-0 top-0 max-h-14 bg-primary shadow-md'>
            <Container className='flex items-center justify-center py-4'>
                {/* Start: Header's left section */}
                <div className='xl:hidden flex-1 flex items-center'>
                    <button type='button' className='-m-2 p-2' onClick={handleShowMobileNavbar}>
                        <img src={icons.hamburger} alt='menu-icon' className='w-[1.125rem]' />
                    </button>
                </div>
                <nav className='flex-1 hidden xl:flex items-center gap-8'>
                    {categories.map((category) => (
                        <Link to={`${category.slug}`} key={category.id} className='relative group'>
                            <span>{category.name}</span>
                            <Underline />
                        </Link>
                    ))}
                </nav>
                {/* End: Header's left section */}

                <Link to='/'>
                    <img src={images.logo} alt='logo' className='w-[5.3125rem]' />
                </Link>

                {/* Start: Header's right section */}
                <section className='flex flex-1 items-center justify-end xl:gap-8 gap-5'>
                    <button type='button' className='xl:hidden -m-2 p-2' onClick={handleShowSearchSidebar}>
                        <img src={icons.search} alt='search-icon' className='w-[1.125rem]' />
                    </button>
                    <div className='hidden items-center gap-8 xl:flex'>
                        <button type='button' className='relative group' onClick={handleShowSearchSidebar}>
                            <span>Tìm kiếm</span>
                            <Underline />
                        </button>
                        {auth.accessToken ? (
                            <div className='relative group'>
                                <button
                                    ref={accountButtonRef}
                                    type='button'
                                    className='relative flex gap-1'
                                    onClick={handleToggleShowAccountOptions}
                                >
                                    <img src={icons.profile} alt='profile-icon' className='pb-0.5 w-5' />
                                    <span>Tài khoản</span>
                                    <Underline />
                                </button>
                                <AnimatePresence>
                                    {showAccountOptions && (
                                        <Fade className='absolute top-full right-0 flex flex-col p-4 w-max bg-primary border border-gray rounded-md shadow-md'>
                                            <Link
                                                to='/account'
                                                className='px-4 py-2 rounded transition duration-200 hover:bg-gray/30'
                                            >
                                                Thông tin tài khoản
                                            </Link>
                                            <button
                                                type='button'
                                                className='px-4 py-2 text-start text-red rounded transition duration-200 hover:bg-gray/30'
                                                onClick={handleLogout}
                                            >
                                                Đăng xuất
                                            </button>
                                        </Fade>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            <Link
                                to='/account/login'
                                state={{ from: location }}
                                type='button'
                                className='relative group'
                            >
                                <span>Đăng nhập</span>
                                <Underline />
                            </Link>
                        )}
                    </div>
                    <button type='button' className='relative -m-2 p-2' onClick={handleShowCartSidebar}>
                        <img src={icons.cart} alt='cart-icon' className='w-[1.125rem]' />
                        <span className='absolute top-0 -right-1 aspect-square w-5 rounded-full bg-black text-[0.5625rem] leading-[1.25rem] text-primary'>
                            4
                        </span>
                    </button>
                </section>
                {/* End: Header's right section */}
            </Container>
            <MobileNavbar />
            <SearchSidebar />
            <CartSidebar />
        </header>
    );
}
