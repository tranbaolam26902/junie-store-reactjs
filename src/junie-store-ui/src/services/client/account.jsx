// Services
import { axiosPrivate } from '@services/shared';

const updateProfile = async (profile) => {
    const { data } = await axiosPrivate.put('/api/account/updateProfile', profile);

    return data || null;
};

const changePassword = async (oldPassword, newPassword) => {
    const { data } = await axiosPrivate.put('/api/account/changePassword', {
        oldPassword,
        newPassword,
        confirmPassword: newPassword
    });

    return data || null;
};

export { updateProfile, changePassword };
