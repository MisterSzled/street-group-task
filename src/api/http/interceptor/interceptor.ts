export type HttpRequestConfig = {
        method: string;
        url: string;
        headers?: Record<string, string>;
        body?: any
};

export type HttpInterceptor = (config: HttpRequestConfig) => HttpRequestConfig;

let interceptors: HttpInterceptor[] = [];

export function addInterceptor(interceptor: HttpInterceptor) {
        interceptors.push(interceptor);
}


export function applyInterceptors(config: HttpRequestConfig) {
        return interceptors.reduce((config, func) => func(config), config);
}