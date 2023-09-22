// Services
import { axios } from '@services/shared';

const getCategoryBySlug = async (categorySlug) => {
    const { data } = await axios.get(`/api/categories/bySlug/${categorySlug}`);

    if (data.isSuccess) return data.result;

    return null;
};

const getRelatedCategoriesBySlug = async (categorySlug) => {
    const { data } = await axios.get(`/api/categories/RelatedCategories/${categorySlug}`);

    if (data.isSuccess) return data.result;

    return null;
};

const getCategories = async () => {
    const { data } = await axios.get('/api/categories');

    if (data.isSuccess) return data.result;

    return null;
};

export { getCategoryBySlug, getRelatedCategoriesBySlug, getCategories };
