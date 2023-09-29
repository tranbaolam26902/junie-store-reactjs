// Libraries
import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Services
import { useCategoryServices } from '@services/admin';

// Components
import { Button } from '@components/shared';
import { Fade } from '@components/shared/animations';

export default function SelectCategoriesModal({ show, onHide, selectedCategories, setSelectedCategories }) {
    // Hooks
    const categoryServices = useCategoryServices();

    // States
    const [categories, setCategories] = useState([]);

    // Functions
    const getCategories = async () => {
        const result = await categoryServices.getCategoriesByQueries('');

        if (result) setCategories(result.items);
        else setCategories([]);
    };

    // Event handlers
    const handleAddCategories = () => {
        const checkedCategories = Array.from(document.querySelectorAll('input[name="categories"]:checked')).map(
            (item) => ({
                id: item.id,
                name: item.value
            })
        );
        console.log(checkedCategories);

        setSelectedCategories(checkedCategories);
        onHide();
    };

    // Side effects
    /* Get all categories */
    useEffect(() => {
        getCategories();
        // eslint-disable-next-line
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <Fade className='fixed inset-0 z-20 flex items-center justify-center'>
                    <div className='absolute inset-0 bg-black/30 cursor-pointer' onClick={onHide}></div>
                    <div className='absolute flex flex-col gap-4 p-8 w-[32rem] max-w-full bg-primary rounded shadow'>
                        <div className='flex items-center justify-between'>
                            <span>Chọn danh mục</span>
                            <button type='button' className='text-2xl' onClick={onHide}>
                                &times;
                            </button>
                        </div>
                        <div className='max-h-[12.5rem] overflow-y-auto'>
                            {categories.map((category) => (
                                <div
                                    key={category.id}
                                    className='flex gap-2 px-4 odd:bg-gray/20 hover:bg-gray/70 rounded'
                                >
                                    <input
                                        type='checkbox'
                                        name='categories'
                                        id={category.id}
                                        value={category.name}
                                        defaultChecked={selectedCategories.find(
                                            (selectedCategory) => selectedCategory.id === category.id
                                        )}
                                    />
                                    <label htmlFor={category.id} className='pt-1 w-full text-lg cursor-pointer'>
                                        {category.name}
                                    </label>
                                </div>
                            ))}
                        </div>
                        <div className='inline-grid grid-cols-2 gap-4 justify-end'>
                            <Button outline text='Hủy' onClick={onHide} />
                            <Button secondary text='Thêm' onClick={handleAddCategories} />
                        </div>
                    </div>
                </Fade>
            )}
        </AnimatePresence>
    );
}
