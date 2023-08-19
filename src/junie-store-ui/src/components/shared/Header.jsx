// Libraries
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import hamburgerIcon from '@assets/icons/hamburger.svg';
import searchIcon from '@assets/icons/search.svg';
import cartIcon from '@assets/icons/cart.svg';
import closeIcon from '@assets/icons/close.svg';
import userIcon from '@assets/icons/user.svg';
import logo from '@assets/images/logo.png';

// Components
import { SidebarModal } from '@components/shared';

// Temp categories
const categories = [
    {
        id: 1,
        name: 'Mới',
        slug: '/categories/new'
    },
    {
        id: 2,
        name: 'Bông tai',
        slug: '/categories/earrings'
    },
    {
        id: 3,
        name: 'Dây chuyền',
        slug: '/categories/necklace'
    },
    {
        id: 4,
        name: 'Vòng tay',
        slug: '/categories/bracelet'
    },
    {
        id: 5,
        name: 'Nhẫn',
        slug: '/categories/ring'
    },
    {
        id: 6,
        name: 'Sale',
        slug: '/categories/sale'
    }
];

export default function Header() {
    // States
    const [showMobileNavbar, setShowMobileNavbar] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);

    // Event handlers
    const handleShowMobileNavbar = () => {
        setShowMobileNavbar(true);
    };
    const handleHideMobileNavbar = () => {
        setShowMobileNavbar(false);
    };
    const handleShowSearch = () => {
        setShowSearch(true);
    };
    const handleHideSearch = () => {
        setShowSearch(false);
    };
    const handleShowCart = () => {
        setShowCart(true);
    };
    const handleHideCart = () => {
        setShowCart(false);
    };

    return (
        <header className='sticky left-0 right-0 top-0 max-h-14 bg-primary shadow-md'>
            <section className='mx-auto flex max-w-screen-2xl items-center justify-between px-6 py-4'>
                <button type='button' className='xl:hidden flex-1' onClick={handleShowMobileNavbar}>
                    <img src={hamburgerIcon} alt='menu-icon' className='w-[1.125rem]' />
                </button>
                <nav className='flex-1 hidden xl:flex items-center gap-8'>
                    {categories.map((category) => (
                        <Link
                            to={`${category.slug}`}
                            key={category.id}
                            className='relative after:absolute after:bottom-0.5 after:left-0 after:w-full after:h-px after:bg-current after:scale-x-0 after:origin-right after:transition-transform after:ease-in-out after:duration-300 hover:after:scale-x-100 hover:after:origin-left'
                        >
                            {category.name}
                        </Link>
                    ))}
                </nav>
                <Link to='/'>
                    <img src={logo} alt='logo' className='w-[5.3125rem]' />
                </Link>
                <div className='flex flex-1 items-center justify-end xl:gap-8 gap-5'>
                    <button type='button' className='xl:hidden' onClick={handleShowSearch}>
                        <img src={searchIcon} alt='search-icon' className='w-[1.125rem]' />
                    </button>
                    <div className='hidden items-center gap-8 xl:flex'>
                        <button type='button' onClick={handleShowSearch}>
                            Tìm kiếm
                        </button>
                        <button type='button'>Tài khoản</button>
                    </div>
                    <button type='button' className='relative' onClick={handleShowCart}>
                        <img src={cartIcon} alt='cart-icon' className='w-[1.125rem]' />
                        <span className='absolute -right-3 -top-2 aspect-square w-5 rounded-full bg-black text-[0.5625rem] leading-[1.25rem] text-primary'>
                            4
                        </span>
                    </button>
                </div>
            </section>
            <SidebarModal show={showMobileNavbar} onHide={handleHideMobileNavbar} className='xl:hidden'>
                <div className='flex flex-col px-6 py-4 h-full'>
                    <button type='button' className='-mt-0.5 -ml-2 p-2 w-fit' onClick={handleHideMobileNavbar}>
                        <img src={closeIcon} alt='close-icon' className='w-4' />
                    </button>
                    <div className='overflow-y-auto flex-1 flex flex-col divide-y divide-gray'>
                        {categories.map((category) => (
                            <Link
                                to={`${category.slug}`}
                                key={category.id}
                                className='py-4 text-xl'
                                onClick={handleHideMobileNavbar}
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                    <Link
                        className='flex items-center gap-4 -mb-4 -mx-6 px-6 py-4 border border-t border-gray'
                        onClick={handleHideMobileNavbar}
                    >
                        <img src={userIcon} alt='user-icon' className='w-4' />
                        <span>Tài khoản</span>
                    </Link>
                </div>
            </SidebarModal>
            <SidebarModal right show={showSearch} onHide={handleHideSearch}></SidebarModal>
            <SidebarModal right show={showCart} onHide={handleHideCart}></SidebarModal>
        </header>
    );
}
