// Components
import { ServiceSection } from '@components/client';
import {
    BlogSection,
    CategorySection,
    HomeHeroSection,
    NewsLetterSection,
    ProductSection
} from '@components/client/home';
import { PageTransition } from '@components/shared/animations';

export default function Home() {
    return (
        <PageTransition>
            <HomeHeroSection />
            <CategorySection />
            <ProductSection />
            <BlogSection />
            <NewsLetterSection />
            <ServiceSection />
        </PageTransition>
    );
}
