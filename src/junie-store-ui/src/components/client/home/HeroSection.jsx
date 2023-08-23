// Assets
import { images } from '@assets/images';

// Components
import { Button, Container } from '@components/shared';

export default function HeroSection() {
    return (
        <section className='relative'>
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
            <Container className='absolute inset-0 flex flex-col items-center justify-center gap-8'>
                <span className='text-xs text-primary font-semibold uppercase tracking-widest'>Táo bạo. Tỏa sáng</span>
                <span className='font-garamond text-4xl md:text-6xl text-primary capitalize'>
                    Junie&apos;s Specials
                </span>
                <div className='inline-grid grid-cols-2 gap-6'>
                    <Button accent text='Bán chạy' />
                    <Button secondary text='Bán chạy' />
                </div>
            </Container>
        </section>
    );
}
