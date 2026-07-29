import { useAuthStore } from '../store/auth';
import axios from './axios';
import { jwtDecode } from 'jwt-decode';
import Cookie from 'js-cookie';


export const login = async (email, password) => {
 try {
    const { data, status } = await axios.post("/user/token/", 
        { email, password })
    if (status === 200) {
        setAuthUser(data.access, data.refresh);
    }
    return {
        data,
        error: null,
    }
 } catch (error) {
    console.log('Login error:', error);
    return {
        data: null,
        error: error.response.data ? error.response.data.detail || 'An error occurred during login.' : 'An error occurred during login.',
    }
    
 }
 
};

export const register = async (full_name, email, phone, password, password2) => {
    try {
        const { data, status } = await axios.post("/user/register/", 
            { full_name, email, phone, password, password2 })
            await login(email, password);
            return{
                data,
                error: null,
            }
    } catch (error) {      
            return {
            data: null,
            error: error.response.data ? error.response.data.detail || 'An error occurred during registration.' : 'An error occurred during registration.',
        }
    }
};

export const logout = () => {
    Cookie.remove('access_token');
    Cookie.remove('refresh_token');
    useAuthStore.getState().setUser(null);

}

export const setUser = async () => {
    const accessToken = Cookie.get('access_token');
    const refreshToken = Cookie.get('refresh_token');

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

export const setOfUser = (accessToken) => {
    const decodedToken = jwtDecode(accessToken);
    return {
        user_id: decodedToken.user_id,
        username: decodedToken.username,
    };
};

export const setAuthUser = (accessToken, refreshToken) => {
    Cookie.set('access_token', accessToken, {
        expires: 1,
        secure: true,
    });
    Cookie.set('refresh_token', refreshToken, {
        expires: 7,
        secure: true,
    });

    const user = jwtDecode(accessToken) ?? null;
    if (user) {
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
};

export const getRefreshToken = async (refreshToken) => {
    const response = await axios.post('user/token/refresh/', { refresh: refreshToken });
    return response.data;
};

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwtDecode(accessToken);
        return decodedToken.exp < Date.now() / 1000;
    } catch (error) {
        console.log(error);
        return true;
    }
};