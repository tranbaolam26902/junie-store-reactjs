// Libraries
import { Link } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Components
import { Container } from '@components/shared';

const categories = [
    {
        id: 1,
        name: 'Bông tai',
        slug: 'earrings'
    },
    {
        id: 2,
        name: 'Dây chuyền',
        slug: 'necklace'
    },
    {
        id: 3,
        name: 'Vòng tay',
        slug: 'bracelet'
    },
    {
        id: 4,
        name: 'Nhẫn',
        slug: 'ring'
    }
];
const blogs = [
    {
        id: 1,
        name: 'Beautiful Blog',
        slug: 'blogs'
    },
    {
        id: 2,
        name: 'Tuyển dụng',
        slug: 'recruit'
    }
];
const policies = [
    {
        id: 1,
        name: 'Thanh Toán',
        slug: 'checkout'
    },
    {
        id: 2,
        name: 'Vận Chuyển & Đồng Kiểm',
        slug: 'delivery'
    },
    {
        id: 3,
        name: 'Đổi Trả & Bảo Hành',
        slug: 'warranty'
    },
    {
        id: 4,
        name: 'Bảo Mật',
        slug: 'security'
    },
    {
        id: 5,
        name: 'Điều Khoản Dịch Vụ',
        slug: 'terms-of-service'
    }
];

export default function Footer() {
    return (
        <footer className='py-20 bg-gray/60'>
            <Container className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-none lg:grid-flow-col gap-10 xl:gap-x-24'>
                <div className='flex flex-col gap-5'>
                    <span className='text-sm font-bold uppercase tracking-widest'>Khám phá</span>
                    <nav className='flex flex-col gap-1.5'>
                        {categories.map((category) => (
                            <Link
                                key={category.id}
                                to={`/categories/${category.slug}`}
                                className='transition duration-200 hover:opacity-70'
                            >
                                {category.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='flex flex-col gap-5'>
                    <span className='text-sm font-bold uppercase tracking-widest'>@Junie</span>
                    <nav className='flex flex-col gap-1.5'>
                        {blogs.map((blog) => (
                            <Link
                                key={blog.id}
                                to={`/${blog.slug}`}
                                className='transition duration-200 hover:opacity-70'
                            >
                                {blog.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='flex flex-col gap-5'>
                    <span className='text-sm font-bold uppercase tracking-widest'>Chính sách</span>
                    <nav className='flex flex-col gap-1.5'>
                        {policies.map((policy) => (
                            <Link
                                key={policy.id}
                                to={`/policies/${policy.slug}`}
                                className='transition duration-200 hover:opacity-70'
                            >
                                {policy.name}
                            </Link>
                        ))}
                    </nav>
                </div>
                <div className='flex flex-col gap-5'>
                    <span className='text-sm font-bold uppercase tracking-widest'>Junie</span>
                    <div className='flex flex-col gap-4'>
                        <span>Hộ kinh doanh JUNIE • 742 Lê Thanh Nghị, TP. Hải Dương, Hải Dương</span>
                        <span>ĐKKD số 04A8018757 cấp ngày 07/10/2021 tại Hải Dương • MST: 8411247921</span>
                        <span>
                            <b>Hotline</b>: 024 999 58643 | 08 626 58643
                        </span>
                    </div>
                </div>
                <div className='flex flex-col gap-5'>
                    <span className='text-sm font-bold uppercase tracking-widest'>Follow Junie</span>
                    <div className='flex flex-col gap-4'>
                        <span>
                            Nơi cập nhật những xu hướng thời trang và những chương trình sale mới nhất của Junie.
                        </span>
                        <div className='flex w-fit divide-x divide-black/10 rounded-sm border border-black/10'>
                            <a
                                href='https://www.facebook.com/wearing.junie'
                                target='_blank'
                                rel='noreferrer'
                                type='button'
                                className='flex items-center justify-center p-2 w-14 aspect-square transition duration-200 hover:bg-gray'
                            >
                                <img src={icons.facebook} alt='facebook-icon' className='w-[0.5625rem]' />
                            </a>
                            <a
                                href='https://www.instagram.com/wearing.junie/'
                                target='_blank'
                                rel='noreferrer'
                                type='button'
                                className='flex items-center justify-center p-2 w-14 aspect-square transition duration-200 hover:bg-gray'
                            >
                                <img src={icons.instagram} alt='instagram-icon' className='w-4' />
                            </a>
                            <a
                                href='https://www.tiktok.com/@wearing.junie'
                                target='_blank'
                                rel='noreferrer'
                                type='button'
                                className='flex items-center justify-center p-2 w-14 aspect-square transition duration-200 hover:bg-gray'
                            >
                                <img src={icons.tiktok} alt='titkok-icon' className='w-[0.875rem]' />
                            </a>
                        </div>
                    </div>
                </div>
            </Container>
        </footer>
    );
}
