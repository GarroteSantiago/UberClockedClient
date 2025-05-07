import { create } from 'zustand';

const useAuth = create((set) => ({
    token: null,
    user: null,
    login: (token, user) => set({ token, user }),
    logout: () => set({ token: null, user: null }),
}));

export default useAuth;