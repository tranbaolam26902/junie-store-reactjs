// Components
import { AnimatePresence, easeInOut, motion } from 'framer-motion';

// Assets
import { icons } from '@assets/icons';

// Components
import { Fade } from '@components/shared/animations';
import PriceFilter from './PriceFilter';

export default function ProductFilterSection({ show, onHide }) {
    return (
        <AnimatePresence>
            {show && (
                <section className='fixed inset-0 z-20 lg:z-auto lg:relative lg:block lg:w-72'>
                    <Fade className='absolute inset-0 lg:hidden bg-black/30 cursor-pointer' onClick={onHide} />
                    <motion.div
                        variants={{
                            initial: {
                                translateX: 'var(--x-from)',
                                transition: {
                                    duration: 0.4,
                                    ease: easeInOut
                                }
                            },
                            animate: {
                                translateX: 'var(--x-to)',
                                transition: {
                                    duration: 0.4,
                                    ease: easeInOut
                                }
                            }
                        }}
                        initial='initial'
                        animate='animate'
                        exit={{ x: 'var(--x-from)', transition: { duration: 0.4, ease: easeInOut } }}
                        className='overflow-y-auto lg:sticky lg:top-20 px-6 py-4 lg:p-0 w-96 max-w-[80vw] h-full lg:w-auto lg:h-auto bg-primary [--x-from:-100%] [--x-to:0%] lg:[--x-from:0%]'
                    >
                        <div className='flex items-center justify-between'>
                            <span className='font-garamond text-2xl'>Bộ lọc</span>
                            <button type='button' className='lg:hidden -m-2 p-2' onClick={onHide}>
                                <img src={icons.close} alt='close-icon' className='w-4' />
                            </button>
                        </div>
                        <hr className='mt-2 -mx-6 lg:mx-0 lg:mt-5 text-gray' />
                        {/* Start: Category section */}
                        <section>
                            <span className='block py-5 text-sm font-semibold tracking-wider'>Loại sản phẩm</span>
                            <div className='flex flex-col gap-1 pl-4'>
                                <div className='flex items-center gap-1'>
                                    <input id='earrings' type='checkbox' />
                                    <label htmlFor='earrings'>Bông tai (107)</label>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input id='necklace' type='checkbox' />
                                    <label htmlFor='necklace'>Dây chuyền (50)</label>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input id='bracelet' type='checkbox' />
                                    <label htmlFor='bracelet'>Vòng tay (42)</label>
                                </div>
                                <div className='flex items-center gap-1'>
                                    <input id='ring' type='checkbox' />
                                    <label htmlFor='ring'>Nhẫn (48)</label>
                                </div>
                            </div>
                        </section>
                        {/* End: Category section */}

                        {/* Start: Price section */}
                        <PriceFilter />
                        {/* End: Price section */}
                    </motion.div>
                </section>
            )}
        </AnimatePresence>
    );
}
