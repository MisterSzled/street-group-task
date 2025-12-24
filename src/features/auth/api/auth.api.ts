import { apiClient } from "@/src/api/client";
import { LoginResponse, LoginResponseSchema, LogoutRequest, LogoutResponse, LogoutResponseSchema } from "../schema";
import { contract } from "./auth.contract";

export const authApi = {
        async login(username: string, password: string): Promise<LoginResponse> {
                const data = await apiClient.post(contract.login.route!(), {
                        username,
                        password
                });
                return LoginResponseSchema.parse(data);
        },
        async logout(_: LogoutRequest = {}): Promise<LogoutResponse> {
                const data = await apiClient.post(contract.logout.route!(), {});
                return LogoutResponseSchema.parse(data);
        },
}