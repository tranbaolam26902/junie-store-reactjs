// Libraries
import { Link } from 'react-router-dom';

export default function ProductItem({ product }) {
    return (
        <Link key={product.id} to={`/products/${product.slug}`} className='flex flex-col gap-4 group'>
            <div className='flex-1 relative overflow-hidden'>
                <img
                    src={product.image}
                    alt={product.slug}
                    className='w-full h-full object-cover rounded transition duration-500 group-hover:opacity-0'
                />
                <img
                    src={product.imageHover}
                    alt={product.slug}
                    className='absolute top-0 w-full h-full object-cover rounded opacity-0 transition duration-500 group-hover:opacity-100'
                />
            </div>
            <div className='flex flex-col items-center gap-1'>
                <span className='font-thin'>{product.name}</span>
                <span className='font-thin'>
                    {new Intl.NumberFormat('vi-VN').format(product.price)}
                    <sup className='underline'>đ</sup>
                </span>
            </div>
        </Link>
    );
}
