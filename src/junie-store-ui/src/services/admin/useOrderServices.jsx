// Hooks
import { useAxiosPrivate } from '@hooks/shared';

export default function useOrderServices() {
    // Hooks
    const axiosPrivate = useAxiosPrivate();

    const getOrdersByQueries = async (queries) => {
        const { data } = await axiosPrivate.get(`/api/orders?${queries}`);

        if (data.isSuccess) return data.result;

        return null;
    };
    const toggleOrderStatus = async (orderId) => {
        const { data } = await axiosPrivate.get(`/api/orders/Toggle/${orderId}`);

        return data || null;
    };

    return { getOrdersByQueries, toggleOrderStatus };
}
