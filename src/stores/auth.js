import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { checkSession } from "../api/authentication.js";

const useAuth = create(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,
            isAuthenticated: false,

            login: (user) => set({user}),
            logout: () => set({user: null}),
            initialize: async () => {
                if (get().isLoading) return;

                set({isLoading: true});

                try {
                    await checkSession();
                    set({ isAuthenticated: true });
                } catch (error) {
                    console.warn("User not authenticated:", error);
                    set({ isAuthenticated: false });
                    useAuth.getState().logout?.();
                } finally {
                    set({ isLoading: false });
                }
            }
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => sessionStorage),
            partialize: (state) => ({ user: state.user })
        }
    )
)

export default useAuth;