// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

export default function ProductItem({ product }) {
    return (
        <Link key={product.id} to={`/products/${product.urlSlug}`} className='flex flex-col gap-4 group h-full'>
            <div className='flex-1 relative overflow-hidden'>
                <img
                    src={
                        product.pictures.length !== 0
                            ? `${import.meta.env.VITE_API_ENDPOINT}/${product.pictures[0].path}`
                            : images.placeholder
                    }
                    alt={product.urlSlug}
                    className='w-full h-full aspect-[3/4] object-cover rounded transition duration-500 group-hover:opacity-0'
                />
                <img
                    src={
                        product.pictures.length >= 2
                            ? `${import.meta.env.VITE_API_ENDPOINT}/${product.pictures[1].path}`
                            : images.placeholder
                    }
                    alt={product.urlSlug}
                    className='absolute top-0 w-full h-full aspect-[3/4] object-cover rounded opacity-0 transition duration-500 group-hover:opacity-100'
                />
                {product.discount !== 0 && (
                    <span className='absolute top-2 left-2 z-10 flex items-center gap-1 px-2 py-1 text-xs font-semibold text-primary tracking-wide uppercase bg-red rounded'>
                        <span>Tiết kiệm</span>
                        <span>
                            {new Intl.NumberFormat('vi-VN').format((product.price * product.discount) / 100)}
                            <span className='underline normal-case'>đ</span>
                        </span>
                    </span>
                )}
            </div>
            <div className='flex flex-col items-center gap-1'>
                <span className='font-thin'>{product.name}</span>
                {product.discount !== 0 ? (
                    <div className='flex gap-2'>
                        <span className='font-thin text-red'>
                            {new Intl.NumberFormat('vi-VN').format(
                                product.price - (product.price * product.discount) / 100
                            )}
                            <sup className='pl-0.5 underline'>đ</sup>
                        </span>
                        <span className='font-thin text-secondary/70 line-through'>
                            {new Intl.NumberFormat('vi-VN').format(product.price)}
                            <sup className='pl-0.5 underline'>đ</sup>
                        </span>
                    </div>
                ) : (
                    <span className='font-thin'>
                        {new Intl.NumberFormat('vi-VN').format(product.price)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                )}
            </div>
        </Link>
    );
}
