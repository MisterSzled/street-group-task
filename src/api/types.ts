import { HTTP_METHOD } from "./http/codes";

export type ContractEntry<R = any, P = any> = {
        method: HTTP_METHOD;
        pattern: string;
        route?: (...args: P[]) => string;
        response?: R
}

export type Contract = Record<string, ContractEntry>;