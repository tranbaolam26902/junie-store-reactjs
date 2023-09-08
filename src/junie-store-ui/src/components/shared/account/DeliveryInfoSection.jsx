// Libraries
import { useState } from 'react';

// Assets
import { icons } from '@assets/icons';

// Components
import DeliveryInfoModal from './DeliveryInfoModal';

export default function DeliveryInfoSection() {
    // States
    const [showDeliveryInfoModal, setShowDeliveryInfoModal] = useState(false);

    // Event handlers
    const handleShowDeliveryInfoModal = () => {
        setShowDeliveryInfoModal(true);
    };
    const handleHideDeliveryInfoModal = () => {
        setShowDeliveryInfoModal(false);
    };

    return (
        <>
            <section className='flex flex-col gap-2'>
                <div className='flex items-center justify-between'>
                    <span className='font-semibold'>Địa chỉ giao hàng</span>
                    <div type='button' className='flex items-center gap-1'>
                        <img src={icons.plus} alt='plus-icon' className='w-2' />
                        <button
                            type='button'
                            className='pt-1 text-sm font-semibold'
                            onClick={handleShowDeliveryInfoModal}
                        >
                            Thêm
                        </button>
                    </div>
                </div>

                <div className='flex flex-col gap-2 p-8 bg-primary rounded-lg shadow-md'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-1'>
                            <span className='text-sm font-semibold'>Địa chỉ 1</span>
                            <span className='text-sm italic text-secondary/70'>(Mặc định)</span>
                        </div>
                        <button type='button' title='Chỉnh sửa' onClick={handleShowDeliveryInfoModal}>
                            <img src={icons.edit} alt='edit-icon' className='w-4' />
                        </button>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col'>
                            <span className='font-thin text-secondary/80'>Họ và tên</span>
                            <span>Campbells</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-thin text-secondary/80'>Số điện thoại</span>
                            <span>0792815452</span>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-thin text-secondary/80'>Địa chỉ</span>
                        <span>1 Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt</span>
                    </div>
                </div>
                <div className='flex flex-col gap-2 p-8 bg-primary rounded-lg shadow-md'>
                    <div className='flex items-center justify-between'>
                        <div className='flex gap-1'>
                            <span className='text-sm font-semibold'>Địa chỉ 2</span>
                        </div>
                        <button type='button'>
                            <img src={icons.edit} alt='edit-icon' className='w-4' />
                        </button>
                    </div>
                    <div className='grid grid-cols-2 gap-4'>
                        <div className='flex flex-col'>
                            <span className='font-thin text-secondary/80'>Họ và tên</span>
                            <span>Campbells</span>
                        </div>
                        <div className='flex flex-col'>
                            <span className='font-thin text-secondary/80'>Số điện thoại</span>
                            <span>0792815452</span>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                        <span className='font-thin text-secondary/80'>Địa chỉ</span>
                        <span>1 Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt</span>
                    </div>
                </div>
            </section>
            <DeliveryInfoModal show={showDeliveryInfoModal} onHide={handleHideDeliveryInfoModal} />
        </>
    );
}
