// Services
import { axios } from '@services/shared';

const getRelatedCategoriesBySlug = async ({ categorySlug, keyword }) => {
    const { data } = await axios.get(
        `/api/categories/RelatedCategories?UrlSlug=${categorySlug || ''}&Keyword=${keyword || ''}`
    );

    if (data.isSuccess) return data.result;

    return null;
};

const getCategoriesShowOnMenu = async () => {
    const { data } = await axios.get(`/api/categories?ShowOnMenu=true`);

    if (data.isSuccess) return data.result;

    return null;
};

export { getRelatedCategoriesBySlug, getCategoriesShowOnMenu };
