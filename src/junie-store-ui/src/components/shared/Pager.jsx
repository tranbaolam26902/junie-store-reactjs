// Libraries
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Assets
import { icons } from '@assets/icons';

// Components
import { Fade } from '@components/shared/animations';

export default function Pager() {
    // States
    const [showSelectNumberOfItems, setShowSelectNumberOfItems] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    // Refs
    const selectNumberOfItemsRef = useRef(null);

    // Event handlers
    const handleToggleSelectNumberOfItems = () => {
        setShowSelectNumberOfItems((state) => !state);
    };
    const handleHideSelectNumberOfItems = () => {
        setShowSelectNumberOfItems(false);
    };

    // Side effects
    /* Hide sort options when clicking outside */
    useEffect(() => {
        const handleHideSelectNumberOfItemsWhenClickOutside = (e) => {
            if (e.target.closest('button') !== selectNumberOfItemsRef.current) handleHideSelectNumberOfItems();
        };

        document.addEventListener('mousedown', handleHideSelectNumberOfItemsWhenClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleHideSelectNumberOfItemsWhenClickOutside);
        };
    }, []);

    return (
        <section className='flex items-center justify-between'>
            <div className='flex flex-col md:flex-row items-center gap-4'>
                <div className='flex items-center gap-4'>
                    <button type='button' className='-mx-2 p-2'>
                        <img src={icons.leftArrow} alt='left-arrow-icon' className='w-4' />
                    </button>
                    <input
                        type='number'
                        className='block px-2 pt-px w-12 h-8 text-center rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                        value={pageNumber}
                        onInput={(e) => {
                            if (/^[0-9]*$/.test(e.target.value)) setPageNumber(e.target.value);
                        }}
                        onBlur={() => {
                            if (pageNumber === '' || pageNumber <= 0) setPageNumber(1);
                        }}
                    />
                    <button type='button' className='-mx-2 p-2'>
                        <img src={icons.rightArrow} alt='right-arrow-icon' className='w-4' />
                    </button>
                </div>
                <div className='flex gap-1'>
                    <span className='font-thin tracking-wider'>Trang</span>
                    <span className=''>1</span>
                    <span className='font-thin tracking-wider'>trên</span>
                    <span className=''>32</span>
                </div>
            </div>
            <div className='relative flex items-center gap-2'>
                <span className='pt-px font-thin tracking-wider'>Số lượng hiển thị:</span>
                <button
                    ref={selectNumberOfItemsRef}
                    type='button'
                    className='flex items-center gap-2 px-4 h-8 rounded border border-gray'
                    onClick={handleToggleSelectNumberOfItems}
                >
                    <span>20</span>
                    <img
                        src={icons.caretDown}
                        alt='caret-down-icon'
                        className={`w-3 transition-transform duration-200${
                            showSelectNumberOfItems ? ' rotate-180' : ''
                        }`}
                    />
                </button>
                <AnimatePresence>
                    {showSelectNumberOfItems && (
                        <Fade className='absolute top-full right-0 z-10 flex flex-col items-start p-4 bg-primary rounded shadow'>
                            {[...Array(101).keys()]
                                .filter((number) => number && number > 0 && number % 10 === 0)
                                .map((number) => (
                                    <button key={number} type='button' className='px-2 py-1 w-full text-left'>
                                        {number}
                                    </button>
                                ))}
                        </Fade>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
