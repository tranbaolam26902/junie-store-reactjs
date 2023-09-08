// Libraries
import { useDispatch } from 'react-redux';

// Redux
import { setAccessToken, setUserDto } from '@redux/features/shared/auth';

// Services
import { axiosPrivate } from '@services/shared';

export default function useLogin() {
    // Hooks
    const dispatch = useDispatch();

    const login = async (username, password) => {
        const { data } = await axiosPrivate.post('/api/account/login', {
            username,
            password
        });

        if (data.isSuccess) {
            dispatch(setAccessToken(data.result.token));
            dispatch(setUserDto(data.result.userDto));
        }

        return data;
    };

    return login;
}
