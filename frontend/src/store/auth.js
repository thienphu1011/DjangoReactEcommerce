import { create } from 'zustand';
import {mountStoreDevtool} from 'simple-zustand-devtools';

const useAuthStore = create((set , get) => ({
    allUsersData: null,
    loading: false,
    user: () => ({
    user_id: get().allUsersData?.user_id || null,
    username: get().allUsersData?.username || null,
    }),

    setUser: (user) => set({ allUsersData: user }),
    setLoading: (loading) => set({ loading }),
    setLoggedIn: () => get().allUsersData !== null,
}))    

if (import.meta.env.DEV) {
    mountStoreDevtool('Store', useAuthStore);
}
export { useAuthStore };