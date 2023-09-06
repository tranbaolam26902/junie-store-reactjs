// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Pages
import { Home, Category, Product } from '@pages/client';
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
            { path: '/products/:productSlug', element: <Product /> },
            { path: '/account/login', element: <Login /> },
            { path: '/account/sign-up', element: <SignUp /> },
            { path: '/account', element: <Account /> }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
