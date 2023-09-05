// Components
import { Breadcrumb, ServiceSection } from '@components/client';
import { ProductDetail } from '@components/client/product';
import { Container } from '@components/shared';

export default function Product() {
    return (
        <>
            <Container>
                <Breadcrumb title='Bông tai Victoria' />
                <ProductDetail />
            </Container>
            <ServiceSection />
        </>
    );
}
