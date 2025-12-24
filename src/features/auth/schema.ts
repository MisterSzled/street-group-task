import { z } from "zod";


export const LoginRequestSchema = z.object({
        username: z.string(),
        password: z.string()
});
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
export const LoginResponseSchema = z.object({
        token: z.string(),
        userId: z.string(),
        username: z.string()
});
export type LoginResponse = z.infer<typeof LoginResponseSchema>;


export const LogoutRequestSchema = z.object({});
export type LogoutRequest = z.infer<typeof LogoutRequestSchema>;
export const LogoutResponseSchema = z.object({});
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>;