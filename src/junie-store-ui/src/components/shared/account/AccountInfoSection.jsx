// Libraries
import { useRef, useState } from 'react';

// Assets
import { icons } from '@assets/icons';

// Components
import Button from '@components/shared/Button';

export default function AccountInfoSection() {
    // States
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);

    // Refs
    const nameRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Event handlers
    const handleEditName = () => {
        setIsEditName(true);
        nameRef.current.focus();
        nameRef.current.select();
    };
    const handleSaveEditName = () => {
        setIsEditName(false);
    };
    const handleCancelEditName = () => {
        setIsEditName(false);
    };
    const handleEditPassword = () => {
        setIsEditPassword(true);
    };
    const handleSaveEditPassword = () => {
        setIsEditPassword(false);
    };
    const handleCancelEditPassword = () => {
        setIsEditPassword(false);
    };

    return (
        <section className='flex flex-col gap-4'>
            {/* Start: Header section */}
            <div className='flex items-center gap-2'>
                <img src={icons.user} alt='user-icon' className='w-4' />
                <span className='font-semibold'>Hồ sơ</span>
            </div>
            {/* End: Header section */}

            <div className='flex flex-col gap-2 p-8 bg-primary rounded-lg shadow-md'>
                {/* Start: Name section */}
                <div className='flex flex-col'>
                    <span className='font-thin text-secondary/80'>Tên</span>
                    <div className='flex items-center gap-4'>
                        <div className='relative flex-1'>
                            <input
                                ref={nameRef}
                                type='text'
                                defaultValue={'Campbells'}
                                tabIndex={-1}
                                title={'Campbells'}
                                className={`w-full truncate transition duration-200${
                                    isEditName
                                        ? ' px-4 py-2 bg-primary rounded-sm outline outline-2 -outline-offset-2 outline-gray focus:outline-black'
                                        : ''
                                }`}
                            />
                            {!isEditName && <span className='absolute inset-0'></span>}
                        </div>
                        {!isEditName && !isEditPassword && (
                            <button type='button' title='Đổi tên' onClick={handleEditName}>
                                <img src={icons.edit} alt='edit-icon' className='w-4' />
                            </button>
                        )}
                    </div>
                </div>
                {/* End: Name section */}

                {/* Start: Password section */}
                {!isEditPassword ? (
                    <div className='flex flex-col'>
                        <span className='font-thin text-secondary/80'>Mật khẩu</span>
                        <div className='flex items-center gap-4'>
                            <span className='flex-1'>********</span>
                            {!isEditName && !isEditPassword && (
                                <button type='button' title='Đổi mật khẩu' onClick={handleEditPassword}>
                                    <img src={icons.edit} alt='edit-icon' className='w-4' />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='current-password' className='font-thin text-secondary/80 cursor-pointer'>
                                Mật khẩu hiện tại
                            </label>
                            <input
                                ref={currentPasswordRef}
                                id='current-password'
                                type='password'
                                className='px-4 py-2 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                                autoFocus
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='new-password' className='font-thin text-secondary/80 cursor-pointer'>
                                Mật khẩu mới
                            </label>
                            <input
                                ref={newPasswordRef}
                                id='new-password'
                                type='password'
                                className='px-4 py-2 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <label htmlFor='confirm-password' className='font-thin text-secondary/80 cursor-pointer'>
                                Xác nhận mật khẩu mới
                            </label>
                            <input
                                ref={confirmPasswordRef}
                                id='confirm-password'
                                type='password'
                                className='px-4 py-2 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                            />
                        </div>
                    </div>
                )}
                {/* End: Password section */}

                {/* Start: Email section */}
                <div className='flex flex-col'>
                    <span className='font-thin text-secondary/80'>Email</span>
                    <span>example@gmail.com</span>
                </div>
                {/* End: Email section */}

                {/* Start: Button sections */}
                {(isEditName || isEditPassword) && (
                    <div className='text-end'>
                        <div className='inline-grid grid-cols-2 gap-4'>
                            <Button
                                outline
                                text='Hủy'
                                onClick={isEditName ? handleCancelEditName : handleCancelEditPassword}
                            />
                            <Button
                                secondary
                                text='Lưu'
                                className='px-8'
                                onClick={isEditName ? handleSaveEditName : handleSaveEditPassword}
                            />
                        </div>
                    </div>
                )}
                {/* End: Button sections */}
            </div>
        </section>
    );
}
