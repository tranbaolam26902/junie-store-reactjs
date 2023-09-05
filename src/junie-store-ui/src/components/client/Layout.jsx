// Libraries
import { Outlet, ScrollRestoration } from 'react-router-dom';

// Components
import { Header, Footer } from '@components/client';

export default function Layout() {
    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <ScrollRestoration />
        </>
    );
}
