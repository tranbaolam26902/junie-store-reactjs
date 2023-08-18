// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import { Home, Category, Product } from '@pages/client';
import { ClientLayout } from '@components/client';

// Config routes
const router = createBrowserRouter([
    {
        path: '/',
        element: <ClientLayout />,
        children: [
            { path: '/', element: <Home /> },
            { path: '/:categorySlug', element: <Category /> },
            { path: '/:categorySlug/:productSlug', element: <Product /> }
        ]
    }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
