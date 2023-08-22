// Libraries
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Components
import { Container, SidebarModal } from '@components/shared';
import { Underline } from '@components/shared/animations';

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
        <header className='sticky z-50 left-0 right-0 top-0 max-h-14 bg-primary shadow-md'>
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
                <div className='flex flex-1 items-center justify-end xl:gap-8 gap-5'>
                    <button type='button' className='xl:hidden -m-2 p-2' onClick={handleShowSearch}>
                        <img src={icons.search} alt='search-icon' className='w-[1.125rem]' />
                    </button>
                    <div className='hidden items-center gap-8 xl:flex'>
                        <button type='button' className='relative group' onClick={handleShowSearch}>
                            <span>Tìm kiếm</span>
                            <Underline />
                        </button>
                        <button type='button' className='relative group'>
                            <span>Tài khoản</span>
                            <Underline />
                        </button>
                    </div>
                    <button type='button' className='relative -m-2 p-2' onClick={handleShowCart}>
                        <img src={icons.cart} alt='cart-icon' className='w-[1.125rem]' />
                        <span className='absolute top-0 -right-1 aspect-square w-5 rounded-full bg-black text-[0.5625rem] leading-[1.25rem] text-primary'>
                            4
                        </span>
                    </button>
                </div>
                {/* End: Header's right section */}
            </Container>

            {/* Start: Mobile navbar */}
            <SidebarModal show={showMobileNavbar} onHide={handleHideMobileNavbar} className='xl:hidden'>
                <div className='flex flex-col px-6 py-4 h-full'>
                    <button type='button' className='-mt-0.5 -ml-2 p-2 w-fit' onClick={handleHideMobileNavbar}>
                        <img src={icons.close} alt='close-icon' className='w-4' />
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
                        <img src={icons.user} alt='user-icon' className='w-4' />
                        <span>Tài khoản</span>
                    </Link>
                </div>
            </SidebarModal>
            {/* End: Mobile navbar */}

            {/* Start: Search section */}
            <SidebarModal right show={showSearch} onHide={handleHideSearch}></SidebarModal>
            {/* End: Search section */}

            {/* Start: Cart section */}
            <SidebarModal right show={showCart} onHide={handleHideCart}></SidebarModal>
            {/* End: Cart section */}
        </header>
    );
}
