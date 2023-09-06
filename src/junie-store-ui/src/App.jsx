// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import { Home, Category, Product, Checkout } from '@pages/client';
import { Account, Login, SignUp } from '@pages/shared';

// Components
import { ClientLayout } from '@components/client';

// Config routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <ClientLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/categories/:categorySlug', element: <Category /> },
            { path: '/checkout', element: <Checkout /> },
            { path: '/products/:productSlug', element: <Product /> },
            { path: '/account', element: <Account /> },
            { path: '/account/login', element: <Login /> },
            { path: '/account/sign-up', element: <SignUp /> }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
