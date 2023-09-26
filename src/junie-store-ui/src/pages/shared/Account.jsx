// Components
import { Container } from '@components/shared';
import { PageTransition } from '@components/shared/animations';
import { AccountInfoSection, OrderSection } from '@components/shared/account';

export default function Account() {
    return (
        <PageTransition className='bg-gray/40'>
            <Container className='flex flex-col gap-4 py-6'>
                <span className='font-semibold text-2xl'>Tài khoản</span>
                <div className='grid lg:grid-cols-12 gap-8'>
                    <AccountInfoSection />
                    <OrderSection />
                </div>
            </Container>
        </PageTransition>
    );
}
