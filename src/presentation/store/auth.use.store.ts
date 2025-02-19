import { create } from "zustand";
import { User } from "../../domain/entities/user";
import { AuthStatus } from "../../infrastructure/interfaces/auth.status";
import { authCheckStatus, authLogin, authRegister } from "../../actions/auth/auth";
import { StorageAdapter } from "../../config/adapters/storage-adapter";

export interface AuthState {
    status: AuthStatus;
    token?: string;
    user?: User;

    login: (email: string, password: string) => Promise<boolean>;
    checkStatus: () => void;
    logOut: () => void;
    register: (email: string, password: string, fullName: string) => Promise<boolean>;
}


export const useAuthStore = create<AuthState>()((set, get) => ({
    status: 'checking',
    token: undefined,
    user: undefined,

    login: async (email: string, password: string) => {
        try {    
            const resp = await authLogin(email, password);
    
            if (!resp || !resp.token || !resp.user) {
                set((state) => ({
                    ...state,
                    status: 'unauthenticated',
                    token: undefined,
                    user: undefined
                }));
                return false;
            }
                await StorageAdapter.setItem('token', resp.token);
    
            set((state) => ({
                ...state,
                status: 'authenticated',
                token: resp.token,
                user: resp.user
            }));
    
            return true;
        } catch (error) {
            set((state) => ({
                ...state,
                status: 'unauthenticated',
                token: undefined,
                user: undefined
            }));
            return false;
        }
    },
    
    checkStatus: async () => {
        const resp = await authCheckStatus();

        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined });
            await StorageAdapter.removeItem('token');
            return;
        }

        // Save token and user in local storage
        await StorageAdapter.setItem('token', resp.token);
        set({ status: 'authenticated', token: resp.token, user: resp.user });
    },

    logOut: async () => {
        // Remove token from local storage
        await StorageAdapter.removeItem('token');
        set({ status: 'unauthenticated', token: undefined, user: undefined });
    },

    register: async (email: string, password: string, fullName: string) => {
        const resp = await authRegister(email, password, fullName);

        if (!resp) {
            set({ status: 'unauthenticated', token: undefined, user: undefined })
            return false;
        }
        // Save token and user in local storage
        await StorageAdapter.setItem('token', resp.token);

        set({ status: 'authenticated', token: resp.token, user: resp.user });

        return true;
    }

}))


