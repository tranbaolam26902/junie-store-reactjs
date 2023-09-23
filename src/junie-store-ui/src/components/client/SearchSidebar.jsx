// Libraries
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Hooks
import { useDebounce } from '@hooks/shared';

// Redux
import { selectHeader, setHideSearchSidebar } from '@redux/features/client/header';

// Services
import { axios } from '@services/shared';

// Components
import { Button, SidebarModal } from '@components/shared';
import { Loading } from '@components/shared/animations';
import SearchResultItem from './SearchResultItem';

export default function SearchSidebar() {
    // States
    const header = useSelector(selectHeader);
    const [keyword, setKeyword] = useState('');
    const [isFetching, setIsFetching] = useState(false);
    const [searchResultItems, setSearchResultItems] = useState([]);
    const [isEmptyResults, setIsEmptyResults] = useState(false);

    // Hooks
    const dispatch = useDispatch();
    const debounceKeyword = useDebounce(keyword, 500);
    const navigate = useNavigate();

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
    const handleHideSearch = () => {
        dispatch(setHideSearchSidebar());
    };
    const handleSearch = (e) => {
        e.preventDefault();
        if (keyword.trim() === '') return;

        navigate(`/search?Keyword=${keyword}`);
        handleHideSearch();
    };
    /* Debounce search keyword */
    useEffect(() => {
        handleSearchProducts(keyword.trim());
        // eslint-disable-next-line
    }, [debounceKeyword]);

    return (
        <SidebarModal right show={header.showSearchSidebar} onHide={handleHideSearch}>
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
                    {isEmptyResults && <span className='block text-center'>Không có kết quả nào được tìm thấy.</span>}
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
    );
}
