// Libraries
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

// Redux
import { selectOrder, setStatusFilter } from '@redux/features/client/order';

// Services
import { getOrdersByQueries } from '@services/client';

// Components
import { Button, Pager } from '@components/shared';
import OrderItem from './OrderItem';

export default function OrderSection() {
    // Hooks
    const dispatch = useDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    // States
    const order = useSelector(selectOrder);
    const [orders, setOrders] = useState([]);
    const [metadata, setMetadata] = useState({});

    // Functions
    const getOrders = async () => {
        const urlSearchParams = new URLSearchParams(searchParams);
        const result = await getOrdersByQueries(urlSearchParams);

        if (result) {
            setOrders(result.items);
            setMetadata(result.metadata);
        } else {
            setOrders([]);
            setMetadata({});
        }
    };

    // Event handlers
    const handleToggleStatusFilter = (e) => {
        dispatch(setStatusFilter(e.target.value));
    };

    // Side effects
    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [searchParams]);

    return (
        <section className='lg:col-span-9 flex flex-col gap-4'>
            <div className='flex items-center gap-x-6 gap-y-2 flex-wrap -mt-2'>
                <button
                    type='button'
                    value='all'
                    className={`${order.statusFilter === 'all' && 'font-semibold underline underline-offset-4'}`}
                    onClick={handleToggleStatusFilter}
                >
                    Tất cả đơn hàng
                </button>
                <button
                    type='button'
                    value='waiting'
                    className={`${order.statusFilter === 'waiting' && 'font-semibold underline underline-offset-4'}`}
                    onClick={handleToggleStatusFilter}
                >
                    Chờ xác nhận
                </button>
                <button
                    type='button'
                    value='delivering'
                    className={`${order.statusFilter === 'delivering' && 'font-semibold underline underline-offset-4'}`}
                    onClick={handleToggleStatusFilter}
                >
                    Đang giao
                </button>
                <button
                    type='button'
                    value='delivered'
                    className={`${order.statusFilter === 'delivered' && 'font-semibold underline underline-offset-4'}`}
                    onClick={handleToggleStatusFilter}
                >
                    Đã hoàn thành
                </button>
                <button
                    type='button'
                    value='canceled'
                    className={`${order.statusFilter === 'canceled' && 'font-semibold underline underline-offset-4'}`}
                    onClick={handleToggleStatusFilter}
                >
                    Đã hủy
                </button>
            </div>
            {orders.length === 0 ? (
                <div className='flex flex-col items-center gap-2 p-8 bg-primary rounded-lg shadow-md'>
                    <span className='font-semibold'>Chưa có đơn hàng nào</span>
                    <Button to='/' secondary text='Bắt đầu mua sắm' className='w-fit' />
                </div>
            ) : (
                <div className='flex flex-col gap-4'>
                    {orders.map((order) => (
                        <OrderItem key={order.id} order={order} />
                    ))}
                </div>
            )}
            <Pager metadata={metadata} />
        </section>
    );
}
