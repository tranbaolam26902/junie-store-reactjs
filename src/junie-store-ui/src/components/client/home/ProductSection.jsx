// Libraries
import { useLoaderData } from 'react-router-dom';

// Components
import { Button, Container } from '@components/shared';
import { ProductItem, Title } from '@components/client';

export default function ProductSection() {
    // Hooks
    const { bestSellingProducts } = useLoaderData();

    return (
        <>
            <Title subtitle='Không thể bỏ qua' title='Khám phá Junie' />
            <Container className='flex flex-col items-center gap-12'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-6 gap-y-8 xl:gap-y-12'>
                    {bestSellingProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
                <Button to='/categories/moi' text='Xem thêm' secondary />
            </Container>
        </>
    );
}
