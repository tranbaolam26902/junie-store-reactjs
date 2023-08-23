// Components
import { Container } from '@components/shared';

export default function Title({ subtitle, title }) {
    return (
        <Container className='flex flex-col items-center gap-4 md:mt-16 mt-8 md:mb-12 mb-6'>
            {subtitle && <span className='text-xs font-semibold uppercase tracking-widest'>{subtitle}</span>}
            {title && <span className='text-3xl xl:text-5xl capitalize'>{title}</span>}
        </Container>
    );
}
