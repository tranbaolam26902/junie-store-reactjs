// Libraries
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import { icons } from '@assets/icons';

// Redux
import { selectAuth, setUserDto } from '@redux/features/shared/auth';

// Services
import { changePassword, updateProfile } from '@services/client/account';

// Components
import { Button, Input } from '@components/shared';

export default function AccountInfoSection() {
    // Hooks
    const dispatch = useDispatch();

    // States
    const auth = useSelector(selectAuth);
    const [isEditName, setIsEditName] = useState(false);
    const [isEditPassword, setIsEditPassword] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [name, setName] = useState(auth.userDto.name || '');
    const [nameMessage, setNameMessage] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [currentPasswordMessage, setCurrentPasswordMessage] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordMessage, setNewPasswordMessage] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    // Refs
    const nameRef = useRef(null);
    const currentPasswordRef = useRef(null);
    const newPasswordRef = useRef(null);
    const confirmPasswordRef = useRef(null);

    // Functions
    const validateName = () => {
        let isValid = true;

        if (nameRef.current.value.trim() === '') {
            setNameMessage('Tên không được để trống');
            isValid = false;
        }

        return isValid;
    };
    const validatePassword = () => {
        let isValid = true;

        if (currentPasswordRef.current.value === '') {
            setCurrentPasswordMessage('Nhập mật khẩu hiện tại.');
            isValid = false;
        }
        if (newPasswordRef.current.value === '') {
            setNewPasswordMessage('Nhập mật khẩu mới.');
            isValid = false;
        }
        if (
            newPasswordRef.current.value !== confirmPasswordRef.current.value &&
            newPasswordRef.current.value !== '' &&
            confirmPasswordRef.current.value !== ''
        ) {
            setConfirmPasswordMessage('Mật khẩu mới và xác nhận mật khẩu mới không trùng khớp.');
            isValid = false;
        }

        return isValid;
    };
    const clearPasswordInputs = () => {
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
    };
    const clearAllMessage = () => {
        setErrorMessages([]);
        setNameMessage('');
        setCurrentPasswordMessage('');
        setNewPasswordMessage('');
        setConfirmPasswordMessage('');
    };

    // Event handlers
    const handleEditName = () => {
        setIsEditName(true);
        if (nameRef.current) {
            nameRef.current.focus();
            nameRef.current.select();
        }
    };
    const handleSaveEditName = async (e) => {
        e.preventDefault();
        if (!validateName()) return;

        setErrorMessages([]);
        const data = await updateProfile({
            name: nameRef.current.value.trim(),
            email: auth.userDto.email,
            phone: auth.userDto.phone,
            address: auth.userDto.address
        });
        if (data.isSuccess) {
            dispatch(setUserDto(data.result));
            setName(data.result.name);
            window.alert('Đổi tên thành công.');
            setIsEditName(false);
        } else setErrorMessages(data.errors);
    };
    const handleCancelEditName = () => {
        setIsEditName(false);
        clearAllMessage();
    };
    const handleEditPassword = () => {
        setIsEditPassword(true);
    };
    const handleSaveEditPassword = async (e) => {
        e.preventDefault();
        if (!validatePassword()) return;

        setErrorMessages([]);
        const data = await changePassword(currentPasswordRef.current.value, newPasswordRef.current.value);
        if (data.isSuccess) {
            window.alert('Đổi mật khẩu thành công.');
            clearPasswordInputs();
            setIsEditPassword(false);
        } else setErrorMessages(data.errors);
    };
    const handleCancelEditPassword = () => {
        setIsEditPassword(false);
        clearAllMessage();
    };

    return (
        <section className='lg:col-span-3 flex flex-col gap-2'>
            {/* Start: Header section */}
            <div className='flex items-center gap-2'>
                <img src={icons.user} alt='user-icon' className='w-4' />
                <span className='font-semibold'>Hồ sơ</span>
            </div>
            {/* End: Header section */}

            <form
                className='flex flex-col gap-2 p-8 bg-primary rounded-lg shadow-md'
                onSubmit={isEditName ? handleSaveEditName : handleSaveEditPassword}
            >
                {errorMessages.map((errorMessage, index) => (
                    <span key={index} className='mx-auto text-sm text-red'>
                        {errorMessage}
                    </span>
                ))}
                {/* Start: Name section */}
                {isEditName ? (
                    <Input
                        ref={nameRef}
                        label='Tên'
                        tabIndex={-1}
                        autoFocus
                        title={auth.userDto.name}
                        value={name}
                        message={nameMessage}
                        onChange={(e) => {
                            setName(e.target.value);
                            setNameMessage('');
                        }}
                        onBlur={validateName}
                    />
                ) : (
                    <div className='flex flex-col'>
                        <span className='font-thin text-secondary/80'>Tên</span>
                        <div className='flex items-center gap-4'>
                            <div className='flex-1'>
                                <span>{auth.userDto.name}</span>
                            </div>
                            {!isEditName && !isEditPassword && (
                                <button type='button' title='Đổi tên' onClick={handleEditName}>
                                    <img src={icons.edit} alt='edit-icon' className='w-4' />
                                </button>
                            )}
                        </div>
                    </div>
                )}
                {/* End: Name section */}

                {/* Start: Password section */}
                {!isEditPassword ? (
                    <div className='flex flex-col'>
                        <span className='font-thin text-secondary/80'>Mật khẩu</span>
                        <div className='flex items-center gap-4'>
                            <span className='flex-1'>********</span>
                            {!isEditName && !isEditPassword && (
                                <button type='button' title='Đổi mật khẩu' onClick={handleEditPassword}>
                                    <img src={icons.edit} alt='edit-icon' className='w-4' />
                                </button>
                            )}
                        </div>
                    </div>
                ) : (
                    <div className='flex flex-col gap-4'>
                        <div className='flex flex-col gap-1'>
                            <Input
                                ref={currentPasswordRef}
                                label='Mật khẩu hiện tại'
                                id='current-password'
                                type='password'
                                autoFocus
                                value={currentPassword}
                                message={currentPasswordMessage}
                                onChange={(e) => {
                                    setCurrentPassword(e.target.value);
                                    setCurrentPasswordMessage('');
                                }}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Input
                                ref={newPasswordRef}
                                label='Mật khẩu mới'
                                id='new-password'
                                value={newPassword}
                                message={newPasswordMessage}
                                type='password'
                                className='px-4 py-2 rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black'
                                onChange={(e) => {
                                    setNewPassword(e.target.value);
                                    setNewPasswordMessage('');
                                    setConfirmPasswordMessage('');
                                }}
                                onBlur={validatePassword}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Input
                                ref={confirmPasswordRef}
                                label='Xác nhận mật khẩu mới'
                                id='confirm-password'
                                type='password'
                                value={confirmPassword}
                                message={confirmPasswordMessage}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setConfirmPasswordMessage('');
                                }}
                                onBlur={validatePassword}
                            />
                        </div>
                    </div>
                )}
                {/* End: Password section */}

                {/* Start: Email section */}
                <div className='flex flex-col'>
                    <span className='font-thin text-secondary/80'>Email</span>
                    <span>example@gmail.com</span>
                </div>
                {/* End: Email section */}

                {/* Start: Button sections */}
                {(isEditName || isEditPassword) && (
                    <div className='text-end'>
                        <div className='inline-grid grid-cols-2 gap-4'>
                            <Button
                                outline
                                text='Hủy'
                                onClick={isEditName ? handleCancelEditName : handleCancelEditPassword}
                            />
                            <Button submit secondary text='Lưu' className='px-8' />
                        </div>
                    </div>
                )}
                {/* End: Button sections */}
            </form>
        </section>
    );
}
