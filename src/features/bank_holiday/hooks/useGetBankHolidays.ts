import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";
import { bankHolidayAPI } from "../api/bank_holiday.api";
import { filter_bank_holidays } from "../api/middleware/filter_bank_holidays";
import { useBankHolidays } from "./useBankHolidays";

const STALE_TIME = 7 * 24 * 60 * 60 * 1000;

export function useGetBankHolidays() {
        const bank_holiday_store = useBankHolidays((s) => s);

        return useSingleMutation({
                mutationFn: async () => {
                        const time_now = new Date().getTime();

                        if (!!bank_holiday_store.bank_holidays && !!bank_holiday_store.last_fetched) {
                                if (time_now < bank_holiday_store.last_fetched + STALE_TIME) {
                                        console.log("Cahced cal")
                                        return bank_holiday_store.bank_holidays;
                                }
                        }

                        const data = await bankHolidayAPI.get_bank_holidays();
                        const filitered_events = filter_bank_holidays(data);

                        bank_holiday_store.set_bank_holidays(filitered_events)
                },

                onSuccess: () => {
                },
        })
}