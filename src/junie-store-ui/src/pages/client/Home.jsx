// Components
import {
    BlogSection,
    CategorySection,
    HomeHeroSection,
    NewsLetterSection,
    ProductSection,
    ServiceSection
} from '@components/client/home';

export default function Home() {
    return (
        <>
            <HomeHeroSection />
            <CategorySection />
            <ProductSection />
            <BlogSection />
            <NewsLetterSection />
            <ServiceSection />
        </>
    );
}
