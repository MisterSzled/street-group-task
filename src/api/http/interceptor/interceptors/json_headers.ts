import { HttpInterceptor } from "../interceptor";

export const jsonHeadersInterceptor: HttpInterceptor = (config) => ({
        ...config,
        headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                ...(config.headers ?? {})
        }
})