import { Contract } from "@/src/api/types";
import { LoginRequestSchema, LogoutRequestSchema } from "../schema";
import { API_ROUTES } from "./auth.routes";

export const contract: Contract = {
        login: {
                method: "POST",
                pattern: API_ROUTES.LOGIN,
                route: () => API_ROUTES.LOGIN,
                response: LoginRequestSchema
        },

        logout: {
                method: "POST",
                pattern: API_ROUTES.LOGOUT,
                route: () => API_ROUTES.LOGOUT,
                response: LogoutRequestSchema
        }
}