// Libraries
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// Redux
import { clearCart, selectCart } from '@redux/features/client/cart';

// Services
import { checkout } from '@services/client';

// Components
import { Button, Input } from '@components/shared';

export default function OrderInfoSection() {
    // Hooks
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // States
    const cart = useSelector(selectCart);
    const [errorMessages, setErrorMessages] = useState([]);
    const [nameMessage, setNameMessage] = useState('');
    const [addressMessage, setAddressMessage] = useState('');
    const [phoneNumberMessage, setPhoneNumberMessage] = useState('');

    // Refs
    const nameRef = useRef(null);
    const addressRef = useRef(null);
    const phoneNumberRef = useRef(null);
    const notesRef = useRef(null);

    // Functions
    const validateName = () => {
        if (nameRef.current.value.trim() === '') {
            setNameMessage('Vui lòng nhập tên.');
            return false;
        }
        return true;
    };
    const validateAddress = () => {
        if (addressRef.current.value.trim() === '') {
            setAddressMessage('Vui lòng nhập địa chỉ.');
            return false;
        }
        return true;
    };
    const validatePhoneNumber = () => {
        if (phoneNumberRef.current.value.trim() === '') {
            setPhoneNumberMessage('Vui lòng nhập số điện thoại');
            return false;
        }
        if (phoneNumberRef.current.value.trim().length !== 10 || !phoneNumberRef.current.value.match(/^[0-9]+$/)) {
            setPhoneNumberMessage('Số điện thoại không đúng. Vui lòng kiểm trả lại.');
            return false;
        }
        return true;
    };
    const validateOrderInfo = () => {
        validateName();
        validateAddress();
        validatePhoneNumber();
        if (!validateName() || !validateAddress || !validatePhoneNumber()) return false;

        return true;
    };
    const getOrderInfo = () => {
        return {
            name: nameRef.current.value.trim(),
            shipAddress: addressRef.current.value.trim(),
            phone: phoneNumberRef.current.value.trim(),
            note: notesRef.current.value.trim() || '',
            detail: cart.products.map((product) => ({ id: product.id, quantity: product.cartQuantity }))
        };
    };

    // Event handlers
    const handleCheckout = async (e) => {
        e.preventDefault();
        if (!validateOrderInfo()) return;

        const result = await checkout(getOrderInfo());
        if (result.isSuccess) {
            setErrorMessages([]);
            window.alert('Đặt hàng thành công!');
            dispatch(clearCart());
            navigate('/account');
        } else setErrorMessages(result.errors);
    };

    return (
        <section className='flex flex-col gap-4 order-last md:order-none'>
            <form className='flex flex-col gap-3' onSubmit={handleCheckout}>
                {errorMessages.map((errorMessage, index) => (
                    <span key={index} className='text-sm text-red'>
                        {errorMessage}
                    </span>
                ))}
                <span className='font-semibold'>Thông tin đơn hàng</span>
                <Input
                    ref={nameRef}
                    label='Họ và tên'
                    id='name'
                    message={nameMessage}
                    onChange={() => {
                        setNameMessage('');
                    }}
                    onBlur={validateName}
                />
                <Input
                    ref={addressRef}
                    label='Địa chỉ giao hàng'
                    id='address'
                    message={addressMessage}
                    onChange={() => {
                        setAddressMessage('');
                    }}
                    onBlur={validateAddress}
                />
                <Input
                    ref={phoneNumberRef}
                    label='Số điện thoại'
                    id='phone-number'
                    message={phoneNumberMessage}
                    onChange={() => {
                        setPhoneNumberMessage('');
                    }}
                    onBlur={validatePhoneNumber}
                />
                <div className='flex flex-col'>
                    <label htmlFor='notes' className='flex gap-1 text-sm w-fit cursor-pointer select-none'>
                        <span>Ghi chú</span>
                        <span className='text-sm text-secondary/50 italic'>(không bắt buộc)</span>
                    </label>
                    <textarea
                        ref={notesRef}
                        id='notes'
                        rows={4}
                        className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black cursor-pointer'
                    />
                </div>
                <Button
                    submit
                    secondary
                    disabled={cart.products.length === 0}
                    text='Thanh toán'
                    className='ml-auto mt-4 px-8 md:w-fit'
                />
            </form>
        </section>
    );
}
