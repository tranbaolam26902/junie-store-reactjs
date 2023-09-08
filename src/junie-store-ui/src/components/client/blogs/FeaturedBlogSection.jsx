// Assets
import { images } from '@assets/images';

// Components
import BlogItem from './BlogItem';

// Temp blogs
const blogs = [
    {
        id: 1,
        image: images.blog1,
        slug: 'blog-1',
        title: 'Giá dây chuyền vàng tây nữ có đắt không? Bao nhiêu tiền một chỉ?'
    },
    {
        id: 2,
        image: images.blog2,
        slug: 'blog-2',
        title: 'Top 5 Cửa hàng bán Dây Chuyền Vàng Trắng nữ Hà Nội uy tín và chất lượng'
    }
];

export default function FeaturedBlogSection() {
    return (
        <section className='bg-gray/50'>
            <div className='flex flex-col gap-8 mx-auto px-6 lg:max-w-screen-md py-8 lg:py-16'>
                <span className='font-garamond text-3xl text-center'>Tiếp tục đọc</span>
                <div className='flex gap-4 lg:gap-12'>
                    {blogs.map((blog) => (
                        <BlogItem key={blog.id} blog={blog} />
                    ))}
                </div>
            </div>
            ;
        </section>
    );
}
