// Libraries
import { useLoaderData } from 'react-router-dom';

// Components
import Accordian from './Accordian';

export default function ProductDescriptionSection() {
    // Hooks
    const { product } = useLoaderData();

    return (
        <section className='my-8 lg:my-16 border-t border-b border-gray divide-y divide-gray'>
            <Accordian autoShow title='Mô tả' content={product.description} />
            <Accordian title='Sử dụng & bảo quản' content={product.instruction} />
        </section>
    );
}
