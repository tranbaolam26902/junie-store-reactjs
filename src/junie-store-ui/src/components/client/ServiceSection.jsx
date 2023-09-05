// Assets
import { icons } from '@assets/icons';

const services = [
    {
        id: 1,
        icon: icons.delivery,
        title: 'Miễn phí vận chuyển',
        description: 'FREESHIP đơn hàng từ 150K'
    },
    {
        id: 2,
        icon: icons.authentic,
        title: 'Đảm bảo chính hãng',
        description: 'Chính hãng hoặc hoàn tiền gấp đôi'
    },
    {
        id: 3,
        icon: icons.gift,
        title: 'Tùy chọn hộp quà',
        description: 'Hộp quà xinh xắn tặng người thương'
    },
    {
        id: 4,
        icon: icons.chat,
        title: 'Hỗ trợ nhiệt tình',
        description: 'Chat & Hotline 24/24'
    }
];

export default function ServiceSection() {
    return (
        <section className='overflow-x-auto no-scrollbar lg:mx-auto my-10 px-6 lg:max-w-screen-2xl'>
            <div className='flex gap-12 w-[280vw] md:w-[160vw] lg:w-[120vw] xl:w-full'>
                {services.map((service) => (
                    <div key={service.id} className='flex flex-col items-center justify-center gap-4 w-full'>
                        <img src={service.icon} alt={service.title} className='w-6' />
                        <span className='text-xs font-bold tracking-widest uppercase'>{service.title}</span>
                        <span>{service.description}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}
