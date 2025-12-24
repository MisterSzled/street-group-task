import { create_mocks_from_contract } from "@/src/api/mock/factory";
import { register_mocks } from "@src/api/mock/registry";
import { contract } from "./auth.contract";

import { login } from "./mocks/login";
import { logout } from "./mocks/logout";

export const authMocks = {
        login: login,
        logout: logout,
}

export const authMockApi = create_mocks_from_contract(contract, authMocks);

register_mocks(() => authMockApi);