// Libraries
import { useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useLoaderData } from 'react-router-dom';

// Hooks
import { useDotButton, usePrevNextButtons } from '@hooks/client/carousel';

// Assets
import { icons } from '@assets/icons';

export default function ProductImageSection() {
    // Hooks
    const [emblaRef, emblaApi] = useEmblaCarousel();
    const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
    const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } = usePrevNextButtons(emblaApi);
    const { product } = useLoaderData();

    // Refs
    const mainImageRef = useRef(null);

    return (
        <div className='relative flex gap-4 h-fit'>
            {/* Start: Image buttons section */}
            <div className='relative hidden lg:block'>
                <div
                    className='relative flex flex-col gap-y-4 -m-1 p-2 overflow-y-auto'
                    style={{ maxHeight: mainImageRef.current?.clientHeight }}
                >
                    {scrollSnaps.map((_, index) => (
                        <button
                            key={index}
                            type='button'
                            onClick={() => onDotButtonClick(index)}
                            className={`relative after:absolute after:top-0 after:left-0 after:w-full after:h-full after:rounded after:transition-all after:duration-200 after:opacity-0 after:scale-100 after:shadow-[0_0_0_2px_rgba(26,26,26,1)]${
                                selectedIndex === index ? ' after:opacity-100 after:scale-105' : ''
                            }`}
                        >
                            <img
                                src={`${import.meta.env.VITE_API_ENDPOINT}/${product.pictures[index]?.path}`}
                                alt='product-image'
                                className='w-16 xl:w-20 rounded'
                            />
                        </button>
                    ))}
                </div>
                <span className='absolute left-0 right-0 bottom-0 h-4 bg-gradient-to-t from-primary to-transparent'></span>
            </div>
            {/* End: Image buttons section */}

            <div className='lg:flex-1 relative -mx-6 lg:mx-0'>
                <div className='overflow-hidden' ref={emblaRef}>
                    {/* Start: Image list section */}
                    <div ref={mainImageRef} className='flex touch-pan-y gap-2 lg:gap-0'>
                        {product.pictures.map((image) => (
                            <div key={image.id} className='grow-0 shrink-0 basis-4/5 lg:basis-full'>
                                <img
                                    className='w-full object-cover'
                                    src={`${import.meta.env.VITE_API_ENDPOINT}/${image.path}`}
                                    alt='Your alt text'
                                />
                            </div>
                        ))}
                    </div>
                    {/* End: Image list section */}
                </div>

                {/* Start: Arrow buttons overlay section */}
                <button
                    type='button'
                    disabled={prevBtnDisabled}
                    onClick={onPrevButtonClick}
                    className={`absolute inset-y-0 left-0 hidden lg:flex items-center justify-center w-16 transition duration-200${
                        prevBtnDisabled ? ' opacity-30' : ''
                    }`}
                >
                    <img src={icons.leftArrow} alt='left-arrow-icon' className='w-8' />
                </button>
                <button
                    type='button'
                    disabled={nextBtnDisabled}
                    onClick={onNextButtonClick}
                    className={`absolute inset-y-0 right-0 hidden lg:flex items-center justify-center w-16 transition duration-200${
                        nextBtnDisabled ? ' opacity-30' : ''
                    }`}
                >
                    <img src={icons.rightArrow} alt='right-arrow-icon' className='w-8' />
                </button>
                {/* End: Arrow buttons overlay section */}

                {/* Start: Mobile controls section */}
                <div className='flex lg:hidden items-center justify-between m-6 mb-0'>
                    <button
                        type='button'
                        onClick={onPrevButtonClick}
                        disabled={prevBtnDisabled}
                        className={`-m-2 p-2 transition duration-200${prevBtnDisabled ? ' opacity-30' : ''}`}
                    >
                        <img src={icons.leftArrow} alt='left-arrow-icon' className='w-4' />
                    </button>
                    <div className='flex gap-2'>
                        {scrollSnaps.map((_, index) => (
                            <button
                                key={index}
                                type='button'
                                onClick={() => onDotButtonClick(index)}
                                className={`w-2 h-2 transition duration-200${
                                    selectedIndex === index ? ' bg-black' : ' bg-gray'
                                }`}
                            ></button>
                        ))}
                    </div>
                    <button
                        type='button'
                        onClick={onNextButtonClick}
                        disabled={nextBtnDisabled}
                        className={`-m-2 p-2 transition duration-200${nextBtnDisabled ? ' opacity-30' : ''}`}
                    >
                        <img src={icons.rightArrow} alt='left-arrow-icon' className='w-4' />
                    </button>
                </div>
                {/* End: Mobile controls section */}
            </div>
        </div>
    );
}
