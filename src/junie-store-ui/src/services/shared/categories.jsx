// Services
import { axios } from '@services/shared';

const getCategoryBySlug = async (categorySlug) => {
    const { data } = await axios.get(`/api/categories/bySlug/${categorySlug}`);

    if (data.isSuccess) return data.result;

    return null;
};

export { getCategoryBySlug };
