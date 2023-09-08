// Libraries
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

// Redux
import { selectAuth } from '@redux/features/shared/auth';

export default function RequiredLogin() {
    // Hooks
    const location = useLocation();

    // States
    const auth = useSelector(selectAuth);

    return auth.accessToken ? <Outlet /> : <Navigate to='/account/login' state={{ from: location }} replace />;
}
