// Libraries
import { Link } from 'react-router-dom';

// Assets
import { icons } from '@assets/icons';

// Redux
import { useDispatch, useSelector } from 'react-redux';
import { selectHeader, setHideMobileNavbar } from '@redux/features/client/header';

// Components
import { SidebarModal } from '../shared';

// Temp categories
const categories = [
    {
        id: 1,
        name: 'Mới',
        slug: '/categories/moi'
    },
    {
        id: 2,
        name: 'Bông tai',
        slug: '/categories/bong-tai'
    },
    {
        id: 3,
        name: 'Dây chuyền',
        slug: '/categories/day-chuyen'
    },
    {
        id: 4,
        name: 'Vòng tay',
        slug: '/categories/vong-tay'
    },
    {
        id: 5,
        name: 'Nhẫn',
        slug: '/categories/nhan'
    },
    {
        id: 6,
        name: 'Sale',
        slug: '/categories/sale'
    }
];

export default function MobileNavbar() {
    // Hooks
    const dispatch = useDispatch();

    // States
    const header = useSelector(selectHeader);

    // Event handlers
    const handleHideMobileNavbar = () => {
        dispatch(setHideMobileNavbar());
    };

    return (
        <SidebarModal show={header.showMobileNavbar} onHide={handleHideMobileNavbar} className='xl:hidden'>
            <div className='flex flex-col px-6 py-4 h-full'>
                <button type='button' className='-mt-0.5 -ml-2 p-2 w-fit' onClick={handleHideMobileNavbar}>
                    <img src={icons.close} alt='close-icon' className='w-4' />
                </button>
                <nav className='overflow-y-auto flex-1 flex flex-col divide-y divide-gray'>
                    {categories.map((category) => (
                        <Link
                            to={`${category.slug}`}
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
