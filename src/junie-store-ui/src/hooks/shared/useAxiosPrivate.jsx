// Libraries
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

// Hooks
import { useRefreshToken } from '@hooks/shared';

// Redux
import { selectAuth } from '@redux/features/shared/auth';

// Services
import { axiosPrivate } from '@services/shared';

export default function useAxiosPrivate() {
    // States
    const auth = useSelector(selectAuth);

    // Hooks
    const refresh = useRefreshToken();

    // useEffects
    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            (config) => {
                if (!config.headers.Authorization) config.headers.Authorization = `bearer ${auth.accessToken}`;
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseIntercept = axiosPrivate.interceptors.response.use(
            (response) => response,
            async (error) => {
                const newAccessToken = await refresh();
                const previousRequest = error?.config;
                previousRequest.headers.Authorization = `bearer ${newAccessToken}`;
                return axiosPrivate(previousRequest);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        };
    }, [auth.accessToken, refresh]);

    return axiosPrivate;
}
