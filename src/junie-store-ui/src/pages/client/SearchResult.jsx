// Libraries
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Redux
import {
    selectProducts,
    setProductItems,
    setProductSortColumn,
    setProductSortOrder,
    setProductsMetadata
} from '@redux/features/client/products';

// Assets
import { icons } from '@assets/icons';

// Services
import { axios } from '@services/shared';

// Components
import { ProductItem } from '@components/client';
import { ProductFilterSection } from '@components/client/category';
import { Container, Input, Pager } from '@components/shared';
import { Fade, PageTransition } from '@components/shared/animations';

export default function SearchResult() {
    // Hooks
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States
    const products = useSelector(selectProducts);
    const [showFilter, setShowFilter] = useState(false);
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [sortType, setSortType] = useState('');

    // Refs
    const sortOptionsRef = useRef(null);
    const searchInputRef = useRef(null);

    // Event handlers
    const handleShowFilter = () => {
        setShowFilter(true);
    };
    const handleHideFilter = () => {
        setShowFilter(false);
    };
    const handleToggleSortOptions = () => {
        setShowSortOptions((state) => !state);
    };
    const handleHideSortOptions = () => {
        setShowSortOptions(false);
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInputRef.current.value.trim() === '') return;

        navigate(`/search/${searchInputRef.current.value.trim()}`);
        searchInputRef.current.blur();
    };

    // Side effects
    /* Auto hide product filter on mobile devices */
    useEffect(() => {
        const handleShowFilterOnLargeScreen = () => {
            if (window.innerWidth >= 1024) setShowFilter(true);
            else {
                /* Prevent hiding product filter sidebar when virtual keyboard is opened */
                if (
                    window.navigator.userAgent.includes('Android') ||
                    window.navigator.userAgent.includes('webOS') ||
                    window.navigator.userAgent.includes('iPhone') ||
                    window.navigator.userAgent.includes('iPad') ||
                    window.navigator.userAgent.includes('iPod') ||
                    window.navigator.userAgent.includes('BlackBerry') ||
                    window.navigator.userAgent.includes('Windows Phone')
                )
                    return;
                setShowFilter(false);
            }
        };

        window.addEventListener('resize', handleShowFilterOnLargeScreen);
        handleShowFilterOnLargeScreen();

        return () => {
            window.removeEventListener('resize', handleShowFilterOnLargeScreen);
        };
    }, []);
    /* Hide sort options when clicking outside */
    useEffect(() => {
        const handleHideSortOptionsWhenClickOutside = (e) => {
            if (e.target.closest('button') !== sortOptionsRef.current) handleHideSortOptions();
        };

        document.addEventListener('mousedown', handleHideSortOptionsWhenClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleHideSortOptionsWhenClickOutside);
        };
    }, []);
    /* Get products by keyword */
    useEffect(() => {
        const getProducts = async () => {
            const urlQueries = new URLSearchParams({ ...products.queries, Keyword: params.keyword });
            const { data } = await axios.get(`/api/products?${urlQueries}`);

            if (data.isSuccess) {
                dispatch(setProductItems(data.result.items));
                dispatch(setProductsMetadata(data.result.metadata));
            } else {
                dispatch(setProductItems([]));
                dispatch(setProductsMetadata({}));
            }
        };

        getProducts();
        // eslint-disable-next-line
    }, [products.queries, window.location.pathname]);

    return (
        <PageTransition>
            <Container>
                <div className='flex flex-col gap-8 mt-8 mb-12 md:mb-14 xl:mb-16'>
                    <h1 className='font-garamond text-4xl md:text-5xl xl:text-6xl text-center'>
                        Kết quả cho từ khóa &quot;{params.keyword}&quot;
                    </h1>
                    <form className='flex items-center gap-2 mx-auto w-full md:w-96' onSubmit={handleSearch}>
                        <Input ref={searchInputRef} />
                        <button
                            type='submit'
                            title='Tìm kiếm'
                            className='p-3.5 rounded border-2 border-gray transition duration-200 hover:bg-gray/30'
                        >
                            <img src={icons.search} alt='search-icon' className='w-4' />
                        </button>
                    </form>
                </div>
                <div className='flex gap-10 mb-8'>
                    {/* Start: Sidebar section */}
                    <ProductFilterSection show={showFilter} onHide={handleHideFilter} />
                    {/* End: Sidebar section */}

                    {/* Start: Main section */}
                    <section className='flex-1 flex flex-col gap-4 lg:gap-6'>
                        {/* Start: Main's header section */}
                        <section className='flex items-center justify-between'>
                            <div className='flex items-center gap-1'>
                                <button type='button' className='lg:hidden p-2' onClick={handleShowFilter}>
                                    <img src={icons.filter} alt='filter-icon' className='w-4' />
                                </button>
                                <span className='font-thin tracking-wider'>
                                    {products.metadata.totalItemCount} sản phẩm
                                </span>
                            </div>
                            <div className='relative flex items-center gap-2'>
                                <span className='font-thin tracking-wider'>Sắp xếp theo</span>
                                <button
                                    ref={sortOptionsRef}
                                    type='button'
                                    className='relative top-px flex items-center gap-1'
                                    onClick={handleToggleSortOptions}
                                >
                                    <span>{sortType}</span>
                                    <img
                                        src={icons.caretDown}
                                        alt='caret-down-icon'
                                        className={`w-4 transition-transform duration-200${
                                            showSortOptions ? ' rotate-180' : ''
                                        }`}
                                    />
                                </button>
                                <AnimatePresence>
                                    {showSortOptions && (
                                        <Fade className='absolute top-full right-0 z-10 flex flex-col items-start p-4 w-max font-thin bg-primary rounded shadow'>
                                            <button
                                                type='button'
                                                className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                onClick={(e) => {
                                                    setSortType(e.target.innerText);
                                                    dispatch(setProductSortColumn('createDate'));
                                                    dispatch(setProductSortOrder('desc'));
                                                }}
                                            >
                                                Ngày (từ mới đến cũ)
                                            </button>
                                            <button
                                                type='button'
                                                className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                onClick={(e) => {
                                                    setSortType(e.target.innerText);
                                                    dispatch(setProductSortColumn('createDate'));
                                                    dispatch(setProductSortOrder('asc'));
                                                }}
                                            >
                                                Ngày (từ cũ đến mới)
                                            </button>
                                            <button
                                                type='button'
                                                className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                onClick={(e) => {
                                                    setSortType(e.target.innerText);
                                                    dispatch(setProductSortColumn('name'));
                                                    dispatch(setProductSortOrder('asc'));
                                                }}
                                            >
                                                Tên (từ A - Z)
                                            </button>
                                            <button
                                                type='button'
                                                className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                onClick={(e) => {
                                                    setSortType(e.target.innerText);
                                                    dispatch(setProductSortColumn('name'));
                                                    dispatch(setProductSortOrder('desc'));
                                                }}
                                            >
                                                Tên (từ Z - A)
                                            </button>
                                            <button
                                                type='button'
                                                className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                onClick={(e) => {
                                                    setSortType(e.target.innerText);
                                                    dispatch(setProductSortColumn('price'));
                                                    dispatch(setProductSortOrder('asc'));
                                                }}
                                            >
                                                Giá (từ thấp đến cao)
                                            </button>
                                            <button
                                                type='button'
                                                className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                onClick={(e) => {
                                                    setSortType(e.target.innerText);
                                                    dispatch(setProductSortColumn('price'));
                                                    dispatch(setProductSortOrder('desc'));
                                                }}
                                            >
                                                Giá (từ cao đến thấp)
                                            </button>
                                        </Fade>
                                    )}
                                </AnimatePresence>
                            </div>
                        </section>
                        {/* End: Main's header section */}

                        {/* Start: Product section */}
                        <section className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-8 xl:gap-y-12'>
                            {products.items.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </section>
                        {/* End: Product section */}

                        {/* Start: Pager section */}
                        <Pager metadata={products.metadata} />
                        {/* End: Pager section */}
                    </section>
                    {/* End: Main section */}
                </div>
            </Container>
        </PageTransition>
    );
}
