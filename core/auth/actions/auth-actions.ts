import { productsApi } from '../../api/productsApi';
import { User } from '../interface/user';

export interface AuthResponse {
    id: string;
    email: string;
    fullName: string;
    isActive: boolean;
    roles: string[];
    token: string;
}

const returnUserToken = (
    data: AuthResponse,
): {
    user: User;
    token: string;
} => {
    // const { id, email, fullName, isActive, roles, token } = data;
    const { token, ...user } = data;

    // const user: User = {
    //   id,
    //   email,
    //   fullName,
    //   isActive,
    //   roles,
    // };

    return {
        user,
        token,
    };
};

export const authLogin = async (email: string, password: string) => {
    email = email.toLowerCase();

    try {
        // const { data } = await productsApi.post<AuthResponse>('/auth/login', {
        //     email,
        //     password,
        // });

        const data = {
            id: '1',
            email: 'prueba@test.cl',
            fullName: 'Prueba',
            isActive: true,
            roles: ['admin'],
            token: '123456',
        };

        // if (email !== data.email || password !== '123456') {
        //     return null;
        // }

        return returnUserToken(data);
    } catch (error) {
        // throw new Error('User and/or password not valid');
        return null;
    }
};

export const authCheckStatus = async () => {
    try {
        return null;
        // const { data } = await productsApi.get<AuthResponse>('/auth/check-status');
        const data = {
            id: '1',
            email: 'prueba@test.cl',
            fullName: 'Prueba',
            isActive: true,
            roles: ['admin'],
            token: '123456',
        };
        return returnUserToken(data);
    } catch (error) {
        return null;
    }
};

// TODO: Tarea: Hacer el register
