import { authStore } from "../stores/auth.store";

export const useAuth = <T>(selector: (s: ReturnType<typeof authStore.getState>) => T): T => {
        return authStore(selector);
}