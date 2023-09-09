// Components
import { Breadcrumb, ServiceSection } from '@components/client';
import { ProductDetail } from '@components/client/product';
import { Container } from '@components/shared';
import { PageTransition } from '@components/shared/animations';

export default function Product() {
    return (
        <PageTransition>
            <Container>
                <Breadcrumb title='Bông tai Victoria' />
                <ProductDetail />
            </Container>
            <ServiceSection />
        </PageTransition>
    );
}
