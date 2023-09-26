// Libraries
import { useSelector } from 'react-redux';

// Redux
import { selectCart } from '@redux/features/client/cart';

// Components
import { CartItem } from '@components/client';
import { Button, Input } from '@components/shared';

export default function CartSection() {
    // States
    const cart = useSelector(selectCart);

    return (
        <section className='flex flex-col gap-2'>
            <span className='font-semibold'>Danh sách sản phẩm</span>
            <div className='flex flex-col gap-4'>
                {cart.products.map((product) => (
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
                        {new Intl.NumberFormat('vi-VN').format(
                            cart.products.reduce(
                                (acc, curr) =>
                                    acc +
                                    (curr.discount
                                        ? (curr.price - (curr.price * curr.discount) / 100) * curr.cartQuantity
                                        : curr.price * curr.cartQuantity),
                                0
                            )
                        )}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                </div>
                <div className='flex items-center justify-between text-2xl'>
                    <span className='font-semibold'>Tổng</span>
                    <span className='font-semibold'>
                        {new Intl.NumberFormat('vi-VN').format(
                            cart.products.reduce(
                                (acc, curr) =>
                                    acc +
                                    (curr.discount
                                        ? (curr.price - (curr.price * curr.discount) / 100) * curr.cartQuantity
                                        : curr.price * curr.cartQuantity),
                                0
                            )
                        )}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                </div>
            </div>
        </section>
    );
}
