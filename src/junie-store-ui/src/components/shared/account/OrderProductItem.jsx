// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

export default function OrderProductItem({ product }) {
    return (
        <div className='flex gap-4'>
            <Link to={`/products/${product.urlSlug}`}>
                <img
                    src={
                        product.imageUrl
                            ? `${import.meta.env.VITE_API_ENDPOINT}/${product.imageUrl}`
                            : images.placeholder
                    }
                    alt='product'
                    className='w-24 h-full aspect-[3/4] object-cover rounded'
                />
            </Link>
            <div className='flex-1 flex flex-col gap-1'>
                <span>{product.name}</span>
                <span className='font-thin'>&times;{product.quantity}</span>
                <span className='font-thin'>
                    {new Intl.NumberFormat('vi-vn').format(product.price)}
                    <sup className='pl-0.5 underline'>đ</sup>
                </span>
            </div>
            <Link type='button' className='my-auto h-fit font-semibold'>
                Đánh giá
            </Link>
        </div>
    );
}
