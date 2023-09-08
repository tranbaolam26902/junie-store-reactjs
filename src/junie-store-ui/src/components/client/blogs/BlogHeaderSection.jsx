// Libraries
import { Link } from 'react-router-dom';

// Assets
import { images } from '@assets/images';

// Components
import { Container } from '@components/shared';

export default function BlogHeaderSection({ title, image }) {
    return (
        <section className='relative bg-gray/50'>
            <div className='flex flex-col lg:grid lg:grid-cols-2'>
                <div className='lg:absolute inset-0'>
                    <Container className='py-6'>
                        <div className='lg:pr-6 lg:w-1/2'>
                            <div className='flex items-center gap-1'>
                                <Link to='/' className='text-sm transition duration-200 opacity-70 hover:opacity-100'>
                                    Trang chủ
                                </Link>
                                <span className='opacity-70'>/</span>
                                <Link
                                    to='/blogs'
                                    className='text-sm transition duration-200 opacity-70 hover:opacity-100'
                                >
                                    Beautiful Blog
                                </Link>
                                <span className='opacity-70'>/</span>
                                <span className='flex-1 text-sm truncate'>
                                    Giá dây chuyền vàng tây nữ có đắt không? Bao nhiêu tiền một chỉ?
                                </span>
                            </div>
                            <h1 className='pt-2 lg:pt-4 font-garamond text-4xl lg:text-5xl'>
                                Giá dây chuyền vàng tây nữ có đắt không? Bao nhiêu tiền một chỉ?
                            </h1>
                        </div>
                    </Container>
                </div>
                <img src={images.blog1} alt='blog-image' className='lg:col-start-2' />
            </div>
        </section>
    );
}
