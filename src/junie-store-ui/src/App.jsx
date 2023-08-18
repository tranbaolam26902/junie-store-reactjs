// Libraries
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Components
import { Home, Category, Product } from '@pages/client';

// Config routes
const router = createBrowserRouter([
    { path: '/', element: <Home /> },
    { path: '/:categorySlug', element: <Category /> },
    { path: '/:categorySlug/:productSlug', element: <Product /> }
]);

function App() {
    return <RouterProvider router={router} />;
}

export default App;
