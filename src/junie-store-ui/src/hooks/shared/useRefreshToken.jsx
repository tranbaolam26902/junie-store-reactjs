// Libraries
import { useDispatch } from 'react-redux';

// Redux
import { setAccessToken, setUserDto } from '@redux/features/shared/auth';

// Services
import { axios } from '@services/shared';

export default function useRefreshToken() {
    // Hooks
    const dispatch = useDispatch();

    const refresh = async () => {
        const { data } = await axios.get('/api/account/refreshToken', { withCredentials: true });
        console.log(data);
        dispatch(setAccessToken(data.result.token));
        dispatch(setUserDto(data.result.userDto));

        return data.result.token;
    };

    return refresh;
}
