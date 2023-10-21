// Components
import Container from '@components/admin/Container';
import { Button } from '@components/shared';

export default function NotFound() {
    return (
        <div className='py-64 bg-primary'>
            <Container className='relative flex flex-col items-center gap-12 bg-primary'>
                <span className='absolute z-0 font-bold text-[10rem] lg:text-[14rem] xl:text-[16rem] text-gray/40 -translate-y-40'>
                    404
                </span>
                <span className='z-10 font-garamond text-4xl'>Không tìm thấy trang</span>
                <span className='z-10 font-thin'>Xin lỗi, trang này không tồn tại.</span>
                <Button secondary to='/' text='Trở lại trang chủ' className='z-10 w-fit px-8' />
            </Container>
        </div>
    );
}
