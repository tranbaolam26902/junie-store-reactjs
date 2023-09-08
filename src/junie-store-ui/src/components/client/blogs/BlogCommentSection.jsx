// Components
import { Button, Input } from '@components/shared';

export default function BlogCommentSection() {
    // Event handlers
    const handleSubmitComment = (e) => {
        e.preventDefault();
    };

    return (
        <section className='flex flex-col gap-4 mx-auto px-6 lg:max-w-screen-md py-8 lg:py-16'>
            <span className='font-garamond text-2xl'>Để lại bình luận</span>
            <span> Tất cả bình luận đều được kiểm duyệt công khai</span>
            <form className='flex flex-col gap-4' onSubmit={handleSubmitComment}>
                <div className='flex gap-4'>
                    <Input placeholder='Tên' />
                    <Input type='email' placeholder='email' />
                </div>
                <textarea
                    rows={4}
                    placeholder='Nội dung bình luận'
                    className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                />
                <Button secondary text='Gửi' type='submit' className='px-8 w-fit' />
            </form>
        </section>
    );
}
