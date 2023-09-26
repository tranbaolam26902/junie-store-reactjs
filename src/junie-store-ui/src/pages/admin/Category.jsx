// Libraries
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Hooks
import { useDebounce } from '@hooks/shared';

// Services
import { toggleShowOnMenuById } from '@services/admin';
import { getCategoriesByQueries } from '@services/shared';

// Components
import { Button, Input, Pager } from '@components/shared';

// Headers
const headers = [
    {
        id: 1,
        value: 'name',
        name: 'Tên danh mục'
    },
    {
        id: 2,
        value: 'urlSlug',
        name: 'Slug'
    },
    {
        id: 3,
        value: 'description',
        name: 'Mô tả'
    },
    {
        id: 4,
        value: 'showOnMenu',
        name: 'Hiển thị trên menu',
        center: true
    }
];

export default function Category() {
    // States
    const [categories, setCategories] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [keyword, setKeyword] = useState('');

    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const debounceKeyword = useDebounce(keyword, 500);

    // Functions
    const getCategories = async () => {
        const result = await getCategoriesByQueries(searchParams.toString());

        if (result) {
            setCategories(result.items);
            setMetadata(result.metadata);
        } else {
            setCategories([]);
            setMetadata({});
        }
    };
    const searchCategory = async (keyword) => {
        searchParams.set('Keyword', keyword.trim());
        setSearchParams(searchParams);
    };

    // Event handlers
    const handleSort = (e) => {
        const currentSortOrder = searchParams.get('SortOrder');
        const currentSortColumn = searchParams.get('SortColumn');

        if (currentSortColumn === e.target.closest('button').value)
            searchParams.set(
                'SortOrder',
                currentSortOrder === 'asc' ? 'desc' : currentSortOrder === 'desc' ? 'asc' : 'asc'
            );
        else {
            searchParams.set('SortColumn', e.target.closest('button').value);
            searchParams.set('SortOrder', 'asc');
        }
        setSearchParams(searchParams);
    };
    const handleChangeShowOnMenu = async (e) => {
        const result = await toggleShowOnMenuById(e.target.id);

        if (!result.isSuccess) window.alert('Có lỗi xảy ra, vui lòng thử lại.');
    };

    // Side effects
    /* Get categories by queries */
    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, [searchParams]);
    /* Debounce search keyword */
    useEffect(() => {
        searchCategory(keyword);
        // eslint-disable-next-line
    }, [debounceKeyword]);

    return (
        <section className='px-6 py-4 w-full bg-gray/40'>
            <h1 className='my-3 text-xl font-semibold uppercase'>Quản lý danh mục</h1>
            <div className='flex flex-col gap-4 p-4 bg-primary rounded shadow'>
                {/* Start: Header */}
                <div className='flex items-center justify-between'>
                    <div>
                        <Input
                            value={keyword}
                            placeholder='Nhập từ khóa...'
                            className='w-16'
                            onChange={(e) => {
                                setKeyword(e.target.value);
                            }}
                        />
                    </div>
                    <Button accent text='Tạo danh mục' />
                </div>
                {/* End: Header */}

                {/* Start: Table */}
                <div>
                    <div className='grid grid-cols-6 gap-x-4 px-4 py-2 bg-gray/60 rounded'>
                        {headers.map((header) => (
                            <button
                                key={header.id}
                                type='button'
                                value={header.value}
                                className={`flex items-center gap-1 font-semibold${
                                    header.center === true ? ' justify-center' : ''
                                }`}
                                onClick={handleSort}
                            >
                                <span>{header.name}</span>
                                {searchParams.get('SortOrder') === 'asc' &&
                                    searchParams.get('SortColumn') === header.value && (
                                        <img src={icons.arrowUp} alt='sort-icon' className='w-4' />
                                    )}
                                {searchParams.get('SortOrder') === 'desc' &&
                                    searchParams.get('SortColumn') === header.value && (
                                        <img src={icons.arrowDown} alt='sort-icon' className='w-4' />
                                    )}
                            </button>
                        ))}
                        <span className='text-center font-semibold'>Số lượng sản phẩm</span>
                        <span className='text-center font-semibold'>Thao tác</span>
                    </div>
                    {categories.map((category) => (
                        <div key={category.id} className='grid grid-cols-6 gap-x-4 px-4 py-2 odd:bg-gray/20'>
                            <span>{category.name}</span>
                            <span>{category.urlSlug}</span>
                            <span>{category.description}</span>
                            <input
                                id={category.id}
                                type='checkbox'
                                defaultChecked={category.showOnMenu}
                                onChange={handleChangeShowOnMenu}
                            />
                            <span className='text-center'>{category.productCount}</span>
                            <div className='flex justify-center gap-4'>
                                <button type='button'>Chỉnh sửa</button>
                                <button type='button' className='text-red'>
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* End: Table */}
                <Pager metadata={metadata} showTotal />
            </div>
        </section>
    );
}
