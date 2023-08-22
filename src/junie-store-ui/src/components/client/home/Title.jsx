// Components
import { Container } from '@components/shared';

export default function Title({ subtitle, title }) {
    return (
        <Container className='flex flex-col items-center gap-4 mt-9 mb-6'>
            <span className='text-xs font-semibold uppercase tracking-widest'>{subtitle}</span>
            <span className='text-3xl xl:text-5xl capitalize'>{title}</span>
        </Container>
    );
}
