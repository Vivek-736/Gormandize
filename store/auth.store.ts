import { getCurrentUser } from "@/lib/appwrite";
import { User } from "@/type";
import { create } from 'zustand';

type AuthState = {
    isAuthenticated: boolean;
    user: User | null;
    isLoading: boolean;
    setIsAuthenticated: (value: boolean) => void;
    setUser: (user: User | null) => void;
    setLoading: (loading: boolean) => void;
    fetchAuthenticatedUser: () => Promise<void>;
}

const useAuthStore = create<AuthState>((set) => ({
    isAuthenticated: false,
    user: null,
    isLoading: true,
    setIsAuthenticated: (value) => set({ isAuthenticated: value }),
    setUser: (user) => set({ user }),
    setLoading: (value) => set({ isLoading: value }),
    fetchAuthenticatedUser: async () => {
        set({ isLoading: true });
        console.log("Fetching authenticated user...");

        try {
            const user = await getCurrentUser();

            if(user) {
                console.log("User authenticated:", {
                    name: user.name,
                    email: user.email
                });
                set({ isAuthenticated: true, user: user as any as User })
            } else {
                console.log("No user found - setting as unauthenticated");
                set( { isAuthenticated: false, user: null } );
            }
        } catch (e) {
            console.log('fetchAuthenticatedUser error', e);
            set({ isAuthenticated: false, user: null })
        } finally {
            const state = useAuthStore.getState();
            console.log("Fetch authenticated user completed. Final state:", {
                isAuthenticated: state.isAuthenticated,
                hasUser: !!state.user,
                isLoading: false
            });
            set({ isLoading: false });
        }
    }
}))

export default useAuthStore;
