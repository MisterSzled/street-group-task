import { authApi } from "../api/auth.api";
import { router } from "expo-router";
import { useAuth } from "./useAuth";
import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";

export function useLogout() {
        const authStore = useAuth((s) => s.logout);

        return useSingleMutation({
                mutationFn: () => 
                        authApi.logout(),

                onSuccess: () => {
                        authStore();
                        router.replace("/")
                }
        })
}