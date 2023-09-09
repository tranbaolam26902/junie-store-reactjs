// Libraries
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Components
import { Container, Input, Pager } from '@components/shared';
import { Fade, PageTransition } from '@components/shared/animations';
import { ProductItem } from '@components/client';
import { ProductFilterSection } from '@components/client/category';

// Temp products
const products = [
    {
        id: 1,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 2,
        name: 'Bông tai Gabi',
        slug: 'gabi',
        price: 275000,
        quantity: 2,
        image: images.productHover
    }
];

export default function SearchResult() {
    // States
    const [showFilter, setShowFilter] = useState(false);
    const [showSortOptions, setShowSortOptions] = useState(false);

    // Refs
    const sortOptionsRef = useRef(null);

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

    return (
        <PageTransition>
            <Container>
                <div className='flex flex-col gap-8 mt-8 mb-12 md:mb-14 xl:mb-16'>
                    <h1 className='font-garamond text-4xl md:text-5xl xl:text-6xl text-center'>
                        Kết quả cho từ khóa &quot;z&quot;
                    </h1>
                    <form className='flex items-center gap-2 mx-auto w-full md:w-96' onSubmit={handleSearch}>
                        <Input className='' />
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
                                <span className='font-thin tracking-wider'>107 sản phẩm</span>
                            </div>
                            <div className='relative flex items-center gap-2'>
                                <span className='font-thin tracking-wider'>Sắp xếp theo</span>
                                <button
                                    ref={sortOptionsRef}
                                    type='button'
                                    className='relative top-px flex items-center gap-1'
                                    onClick={handleToggleSortOptions}
                                >
                                    <span className=''>Nổi bật</span>
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
                                        <Fade className='absolute top-full right-0 z-10 flex flex-col items-start p-4 bg-primary rounded shadow'>
                                            <button type='button' className='px-2 py-1 w-full text-left'>
                                                Nổi bật
                                            </button>
                                            <button type='button' className='px-2 py-1 w-full text-left'>
                                                Bán chạy nhất
                                            </button>
                                            <button type='button' className='px-2 py-1 w-full text-left'>
                                                Bảng chữ cái
                                            </button>
                                        </Fade>
                                    )}
                                </AnimatePresence>
                            </div>
                        </section>
                        {/* End: Main's header section */}

                        {/* Start: Product section */}
                        <section className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-8 xl:gap-y-12'>
                            {products.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </section>
                        {/* End: Product section */}

                        {/* Start: Pager section */}
                        <Pager />
                        {/* End: Pager section */}
                    </section>
                    {/* End: Main section */}
                </div>
            </Container>
        </PageTransition>
    );
}
