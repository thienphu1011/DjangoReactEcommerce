import { useAuthStore } from '.../stores/auth';
import axios from './axios';
import jwt_decode from 'jwt-decode';
import Cookie from 'js-cookie';
import { getAdapter } from 'axios';


export const login =(email, password) => {
 try {
    const { data, status } = axios.post("/user/token/", 
        { email, password })
    if (status === 200) {
        setAuthUser(data.access, data.refresh);
    }
 } catch (error) {
    return {
        data: null,
        error: error.response.data ? error.response.data.detail || 'An error occurred during login.' : 'An error occurred during login.',
    }
    console.log('Login error:', error);
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
    useAuthStore().getState().setUser(null);

}

export const setUser = async () => {
    user.AccessToken = Cookie.get('access_token')
    user.RefreshToken = Cookie.get('refresh_token')

    if (!accessToken || refreshToken) {
        return;
    }
    if (isTokenExpired(accessToken)) {
        const repsonse = await getRefreshToken(refreshToken);
        setAuthUser(response.access, response.refresh);
    } else {
        setAuthUser(accessToken, refreshToken);
    }
};

export const setOfUser = (accessToken, refreshToken) => {
    const decodedToken = jwt_decode(accessToken);
    const userData = {  
        user_id: decodedToken.user_id,
        username: decodedToken.username,
}
};

export const setAuthUser = (accessToken, refreshToken) => {
    Cookies.set('access_token', accessToken, 
    { 
        expire: 1, 
        secure: true 
    });
    Cookies.set('refresh_token', refreshToken,
    { 
        expire: 7, 
        secure: true 
    });
    const user= jwt_decode(accessToken) ?? null
    if (user){
        useAuthStore.getState().setUser(user);
    }
    useAuthStore.getState().setLoading(false);
    
}

export const getRefreshToken = async () => {
    const refresh_token= Cookies.get("refresh_token");
    const reponse= await axios.post('user/token/refresh/', { refresh: refresh_token });
    return reponse.data;
}

export const isAccessTokenExpired = (accessToken) => {
    try{
        const decodedToken = jwt_decode(accessToken);
        return decodedToken.exp  < Date.now() /100;
    } catch (error) {
        console.log(error);
        return true;
    }
}