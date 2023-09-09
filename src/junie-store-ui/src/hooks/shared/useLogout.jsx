// Libraries
import { useDispatch } from 'react-redux';

// Hooks
import { useAxiosPrivate } from '@hooks/shared';

// Redux
import { setAccessToken, setUserDto } from '@redux/features/shared/auth';

export default function useLogout() {
    // Hooks
    const dispatch = useDispatch();
    const axiosPrivate = useAxiosPrivate();

    const logout = async () => {
        const { data } = await axiosPrivate.get('/api/account/logout');

        if (data.isSuccess) {
            dispatch(setAccessToken(''));
            dispatch(setUserDto({}));
        }

        return data;
    };

    return logout;
}
