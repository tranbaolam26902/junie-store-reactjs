// Libraries
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

// Assets
import { icons } from '@assets/icons';
import { images } from '@assets/images';

// Redux
import { selectSidebar, setCurrentTab } from '@redux/features/admin/sidebar';

// Tabs
const tabs = [
    {
        id: 1,
        name: 'Dashboard',
        value: 'dashboard',
        icon: icons.homeBlack,
        activeIcon: icons.homeWhite
    },
    {
        id: 2,
        name: 'Danh mục',
        value: 'categories',
        icon: icons.categoryBlack,
        activeIcon: icons.categoryWhite
    },
    {
        id: 3,
        name: 'Sản phẩm',
        value: 'products',
        icon: icons.productBlack,
        activeIcon: icons.productWhite
    },
    {
        id: 4,
        name: 'Đơn hàng',
        value: 'orders',
        icon: icons.orderBlack,
        activeIcon: icons.orderWhite
    },
    {
        id: 5,
        name: 'Tài khoản',
        value: 'users',
        icon: icons.userBlack,
        activeIcon: icons.userWhite
    }
];

export default function Sidebar() {
    // Hooks
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // States
    const sidebar = useSelector(selectSidebar);
    const [currentTabOffsetTop, setCurrentTabOffsetTop] = useState(0);

    // Event handlers
    const handleChangeCurrentTab = (e, tab) => {
        dispatch(setCurrentTab(e.target.closest('button').value));
        setCurrentTabOffsetTop(e.target.closest('button').offsetTop);
        navigate(`/admin/${tab.value}`);
    };

    // Side effects
    /* Bind current tab value with pathname */
    useEffect(() => {
        const currentTabValue = window.location.pathname.split('/')[2];
        const currentTabElement = document.querySelector(`button[value=${currentTabValue}]`);

        dispatch(setCurrentTab(currentTabValue));
        if (currentTabElement) setCurrentTabOffsetTop(currentTabElement.offsetTop);
        // eslint-disable-next-line
    }, [window.location.pathname]);

    return (
        <section className='sticky top-0 flex flex-col gap-4 p-4 w-56 h-screen bg-primary border-r border-gray shadow overflow-y-auto'>
            <Link to='/' className='my-4'>
                <img src={images.logo} alt='logo' className='mx-auto w-20' />
            </Link>
            <div className='relative flex flex-col'>
                <span
                    className={`absolute -z-10 w-full h-12 bg-black rounded transition-all duration-200`}
                    style={{ top: currentTabOffsetTop + 'px' }}
                ></span>
                {tabs.map((tab) => (
                    <button
                        key={tab.id}
                        type='button'
                        value={tab.value}
                        className={`flex items-center gap-2 px-6 py-3 text-left rounded transition duration-200${
                            sidebar.currentTab === tab.value ? ' text-primary' : ''
                        }`}
                        onClick={(e) => handleChangeCurrentTab(e, tab)}
                    >
                        <img
                            src={tab.activeIcon}
                            alt='tab-icon'
                            className={`absolute z-0 w-5 transition duration-200`}
                        />
                        <img
                            src={tab.icon}
                            alt='tab-icon'
                            className={`z-10 w-5 transition duration-200${
                                sidebar.currentTab === tab.value ? ' opacity-0' : ''
                            }`}
                        />
                        <span>{tab.name}</span>
                    </button>
                ))}
            </div>
        </section>
    );
}
