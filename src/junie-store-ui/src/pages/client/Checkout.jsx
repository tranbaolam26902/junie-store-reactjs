// Components
import { Container } from '@components/shared';
import { CartSection, OrderInfoSection } from '@components/client/checkout';

export default function Checkout() {
    return (
        <section className='relative'>
            <div className='absolute right-0 inset-y-0 -z-10 hidden md:block w-1/2 bg-gray/30 border-l border-secondary/10'></div>
            <Container className='flex flex-col gap-6 py-6'>
                <span className='text-2xl font-semibold uppercase'>Thanh toán</span>
                <div className='grid md:grid-cols-2 gap-x-16 xl:gap-x-32 gap-y-8'>
                    <OrderInfoSection />
                    <CartSection />
                    <hr className='block md:hidden text-gray' />
                </div>
            </Container>
        </section>
    );
}
