// Libraries
import { Outlet } from 'react-router-dom';

// Components
import Sidebar from './Sidebar';

export default function Layout() {
    return (
        <section className='flex'>
            <Sidebar />
            <Outlet />
        </section>
    );
}
