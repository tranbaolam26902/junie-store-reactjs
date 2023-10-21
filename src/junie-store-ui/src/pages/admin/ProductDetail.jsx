// Libraries
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Services
import { useProductServices, useSupplierServices } from '@services/admin';
import { getProductBySlug } from '@services/client';

// Components
import { AdminContainer } from '@components/admin';
import { Button, Input } from '@components/shared';
import { PageTransition } from '@components/shared/animations';
import { SelectCategoryModal } from '@components/admin/product';

export default function ProductDetail() {
    // Hooks
    const params = useParams();
    const supplierServices = useSupplierServices();
    const productServices = useProductServices();
    const navigate = useNavigate();

    // States
    const [errorMessages, setErrorMessages] = useState([]);
    const [showSelectCategoriesModal, setShowSelectCategoriesModal] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedCategoriesMessage, setSelectedCategoriesMessage] = useState('');
    const [productId, setProductId] = useState('');
    const [suppliers, setSuppliers] = useState([]);
    const [selectedSupplier, setSelectedSupplier] = useState('');
    const [supplierMessage, setSupplierMessage] = useState('');
    const [name, setName] = useState('');
    const [nameMessage, setNameMessage] = useState('');
    const [sku, setSku] = useState('');
    const [skuMessage, setSkuMessage] = useState('');
    const [price, setPrice] = useState(0);
    const [priceMessage, setPriceMessage] = useState('');
    const [discount, setDiscount] = useState(0);
    const [discountMessage, setDiscountMessage] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [quantityMessage, setQuantityMessage] = useState('');
    const [minQuantity, setMinQuantity] = useState(0);
    const [minQuantityMessage, setMinQuantityMessage] = useState('');
    const [description, setDescription] = useState('');
    const [descriptionMessage, setDescriptionMessage] = useState('');
    const [instruction, setInstruction] = useState('');
    const [instructionMessage, setInstructionMessage] = useState('');
    const [isActive, setIsActive] = useState(false);
    const [editReason, setEditReason] = useState('');
    const [editReasonMessage, setEditReasonMessage] = useState('');
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);

    // Refs
    const inputFileRef = useRef(null);

    // Functions
    const getProduct = async () => {
        const product = await getProductBySlug(params.productSlug);

        if (product) {
            setProductId(product.id);
            setSelectedCategories(product.categories.map((category) => ({ id: category.id, name: category.name })));
            setSelectedSupplier(product.supplierId);
            setName(product.name);
            setSku(product.sku);
            setPrice(product.price);
            setDiscount(product.discount);
            setQuantity(product.quantity);
            setMinQuantity(product.minQuantity);
            setDescription(product.description);
            setInstruction(product.instruction);
            setIsActive(product.active);
            setImages(product.pictures);
            getProductImages(product);
        } else {
            setProductId('');
            setSelectedCategories([]);
            setSelectedSupplier('');
            setName('');
            setSku('');
            setPrice(0);
            setDiscount(0);
            setQuantity(0);
            setMinQuantity(0);
            setDescription('');
            setInstruction('');
            setIsActive(false);
        }
    };
    const getSuppliers = async () => {
        const result = await supplierServices.getSuppliersByQueries('');

        if (result) setSuppliers(result.items);
        else setSuppliers([]);
    };
    const validateCategories = () => {
        if (selectedCategories.length === 0) {
            setSelectedCategoriesMessage('Danh mục không được để trống.');
            return false;
        }

        return true;
    };
    const validateName = () => {
        if (name.trim() === '') {
            setNameMessage('Tên sản phẩm không được để trống.');
            return false;
        }

        return true;
    };
    const validateSupplier = () => {
        if (selectedSupplier === '') {
            setSupplierMessage('Nhà cung cấp không được để trống.');
            return false;
        }

        return true;
    };
    const validateSku = () => {
        if (sku.trim() === '') {
            setSkuMessage('SKU không được để trống.');
            return false;
        }

        return true;
    };
    const validatePrice = () => {
        if (price <= 0) {
            setPriceMessage('Giá không hợp lệ.');
            return false;
        }

        return true;
    };
    const validateDiscount = () => {
        if (discount < 0 || discount > 100) {
            setDiscountMessage('Giảm giá không hợp lệ.');
            return false;
        }

        return true;
    };
    const validateQuantity = () => {
        if (quantity < 0) {
            setQuantityMessage('Số lượng không hợp lệ.');
            return false;
        }

        return true;
    };
    const validateMinQuantity = () => {
        if (minQuantity < 0) {
            setMinQuantityMessage('Số lượng tối thiểu không hợp lệ.');
            return false;
        }

        return true;
    };
    const validateDescription = () => {
        if (description.trim() === '') {
            setDescriptionMessage('Mô tả sản phẩm không được để trống.');
            return false;
        }

        return true;
    };
    const validateInstruction = () => {
        if (instruction.trim() === '') {
            setInstructionMessage('Hướng dẫn sử dụng & bảo quản không được để trống.');
            return false;
        }

        return true;
    };
    const validateEditReason = () => {
        if (params.productSlug !== 'create' && editReason.trim() === '') {
            setEditReasonMessage('Lý do chỉnh sửa không được để trống.');
            return false;
        }

        return true;
    };
    const validateProduct = () => {
        validateCategories();
        validateName();
        validateSupplier();
        validateSku();
        validatePrice();
        validateDiscount();
        validateQuantity();
        validateMinQuantity();
        validateDescription();
        validateInstruction();
        validateEditReason();
        if (
            !validateCategories() ||
            !validateName ||
            !validateSupplier() ||
            !validateSku() ||
            !validatePrice() ||
            !validateDiscount() ||
            !validateQuantity() ||
            !validateMinQuantity() ||
            !validateDescription() ||
            !validateInstruction() ||
            !validateEditReason()
        )
            return false;

        return true;
    };
    const uploadImages = async (productId, files) => {
        const result = await productServices.uploadProductImages(productId, files);

        if (!result.isSuccess) {
            setErrorMessages(result.errors);
            return false;
        } else return true;
    };
    const getProductImages = (product) => {
        const currentFiles = [];
        const currentImages = [];
        product.pictures.forEach((image) => {
            const fileName = image.path.substring(image.path.lastIndexOf('/') + 1, image.path.lastIndexOf('.'));
            const fileExt = image.path.substring(image.path.lastIndexOf('.'));
            fetch(`${import.meta.env.VITE_API_ENDPOINT}/${image.path}`)
                .then((response) => response.blob())
                .then((blob) => {
                    const file = new File([blob], fileName + fileExt, { type: blob.type });
                    currentFiles.push(file);
                    currentImages.push({
                        id: fileName + fileExt,
                        path: image.path
                    });
                });
        });
        setFiles(currentFiles);
        setImages(currentImages);
    };

    // Event handlers
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateProduct()) return;

        const product = {
            id: productId,
            name: name.trim(),
            sku: sku.trim(),
            instruction: instruction.trim(),
            description: description.trim(),
            price: parseFloat(price),
            quantity: parseInt(quantity),
            minQuantity: parseInt(minQuantity),
            discount: parseFloat(discount),
            supplierId: selectedSupplier,
            active: isActive,
            categories: selectedCategories.map((selectedCategory) => selectedCategory.id),
            editReason: editReason.trim()
        };
        if (params.productSlug === 'create') {
            const result = await productServices.createProduct(product);

            if (result.isSuccess) {
                if (uploadImages(result.result.id, files)) {
                    window.alert('Tạo sản phẩm thành công.');
                    navigate('/admin/products');
                }
            } else setErrorMessages(result.errors);
        } else {
            const result = await productServices.editProduct(product);

            if (result.isSuccess) {
                if (files.length !== 0 && uploadImages(result.result.id, files)) {
                    window.alert('Cập nhật sản phẩm thành công.');
                    navigate('/admin/products');
                }
            } else setErrorMessages(result.errors);
        }
    };
    const handleShowSelectCategoriesModal = () => {
        setShowSelectCategoriesModal(true);
        setSelectedCategoriesMessage('');
    };
    const handleHideSelectCategoriesModal = () => {
        setShowSelectCategoriesModal(false);
    };
    const handleRemoveSelectedCategory = (e) => {
        setSelectedCategories(selectedCategories.filter((selectedCategory) => selectedCategory.id !== e.target.value));
    };
    const handleShowFileSelect = () => {
        inputFileRef.current.click();
    };
    const handleSelectFiles = (e) => {
        if (e.target.files.length === 0) return;

        const currentImages = [
            ...images,
            ...Array.from(e.target.files).map((file) => ({
                path: URL.createObjectURL(file),
                id: file.lastModified + file.name
            }))
        ];
        const currentFiles = [...files, ...Array.from(e.target.files)];
        setImages(currentImages);
        setFiles(currentFiles);
    };
    const handleRemoveImage = (e) => {
        setFiles(files.filter((file) => file.name !== e.target.value));
        setImages(images.filter((image) => image.id !== e.target.value));
    };

    // Side effects
    /* Get suppliers */
    useEffect(() => {
        getSuppliers();
        // eslint-disable-next-line
    }, []);
    /* Get product for editing */
    useEffect(() => {
        if (params.productSlug && params.productSlug !== 'create') getProduct();
        // eslint-disable-next-line
    }, [params.productSlug]);

    return (
        <AdminContainer>
            <PageTransition>
                <h1 className='my-3 text-xl font-semibold uppercase'>
                    {params.productSlug === 'create' ? 'Tạo sản phẩm' : 'Chính sửa sản phẩm'}
                </h1>
                {errorMessages.map((errorMessage, index) => (
                    <span key={index} className='block mb-4 text-sm text-red'>
                        {errorMessage}
                    </span>
                ))}
                <div className='grid lg:grid-cols-2 gap-8'>
                    <form className='flex flex-col gap-3' onSubmit={handleSubmit}>
                        <div className='flex flex-col'>
                            <div className='flex gap-4'>
                                <span className='text-sm'>Danh mục</span>
                                <button
                                    type='button'
                                    className='flex items-center gap-1 font-semibold text-sm'
                                    onClick={handleShowSelectCategoriesModal}
                                >
                                    <img src={icons.plus} alt='plus-icon' className='pb-1 w-2' />
                                    <span>Thêm</span>
                                </button>
                            </div>
                            <div className='flex items-center gap-2 flex-wrap'>
                                {selectedCategories.map((selectedCategory, index) => (
                                    <div
                                        key={index}
                                        className='relative flex items-center justify-between gap-2 px-4 py-2 bg-gray rounded-full'
                                    >
                                        <span>{selectedCategory.name}</span>
                                        <button
                                            type='button'
                                            value={selectedCategory.id}
                                            title='Xóa danh mục'
                                            onClick={handleRemoveSelectedCategory}
                                        >
                                            &times;
                                        </button>
                                    </div>
                                ))}
                            </div>
                            {selectedCategoriesMessage && (
                                <span className='text-sm text-red'>{selectedCategoriesMessage}</span>
                            )}
                        </div>
                        <div>
                            <Input
                                label='Tên sản phẩm'
                                value={name}
                                message={nameMessage}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setNameMessage('');
                                }}
                                onBlur={validateName}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <div className='flex flex-col'>
                                <div>
                                    <label
                                        htmlFor='suppliers'
                                        className='text-sm mr-1 w-fit cursor-pointer select-none'
                                    >
                                        Nhà cung cấp
                                    </label>
                                </div>
                                <select
                                    id='suppliers'
                                    className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black resize-none'
                                    value={selectedSupplier}
                                    onChange={(e) => {
                                        setSelectedSupplier(e.target.value);
                                        setSupplierMessage('');
                                    }}
                                >
                                    <option value=''>-- Chọn nhà cung cấp --</option>
                                    {suppliers.map((supplier) => (
                                        <option key={supplier.id} value={supplier.id}>
                                            {supplier.name}
                                        </option>
                                    ))}
                                </select>
                                {supplierMessage && <span className='text-sm text-red'>{supplierMessage}</span>}
                            </div>
                            <Input
                                label='SKU'
                                value={sku}
                                message={skuMessage}
                                onChange={(e) => {
                                    setSku(e.target.value);
                                    setSkuMessage('');
                                }}
                                onBlur={validateSku}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                type='number'
                                label='Giá'
                                value={price}
                                message={priceMessage}
                                onChange={(e) => {
                                    setPrice(e.target.value);
                                    setPriceMessage('');
                                }}
                                onBlur={validatePrice}
                            />
                            <Input
                                type='number'
                                label='Giảm giá (%)'
                                value={discount}
                                message={discountMessage}
                                onChange={(e) => {
                                    setDiscount(e.target.value);
                                    setDiscountMessage('');
                                }}
                                onBlur={validateDiscount}
                            />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                            <Input
                                type='number'
                                label='Số lượng'
                                value={quantity}
                                message={quantityMessage}
                                onChange={(e) => {
                                    setQuantity(e.target.value);
                                    setQuantityMessage('');
                                }}
                                onBlur={validateQuantity}
                            />
                            <Input
                                type='number'
                                label='Số lượng tối thiểu'
                                value={minQuantity}
                                message={minQuantityMessage}
                                onChange={(e) => {
                                    setMinQuantity(e.target.value);
                                    setMinQuantityMessage('');
                                }}
                                onBlur={validateMinQuantity}
                            />
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='description' className='text-sm mr-1 w-fit cursor-pointer select-none'>
                                Mô tả sản phẩm
                            </label>
                            <textarea
                                id='description'
                                rows={4}
                                value={description}
                                className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                                onChange={(e) => {
                                    setDescription(e.target.value);
                                    setDescriptionMessage('');
                                }}
                                onBlur={validateDescription}
                            />
                            {descriptionMessage && <span className='text-sm text-red'>{descriptionMessage}</span>}
                        </div>
                        <div className='flex flex-col'>
                            <label htmlFor='instruction' className='text-sm mr-1 w-fit cursor-pointer select-none'>
                                Hướng dẫn sử dụng & bảo quản
                            </label>
                            <textarea
                                id='instruction'
                                rows={4}
                                value={instruction}
                                className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                                onChange={(e) => {
                                    setInstruction(e.target.value);
                                    setInstructionMessage('');
                                }}
                                onBlur={validateInstruction}
                            />
                            {instructionMessage && <span className='text-sm text-red'>{instructionMessage}</span>}
                        </div>
                        {params.productSlug !== 'create' && (
                            <div className='flex flex-col'>
                                <label htmlFor='reason' className='text-sm mr-1 w-fit cursor-pointer select-none'>
                                    Lý do chỉnh sửa
                                </label>
                                <textarea
                                    id='reason'
                                    rows={2}
                                    value={editReason}
                                    className='px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black resize-none'
                                    onChange={(e) => {
                                        setEditReason(e.target.value);
                                        setEditReasonMessage('');
                                    }}
                                />
                                {editReasonMessage && <span className='text-sm text-red'>{editReasonMessage}</span>}
                            </div>
                        )}
                        <div className='flex gap-1'>
                            <input
                                type='checkbox'
                                id='active'
                                checked={isActive}
                                onChange={(e) => {
                                    setIsActive(e.target.checked);
                                }}
                            />

                            <label htmlFor='active' className='pt-0.5 text-sm'>
                                Kích hoạt
                            </label>
                        </div>
                        <div className='inline-grid grid-cols-2 gap-4 ml-auto w-fit'>
                            <Button to='/admin/products' outline text='Hủy' className='min-w-[6rem]' />
                            <Button submit accent text='Lưu' className='min-w-[6rem]' />
                        </div>
                    </form>
                    <section>
                        <div className='flex items-center gap-4 mb-2'>
                            <span className='text-sm'>Hình ảnh</span>
                            <button
                                type='button'
                                className='flex items-center gap-1 font-semibold text-sm'
                                onClick={handleShowFileSelect}
                            >
                                <img src={icons.plus} alt='plus-icon' className='pb-1 w-2' />
                                <span>Thêm</span>
                            </button>
                            <input
                                ref={inputFileRef}
                                type='file'
                                accept='image/*'
                                hidden
                                multiple
                                onChange={handleSelectFiles}
                            />
                        </div>
                        <div className='grid grid-cols-6 gap-4'>
                            {images.map((image) => (
                                <div
                                    key={image.id}
                                    className='relative flex items-center gap-4 p-2 bg-primary rounded shadow'
                                >
                                    <img
                                        src={`${
                                            image.path.includes('blob:')
                                                ? image.path
                                                : `${import.meta.env.VITE_API_ENDPOINT}/${image.path}`
                                        }`}
                                        alt='product-image'
                                        className='w-full aspect-[3/4] object-cover'
                                    />
                                    <button
                                        type='button'
                                        title='Xóa hình ảnh'
                                        value={image.id}
                                        className='absolute -top-2 -right-2 flex items-center justify-center p-3 w-4 h-4 aspect-square bg-gray rounded-full transition duration-200 hover:opacity-80'
                                        onClick={handleRemoveImage}
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
                <SelectCategoryModal
                    show={showSelectCategoriesModal}
                    onHide={handleHideSelectCategoriesModal}
                    selectedCategories={selectedCategories}
                    setSelectedCategories={setSelectedCategories}
                />
            </PageTransition>
        </AdminContainer>
    );
}
