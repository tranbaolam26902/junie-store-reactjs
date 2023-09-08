// Libraries
import { useState } from 'react';
import { Link } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

export default function CartItem({ product }) {
    // States
    const [quantity, setQuantity] = useState(product.quantity);

    // Event handlers
    const handleIncreaseQuantity = () => {
        setQuantity((quantity) => ++quantity);
    };
    const handleDecreaseQuantity = () => {
        if (quantity <= 1) return;
        setQuantity((quantity) => --quantity);
    };

    return (
        <div className='flex gap-6'>
            <Link>
                <img src={product.image} alt='product' className='w-24 rounded' />
            </Link>
            <div className='flex-1 flex flex-col gap-2'>
                <Link className='line-clamp-2' title={product.name}>
                    {product.name}
                </Link>
                <span className='font-thin max-w-[2rem]'>
                    <span>
                        {new Intl.NumberFormat('vi-VN').format(quantity > 0 ? product.price * quantity : product.price)}
                    </span>
                    <sup className='pl-0.5 underline'>đ</sup>
                </span>
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
                            onInput={(e) => {
                                if (/^[0-9]*$/.test(e.target.value)) setQuantity(e.target.value);
                            }}
                            onBlur={() => {
                                if (quantity === '' || quantity <= 0) setQuantity(1);
                            }}
                            className='pt-0.5 w-8 h-full text-sm text-center font-thin'
                        />
                        <button type='button' className='p-2.5 h-full' onClick={handleIncreaseQuantity}>
                            <img src={icons.plus} alt='plus-icon' className='w-2' />
                        </button>
                    </div>
                    <button type='button' className='text-sm'>
                        Xóa
                    </button>
                </div>
            </div>
        </div>
    );
}
