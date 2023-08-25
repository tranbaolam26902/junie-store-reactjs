// Libraries
import { Link } from 'react-router-dom';

export default function Breadcrumb({ title }) {
    return (
        <section className='flex items-center gap-1 pt-6 pb-8'>
            <Link to='/' className='text-sm transition duration-200 opacity-70 hover:opacity-100'>
                Trang chủ
            </Link>
            <span>/</span>
            <span className='text-sm'>{title}</span>
        </section>
    );
}
