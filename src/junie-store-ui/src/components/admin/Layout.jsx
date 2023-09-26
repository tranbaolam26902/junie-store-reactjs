import { Outlet } from 'react-router-dom';

export default function Layout() {
    return (
        <section>
            <Outlet />
        </section>
    );
}
