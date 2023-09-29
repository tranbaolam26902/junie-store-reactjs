// Libraries
import { useAxiosPrivate } from '@hooks/shared';

export default function useProductServices() {
    // Hooks
    const axiosPrivate = useAxiosPrivate();

    // Services
    const toggleProductActiveById = async (productId) => {
        const { data } = await axiosPrivate.get(`/api/products/toggleActive/${productId}`);

        return data || null;
    };
    const toggleProductIsDeleteById = async (productId, reason) => {
        const { data } = await axiosPrivate.delete(`/api/products/toggleDelete/${productId}`, {
            data: { reason }
        });

        return data || null;
    };
    const deleteProductById = async (productId) => {
        const { data } = await axiosPrivate.delete(`/api/products/${productId}`);

        return data || null;
    };
    const createProduct = async (product) => {
        const { data } = await axiosPrivate.post('/api/products', product);

        return data || null;
    };
    const editProduct = async (product) => {
        const { data } = await axiosPrivate.put(`/api/products/${product.id}`, product);

        return data || null;
    };

    return { toggleProductActiveById, toggleProductIsDeleteById, deleteProductById, createProduct, editProduct };
}
