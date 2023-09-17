// Libraries
import { axios } from '@services/shared';

const getBestSellingProducts = async () => {
    const { data } = await axios.get('/api/products/TopSales/15');

    if (data.isSuccess) return data.result;

    return null;
};

const getProductBySlug = async (productSlug) => {
    const { data } = await axios.get(`/api/products/bySlug/${productSlug}`);

    if (data.isSuccess) return data.result;

    return null;
};

const getFeaturedProductBySlug = async (productSlug) => {
    const { data } = await axios.get(`/api/products/related/${productSlug}/12`);

    if (data.isSuccess) return data.result;

    return null;
};

export { getBestSellingProducts, getProductBySlug, getFeaturedProductBySlug };
