// Services
import { axios } from '@services/shared';

const getCategoriesByQueries = async (queries) => {
    const { data } = await axios.get(`/api/categories?${queries}`);

    if (data.isSuccess) return data.result;

    return null;
};

export { getCategoriesByQueries };
