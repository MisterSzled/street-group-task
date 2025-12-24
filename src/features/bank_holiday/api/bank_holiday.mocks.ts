import { create_mocks_from_contract } from "@/src/api/mock/factory";
import { register_mocks } from "@src/api/mock/registry";
import { contract } from "./bank_holiday.contract";

import { get_bank_holidays } from "./mocks/get_bank_holidays";

export const bankHolidayMocks = {
        get_bank_holidays: get_bank_holidays,
}

export const bankHolidayMockApi = create_mocks_from_contract(contract, bankHolidayMocks);

register_mocks(() => bankHolidayMockApi);