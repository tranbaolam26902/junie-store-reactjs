// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

// Components
import Title from './Title';

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
    },
    {
        id: 3,
        image: images.blog3,
        slug: 'blog-3',
        title: 'Dây chuyền vàng ta nữ 2 chỉ - Điểm nhấn tôn vinh vẻ đẹp tự nhiên'
    }
];

export default function BlogSection() {
    return (
        <>
            <Title subtitle='Bắt kịp xu hướng' title="Junie's Blog" />
            <section className='overflow-x-auto no-scrollbar lg:mx-auto px-6 lg:max-w-screen-2xl'>
                <div className='flex gap-12 w-[240vw] md:w-[160vw] lg:w-[120vw] xl:w-full'>
                    {blogs.map((blog) => (
                        <Link
                            key={blog.id}
                            to={`/blogs/${blog.slug}`}
                            className='flex flex-col gap-6 w-full rounded group'
                        >
                            <div className='overflow-hidden'>
                                <img
                                    src={blog.image}
                                    alt={blog.slug}
                                    className='transition duration-500 group-hover:scale-105'
                                />
                            </div>
                            <span className='font-garamond text-2xl lg:text-3xl line-clamp-2'>{blog.title}</span>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
