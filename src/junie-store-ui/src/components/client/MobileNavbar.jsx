// Libraries
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

// Assets
import { icons } from '@assets/icons';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectHeader, setHideMobileNavbar } from '@redux/features/client/header';

// Services
import { getCategoriesShowOnMenu } from '@services/client';

// Components
import { SidebarModal } from '@components/shared';

export default function MobileNavbar() {
    // Hooks
    const dispatch = useDispatch();

    // States
    const header = useSelector(selectHeader);
    const [categories, setCategories] = useState([]);

    // Functions
    const getHeaderCategories = async () => {
        const result = await getCategoriesShowOnMenu();

        if (result) setCategories(result.items);
        else setCategories([]);
    };

    // Event handlers
    const handleHideMobileNavbar = () => {
        dispatch(setHideMobileNavbar());
    };

    // Side effects
    /* Get categories for sidebar */
    useEffect(() => {
        getHeaderCategories();
    }, []);

    return (
        <SidebarModal show={header.showMobileNavbar} onHide={handleHideMobileNavbar} className='xl:hidden'>
            <div className='flex flex-col px-6 py-4 h-full'>
                <button type='button' className='-mt-0.5 -ml-2 p-2 w-fit' onClick={handleHideMobileNavbar}>
                    <img src={icons.close} alt='close-icon' className='w-4' />
                </button>
                <nav className='overflow-y-auto flex-1 flex flex-col divide-y divide-gray'>
                    {categories.map((category) => (
                        <Link
                            to={`/categories/${category.urlSlug}`}
                            key={category.id}
                            className='py-4 text-xl'
                            onClick={handleHideMobileNavbar}
                        >
                            {category.name}
                        </Link>
                    ))}
                </nav>
                <Link
                    to='/account'
                    className='flex items-center gap-4 -mb-4 -mx-6 px-6 py-4 border border-t border-gray'
                    onClick={handleHideMobileNavbar}
                >
                    <img src={icons.user} alt='user-icon' className='w-4' />
                    <span>Tài khoản</span>
                </Link>
            </div>
        </SidebarModal>
    );
}
