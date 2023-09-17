// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import { Home, Category, Product, Checkout, SearchResult, Blog, BlogDetail, SinglePage } from '@pages/client';
import { Account, Login, SignUp } from '@pages/shared';

// Services
import {
    getCategoryBySlug,
    getBestSellingProducts,
    getFeaturedProductBySlug,
    getProductBySlug
} from '@services/client';

// Components
import { ClientLayout } from '@components/client';
import { PersistLogin, RequireLogin } from '@components/shared';

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
                        loader: async () => {
                            const bestSellingProducts = await getBestSellingProducts();

                            return {
                                bestSellingProducts
                            };
                        }
                    },
                    {
                        path: '/categories/:categorySlug',
                        element: <Category />,
                        loader: async ({ params }) => await getCategoryBySlug(params.categorySlug)
                    },
                    {
                        path: '/products/:productSlug',
                        element: <Product />,
                        loader: async ({ params }) => {
                            const product = await getProductBySlug(params.productSlug);
                            const featuredProducts = await getFeaturedProductBySlug(params.productSlug);

                            return {
                                product,
                                featuredProducts
                            };
                        }
                    },
                    { path: '/search', element: <SearchResult /> },
                    { path: '/blogs', element: <Blog /> },
                    { path: '/blogs/:blogSlug', element: <BlogDetail /> },
                    { path: '/account/login', element: <Login /> },
                    { path: '/account/sign-up', element: <SignUp /> },
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
            }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
