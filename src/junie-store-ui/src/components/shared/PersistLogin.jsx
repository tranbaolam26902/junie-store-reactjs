// Libraries
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

// Hooks
import { useRefreshToken } from '@hooks/shared';

// Redux
import { selectAuth } from '@redux/features/shared/auth';

export default function PersistLogin() {
    // Hooks
    const refresh = useRefreshToken();

    // States
    const auth = useSelector(selectAuth);
    const [isLoading, setIsLoading] = useState(true);

    // Side effects
    useEffect(() => {
        !auth.accessToken ? verifyRefreshToken() : setIsLoading(false);

        async function verifyRefreshToken() {
            try {
                await refresh();
            } finally {
                setIsLoading(false);
            }
        }
        // eslint-disable-next-line
    }, []);

    return <>{isLoading ? null : <Outlet />}</>;
}
