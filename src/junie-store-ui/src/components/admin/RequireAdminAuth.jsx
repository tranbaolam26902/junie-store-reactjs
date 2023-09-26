// Libraries
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// Redux
import { selectAuth } from '@redux/features/shared/auth';

export default function RequireAdminAuth() {
    // States
    const auth = useSelector(selectAuth);

    return auth.accessToken &&
        auth.userDto.roles.length === 3 &&
        auth.userDto.roles.some((role) => role.name === 'Admin') &&
        auth.userDto.roleName === 'Admin' ? (
        <Outlet />
    ) : (
        <p>You do not have access to the requested page.</p>
    );
}
