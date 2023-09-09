// Assets
import { images } from '@assets/images';

// Components
import { Button, Input } from '@components/shared';
import { CartItem } from '@components/client';

// Temp products items
const products = [
    {
        id: 1,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 2,
        name: 'Bông tai Gabi',
        slug: 'gabi',
        price: 275000,
        quantity: 2,
        image: images.productHover
    }
];

export default function CartSection() {
    return (
        <section className='flex flex-col gap-2'>
            <span className='font-semibold'>Danh sách sản phẩm</span>
            <div className='flex flex-col gap-4'>
                {products.map((product) => (
                    <CartItem key={product.id} product={product} />
                ))}
            </div>
            <div className='flex items-center gap-2 py-4'>
                <Input placeholder='Mã giảm giá' className='py-3.5' />
                <Button secondary disabled text='Áp dụng' />
            </div>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <span className='font-thin'>Sản phẩm</span>
                    <span>
                        {new Intl.NumberFormat('vi-VN').format(250000)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                </div>
                <div className='flex items-center justify-between'>
                    <span className='font-thin'>Vận chuyển</span>
                    <span>
                        {new Intl.NumberFormat('vi-VN').format(30000)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                </div>
                <div className='flex items-center justify-between text-2xl'>
                    <span className='font-semibold'>Tổng</span>
                    <span className='font-semibold'>
                        {new Intl.NumberFormat('vi-VN').format(30000)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                </div>
            </div>
        </section>
    );
}
