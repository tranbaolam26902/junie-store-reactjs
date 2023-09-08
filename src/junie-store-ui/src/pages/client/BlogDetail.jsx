// Components
import {
    BlogCommentSection,
    BlogContentSection,
    BlogHeaderSection,
    FeaturedBlogSection
} from '@components/client/blogs';

export default function BlogDetail() {
    return (
        <section>
            <BlogHeaderSection />
            <BlogContentSection />
            <FeaturedBlogSection />
            <BlogCommentSection />
        </section>
    );
}
