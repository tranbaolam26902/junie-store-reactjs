// Libraries
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';

// Services
import { getCategoryBySlug } from '@services/shared';
import { useCategoryServices } from '~/services/admin';

// Components
import { AdminContainer } from '@components/admin';
import { Button, Input } from '@components/shared';

export default function CategoryDetail() {
    // Hooks
    const params = useParams();
    const navigate = useNavigate();

    // Services
    const categoryServices = useCategoryServices();

    // States
    const [errorMessages, setErrorMessages] = useState([]);
    const [categoryId, setCategoryId] = useState('');
    const [name, setName] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionMessage, setDescriptionMessage] = useState('');
    const [showOnMenu, setShowOnMenu] = useState(false);

    // Refs
    const nameRef = useRef(null);
    const descriptionRef = useRef(null);

    // Functions
    const validateName = () => {
        let isValid = true;

        if (nameRef.current.value.trim() === '') {
            setNameMessage('Tên danh mục không được để trống.');
            isValid = false;
        }

        return isValid;
    };
    const validateCategory = () => {
        let isValid = true;

        isValid = validateName();

        return isValid;
    };
    const getCategory = async () => {
        const result = await getCategoryBySlug(params.categorySlug);

        if (result) {
            setCategoryId(result.id);
            setName(result.name);
            setDescription(result.description);
            setShowOnMenu(result.showOnMenu);
        } else {
            setCategoryId('');
            setName('');
            setDescription('');
            setShowOnMenu(false);
        }
    };
    const createCategory = async () => {
        const category = {
            name,
            description,
            showOnMenu
        };
        const data = await categoryServices.createCategory(category);

        if (data.isSuccess) {
            window.alert('Tạo thành công.');
            navigate('/admin/categories');
        } else setErrorMessages(data.errors);
    };
    const editCurrentCategory = async () => {
        const category = {
            name,
            description,
            showOnMenu
        };
        const data = await categoryServices.editCategory(categoryId, category);

        if (data.isSuccess) {
            window.alert(data.result);
            navigate('/admin/categories');
        } else setErrorMessages(data.errors);
    };

    // Event handlers
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateCategory()) return;

        if (params.categorySlug === 'create' && name.trim() !== '') createCategory();
        else if (categoryId) editCurrentCategory();
    };

    // Side effects
    useEffect(() => {
        if (params.categorySlug !== 'create') getCategory();
        // eslint-disable-next-line
    }, [params.categorySlug]);

    return (
        <AdminContainer>
            <h1 className='my-3 text-xl font-semibold uppercase'>
                {params.categorySlug === 'create' ? 'Tạo danh mục' : 'Chính sửa danh mục'}
            </h1>
            {errorMessages.map((errorMessage, index) => (
                <span key={index} className='text-sm text-red'>
                    {errorMessage}
                </span>
            ))}
            <form className='flex flex-col gap-3 lg:w-1/2' onSubmit={handleSubmit}>
                <Input
                    ref={nameRef}
                    value={name}
                    message={nameMessage}
                    label='Tên danh mục'
                    onChange={(e) => {
                        setName(e.target.value);
                        setNameMessage('');
                    }}
                    onBlur={validateName}
                />
                <Input
                    ref={descriptionRef}
                    value={description}
                    message={descriptionMessage}
                    label='Mô tả'
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setDescriptionMessage('');
                    }}
                />

                <div className='flex gap-1'>
                    <input
                        id='show-on-menu'
                        checked={showOnMenu}
                        type='checkbox'
                        onChange={(e) => {
                            setShowOnMenu(e.target.checked);
                        }}
                    />
                    <label htmlFor='show-on-menu' className='pt-0.5'>
                        Hiển thị trên menu
                    </label>
                </div>
                <div className='inline-grid grid-cols-2 gap-4 w-fit'>
                    <Button to='/admin/categories' outline text='Hủy' className='min-w-[6rem]' />
                    <Button submit secondary text='Lưu' className='min-w-[6rem]' />
                </div>
            </form>
        </AdminContainer>
    );
}
