import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { checkSession } from "../api/authentication.js";

const useAuth = create(
    persist(
        (set, get) => ({
            user: null,
            isLoading: false,

            login: (user) => set({user}),
            logout: () => set({user: null}),
            initialize: async () => {
                if (get().isLoading) return;

                set({isLoading: true});

                await checkSession();

                set({isLoading: false});
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