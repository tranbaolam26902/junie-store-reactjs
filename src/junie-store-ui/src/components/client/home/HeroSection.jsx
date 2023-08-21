// Assets
import { images } from '@assets/images';

export default function HeroSection() {
    return (
        <div className='relative'>
            <img
                src={images.homeHeroBannerMobile}
                alt='hero-banner'
                className='inline-block lg:hidden w-screen max-h-[120vw] md:max-h-[70vw] lg:max-h-none object-cover'
            />
            <img
                src={images.homeHeroBannerDefault}
                alt='hero-banner'
                className='hidden lg:inline-block w-screen object-cover'
            />
            <div className='absolute inset-0 bg-black/30'></div>
            <div className='absolute inset-0 flex flex-col items-center justify-center gap-8'>
                <span className='text-xs text-primary font-semibold uppercase tracking-widest'>Táo bạo. Tỏa sáng</span>
                <span className='text-4xl md:text-6xl text-primary font-semibold capitalize'>
                    Junie&apos;s Specials
                </span>
                <div className='flex items-center gap-6'>
                    <button
                        type='button'
                        className='px-5 py-4 text-xs font-semibold uppercase tracking-widest bg-accent rounded-sm'
                    >
                        Bán chạy
                    </button>
                    <button
                        type='button'
                        className='px-5 py-4 text-xs font-semibold uppercase tracking-widest bg-accent rounded-sm'
                    >
                        Sale Off
                    </button>
                </div>
            </div>
        </div>
    );
}
