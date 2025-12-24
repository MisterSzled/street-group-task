import { apiClient } from "@/src/api/client";
import { GetBankHolidayResponse, GetBankHolidayResponseSchema } from "../schema";
import { contract } from "./bank_holiday.contract";

export const bankHolidayAPI = {
    async get_bank_holidays(): Promise<GetBankHolidayResponse> {
        const data = await apiClient.get(contract.get_bank_holidays.route!());
        return GetBankHolidayResponseSchema.parse(data);
    },
}