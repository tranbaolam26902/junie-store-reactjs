// Libraries
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';

// Redux
import { selectOrder, setStatusFilter } from '@redux/features/client/order';

// Services
import { getOrdersByQueries } from '@services/client';

// Components
import { Pager } from '@components/shared';
import OrderItem from './OrderItem';

// Tabs
const tabs = [
    {
        id: 1,
        name: 'Tất cả đơn hàng',
        value: 'None'
    },
    {
        id: 2,
        name: 'Chờ xác nhận',
        value: 'New'
    },
    {
        id: 3,
        name: 'Đang giao',
        value: 'Shipping'
    },
    {
        id: 4,
        name: 'Đã hoàn thành',
        value: 'Success'
    },
    {
        id: 6,
        name: 'Đã hủy',
        value: 'Cancelled'
    },
    {
        id: 7,
        name: 'Trả hàng',
        value: 'Returned'
    }
];

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
        searchParams.set('Status', e.target.value);
        setSearchParams(searchParams);
    };

    // Side effects
    /* Get orders by queries */
    useEffect(() => {
        getOrders();
        // eslint-disable-next-line
    }, [searchParams, order.updateOrders]);
    /* Get current status filter from searchParams */
    useEffect(() => {
        const currentStatus = searchParams.get('Status');
        if (currentStatus) dispatch(setStatusFilter(currentStatus));
        // eslint-disable-next-line
    }, []);

    return (
        <section className='lg:col-span-9 flex flex-col gap-4'>
            <div className='flex items-center gap-x-6 gap-y-2 flex-wrap -mt-2'>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type='button'
                        value={tab.value}
                        className={`transition duration-200 ${
                            order.statusFilter === tab.value ? 'opacity-100 underline underline-offset-4' : 'opacity-50'
                        }`}
                        onClick={handleToggleStatusFilter}
                    >
                        {tab.name}
                    </button>
                ))}
            </div>
            {orders.length === 0 ? (
                <div className='p-8 text-center bg-primary rounded-lg shadow-md'>
                    <span className='opacity-100'>Chưa có đơn hàng nào</span>
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
