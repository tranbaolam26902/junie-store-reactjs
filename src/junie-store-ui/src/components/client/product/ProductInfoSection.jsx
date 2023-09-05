// Assets
import { icons } from '@assets/icons';

// Components
import { Button } from '@components/shared';

export default function ProductInfoSection() {
    return (
        <section className='flex flex-col'>
            <div className='flex flex-col gap-4 py-6'>
                <h1 className='font-garamond text-2xl lg:text-4xl'>Bông tai Victoria</h1>
                <div className='flex gap-0.5'>
                    <span className='text-2xl font-thin'>{new Intl.NumberFormat('vi-VN').format(125000)}</span>
                    <span className='underline font-thin'>đ</span>
                </div>
                <span className='text-xs uppercase tracking-wider text-secondary/50'>SKU: E-VICTORIA-S</span>
            </div>
            <hr className='my-0 text-gray' />
            <div className='flex flex-col gap-6 pt-6'>
                <div className='flex flex-col gap-4'>
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
                </div>
                <Button secondary full text='Thêm vào giỏ' />
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
