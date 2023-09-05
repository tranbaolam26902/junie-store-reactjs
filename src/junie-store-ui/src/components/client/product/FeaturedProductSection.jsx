// Libraries
import useEmblaCarousel from 'embla-carousel-react';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Hooks
import { usePrevNextButtons } from '@hooks/client/carousel';

// COmponents
import { ProductItem, Title } from '@components/client';

// Temp products
const products = [
    {
        id: 1,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 2,
        name: 'Bông tai Gabi',
        slug: 'gabi',
        price: 275000,
        quantity: 2,
        image: images.productHover
    },
    {
        id: 3,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 4,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 5,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 6,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 7,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    },
    {
        id: 8,
        name: 'Bông tai Gracie',
        slug: 'gracie',
        price: 220000,
        quantity: 1,
        image: images.product
    }
];

export default function FeaturedProductSection() {
    // Hooks
    const [emblaRef, emblaApi] = useEmblaCarousel({
        dragFree: true,
        align: 'start',
        breakpoints: {
            '(min-width: 1024px)': { slidesToScroll: 3 },
            '(min-width: 1280px)': { slidesToScroll: 4 }
        }
    });
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);

    return (
        <>
            <Title subtitle='Tham khảo thêm' title='Có thể bạn cũng thích' />
            <section className='relative -mx-6 lg:mx-0'>
                {/* Start: Product section */}
                <div className='overflow-hidden px-6 lg:px-0' ref={emblaRef}>
                    <div className='flex touch-pan-y -ml-6'>
                        {products.map((product) => (
                            <div
                                key={product.id}
                                className='grow-0 shrink-0 basis-3/4 md:basis-2/5 lg:basis-1/3 xl:basis-1/4 pl-6'
                            >
                                <ProductItem product={product} />
                            </div>
                        ))}
                    </div>
                </div>
                {/* End: Product section */}

                {/* Start: Arrow button section */}
                <button
                    type='button'
                    disabled={prevBtnDisabled}
                    onClick={onPrevButtonClick}
                    className={`absolute top-1/3 -left-4 translate-y-6 hidden lg:inline-block p-4 aspect-square bg-primary border border-black rounded-sm transition duration-200${
                        prevBtnDisabled ? ' opacity-0' : ''
                    }`}
                >
                    <img
                        src={icons.leftArrow}
                        alt='left-arrow-icon'
                        className={`w-6 transition duration-200 ${
                            prevBtnDisabled ? '-translate-x-full' : 'translate-x-0'
                        }`}
                    />
                </button>
                <button
                    type='button'
                    disabled={nextBtnDisabled}
                    onClick={onNextButtonClick}
                    className={`absolute top-1/3 -right-4 translate-y-6 hidden lg:inline-block p-4 aspect-square bg-primary border border-black rounded-sm transition duration-200${
                        nextBtnDisabled ? ' opacity-0' : ''
                    }`}
                >
                    <img
                        src={icons.rightArrow}
                        alt='right-arrow-icon'
                        className={`w-6 transition duration-200 ${
                            nextBtnDisabled ? 'translate-x-full' : 'translate-x-0'
                        }`}
                    />
                </button>
                {/* End: Arrow button section */}
            </section>
        </>
    );
}
