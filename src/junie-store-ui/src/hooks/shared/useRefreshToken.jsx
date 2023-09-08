// Libraries
import { useDispatch } from 'react-redux';

// Redux
import { setAccessToken, setUserDto } from '@redux/features/shared/auth';

// Services
import { axiosPrivate } from '@services/shared';

export default function useRefreshToken() {
    // Hooks
    const dispatch = useDispatch();

    const refresh = async () => {
        const { data } = await axiosPrivate.get('/api/account/refreshToken');

        if (!data.isSuccess) return;
        dispatch(setAccessToken(data.result.token));
        dispatch(setUserDto(data.result.userDto));

        return data.result.token;
    };

    return refresh;
}
