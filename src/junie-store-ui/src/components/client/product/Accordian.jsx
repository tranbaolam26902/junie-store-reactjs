// Libraries
import { useState } from 'react';

// Assets
import { icons } from '@assets/icons';

export default function Accordian({ autoShow = false, title, content }) {
    // States
    const [showContent, setShowContent] = useState(autoShow);

    // Event handlers
    const handleToggleShowContent = () => {
        setShowContent((state) => !state);
    };

    return (
        <div className='flex flex-col'>
            <button
                type='button'
                className='flex items-center justify-between py-6 text-left'
                onClick={handleToggleShowContent}
            >
                <span className='font-semibold uppercase'>{title}</span>
                <img
                    src={icons.caretDown}
                    alt='caret-down-icon'
                    className={`mr-4 w-4 transition-transform duration-200${showContent ? ' rotate-180' : ''}`}
                />
            </button>
            <div
                className={`grid ${
                    showContent ? 'grid-rows-[1fr] mb-4' : 'grid-rows-[0fr]'
                } transition-all duration-200`}
            >
                <p
                    dangerouslySetInnerHTML={{ __html: content.replace(/\n/g, '<br /><br />') }}
                    className={`overflow-hidden`}
                ></p>
            </div>
        </div>
    );
}
