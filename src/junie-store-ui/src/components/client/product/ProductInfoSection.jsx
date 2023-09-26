// Libraries
import { useDispatch } from 'react-redux';
import { useLoaderData } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Redux
import { addProductToCart } from '@redux/features/client/cart';
import { setShowCartSidebar } from '@redux/features/client/header';

// Components
import { Button } from '@components/shared';

export default function ProductInfoSection() {
    // Hooks
    const { product } = useLoaderData();
    const dispatch = useDispatch();

    // Event handlers
    const handleAddToCart = () => {
        dispatch(
            addProductToCart({
                ...product,
                cartQuantity: 1
            })
        );
        dispatch(setShowCartSidebar());
    };

    return (
        <section className='flex flex-col'>
            <div className='flex flex-col gap-4 py-6'>
                <h1 className='font-garamond text-2xl lg:text-4xl'>{product.name}</h1>
                {product.discount !== 0 ? (
                    <div className='flex items-end gap-3 text-2xl'>
                        <span className='text-red'>
                            {new Intl.NumberFormat('vi-VN').format(
                                product.price - (product.price * product.discount) / 100
                            )}
                            <sup className='pl-0.5 underline'>đ</sup>
                        </span>
                        <span className='text-lg text-secondary/70 line-through'>
                            {new Intl.NumberFormat('vi-VN').format(product.price)}
                            <sup className='pl-0.5 underline'>đ</sup>
                        </span>
                        <span className='flex items-center gap-1 mb-1 px-2 py-1 text-xs font-semibold text-primary tracking-wide uppercase bg-red rounded'>
                            <span>Tiết kiệm</span>
                            <span>
                                {new Intl.NumberFormat('vi-VN').format((product.price * product.discount) / 100)}
                                <span className='underline normal-case'>đ</span>
                            </span>
                        </span>
                    </div>
                ) : (
                    <span className='text-2xl'>
                        {new Intl.NumberFormat('vi-VN').format(product.price)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                )}
                <span className='text-xs uppercase tracking-wider text-secondary/50'>SKU: {product.sku}</span>
            </div>
            <hr className='my-0 text-gray' />
            <div className='flex flex-col gap-6 pt-6'>
                {/* <div className='flex flex-col gap-4'>
                    <span className='text-sm lg:text-base text-black/80'>Màu sắc: Silver</span>
                    <div className='flex gap-4'>
                        <button
                            type='button'
                            className='w-10 h-10 aspect-square rounded-full bg-gray border-2 border-primary outline outline-2 outline-black'
                        ></button>
                        <button
                            type='button'
                            className='w-10 h-10 aspect-square rounded-full bg-[#e9c37d] border-2 border-primary'
                        ></button>
                    </div>
                </div> */}
                <Button secondary full text='Thêm vào giỏ' onClick={handleAddToCart} />
                <span className='text-sm text-green'>Còn hàng, dự kiến giao tới trong 1 - 3 ngày.</span>
                <div className='p-4 flex flex-col gap-4 bg-primary rounded-lg border border-black'>
                    <span className='flex items-center gap-4'>
                        <img src={icons.delivery} alt='delivery-icon' className='w-4' />
                        <span className='text-sm'>
                            Ship COD & <b>FREESHIP</b> đơn hàng từ 150k
                        </span>
                    </span>
                    <span className='flex items-center gap-4'>
                        <img src={icons.tripleStar} alt='triple-star-icon' className='w-4' />
                        <span className='text-sm'>Bền màu & thân thiện với làn da</span>
                    </span>
                    <span className='flex items-center gap-4'>
                        <img src={icons.thumbUp} alt='thumb-up-icon' className='w-4' />
                        <span className='text-sm'>Đảm bảo chính hãng hoặc hoàn tiền tới 300%</span>
                    </span>
                    <span className='flex items-center gap-4'>
                        <img src={icons.safety} alt='safety-icon' className='w-4' />
                        <span className='text-sm'>Bảo hành, đổi mới sản phẩm trong 7 ngày</span>
                    </span>
                    <span className='flex items-center gap-4'>
                        <img src={icons.star} alt='star-icon' className='w-4' />
                        <span className='text-sm'>100,000+ khách hàng hài lòng</span>
                    </span>
                </div>
            </div>
        </section>
    );
}
