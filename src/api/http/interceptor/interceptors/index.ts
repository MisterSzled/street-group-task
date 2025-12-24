import { addInterceptor } from "../interceptor";

import { jsonHeadersInterceptor } from "../interceptors/json_headers";

addInterceptor(jsonHeadersInterceptor);