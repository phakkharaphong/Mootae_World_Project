import { UserProfile } from '@/interfaces/Member';
import api from './use-post';
import { Auth } from '@/interfaces/Auth';

export const userService = {
    getMe: async () => {
        const res = await api.get<UserProfile>('users/me');
        const data = await res.json();
        return data;
    },
    login: async (username: string, password: string) => {
        const res = await api.post<Auth>('token', {
            json: {
                username,
                password
            }
        });
        const data = await res.json();
        return data;
    },
};
