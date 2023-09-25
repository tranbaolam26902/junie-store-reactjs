// Components
import { Button } from '@components/shared';
import OrderProductItem from './OrderProductItem';

export default function OrderItem({ order }) {
    return (
        <div className='flex flex-col gap-4 p-8 bg-primary rounded-lg shadow-md'>
            <div className='flex items-center justify-between flex-wrap gap-y-2'>
                <div className='flex items-center gap-2'>
                    <span className='font-thin uppercase'>MÃ ĐƠN HÀNG:</span>
                    <span className='pt-0.5 font-semibold'>{order.codeOrder}</span>
                </div>
                <div className='flex items-center gap-x-4 gap-y-2 flex-wrap'>
                    <div className='flex items-center gap-1'>
                        <span className='font-thin text-secondary/80'>Ngày đặt:</span>
                        <span className='pt-0.5'>
                            {new Date(order.orderDate).toLocaleString('vi-vn', {
                                timeStyle: 'short',
                                dateStyle: 'short'
                            })}
                        </span>
                    </div>
                    <div className='flex items-center gap-1'>
                        <span className='font-thin text-secondary/80'>Trạng thái:</span>
                        <span className='pt-0.5'>{order.status === 0 ? 'Chờ xác nhận' : ''}</span>
                    </div>
                </div>
            </div>
            <hr className='text-gray' />
            <div className='flex flex-col gap-2'>
                <div className='flex flex-col lg:grid lg:grid-cols-6 gap-x-4 gap-y-2'>
                    <div className='col-span-1 flex flex-col'>
                        <span className='font-thin text-secondary/80'>Họ và tên</span>
                        <span>{order.name}</span>
                    </div>
                    <div className='col-span-1 flex flex-col'>
                        <span className='font-thin text-secondary/80'>Số điện thoại</span>
                        <span>{order.phone}</span>
                    </div>
                    <div className='col-span-4 flex flex-col'>
                        <span className='font-thin text-secondary/80'>Địa chỉ</span>
                        <span>{order.shipAddress}</span>
                    </div>
                </div>
                {order.note && (
                    <div className='flex flex-col'>
                        <span className='font-thin text-secondary/80'>Ghi chú:</span>
                        <span>{order.note}</span>
                    </div>
                )}
            </div>
            <hr className='text-gray' />
            <div className='flex flex-col gap-2'>
                {order.details.map((product) => (
                    <OrderProductItem key={product.productId} product={product} />
                ))}
                <div className='flex items-center justify-end gap-2'>
                    <span>Tổng:</span>
                    <span className='text-xl text-red'>
                        {new Intl.NumberFormat('vi-vn').format(order.total)}
                        <sup className='pl-0.5 underline'>đ</sup>
                    </span>
                </div>
                {order.status === 0 && <Button outline text='Hủy đơn hàng' className='ml-auto w-fit' />}
            </div>
        </div>
    );
}
