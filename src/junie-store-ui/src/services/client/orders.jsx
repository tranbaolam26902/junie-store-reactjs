// Services
import { axiosPrivate } from '@services/shared';

const checkout = async (orderInfo) => {
    const { data } = await axiosPrivate.post('/api/orders/checkout', orderInfo);

    return data || null;
};

const getOrders = async () => {
    const { data } = await axiosPrivate.get('/api/orders');

    if (data.isSuccess) return data.result;

    return null;
};

export { checkout, getOrders };
