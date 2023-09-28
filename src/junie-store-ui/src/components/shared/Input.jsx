// Libraries
import React, { useState } from 'react';

// Assets
import { icons } from '@assets/icons';

const Input = React.forwardRef((props, ref) => {
    // Props
    const { id, label, type, optional, message, className, ...passProps } = props;

    // States
    const [showPassword, setShowPassword] = useState(false);
    const [showRevealButton, setShowRevealButton] = useState(false);

    // Event handlers
    const handleFocusInput = () => {
        setShowRevealButton(true);
    };
    const handleBlurInput = () => {
        setShowRevealButton(false);
    };
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleMouseDownButtonReveal = (e) => {
        e.preventDefault(); // Prevent from hiding the reveal password button when clicking on it
    };

    return (
        <div className='flex-1 relative flex flex-col'>
            <div>
                {label && (
                    <label htmlFor={id} className='text-sm mr-1 w-fit cursor-pointer select-none'>
                        {label}
                    </label>
                )}
                {label && optional && <span className='text-sm text-secondary/50 italic'>(không bắt buộc)</span>}
            </div>
            <div className='relative'>
                <input
                    ref={ref}
                    id={id}
                    type={type === 'password' && showPassword ? 'text' : type ? type : 'text'}
                    className={`${
                        type === 'password' ? 'pr-10 ' : ''
                    }px-4 py-3 w-full rounded-sm outline outline-2 -outline-offset-2 outline-gray transition-all duration-200 focus:outline-black${
                        className ? ' ' + className : ''
                    }`}
                    onFocus={type === 'password' ? handleFocusInput : () => {}}
                    onBlur={type === 'password' ? handleBlurInput : () => {}}
                    {...passProps}
                />
                {type === 'password' && showRevealButton && (
                    <img
                        src={showPassword ? icons.eyeSlash : icons.eye}
                        alt='icon'
                        className='absolute right-4 bottom-3.5 cursor-pointer'
                        onClick={handleShowPassword}
                        onMouseDown={handleMouseDownButtonReveal}
                    />
                )}
            </div>
            {message && <span className='text-sm text-red'>{message}</span>}
        </div>
    );
});

Input.displayName = 'Input';
export default Input;
