import { Contract } from "@/src/api/types";
import { GetBankHolidayRequestSchema } from "../schema";
import { API_ROUTES } from "./bank_holiday.routes";

export const contract: Contract = {
    get_bank_holidays: {
        method: "GET",
        pattern: API_ROUTES.GET_BANK_HOLIDAYS,
        route: () => API_ROUTES.GET_BANK_HOLIDAYS,
        response: GetBankHolidayRequestSchema
    },
}