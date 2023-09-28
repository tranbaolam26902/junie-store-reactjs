// Libraries
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Hooks
import { useDebounce } from '@hooks/shared';

// Services
import { useCategoryServices } from '@services/admin';

// Components
import { AdminContainer } from '@components/admin';
import { Button, Input, Pager } from '@components/shared';
import { PageTransition } from '@components/shared/animations';

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
    },
    {
        id: 5,
        value: 'isDeleted',
        name: 'Xóa',
        center: true
    },
    {
        id: 6,
        value: '',
        name: 'Số lượng sản phẩm',
        center: true
    },
    {
        id: 7,
        value: '',
        name: 'Thao tác',
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
    const categoryServices = useCategoryServices();

    // Functions
    const getCategories = async () => {
        const result = await categoryServices.getCategoriesByQueries(searchParams.toString());

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
    const handleClearFilter = () => {
        setKeyword('');
        setSearchParams('');
    };
    const handleSort = (e) => {
        if (!e.target.closest('button').value) {
            e.target.closest('button').classList.add('cursor-default');
            return;
        }

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
    const handleToggleShowOnMenu = async (e) => {
        const result = await categoryServices.toggleCategoryShowOnMenuById(e.target.value);

        if (!result.isSuccess) window.alert(result.errors[0]);
    };
    const handleToggleIsDeleted = async (e) => {
        const result = await categoryServices.toggleCategoryIsDeletedById(e.target.value);

        if (!result.isSuccess) window.alert(result.errors[0]);
        else getCategories();
    };
    const handleDelete = async (e) => {
        if (!window.confirm('Xác nhận xóa? Sau khi xóa sẽ không thể khôi phục.')) return;

        const result = await categoryServices.deleteCategoryById(e.target.value);
        if (result.isSuccess) {
            window.alert(result.result);
            getCategories();
        } else window.alert(result.errors);
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
        <AdminContainer>
            <PageTransition>
                <h1 className='my-3 text-xl font-semibold uppercase'>Quản lý danh mục</h1>
                <div className='flex flex-col gap-4 p-4 bg-primary rounded shadow'>
                    {/* Start: Header */}
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center gap-4'>
                            <Input
                                value={keyword}
                                placeholder='Nhập từ khóa...'
                                className='w-16'
                                onChange={(e) => {
                                    setKeyword(e.target.value);
                                }}
                            />
                            <button type='button' className='font-semibold' onClick={handleClearFilter}>
                                Xóa bộ lọc
                            </button>
                        </div>
                        <Button to='/admin/categories/create' accent text='Tạo danh mục' />
                    </div>
                    {/* End: Header */}

                    {/* Start: Table */}
                    <div>
                        <div className='grid grid-cols-7 gap-x-4 px-4 py-2 bg-gray/60 rounded'>
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
                        </div>
                        {categories.map((category) => (
                            <div
                                key={category.id + category.isDeleted + category.showOnMenu}
                                className='grid grid-cols-7 items-center gap-x-4 px-4 py-2 odd:bg-gray/20'
                            >
                                <span>{category.name}</span>
                                <span>{category.urlSlug}</span>
                                <span>{category.description}</span>
                                <input
                                    value={category.id}
                                    type='checkbox'
                                    defaultChecked={category.showOnMenu}
                                    onChange={handleToggleShowOnMenu}
                                />
                                <input
                                    value={category.id}
                                    type='checkbox'
                                    defaultChecked={category.isDeleted}
                                    onChange={handleToggleIsDeleted}
                                />
                                <span className='text-center'>{category.productCount}</span>
                                <div className='flex justify-center gap-4'>
                                    <Link to={`/admin/categories/${category.urlSlug}`} type='button'>
                                        Chỉnh sửa
                                    </Link>
                                    <button
                                        type='button'
                                        value={category.id}
                                        className='text-red'
                                        onClick={handleDelete}
                                    >
                                        Xóa hoàn toàn
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* End: Table */}
                    <Pager metadata={metadata} showTotal />
                </div>
            </PageTransition>
        </AdminContainer>
    );
}
