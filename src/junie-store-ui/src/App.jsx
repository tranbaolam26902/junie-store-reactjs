// Libraries
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

// Pages
import { Dashboard } from '@pages/admin';
import { Home, Category, Product, Checkout, SearchResult, Blog, BlogDetail, SinglePage } from '@pages/client';
import { Account, Login, NotFound, PasswordRecovery, SignUp } from '@pages/shared';

// Services
import {
    getCategoryBySlug,
    getBestSellingProducts,
    getFeaturedProductBySlug,
    getProductBySlug,
    getProductsByQueries,
    getRelatedCategoriesBySlug
} from '@services/client';

// Components
import { AdminLayout, RequireManagerAuth, RequireAdminAuth } from '@components/admin';
import { ClientLayout } from '@components/client';
import { PersistLogin, RequireLogin } from '@components/shared';

// Loader handlers
const handleLoadHomePage = async () => {
    const bestSellingProducts = await getBestSellingProducts();

    return {
        bestSellingProducts
    };
};
const handleLoadCategoryPage = async ({ params }) => {
    const category = await getCategoryBySlug(params.categorySlug);
    const result = await getProductsByQueries(`CategorySlug=${params.categorySlug}&PageSize=20`);
    const relatedCategories = await getRelatedCategoriesBySlug({ categorySlug: params.categorySlug });

    if (!category) throw new Response('Not Found', { status: category.statusCode });

    return {
        category,
        defaultProducts: result.items,
        defaultMetadata: result.metadata,
        relatedCategories
    };
};
const handleLoadProductPage = async ({ params }) => {
    const product = await getProductBySlug(params.productSlug);
    const featuredProducts = await getFeaturedProductBySlug(params.productSlug);

    if (!product || !featuredProducts)
        throw new Response('Not Found', {
            status: product.statusCode === 200 ? featuredProducts.statusCode : product.statusCode
        });

    return {
        product,
        featuredProducts
    };
};
const handleLoadSearchPage = async ({ request }) => {
    const keyword = new URL(request.url).searchParams.get('Keyword');
    const relatedCategories = await getRelatedCategoriesBySlug({ keyword });

    return {
        relatedCategories
    };
};

// Config routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <PersistLogin />,
        children: [
            {
                path: '/',
                element: <ClientLayout />,
                children: [
                    /* Public routes */
                    {
                        path: '/',
                        element: <Home />,
                        loader: handleLoadHomePage
                    },
                    {
                        path: '/categories/:categorySlug',
                        element: <Category />,
                        loader: handleLoadCategoryPage,
                        errorElement: <NotFound />
                    },
                    {
                        path: '/products/:productSlug',
                        element: <Product />,
                        loader: handleLoadProductPage,
                        errorElement: <NotFound />
                    },
                    {
                        path: '/search',
                        element: <SearchResult />,
                        loader: handleLoadSearchPage
                    },
                    { path: '/blogs', element: <Blog /> },
                    { path: '/blogs/:blogSlug', element: <BlogDetail /> },
                    { path: '/account/login', element: <Login /> },
                    { path: '/account/sign-up', element: <SignUp /> },
                    { path: '/account/password-recovery', element: <PasswordRecovery /> },
                    { path: '/pages/:pageSlug', element: <SinglePage /> },
                    /* Require login routes */
                    {
                        path: '/',
                        element: <RequireLogin />,
                        children: [
                            {
                                path: '/checkout',
                                element: <Checkout />
                            },
                            {
                                path: '/account',
                                element: <Account />
                            }
                        ]
                    }
                ]
            },
            {
                path: '/admin',
                element: <AdminLayout />,
                children: [
                    { path: '/admin', element: <Navigate to='/admin/dashboard' /> },
                    {
                        path: '/admin',
                        element: <RequireManagerAuth />,
                        children: [
                            /* Manager routes */
                            { path: '/admin/dashboard', element: <Dashboard /> }
                        ]
                    },
                    {
                        path: '/admin',
                        element: <RequireAdminAuth />,
                        children: [
                            /* Admin routes */
                        ]
                    }
                ]
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
