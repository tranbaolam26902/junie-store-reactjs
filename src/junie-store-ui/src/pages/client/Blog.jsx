// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

// Components
import { Breadcrumb } from '@components/client';
import { Container, Pager } from '@components/shared';
import { Underline } from '@components/shared/animations';

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
    },
    {
        id: 4,
        image: images.blog1,
        slug: 'blog-1',
        title: 'Giá dây chuyền vàng tây nữ có đắt không? Bao nhiêu tiền một chỉ?'
    },
    {
        id: 5,
        image: images.blog2,
        slug: 'blog-2',
        title: 'Top 5 Cửa hàng bán Dây Chuyền Vàng Trắng nữ Hà Nội uy tín và chất lượng'
    },
    {
        id: 6,
        image: images.blog3,
        slug: 'blog-3',
        title: 'Dây chuyền vàng ta nữ 2 chỉ - Điểm nhấn tôn vinh vẻ đẹp tự nhiên'
    },
    {
        id: 7,
        image: images.blog1,
        slug: 'blog-1',
        title: 'Giá dây chuyền vàng tây nữ có đắt không? Bao nhiêu tiền một chỉ?'
    },
    {
        id: 8,
        image: images.blog2,
        slug: 'blog-2',
        title: 'Top 5 Cửa hàng bán Dây Chuyền Vàng Trắng nữ Hà Nội uy tín và chất lượng'
    },
    {
        id: 9,
        image: images.blog3,
        slug: 'blog-3',
        title: 'Dây chuyền vàng ta nữ 2 chỉ - Điểm nhấn tôn vinh vẻ đẹp tự nhiên'
    },
    {
        id: 10,
        image: images.blog1,
        slug: 'blog-1',
        title: 'Giá dây chuyền vàng tây nữ có đắt không? Bao nhiêu tiền một chỉ?'
    },
    {
        id: 11,
        image: images.blog2,
        slug: 'blog-2',
        title: 'Top 5 Cửa hàng bán Dây Chuyền Vàng Trắng nữ Hà Nội uy tín và chất lượng'
    },
    {
        id: 12,
        image: images.blog3,
        slug: 'blog-3',
        title: 'Dây chuyền vàng ta nữ 2 chỉ - Điểm nhấn tôn vinh vẻ đẹp tự nhiên'
    }
];

export default function Blog() {
    return (
        <Container className='flex flex-col gap-8 pb-8'>
            <Breadcrumb title='Beautiful Blog' />
            <h1 className='mb-12 md:mb-14 xl:mb-16 font-garamond text-4xl md:text-5xl xl:text-6xl text-center'>
                Beautiful Blog
            </h1>
            <div className='relative'>
                <span className='absolute top-1 left-0 bottom-1 z-10 w-6 bg-gradient-to-r from-primary to-transparent'></span>
                <span className='absolute top-1 right-0 bottom-1 z-10 w-6 bg-gradient-to-l from-primary to-transparent'></span>
                <div className='overflow-x-auto no-scrollbar'>
                    <div className='flex items-center gap-8 px-4 py-8 min-w-max border-y border-gray'>
                        <Link className='relative group font-semibold'>
                            <span>Tất cả bài viết</span>
                            <Underline />
                        </Link>
                        <Link className='relative group'>
                            <span>Hướng dẫn</span>
                            <Underline />
                        </Link>
                        <Link className='relative group'>
                            <span>Kiến thức</span>
                            <Underline />
                        </Link>
                    </div>
                </div>
            </div>
            <div className='grid lg:grid-cols-2 xl:grid-cols-3 gap-12'>
                {blogs.map((blog) => (
                    <div key={blog.id} className='flex flex-col gap-2 w-full rounded group'>
                        <Link to={`/blogs/${blog.slug}`} className='overflow-hidden'>
                            <img
                                src={blog.image}
                                alt={blog.slug}
                                className='transition duration-500 group-hover:scale-105'
                            />
                        </Link>
                        <Link className='pt-2 w-fit text-xs tracking-wider font-semibold text-secondary/70 uppercase transition duration-200 hover:opacity-70'>
                            Kiến thức
                        </Link>
                        <Link
                            to={`/blogs/${blog.slug}`}
                            className='font-garamond text-2xl lg:text-3xl line-clamp-2'
                            title={blog.title}
                        >
                            {blog.title}
                        </Link>
                        <span className='text-sm font-thin line-clamp-4'>
                            Dây chuyền vàng tây nữ là một món trang sức mang vẻ đẹp tinh tế, thanh lịch và sang trọng.
                            Dây chuyền vàng tây nữ là một món trang sức mang vẻ đẹp tinh tế, thanh lịch và sang trọng.
                            Những mẫu dây chuyền này vừa có mức giá phải chăng, vừa tạo được điểm nhấn cho diện mạo. Hãy
                            cùng Junie.vn... Những mẫu dây chuyền này vừa có mức giá phải chăng, vừa tạo được điểm nhấn
                            cho diện mạo. Hãy cùng Junie.vn...
                        </span>
                    </div>
                ))}
            </div>
            <Pager />
        </Container>
    );
}
