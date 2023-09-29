// Hooks
import { useAxiosPrivate } from '@hooks/shared';

export default function useSupplierServices() {
    const axiosPrivate = useAxiosPrivate();

    const getSuppliersByQueries = async (queries) => {
        const { data } = await axiosPrivate.get(`/api/suppliers?${queries}`);

        if (data.isSuccess) return data.result;

        return null;
    };

    return {
        getSuppliersByQueries
    };
}
