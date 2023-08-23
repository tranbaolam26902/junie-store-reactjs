// Components
import {
    BlogSection,
    CategorySection,
    HomeHeroSection,
    NewsLetterSection,
    ProductSection
} from '@components/client/home';

export default function Home() {
    return (
        <>
            <HomeHeroSection />
            <CategorySection />
            <ProductSection />
            <BlogSection />
            <NewsLetterSection />
        </>
    );
}
