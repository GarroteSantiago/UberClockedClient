import { create } from 'zustand';

const useAuth = create((set) => ({
    token: null,
    login: (token, user) => set({ token, user }),
    logout: () => set({ token: null }),
}));

export default useAuth;