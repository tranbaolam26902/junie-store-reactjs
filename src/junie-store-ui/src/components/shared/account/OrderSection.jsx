// Components
import Button from '@components/shared/Button';

export default function OrderSection() {
    return (
        <section className='flex flex-col gap-4'>
            <div className='flex items-center justify-between'>
                <span className='font-semibold'>Đơn hàng</span>
            </div>
            <div className='flex flex-col items-center gap-2 p-8 bg-primary rounded-lg shadow-md'>
                <span className='font-semibold'>Chưa có đơn hàng nào</span>
                <Button to='/' secondary text='Bắt đầu mua sắm' className='w-fit' />
            </div>
        </section>
    );
}
