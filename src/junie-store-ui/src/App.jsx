// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import { Home, Category, Product, Checkout, SearchResult, Blog, BlogDetail, SinglePage } from '@pages/client';
import { Account, Login, SignUp } from '@pages/shared';

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
                    { path: '/', element: <Home /> },
                    { path: '/categories/:categorySlug', element: <Category /> },
                    { path: '/products/:productSlug', element: <Product /> },
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
