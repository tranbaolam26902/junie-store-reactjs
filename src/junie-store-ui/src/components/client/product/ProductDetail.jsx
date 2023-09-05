import FeaturedProductSection from './FeaturedProductSection';
import ProductDescriptionSection from './ProductDescriptionSection';
import ProductImageSection from './ProductImageSection';
import ProductInfoSection from './ProductInfoSection';

export default function ProductDetail() {
    return (
        <section>
            <section className='grid lg:grid-cols-2 gap-x-10 xl:gap-x-20'>
                <ProductImageSection />
                <ProductInfoSection />
            </section>
            <ProductDescriptionSection />
            <FeaturedProductSection />
        </section>
    );
}
