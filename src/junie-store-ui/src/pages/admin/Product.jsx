// Libraries
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Hooks
import { useDebounce } from '@hooks/shared';

// Services
import { useCategoryServices, useProductServices } from '@services/admin';
import { getProductsByQueries } from '@services/client';

// Components
import { AdminContainer } from '@components/admin';
import { Button, Input, Pager } from '@components/shared';
import { PageTransition } from '@components/shared/animations';

// Headers
const headers = [
    {
        id: 1,
        value: '',
        name: 'Ảnh',
        colSpan: 1,
        center: true
    },
    {
        id: 2,
        value: 'name',
        name: 'Tên sản phẩm',
        colSpan: 2
    },
    {
        id: 3,
        value: '',
        name: 'Danh mục',
        colSpan: 2
    },
    {
        id: 4,
        value: 'sku',
        name: 'SKU',
        colSpan: 1
    },
    {
        id: 5,
        value: 'price',
        name: 'Giá',
        colSpan: 1,
        center: true
    },
    {
        id: 6,
        value: 'quantity',
        name: 'Số lượng',
        colSpan: 1,
        center: true
    },
    {
        id: 7,
        value: 'discount',
        name: 'Giảm giá',
        colSpan: 1,
        center: true
    },
    {
        id: 8,
        value: 'active',
        name: 'Kích hoạt',
        colSpan: 1,
        center: true
    },
    {
        id: 9,
        value: 'isDeleted',
        name: 'Xóa',
        colSpan: 1,
        center: true
    },
    {
        id: 10,
        value: '',
        name: 'Thao tác',
        colSpan: 1,
        center: true
    }
];

export default function Product() {
    // States
    const [keyword, setKeyword] = useState('');
    const [products, setProducts] = useState([]);
    const [metadata, setMetadata] = useState({});
    const [categories, setCategories] = useState([]);
    const [categorySlug, setCategorySlug] = useState('');

    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const debounceKeyword = useDebounce(keyword, 500);
    const productServices = useProductServices();
    const categoryServices = useCategoryServices();

    // Functions
    const getProducts = async () => {
        const result = await getProductsByQueries(searchParams.toString());

        if (result) {
            setProducts(result.items);
            setMetadata(result.metadata);
        } else {
            setProducts([]);
            setMetadata({});
        }
    };
    const getCategories = async () => {
        const result = await categoryServices.getCategoriesByQueries('');

        if (result) setCategories(result.items);
        else setCategories([]);
    };
    const searchProduct = (keyword) => {
        searchParams.set('Keyword', keyword.trim());
        setSearchParams(searchParams);
    };

    // Event handlers
    const handleFilterByCategory = (e) => {
        setCategorySlug(e.target.value);
        if (e.target.value === '') searchParams.delete('CategorySlug');
        else searchParams.set('CategorySlug', e.target.value);
        setSearchParams(searchParams);
    };
    const handleClearFilter = () => {
        setKeyword('');
        setSearchParams('');
        setCategorySlug('');
    };
    const handleSort = (e) => {
        if (!e.target.closest('button').value) return;

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
    const handleToggleActive = async (e) => {
        const data = await productServices.toggleProductActiveById(e.target.value);

        if (!data.isSuccess) window.alert(data.errors[0]);
    };
    const handleToggleIsDeleted = async (e) => {
        const reason = window.prompt('Lý do:');

        if (reason === null) {
            e.target.checked = !e.target.checked;
            return;
        }
        if (reason.trim() === '') {
            e.target.checked = !e.target.checked;
            window.alert('Không được để trống lý do.');
            return;
        }

        const data = await productServices.toggleProductIsDeleteById(e.target.value, reason);

        if (data.isSuccess) window.alert(data.result);
        else window.alert(data.errors[0]);
    };
    const handleDelete = async (e) => {
        if (!window.confirm('Xác nhận xóa? Sau khi xóa sẽ không thể khôi phục.')) return;

        const result = await productServices.deleteProductById(e.target.value);
        if (result.isSuccess) {
            window.alert(result.result);
            getProducts();
        } else window.alert(result.errors);
    };

    // Side effects
    /* Get products by queries */
    useEffect(() => {
        getProducts();
        getCategories();
        // eslint-disable-next-line
    }, [searchParams]);
    /* Debounce search keyword */
    useEffect(() => {
        searchProduct(keyword);
        // eslint-disable-next-line
    }, [debounceKeyword]);

    return (
        <AdminContainer>
            <PageTransition>
                <h1 className='my-3 text-xl font-semibold uppercase'>Quản lý sản phẩm</h1>
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
                            <select
                                className='px-4 py-3 w-max rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                                value={categorySlug}
                                onChange={handleFilterByCategory}
                            >
                                <option value=''>-- Tất cả danh mục --</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.urlSlug}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                            <button type='button' className='font-semibold' onClick={handleClearFilter}>
                                Xóa bộ lọc
                            </button>
                        </div>
                        <Button to='/admin/products/create' accent text='Tạo sản phẩm' />
                    </div>
                    {/* End: Header */}

                    {/* Start: Table */}
                    <div>
                        <div className='grid grid-cols-12 gap-x-4 px-4 py-2 bg-gray/60 rounded'>
                            {headers.map((header) => (
                                <button
                                    key={header.id}
                                    type='button'
                                    value={header.value}
                                    className={`col-span-${header.colSpan} flex items-center gap-1 font-semibold${
                                        header.center === true ? ' justify-center' : ''
                                    }${header.value === '' ? ' cursor-default' : ''}`}
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
                        {products.map((product) => (
                            <div
                                key={product.id + product.isDeleted + product.showOnMenu}
                                className='grid grid-cols-12 items-center gap-x-4 px-4 py-2 odd:bg-gray/20'
                            >
                                <img src={images.placeholder} alt='product-image' className='w-24 aspect-[3/4]' />
                                <span className='col-span-2'>{product.name}</span>
                                <div className='col-span-2 flex flex-col'>
                                    {product.categories.map((category) => (
                                        <span key={category.id}>{category.name}</span>
                                    ))}
                                </div>
                                <span>{product.sku}</span>
                                <span className='text-center'>
                                    {new Intl.NumberFormat('vi-vn').format(product.price)}
                                </span>
                                <span className='text-center'>{product.quantity}</span>
                                <span className='text-center'>{product.discount}</span>
                                <input
                                    value={product.id}
                                    type='checkbox'
                                    defaultChecked={product.active}
                                    onChange={handleToggleActive}
                                />
                                <input
                                    value={product.id}
                                    type='checkbox'
                                    defaultChecked={product.isDeleted}
                                    onChange={handleToggleIsDeleted}
                                />
                                <div className='flex flex-col items-center gap-y-2'>
                                    <Link to={`/admin/products/${product.urlSlug}`} type='button'>
                                        Chỉnh sửa
                                    </Link>
                                    <button
                                        type='button'
                                        value={product.id}
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
