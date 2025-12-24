import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";
import { bankHolidayAPI } from "../api/bank_holiday.api";
import { useBankHolidays } from "./useBankHolidays";
import { BankHolidays } from "../types";
import { filter_bank_holidays } from "../api/middleware/filter_bank_holidays";

export function useGetBankHolidays() {
        const bankHolidayStore = useBankHolidays((s) => s);

        return useSingleMutation({
                mutationFn: () =>
                        bankHolidayAPI.get_bank_holidays(),

                onSuccess: (data: BankHolidays | null) => {
                        let filitered_events = filter_bank_holidays(data);
                        bankHolidayStore.set_bank_holidays(filitered_events)
                },
        })
}