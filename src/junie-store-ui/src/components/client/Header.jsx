// Libraries
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Hooks
import { useDebounce, useLogout } from '@hooks/shared';

// Redux
import { selectProducts } from '@redux/features/client/products';
import { selectAuth } from '@redux/features/shared/auth';

// Services
import { axios } from '@services/shared';

// Components
import { CartItem, SearchResultItem } from '@components/client';
import { Button, Container, SidebarModal } from '@components/shared';
import { Fade, Loading, Underline } from '@components/shared/animations';

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
    // States
    const auth = useSelector(selectAuth);
    const products = useSelector(selectProducts);
    const [showMobileNavbar, setShowMobileNavbar] = useState(false);
    const [showAccountOptions, setShowAccountOptions] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [showCart, setShowCart] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const [keyword, setKeyword] = useState('');
    const [searchResultItems, setSearchResultItems] = useState([]);
    const [isEmptyResults, setIsEmptyResults] = useState(false);

    // Hooks
    const logout = useLogout();
    const navigate = useNavigate();
    const location = useLocation();
    const debounceKeyword = useDebounce(keyword, 500);

    // Refs
    const accountButtonRef = useRef(null);

    // Functions
    const handleSearchProducts = async (keyword) => {
        if (keyword.trim() === '') {
            setSearchResultItems([]);
            setIsEmptyResults(false);
            return;
        }

        setIsFetching(true);
        const { data } = await axios.get(`/api/products?Keyword=${keyword.trim()}&PageSize=10`);

        if (data.isSuccess && data.result.items.length > 0) {
            setSearchResultItems(data.result.items);
            setIsEmptyResults(false);
        } else {
            setSearchResultItems([]);
            setIsEmptyResults(true);
        }
        setIsFetching(false);
    };

    // Event handlers
    const handleShowMobileNavbar = () => {
        setShowMobileNavbar(true);
    };
    const handleHideMobileNavbar = () => {
        setShowMobileNavbar(false);
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
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() === '') return;

        navigate(`/search?Keyword=${keyword}`);
        handleHideSearch();
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
    useEffect(() => {
        handleSearchProducts(keyword.trim());
        // eslint-disable-next-line
    }, [debounceKeyword]);

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
                    <button type='button' className='xl:hidden -m-2 p-2' onClick={handleShowSearch}>
                        <img src={icons.search} alt='search-icon' className='w-[1.125rem]' />
                    </button>
                    <div className='hidden items-center gap-8 xl:flex'>
                        <button type='button' className='relative group' onClick={handleShowSearch}>
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
                    <button type='button' className='relative -m-2 p-2' onClick={handleShowCart}>
                        <img src={icons.cart} alt='cart-icon' className='w-[1.125rem]' />
                        <span className='absolute top-0 -right-1 aspect-square w-5 rounded-full bg-black text-[0.5625rem] leading-[1.25rem] text-primary'>
                            4
                        </span>
                    </button>
                </section>
                {/* End: Header's right section */}
            </Container>

            {/* Start: Mobile navbar */}
            <SidebarModal show={showMobileNavbar} onHide={handleHideMobileNavbar} className='xl:hidden'>
                <div className='flex flex-col px-6 py-4 h-full'>
                    <button type='button' className='-mt-0.5 -ml-2 p-2 w-fit' onClick={handleHideMobileNavbar}>
                        <img src={icons.close} alt='close-icon' className='w-4' />
                    </button>
                    <nav className='overflow-y-auto flex-1 flex flex-col divide-y divide-gray'>
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
                    </nav>
                    <Link
                        to='/account'
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
            <SidebarModal right show={showSearch} onHide={handleHideSearch}>
                <div className='flex flex-col h-full'>
                    <form className='flex items-center gap-4 px-6 py-4 border-b border-gray' onSubmit={handleSearch}>
                        <img src={icons.search} alt='search-icon' className='w-4' />
                        <input
                            type='text'
                            autoFocus
                            value={keyword}
                            placeholder='Bạn đang muốn tìm kiếm gì?'
                            className='flex-1 outline-none border-none'
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                        />
                        <button type='button' className='-m-2 p-2' onClick={handleHideSearch}>
                            <img src={icons.close} alt='close-icon' className='w-4' />
                        </button>
                    </form>
                    <section className='flex-1 overflow-y-auto'>
                        {isFetching ? (
                            <div className='flex items-center justify-center h-full'>
                                <Loading />
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4 p-6'>
                                {searchResultItems.map((product) => (
                                    <SearchResultItem key={product.id} product={product} onClick={handleHideSearch} />
                                ))}
                            </div>
                        )}
                        {isEmptyResults && (
                            <span className='block text-center'>Không có kết quả nào được tìm thấy.</span>
                        )}
                    </section>
                    {searchResultItems.length > 0 && (
                        <section className='relative px-6 py-4'>
                            <Button
                                to={`/search?Keyword=${keyword}`}
                                text='Xem tất cả kết quả'
                                secondary
                                full
                                onClick={handleHideSearch}
                            />
                            <div className='absolute -top-4 left-0 right-4 h-4 bg-gradient-to-t from-primary to-transparent'></div>
                        </section>
                    )}
                </div>
            </SidebarModal>
            {/* End: Search section */}

            {/* Start: Cart section */}
            <SidebarModal right show={showCart} onHide={handleHideCart}>
                <div className='flex flex-col h-full'>
                    <section className='flex items-center gap-4 px-6 py-4 border-b border-gray'>
                        <img src={icons.cart} alt='cart-icon' className='w-5' />
                        <span className='flex-1'>
                            {products.length !== 0 ? products.length + ' sản phẩm' : 'Giỏ hàng'}
                        </span>
                        <button type='button' className='-m-2 p-2'>
                            <img src={icons.close} alt='close-icon' className='w-4' onClick={handleHideCart} />
                        </button>
                    </section>
                    <section className='flex-1 overflow-y-auto'>
                        {products.length === 0 ? (
                            <div className='flex flex-col items-center justify-center gap-8 h-full font-thin'>
                                <span>Giỏ hàng của bạn đang trống</span>
                                <Button secondary text='Bắt đầu mua sắm' className='px-12' />
                            </div>
                        ) : (
                            <div className='flex flex-col gap-4 p-6'>
                                {/* products.map((product) => (
                                    <CartItem key={product.id} product={product} />
                                )) */}
                            </div>
                        )}
                    </section>
                    {products.length > 0 && (
                        <section className='relative px-6 py-4 border-t border-gray'>
                            <Button
                                to='/checkout'
                                text={
                                    <div className='flex items-center justify-center gap-3'>
                                        <span className='text-sm font-semibold uppercase'>Thanh toán</span>
                                        <span className='mb-1 w-1 h-1 bg-primary'></span>
                                        <span className='flex gap-1'>
                                            <span className='text-sm font-semibold uppercase'>
                                                {new Intl.NumberFormat('vi-VN').format(
                                                    products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                                                )}
                                            </span>
                                            <span className='text-sm font-semibol uppercase'>VND</span>
                                        </span>
                                    </div>
                                }
                                secondary
                                full
                                onClick={handleHideCart}
                            />
                        </section>
                    )}
                </div>
            </SidebarModal>
            {/* End: Cart section */}
        </header>
    );
}
