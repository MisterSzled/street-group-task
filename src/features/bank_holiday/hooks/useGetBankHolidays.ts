import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";
import { bankHolidayAPI } from "../api/bank_holiday.api";
import { useBankHolidays } from "./useBankHolidays";
import { BankHolidays } from "../types";

export function useGetBankHolidays() {
        const bankHolidayStore = useBankHolidays((s) => s);

        return useSingleMutation({
                mutationFn: () =>
                        bankHolidayAPI.get_bank_holidays(),

                onSuccess: (data: BankHolidays | null) => {
                        bankHolidayStore.set_bank_holidays(data)
                },
        })
}