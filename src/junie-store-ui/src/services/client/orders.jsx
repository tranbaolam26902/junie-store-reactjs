// Services
import { axiosPrivate } from '@services/shared';

const checkout = async (orderInfo) => {
    const { data } = await axiosPrivate.post('/api/orders/checkout', orderInfo);

    return data || null;
};

const getOrdersByQueries = async (queries) => {
    const { data } = await axiosPrivate.get(`/api/orders?${queries}`);

    if (data.isSuccess) return data.result;

    return null;
};

export { checkout, getOrdersByQueries };
