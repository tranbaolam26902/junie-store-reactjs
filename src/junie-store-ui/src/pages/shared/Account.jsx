// Components
import { AccountInfoSection, DeliveryInfoSection, OrderSection } from '@components/shared/account';
import { PageTransition } from '@components/shared/animations';

export default function Account() {
    return (
        <PageTransition>
            <div className='flex flex-col gap-4 mx-auto p-6 md:py-16 max-w-screen-lg'>
                <span className='font-semibold text-2xl'>Thông tin tài khoản</span>
                <div className='grid md:grid-cols-2 gap-8'>
                    <AccountInfoSection />
                    <DeliveryInfoSection />
                </div>
                <OrderSection />
            </div>
        </PageTransition>
    );
}
