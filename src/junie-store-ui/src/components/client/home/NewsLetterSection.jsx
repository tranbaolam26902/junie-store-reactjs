// Assets
import { images } from '@assets/images';

// Components
import { Button, Input } from '@components/shared';

export default function NewsLetterSection() {
    return (
        <section className='mt-16'>
            <div className='relative'>
                <img
                    src={images.newsLetterBackground}
                    alt='news-letter-background'
                    className='w-full h-[25rem] object-[50%_70%] object-cover'
                />
                <div className='absolute inset-0 lg:inset-y-0 lg:left-1/2 lg:right-0 flex items-center justify-center px-6'>
                    <div className='flex flex-col p-14 w-fit bg-primary rounded-lg'>
                        <span className='text-xs lg:text-sm font-semibold uppercase tracking-widest'>
                            Đăng ký nhận tin ưu đãi qua email
                        </span>
                        <span className='my-4 lg:my-6 font-thin'>
                            Bạn sẽ nhận được các ưu đã dành riêng, sản phẩm mới hàng tuần.
                        </span>
                        <form className='flex flex-col lg:flex-row gap-4'>
                            <Input type='email' placeholder='Email của bạn' required />
                            <Button submit secondary text='Đăng ký' className='px-9 py-4' />
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}
