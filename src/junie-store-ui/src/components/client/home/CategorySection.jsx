// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

// Components
import { Container } from '@components/shared';
import Title from './Title';

// Temp categories
const categories = [
    {
        id: 1,
        name: 'Bông tai',
        slug: 'earrings',
        image: images.earrings
    },
    {
        id: 2,
        name: 'Dây chuyền',
        slug: 'necklace',
        image: images.necklace
    },
    {
        id: 3,
        name: 'Vòng tay',
        slug: 'bracelet',
        image: images.bracelet
    },
    {
        id: 4,
        name: 'Nhẫn',
        slug: 'ring',
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
                            to={`/categories/${category.slug}`}
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
