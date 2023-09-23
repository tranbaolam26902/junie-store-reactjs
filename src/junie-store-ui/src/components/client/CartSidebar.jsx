// Libraries
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import { icons } from '@assets/icons';

// Redux
import { selectHeader, setHideCartSidebar } from '@redux/features/client/header';

// Components
import { Button, SidebarModal } from '@components/shared';

export default function CartSidebar() {
    // Hooks
    const dispatch = useDispatch();

    // States
    const header = useSelector(selectHeader);
    const [products, setProducts] = useState([]);

    // Event handlers
    const handleHideCartSidebar = () => {
        dispatch(setHideCartSidebar());
    };

    return (
        <SidebarModal right show={header.showCartSidebar} onHide={handleHideCartSidebar}>
            <div className='flex flex-col h-full'>
                <section className='flex items-center gap-4 px-6 py-4 border-b border-gray'>
                    <img src={icons.cart} alt='cart-icon' className='w-5' />
                    <span className='flex-1'>{products.length !== 0 ? products.length + ' sản phẩm' : 'Giỏ hàng'}</span>
                    <button type='button' className='-m-2 p-2'>
                        <img src={icons.close} alt='close-icon' className='w-4' onClick={handleHideCartSidebar} />
                    </button>
                </section>
                <section className='flex-1 overflow-y-auto'>
                    {products.length === 0 ? (
                        <div className='flex flex-col items-center justify-center gap-8 h-full font-thin'>
                            <span>Giỏ hàng của bạn đang trống</span>
                            <Button
                                to='/categories/moi'
                                secondary
                                text='Bắt đầu mua sắm'
                                className='px-12'
                                onClick={handleHideCartSidebar}
                            />
                        </div>
                    ) : (
                        <div className='flex flex-col gap-4 p-6'>
                            {/* products.map((product) => (
                                    <CartItem key={product.id} product={product} />
                                )) */}
                        </div>
                    )}
                </section>
                {products.length > 0 && (
                    <section className='relative px-6 py-4 border-t border-gray'>
                        <Button
                            to='/checkout'
                            text={
                                <div className='flex items-center justify-center gap-3'>
                                    <span className='text-sm font-semibold uppercase'>Thanh toán</span>
                                    <span className='mb-1 w-1 h-1 bg-primary'></span>
                                    <span className='flex gap-1'>
                                        <span className='text-sm font-semibold uppercase'>
                                            {new Intl.NumberFormat('vi-VN').format(
                                                products.reduce((acc, curr) => acc + curr.price * curr.quantity, 0)
                                            )}
                                        </span>
                                        <span className='text-sm font-semibol uppercase'>VND</span>
                                    </span>
                                </div>
                            }
                            secondary
                            full
                            onClick={handleHideCartSidebar}
                        />
                    </section>
                )}
            </div>
        </SidebarModal>
    );
}
