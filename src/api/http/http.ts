import { HTTP_METHOD } from "./codes";
import { applyInterceptors, HttpRequestConfig } from "./interceptor/interceptor";

async function request<T>(method: HTTP_METHOD, url: string, body?: any, timeout = 20_000): Promise<T> {
        let config: HttpRequestConfig = { method, url };

        const controller = new AbortController();
        const timeout_timer = setTimeout(() => controller.abort(), timeout)

        if (body) {
                config.body = JSON.stringify(body);
        };

        config = applyInterceptors(config);

        try {
                const response = await fetch(config.url, {
                        method: config.method,
                        headers: config.headers,
                        body: config.body,
                        signal: controller.signal
                });

                if (!response.ok) {
                        let text;
                        try {
                                const error_response_text = await response.json();
                                text = error_response_text;
                        } catch (error) {
                                text = response.statusText || "Unknown error";
                        }

                        throw new Error(`${method} ${url} failed: ${response.status} - error: ${text}`);
                }

                return response.json() as Promise<T>;
        } catch (error: any) {
                if (error.name === "AbortError") {
                        throw new Error(`Request: ${url} timed out after ${timeout}ms`);
                }
                return error
        } finally {
                clearTimeout(timeout_timer);
        }
}

export const httpGet = <T>(url: string) => request<T>("GET", url);
export const httpPost = <T>(url: string, body?: any) => request<T>("POST", url, body);
export const httpPut = <T>(url: string, body?: any) => request<T>("PUT", url, body);
export const httpPatch = <T>(url: string, body?: any) => request<T>("PATCH", url, body);
export const httpDelete = <T>(url: string) => request<T>("DELETE", url);