// Components
import { BlogSection, CategorySection, HomeHeroSection, ProductSection } from '@components/client/home';

export default function Home() {
    return (
        <>
            <HomeHeroSection />
            <CategorySection />
            <ProductSection />
            <BlogSection />
        </>
    );
}
