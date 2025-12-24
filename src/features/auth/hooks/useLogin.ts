import { authApi } from "../api/auth.api";
import { router } from "expo-router";
import { useAuth } from "./useAuth";
import type { LoginRequest } from "../schema";
import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";

export function useLogin() {
        const authStore = useAuth((s) => s.login);

        return useSingleMutation({
                mutationFn: ({username, password}: LoginRequest) => 
                        authApi.login(username, password),

                onSuccess: (data) => {
                        authStore(data.token, data.userId);
                        router.replace("/(shop)/shop")
                },
                
        })
}