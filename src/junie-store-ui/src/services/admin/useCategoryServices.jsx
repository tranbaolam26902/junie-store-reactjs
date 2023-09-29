// Hooks
import { useAxiosPrivate } from '@hooks/shared';

export default function useCategoryServices() {
    // Hooks
    const axiosPrivate = useAxiosPrivate();

    // Services
    const getCategoriesByQueries = async (queries) => {
        const { data } = await axiosPrivate.get(`/api/categories/byManager?${queries}`);

        if (data.isSuccess) return data.result;

        return null;
    };
    const createCategory = async (category) => {
        const { data } = await axiosPrivate.post('/api/categories', category);

        return data || null;
    };
    const editCategory = async (categoryId, category) => {
        const { data } = await axiosPrivate.put(`/api/categories/${categoryId}`, category);

        return data || null;
    };
    const toggleCategoryShowOnMenuById = async (categoryId) => {
        const { data } = await axiosPrivate.get(`/api/categories/toggleShowOnMenu/${categoryId}`);

        return data || null;
    };
    const toggleCategoryIsDeletedById = async (categoryId) => {
        const { data } = await axiosPrivate.delete(`/api/categories/toggleDelete/${categoryId}`);

        return data || null;
    };
    const deleteCategoryById = async (categoryId) => {
        const { data } = await axiosPrivate.delete(`/api/categories/${categoryId}`);

        return data || null;
    };

    return {
        getCategoriesByQueries,
        createCategory,
        editCategory,
        toggleCategoryShowOnMenuById,
        toggleCategoryIsDeletedById,
        deleteCategoryById
    };
}
