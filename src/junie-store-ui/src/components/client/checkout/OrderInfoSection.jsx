// Components
import { Button, Input } from '@components/shared';

export default function OrderInfoSection() {
    return (
        <section className='flex flex-col gap-4 order-last md:order-none'>
            <div className='flex flex-col gap-2'>
                <span className='font-semibold'>Thông tin đơn hàng</span>
                <div className='flex flex-col'>
                    <span className='text-sm w-fit cursor-pointer select-none'>Địa chỉ đã lưu</span>
                    <select className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black cursor-pointer'>
                        <option>1 Phù Đổng Thiên Vương, Phường 8, Thành phố Đà Lạt (Campbells)</option>
                        <option>Sử dụng địa chỉ mới</option>
                    </select>
                </div>
                <Input label='Họ và tên' id='name' optional />
                <Input label='Địa chỉ giao hàng' id='address' />
                <Input label='Số điện thoại' id='phone-number' />
                <div className='flex flex-col'>
                    <label htmlFor='notes' className='flex gap-1 text-sm w-fit cursor-pointer select-none'>
                        <span>Ghi chú</span>
                        <span className='text-sm text-secondary/50 italic'>(không bắt buộc)</span>
                    </label>
                    <textarea
                        id='notes'
                        rows={4}
                        className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black cursor-pointer'
                    />
                </div>
                <Button secondary text='Thanh toán' className='ml-auto mt-4 px-8 md:w-fit' />
            </div>
        </section>
    );
}
