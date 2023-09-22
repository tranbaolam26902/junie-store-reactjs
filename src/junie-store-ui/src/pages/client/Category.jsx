// Libraries
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useLoaderData, useParams, useSearchParams } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Services
import { getProductsByQueries } from '@services/client';

// Components
import { Breadcrumb, ProductItem } from '@components/client';
import { ProductFilterSection } from '@components/client/category';
import { Container, Pager } from '@components/shared';
import { Fade, PageTransition } from '@components/shared/animations';

const sortOptions = [
    {
        id: 1,
        name: 'Ngày (từ mới đến cũ)',
        SortColumn: 'createDate',
        SortOrder: 'desc'
    },
    {
        id: 2,
        name: 'Ngày (từ cũ đến mới)',
        SortColumn: 'createDate',
        SortOrder: 'asc'
    },
    {
        id: 3,
        name: 'Tên (từ A - Z)',
        SortColumn: 'name',
        SortOrder: 'asc'
    },
    {
        id: 4,
        name: 'Tên (từ Z - A)',
        SortColumn: 'name',
        SortOrder: 'desc'
    },
    {
        id: 5,
        name: 'Giá (từ thấp - cao)',
        SortColumn: 'price',
        SortOrder: 'asc'
    },
    {
        id: 6,
        name: 'Giá (từ cao - thấp)',
        SortColumn: 'price',
        SortOrder: 'desc'
    }
];

export default function Category() {
    // Hooks
    const params = useParams();
    const { category, defaultProducts, defaultMetadata } = useLoaderData();
    const [searchParams, setSearchParams] = useSearchParams();

    // States
    const [showFilter, setShowFilter] = useState(false);
    const [showSortOptions, setShowSortOptions] = useState(false);
    const [sortType, setSortType] = useState('');
    const [productItems, setProductItems] = useState(defaultProducts);
    const [metadata, setMetadata] = useState({});

    // Refs
    const sortOptionsRef = useRef(null);

    // Functions
    const filterProducts = async () => {
        const queryString = `CategorySlug=${params.categorySlug}&` + searchParams.toString();
        const result = await getProductsByQueries(queryString);

        if (result) {
            setProductItems(result.items);
            setMetadata(result.metadata);
        }
    };
    const setDefaultData = () => {
        setProductItems(defaultProducts);
        setMetadata(defaultMetadata);
    };

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
    /* Fiter products */
    useEffect(() => {
        setSortType('Ngày (từ mới đến cũ)');
        if (searchParams.size !== 0) {
            filterProducts();

            if (searchParams.has('SortColumn', 'createDate') && searchParams.has('SortOrder', 'asc'))
                setSortType('Ngày (từ cũ đến mới)');
            else if (searchParams.has('SortColumn', 'name') && searchParams.has('SortOrder', 'asc'))
                setSortType('Tên (từ A - Z)');
            else if (searchParams.has('SortColumn', 'name') && searchParams.has('SortOrder', 'desc'))
                setSortType('Tên (từ Z - A)');
            else if (searchParams.has('SortColumn', 'price') && searchParams.has('SortOrder', 'asc'))
                setSortType('Giá (từ thấp đến cao)');
            else if (searchParams.has('SortColumn', 'price') && searchParams.has('SortOrder', 'desc'))
                setSortType('Giá (từ cao đến thấp)');
        } else setDefaultData();
        // eslint-disable-next-line
    }, [searchParams]);
    useEffect(() => {
        setDefaultData();
        // eslint-disable-next-line
    }, [params.categorySlug]);

    return (
        <PageTransition>
            <Container>
                <Breadcrumb title={category.name} />
                <h1 className='mb-12 md:mb-14 xl:mb-16 font-garamond text-4xl md:text-5xl xl:text-6xl text-center'>
                    {category.name}
                </h1>
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
                                <span className='font-thin tracking-wider'>{metadata.totalItemCount} sản phẩm</span>
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
                                            {sortOptions.map((sortOption) => (
                                                <button
                                                    key={sortOption.id}
                                                    type='button'
                                                    className='px-4 py-1 w-full text-left rounded transition duration-200 hover:bg-gray/50'
                                                    onClick={() => {
                                                        searchParams.set('SortColumn', sortOption.SortColumn);
                                                        searchParams.set('SortOrder', sortOption.SortOrder);
                                                        setSearchParams(searchParams);
                                                    }}
                                                >
                                                    {sortOption.name}
                                                </button>
                                            ))}
                                        </Fade>
                                    )}
                                </AnimatePresence>
                            </div>
                        </section>
                        {/* End: Main's header section */}

                        {/* Start: Product section */}
                        <section className='grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-x-2 md:gap-x-6 gap-y-8 xl:gap-y-12'>
                            {productItems.map((product) => (
                                <ProductItem key={product.id} product={product} />
                            ))}
                        </section>
                        {/* End: Product section */}

                        {/* Start: Pager section */}
                        <Pager metadata={metadata} />
                        {/* End: Pager section */}
                    </section>
                    {/* End: Main section */}
                </div>
            </Container>
        </PageTransition>
    );
}
