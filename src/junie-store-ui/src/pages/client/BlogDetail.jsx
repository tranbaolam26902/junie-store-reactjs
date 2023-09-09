// Components
import {
    BlogCommentSection,
    BlogContentSection,
    BlogHeaderSection,
    FeaturedBlogSection
} from '@components/client/blogs';
import { PageTransition } from '@components/shared/animations';

export default function BlogDetail() {
    return (
        <PageTransition>
            <BlogHeaderSection />
            <BlogContentSection />
            <FeaturedBlogSection />
            <BlogCommentSection />
        </PageTransition>
    );
}
