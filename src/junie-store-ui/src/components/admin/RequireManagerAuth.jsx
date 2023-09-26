// Libraries
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// Redux
import { selectAuth } from '@redux/features/shared/auth';

export default function RequireManagerAuth() {
    // States
    const auth = useSelector(selectAuth);

    return auth.accessToken &&
        auth.userDto.roles.length >= 2 &&
        auth.userDto.roles.some((role) => role.name === 'Manager') &&
        (auth.userDto.roleName === 'Manager' || auth.userDto.roleName === 'Admin') ? (
        <Outlet />
    ) : (
        <p>You do not have access to the requested page.</p>
    );
}
