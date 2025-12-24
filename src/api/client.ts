import "./http/interceptor/interceptors/index";

import { httpDelete, httpGet, httpPatch, httpPost, httpPut } from "./http/http";

export const apiClient = {
        get: httpGet,
        post: httpPost,
        put: httpPut,
        patch: httpPatch,
        delete: httpDelete
}