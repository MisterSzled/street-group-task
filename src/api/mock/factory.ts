import { delay, http, HttpResponse } from "msw";
import { HTTP_METHOD, HTTP_STATUS } from "../http/codes";
import { Contract } from "../types";

type JSON =
        | string
        | number
        | boolean
        | null
        | Record<string, any>
        | Array<any>;

type Handler<T = any> = (context: T) => Promise<JSON> | JSON;

export type HandlerContext = {
        request: Request;
        params: Record<string, string>;
        cookies: Record<string, string>;
        headers: Headers;
};


export type MockEntry = {
        delay: number;
        handler: (context: HandlerContext) => Promise<any> | any;
}
export type MockMap<C extends Contract> = {
        [K in keyof C]: MockEntry;
};

export function create_mocks_from_contract<C extends Contract>(contract: C, mocks: Partial<MockMap<C>>) {
        const handlers: ReturnType<typeof mock.request>[] = [];

        (Object.keys(contract) as Array<keyof C>).forEach(key => {
                const definition = contract[key];
                const mock_entry = mocks[key];

                if (!mock_entry) {
                        throw new Error(`No mock found for: ${String(key)}`);
                };

                const handler = mock_entry.handler;
                const delay = mock_entry.delay;

                handlers.push(
                        mock.request(definition.method, definition.pattern, handler as any, undefined, delay)
                );
        })

        return handlers;
}

function resolve_method(method: HTTP_METHOD) {
        return method.toLowerCase() as keyof typeof http;
}


function with_delay(handler: Handler, ms?: number): Handler {
        if (!ms) return handler;
        return async (context) => {
                await delay(ms);
                return handler(context);
        }
}

export const mock = {
        request(
                method: HTTP_METHOD,
                route: string,
                handler: Handler,
                status: number = HTTP_STATUS.OK,
                delay?: number
        ) {
                const wrapped = with_delay(handler, delay);

                return http[
                        resolve_method(method)
                ](
                        route, async (context) => {
                                const result = await wrapped(context);

                                if (result instanceof HttpResponse) return result;

                                return HttpResponse.json(result, { status });
                        }
                )
        },

        get(route: string, handler: Handler, status = HTTP_STATUS.OK) {
                return this.request("GET", route, handler, status)
        },
        post(route: string, handler: Handler, status = HTTP_STATUS.OK) {
                return this.request("POST", route, handler, status)
        },
        put(route: string, handler: Handler, status = HTTP_STATUS.OK) {
                return this.request("PUT", route, handler, status)
        },
        patch(route: string, handler: Handler, status = HTTP_STATUS.OK) {
                return this.request("PATCH", route, handler, status)
        },
        delete(route: string, handler: Handler, status = HTTP_STATUS.OK) {
                return this.request("DELETE", route, handler, status)
        },
        error(status: number, message: string) {
                return HttpResponse.json({ message }, { status });
        },
        create(handlers: any[]) {
                return handlers;
        },
}