// Assets
import { images } from '@assets/images';

// Components
import { Button, Container } from '@components/shared';
import { ProductItem, Title } from '@components/client';

// Temp products
const products = [
    {
        id: 1,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    },
    {
        id: 2,
        slug: 'product',
        image: images.productHover,
        imageHover: images.product,
        name: 'Product',
        price: 125000
    },
    {
        id: 3,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    },
    {
        id: 4,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    },
    {
        id: 5,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    },
    {
        id: 6,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    },
    {
        id: 7,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    },
    {
        id: 8,
        slug: 'product',
        image: images.product,
        imageHover: images.productHover,
        name: 'Product',
        price: 125000
    }
];

export default function ProductSection() {
    return (
        <>
            <Title subtitle='Không thể bỏ qua' title='Khám phá Junie' />
            <Container className='flex flex-col items-center gap-12'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-2 md:gap-x-6 gap-y-8 xl:gap-y-12'>
                    {products.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))}
                </div>
                <Button text='Xem thêm' secondary />
            </Container>
        </>
    );
}
