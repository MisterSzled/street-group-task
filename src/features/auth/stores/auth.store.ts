import { storage } from "@src/lib/mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AuthState = {
        isAuthenticated: boolean;
        token: string | null;
        userId: string | number | null;
};

export type AuthActions = {
        login: (token: string, userId?: string | number) => void;
        logout: () => void;
        setToken: (token: string | null) => void;
};

export type AuthStore = AuthState & AuthActions;

const storageAdapter = {
        getItem: async (key: string): Promise<string | null> => storage.getString(key) ?? null,
        setItem: async (key: string, value: string): Promise<void> => storage.set(key, value),
        removeItem: async (key: string): Promise<void> => {
                storage.remove(key)
                return Promise.resolve();
        },
};

export const authStore = create<AuthStore>()(
        persist(
                (set) => ({
                        isAuthenticated: false,
                        token: null,
                        userId: null,

                        login: (token: string, userId?: string | number) => {
                                set({
                                        token,
                                        isAuthenticated: true,
                                        userId: userId ?? null
                                })
                        },

                        logout: () => {
                                set({
                                        token: null,
                                        isAuthenticated: false,
                                        userId: null
                                })
                        },

                        setToken: (token: string | null) => {
                                const clean_token = token && token !== null && token !== "" ? token : null 
                                set({
                                        token: clean_token,
                                        isAuthenticated: clean_token !== null
                                })
                        }
                }),
                {
                        name: "auth-storage",
                        storage: createJSONStorage(() => storageAdapter)
                }
        )
);