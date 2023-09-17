// Libraries
import { useLoaderData } from 'react-router-dom';

// Components
import { Breadcrumb, ServiceSection } from '@components/client';
import { ProductDetail } from '@components/client/product';
import { Container } from '@components/shared';
import { PageTransition } from '@components/shared/animations';

export default function Product() {
    // Hooks
    const { product } = useLoaderData();

    return (
        <PageTransition>
            <Container>
                <Breadcrumb title={product.name} />
                <ProductDetail />
            </Container>
            <ServiceSection />
        </PageTransition>
    );
}
