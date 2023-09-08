// Libraries
import { useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

// Assets
import { icons } from '@assets/icons';

// Components
import { Button, Input } from '@components/shared';
import { Fade } from '@components/shared/animations';

export default function DeliveryInfoModal({ show, onHide }) {
    // Side effects
    useEffect(() => {
        document.body.style.overflow = show ? 'hidden' : ''; // Hide scrollbar when show modal
    }, [show]);

    return (
        <section>
            <AnimatePresence>
                {show && (
                    <Fade className='fixed inset-0 z-20 flex items-center justify-center'>
                        <div className='absolute inset-0 bg-black/30 cursor-pointer' onClick={onHide}></div>
                        <div className='relative z-10 mx-6 p-6 flex flex-col gap-4 w-[52.5rem] max-w-full rounded-lg bg-primary shadow-md'>
                            <div className='flex items-center justify-between'>
                                <span className='font-semibold text-xl'>Thêm địa chỉ</span>
                                <button type='button' className='-mx-2 p-2' onClick={onHide}>
                                    <img src={icons.close} alt='close-icon' className='w-4' />
                                </button>
                            </div>
                            <div className='flex gap-1'>
                                <input type='checkbox' id='default' />
                                <label htmlFor='default' className='pt-[0.1875rem]'>
                                    Đây là địa chỉ mặc định của tôi
                                </label>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex gap-4'>
                                    <Input placeholder='Tên' />
                                    <Input placeholder='Số điện thoại' />
                                </div>
                                <Input placeholder='Địa chỉ' />
                            </div>
                            <div className='text-end'>
                                <div className='inline-grid grid-cols-2 gap-4'>
                                    <Button outline text='Hủy' onClick={onHide} />
                                    <Button secondary text='Lưu' className='px-8' onClick={onHide} />
                                </div>
                            </div>
                        </div>
                    </Fade>
                )}
            </AnimatePresence>
        </section>
    );
}
