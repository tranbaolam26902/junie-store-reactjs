// Libraries
import { useEffect, useRef, useState } from 'react';

// Hooks
import { useDebounce } from '@hooks/shared';

// Components
import { Input } from '@components/shared';
import { useParams, useSearchParams } from 'react-router-dom';

export default function PriceFilter() {
    // Hooks
    const [searchParams, setSearchParams] = useSearchParams();
    const params = useParams();

    // Constants
    const MIN_PRICE = 0;
    const MAX_PRICE = 500000;

    // States
    const [minPrice, setMinPrice] = useState(searchParams.get('MinPrice') || MIN_PRICE);
    const [maxPrice, setMaxPrice] = useState(searchParams.get('MaxPrice') || MAX_PRICE);

    // Hooks
    const debounceMinPrice = useDebounce(minPrice, 500);
    const debounceMaxPrice = useDebounce(maxPrice, 500);

    // Refs
    const minRef = useRef(null);
    const maxRef = useRef(null);

    // Event handlers
    const handleChangeMinPriceSlider = (e) => {
        const price = Number.parseInt(e.target.value);

        setMinPrice(price);
        if (maxPrice - price < 0) {
            setMaxPrice(price);
            maxRef.current.value = price;
        }
        minRef.current.value = price;
    };
    const handleChangeMaxPriceSlider = (e) => {
        const price = Number.parseInt(e.target.value);

        setMaxPrice(price);
        if (price - minPrice < 0) {
            setMinPrice(price);
            minRef.current.value = price;
        }
        maxRef.current.value = price;
    };
    const handleChangeMinPriceText = (e) => {
        const price = Number.parseInt(e.target.value);

        if (!price || price < MIN_PRICE) {
            e.target.value = MIN_PRICE;
            setMinPrice(MIN_PRICE);
            return;
        }
        if (price >= maxPrice) {
            e.target.value = Number.parseInt(maxPrice - 1);
            setMinPrice(Number.parseInt(maxPrice - 1));
            return;
        }
        if (price <= MAX_PRICE) setMinPrice(price);
    };
    const handleChangeMaxPriceText = (e) => {
        const price = Number.parseInt(e.target.value);

        if (!price || price < MIN_PRICE || price > MAX_PRICE) {
            e.target.value = MAX_PRICE;
            setMaxPrice(MAX_PRICE);
            return;
        }
        if (price <= minPrice) {
            e.target.value = Number.parseInt(minPrice + 1);
            setMaxPrice(Number.parseInt(minPrice + 1));
            return;
        }
        if (price > minPrice && price <= MAX_PRICE) setMaxPrice(price);
    };

    // Side effects
    /* Bind minPrice & maxPrice with searchParams
     * Debounce for slider
     * */
    useEffect(() => {
        searchParams.set('MinPrice', minPrice);
        searchParams.set('MaxPrice', maxPrice);
        setSearchParams(searchParams);
        // eslint-disable-next-line
    }, [debounceMinPrice, debounceMaxPrice]);
    /* Reset price filter when navigate between categories */
    useEffect(() => {
        if (!searchParams.has('MinPrice') && !searchParams.has('MaxPrice')) {
            setMinPrice(MIN_PRICE);
            setMaxPrice(MAX_PRICE);
            minRef.current.value = MIN_PRICE;
            maxRef.current.value = MAX_PRICE;
        }
        // eslint-disable-next-line
    }, [params.categorySlug]);

    return (
        <section>
            <span className='block py-5 text-sm font-semibold tracking-wider'>Giá</span>
            {/* Start: Slider */}
            <div className='relative w-full h-1.5 bg-gray rounded-lg'>
                <span
                    className={`absolute h-full bg-secondary`}
                    style={{
                        left: (minPrice / MAX_PRICE) * 100 + '%',
                        right: 100 - (maxPrice / MAX_PRICE) * 100 + '%'
                    }}
                ></span>
                <div className='absolute inset-0 flex items-center'>
                    <input
                        type='range'
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={minPrice}
                        className='absolute w-full bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[0.375rem] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-secondary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none'
                        onChange={handleChangeMinPriceSlider}
                    />
                    <input
                        type='range'
                        min={MIN_PRICE}
                        max={MAX_PRICE}
                        value={maxPrice}
                        className='absolute w-full bg-transparent appearance-none pointer-events-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-primary [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:border-[0.375rem] [&::-webkit-slider-thumb]:border-solid [&::-webkit-slider-thumb]:border-secondary [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:appearance-none'
                        onChange={handleChangeMaxPriceSlider}
                    />
                </div>
            </div>
            {/* End: Slider */}

            {/* Start: Input */}
            <div className='flex items-center justify-between gap-4 mt-4'>
                <div className='relative'>
                    <Input
                        type='number'
                        ref={minRef}
                        defaultValue={minPrice}
                        className='p-2 pl-6 w-full bg-primary border border-gray'
                        onBlur={handleChangeMinPriceText}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') handleChangeMinPriceText(e);
                        }}
                    />
                    <span className='absolute top-1/2 left-2 underline -translate-y-1/2'>đ</span>
                </div>
                <span>đến</span>
                <div className='relative'>
                    <Input
                        type='number'
                        ref={maxRef}
                        defaultValue={maxPrice}
                        className='p-2 pl-6 w-full bg-primary border border-gray'
                        onBlur={handleChangeMaxPriceText}
                        onKeyUp={(e) => {
                            if (e.key === 'Enter') handleChangeMaxPriceText(e);
                        }}
                    />
                    <span className='absolute top-1/2 left-2 underline -translate-y-1/2'>đ</span>
                </div>
            </div>
            {/* End: Input */}
        </section>
    );
}
