// Libraries
import { Link } from 'react-router-dom';

export default function BlogItem({ blog }) {
    return (
        <Link to={`/blogs/${blog.slug}`} className='flex flex-col gap-6 w-full rounded group'>
            <div className='overflow-hidden'>
                <img src={blog.image} alt={blog.slug} className='transition duration-500 group-hover:scale-105' />
            </div>
            <span className='font-garamond text-2xl lg:text-3xl line-clamp-2' title={blog.title}>
                {blog.title}
            </span>
        </Link>
    );
}
