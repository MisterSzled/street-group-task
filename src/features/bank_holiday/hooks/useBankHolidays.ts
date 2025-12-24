import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";
import { bankHolidayAPI } from "../api/bank_holiday.api";

export function useGetBankHolidays() {
    return useSingleMutation({
        mutationFn: () =>
            bankHolidayAPI.get_bank_holidays(),

        onSuccess: (data) => {
            console.log(data)
        },
    })
}