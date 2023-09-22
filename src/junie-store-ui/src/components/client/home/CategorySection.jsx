// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

// Components
import { Title } from '@components/client';

// Temp categories
const categories = [
    {
        id: 1,
        name: 'Bông tai',
        slug: '/categories/bong-tai',
        image: images.earrings
    },
    {
        id: 2,
        name: 'Dây chuyền',
        slug: '/categories/day-chuyen',
        image: images.necklace
    },
    {
        id: 3,
        name: 'Vòng tay',
        slug: '/categories/vong-tay',
        image: images.bracelet
    },
    {
        id: 4,
        name: 'Nhẫn',
        slug: '/categories/nhan',
        image: images.ring
    }
];

export default function CategorySection() {
    return (
        <>
            <Title subtitle='Mua sắm theo danh mục' />
            <section className='overflow-x-auto no-scrollbar lg:mx-auto px-6 lg:max-w-screen-2xl'>
                <div className='flex gap-8 w-[240vw] md:w-[160vw] lg:w-[120vw] xl:w-full'>
                    {categories.map((category) => (
                        <Link
                            key={category.id}
                            to={category.slug}
                            className='overflow-hidden relative w-full rounded group'
                        >
                            <img
                                src={category.image}
                                alt={category.slug}
                                className='transition duration-500 group-hover:scale-105'
                            />
                            <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                                <span className='relative text-xs font-semibold tracking-widest text-primary uppercase after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:transition after:duration-500 after:bg-primary/30 after:group-hover:bg-primary'>
                                    {category.name}
                                </span>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
}
