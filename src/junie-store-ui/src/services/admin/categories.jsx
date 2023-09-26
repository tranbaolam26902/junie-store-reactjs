// Services
import { axios } from '@services/shared';

const toggleShowOnMenuById = async (categoryId) => {
    const { data } = await axios.get(`/api/categories/toggleShowOnMenu/${categoryId}`);

    return data || null;
};

export { toggleShowOnMenuById };
