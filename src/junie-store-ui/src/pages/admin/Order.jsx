// Libraries
import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Hooks
import { useDebounce } from '@hooks/shared';

// Services
import useOrderServices from '@services/admin/useOrderServices';

// Components
import { AdminContainer } from '@components/admin';
import { Button, Input, Pager } from '@components/shared';
import { PageTransition } from '@components/shared/animations';

// Constants
const NEW = 1;
const CANCELLED = 2;
const CONFIRMED = 3;
const SHIPPING = 4;
const RETURNED = 5;
const SUCCESS = 6;

const orderStatus = [
    {
        id: 1,
        value: NEW,
        name: 'Chờ xác nhận'
    },
    {
        id: 2,
        value: CANCELLED,
        name: 'Đã hủy'
    },
    {
        id: 3,
        value: CONFIRMED,
        name: 'Đã xác nhận'
    },
    {
        id: 4,
        value: SHIPPING,
        name: 'Đang giao'
    },
    {
        id: 5,
        value: RETURNED,
        name: 'Trả hàng'
    },
    {
        id: 6,
        value: SUCCESS,
        name: 'Đã giao'
    }
];

const headers = [
    {
        id: 1,
        value: 'codeOrder',
        name: 'Mã đơn hàng',
        colSpan: 1
    },
    {
        id: 2,
        value: 'orderDate',
        name: 'Ngày đặt',
        colSpan: 1
    },
    {
        id: 3,
        value: '',
        name: 'Thông tin đơn hàng',
        colSpan: 2
    },
    {
        id: 4,
        value: '',
        name: 'Sản phẩm',
        colSpan: 2
    },
    {
        id: 5,
        value: '',
        name: 'Tổng tiền',
        colSpan: 1,
        center: true
    },
    {
        id: 6,
        value: 'status',
        name: 'Trạng thái',
        conSpan: 1,
        center: true
    },
    {
        id: 7,
        value: '',
        name: 'Thao tác',
        colSpan: 1,
        center: true
    }
];

export default function Order() {
    // States
    const [keyword, setKeyword] = useState('');
    const [orders, setOrders] = useState([]);
    const [metadata, setMetadata] = useState([]);
    const [status, setStatus] = useState(0);

    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const orderServices = useOrderServices();
    const debounceKeyword = useDebounce(keyword, 500);

    // Functions
    const getOrders = async () => {
        const result = await orderServices.getOrdersByQueries(searchParams.toString());

        if (result) {
            setOrders(result.items);
            setMetadata(result.metadata);
        } else {
            setOrders([]);
            setMetadata([]);
        }
    };
    const searchOrder = (keyword) => {
        searchParams.set('Keyword', keyword.trim());
        setSearchParams(searchParams);
    };

    // Event handlers
    const handleClearFilter = () => {
        setKeyword('');
        setStatus(0);
        setSearchParams('');
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
    const handleFilterByStatus = (e) => {
        setStatus(e.target.value);
        if (e.target.value === '') searchParams.delete('Status');
        else searchParams.set('Status', e.target.value);
        setSearchParams(searchParams);
    };
    const handleToggleOrderStatus = async (e) => {
        if (!window.confirm('Xác nhận chuyển trạng thái đơn hàng?')) return;

        const result = await orderServices.toggleOrderStatus(e.target.value);

        if (!result.isSuccess) window.alert(result.errors[0]);
        else getOrders();
    };

    // Side effects
    /* Get categories by queries */
    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [searchParams]);
    /* Debounce search keyword */
    useEffect(() => {
        searchOrder(keyword);
        // eslint-disable-next-line
    }, [debounceKeyword]);

    return (
        <AdminContainer>
            <PageTransition>
                <h1 className='my-3 text-xl font-semibold uppercase'>Quản lý đơn hàng</h1>
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
                                value={status}
                                onChange={handleFilterByStatus}
                            >
                                <option value={0}>-- Tất cả đơn hàng --</option>
                                {orderStatus.map((status) => (
                                    <option key={status.id} value={status.value}>
                                        {status.name}
                                    </option>
                                ))}
                            </select>
                            <button type='button' className='font-semibold' onClick={handleClearFilter}>
                                Xóa bộ lọc
                            </button>
                        </div>
                    </div>
                    {/* End: Header */}

                    {/* Start: Table */}
                    <div>
                        <div className='grid grid-cols-9 gap-x-4 px-4 py-2 bg-gray/60 rounded'>
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
                        {orders.map((order) => (
                            <div
                                key={order.id + order.isDeleted + order.showOnMenu}
                                className='grid grid-cols-9 gap-x-4 px-4 py-2 odd:bg-gray/20'
                            >
                                <span>{order.codeOrder}</span>
                                <span>
                                    {new Date(order.orderDate).toLocaleString('vi-vn', {
                                        timeStyle: 'short',
                                        dateStyle: 'short'
                                    })}
                                </span>
                                <div className='col-span-2 flex flex-col'>
                                    <span className='flex flex-wrap items-center gap-x-1'>
                                        <span className='font-thin text-sm'>Tên:</span>
                                        <span className='pt-px'>{order.name}</span>
                                    </span>
                                    <span className='flex flex-wrap items-center gap-x-1'>
                                        <span className='font-thin text-sm'>Địa chỉ:</span>
                                        <span className='pt-px'>{order.shipAddress}</span>
                                    </span>
                                    <span className='flex flex-wrap items-center gap-x-1'>
                                        <span className='font-thin text-sm'>Số điện thoại:</span>
                                        <span className='pt-px'>{order.phone}</span>
                                    </span>
                                    {order.note && (
                                        <span className='flex flex-wrap items-center gap-x1'>
                                            <span className='font-thin text-sm'>Ghi chú:</span>
                                            <span className='pt-px'>{order.note}</span>
                                        </span>
                                    )}
                                    <span className='flex flex-wrap items-center gap-x-1'>
                                        <span className='font-thin text-sm'>Email:</span>
                                        <span className='pt-px'>{order.email}</span>
                                    </span>
                                </div>
                                <div className='col-span-2 flex flex-col gap-2'>
                                    {order.details.map((product) => (
                                        <Link key={order.orderId + product.productId} className='flex gap-2'>
                                            <img
                                                src={
                                                    product.imageUrl
                                                        ? `${import.meta.env.VITE_API_ENDPOINT}/${product.imageUrl}`
                                                        : images.placeholder
                                                }
                                                alt='product-image'
                                                className='w-24 aspect-[3/4] object-cover rounded-sm'
                                            />
                                            <div className='flex flex-col gap-1'>
                                                <span className='flex flex-wrap items-center gap-x-1'>
                                                    <span className='font-thin text-sm'>Sản phẩm:</span>
                                                    <span>{product.name}</span>
                                                </span>
                                                <span className='flex flex-wrap items-center gap-x-1'>
                                                    <span className='font-thin text-sm'>Đơn giá:</span>
                                                    <span className='pt-px'>
                                                        {new Intl.NumberFormat('vi-vn').format(product.price)}
                                                        <sup className='pl-0.5 underline'>đ</sup>
                                                    </span>
                                                </span>
                                                <span className='flex flex-wrap items-center gap-x-1'>
                                                    <span className='font-thin text-sm'>Số lượng:</span>
                                                    <span className='pt-px'>{product.quantity}</span>
                                                </span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                                <span className='font-semibold text-red text-center'>
                                    {new Intl.NumberFormat('vi-vn').format(order.total)}
                                    <sup className='pl-0.5 underline'>đ</sup>
                                </span>
                                <span className='text-center'>
                                    {order.status === NEW
                                        ? 'Chờ xác nhận'
                                        : order.status === CANCELLED
                                        ? 'Đã hủy'
                                        : order.status === CONFIRMED
                                        ? 'Đã xác nhận'
                                        : order.status === SHIPPING
                                        ? 'Đang giao'
                                        : order.status === RETURNED
                                        ? 'Trả hàng'
                                        : order.status === SUCCESS
                                        ? 'Đã giao'
                                        : 'Lỗi'}
                                </span>
                                <div className='flex flex-col '>
                                    {order.status === NEW && (
                                        <Button
                                            secondary
                                            value={order.id}
                                            text='Xác nhận'
                                            onClick={handleToggleOrderStatus}
                                        />
                                    )}
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
