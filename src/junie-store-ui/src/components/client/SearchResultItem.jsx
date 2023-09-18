// Libraries
import { Link } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

export default function SearchResultItem({ product, onClick }) {
    return (
        <Link
            to={`/products/${product.urlSlug}`}
            className='relative flex items-center gap-6 pr-8 group'
            onClick={onClick}
        >
            <img
                src={
                    product.pictures.length !== 0
                        ? `${import.meta.env.VITE_API_ENDPOINT}/${product.pictures[0].path}`
                        : images.placeholder
                }
                alt={product.urlSlug}
                className='w-24 aspect-[3/4] rounded'
            />
            <div className='flex-1 flex flex-col gap-1'>
                <span className='line-clamp-1 break-words' title={product.name}>
                    {product.name}
                </span>
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
            <img
                src={icons.rightArrow}
                alt='arrow-icon'
                className='absolute top-1/2 right-0 w-4 transition duration-200 -translate-y-1/2 translate-x-full opacity-0 group-hover:translate-x-0 group-hover:opacity-100'
            />
        </Link>
    );
}
