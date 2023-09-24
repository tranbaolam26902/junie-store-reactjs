// Libraries
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Redux
import { removeProductFromCart, setProductQuantity } from '@redux/features/client/cart';
import { setHideCartSidebar } from '@redux/features/client/header';

export default function CartItem({ product }) {
    // Hooks
    const dispatch = useDispatch();

    // States
    const [quantity, setQuantity] = useState(product.cartQuantity);

    // Event handlers
    const handleIncreaseQuantity = () => {
        setQuantity((quantity) => ++quantity);
    };
    const handleDecreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity((quantity) => --quantity);
    };
    const handleHideCartSidebar = () => {
        dispatch(setHideCartSidebar());
    };
    const handleRemoveProductFromCart = () => {
        dispatch(removeProductFromCart(product.id));
    };

    // Side effects
    /* Bind component's quantity with cartItem's quantity in redux state */
    useEffect(() => {
        dispatch(setProductQuantity({ id: product.id, quantity }));
        // eslint-disable-next-line
    }, [quantity]);

    return (
        <div className='flex gap-6'>
            <Link to={`/products/${product.urlSlug}`} onClick={handleHideCartSidebar}>
                <img
                    src={
                        product.pictures.length !== 0
                            ? `${import.meta.env.VITE_API_ENDPOINT}/${product.pictures[0].path}`
                            : images.placeholder
                    }
                    alt='product'
                    className='w-24 h-full aspect-[3/4] object-cover rounded'
                />
            </Link>
            <div className='flex-1 flex flex-col gap-2'>
                <Link
                    to={`/products/${product.urlSlug}`}
                    title={product.name}
                    className='line-clamp-2'
                    onClick={handleHideCartSidebar}
                >
                    {product.name}
                </Link>
                {product.discount !== 0 ? (
                    <div className='flex gap-2'>
                        <span className='font-thin text-red'>
                            {new Intl.NumberFormat('vi-VN').format(
                                (product.price - (product.price * product.discount) / 100) * quantity
                            )}
                            <sup className='pl-0.5 underline'>đ</sup>
                        </span>
                        <span className='font-thin text-secondary/70 line-through'>
                            {new Intl.NumberFormat('vi-VN').format(product.price * quantity)}
                            <sup className='pl-0.5 underline'>đ</sup>
                        </span>
                    </div>
                ) : (
                    <span className='font-thin'>
                        {new Intl.NumberFormat('vi-VN').format(product.price * quantity)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                )}
                <div className='flex items-center gap-4'>
                    <div className='flex items-center h-full bg-primary rounded-sm border border-gray'>
                        <button
                            type='button'
                            className={`p-2.5 h-full${quantity <= 1 ? ' opacity-30' : ''}`}
                            disabled={quantity <= 1}
                            onClick={handleDecreaseQuantity}
                        >
                            <img src={icons.minus} alt='minus-icon' className='w-2' />
                        </button>
                        <input
                            type='number'
                            value={quantity}
                            className='pt-0.5 w-8 h-full text-sm text-center font-thin'
                            onInput={(e) => {
                                if (/^[0-9]*$/.test(e.target.value)) setQuantity(Number.parseInt(e.target.value));
                            }}
                            onBlur={() => {
                                if (quantity === '' || quantity <= 0) setQuantity(1);
                            }}
                            onKeyUp={(e) => {
                                if (e.key !== 'Enter') return;

                                e.target.blur();
                            }}
                        />
                        <button type='button' className='p-2.5 h-full' onClick={handleIncreaseQuantity}>
                            <img src={icons.plus} alt='plus-icon' className='w-2' />
                        </button>
                    </div>
                    <button type='button' className='text-sm' onClick={handleRemoveProductFromCart}>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}
