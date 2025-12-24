import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";
import { bankHolidayAPI } from "../api/bank_holiday.api";
import { filter_bank_holidays } from "../api/middleware/filter_bank_holidays";
import { StoreCountryEvent } from "../types";
import { useBankHolidays } from "./useBankHolidays";

const STALE_TIME = 7 * 24 * 60 * 60 * 1000;

function slugify(input: string): string {
        return input
                .toLowerCase()
                .replace(/[^a-z0-9\s]/g, "")
                .trim()
                .replaceAll(" ", "-");
}

export function useGetBankHolidays() {
        const bank_holiday_store = useBankHolidays((s) => s);

        return useSingleMutation({
                mutationFn: async ({ force_invalidate }: { force_invalidate?: boolean } = {}) => {
                        const time_now = new Date().getTime();

                        if (
                                !force_invalidate &&
                                !!bank_holiday_store.bank_holidays &&
                                !!bank_holiday_store.last_fetched
                        ) {
                                if (time_now < bank_holiday_store.last_fetched + STALE_TIME) {
                                        return bank_holiday_store.bank_holidays;
                                }
                        }

                        const data = await bankHolidayAPI.get_bank_holidays();
                        const filitered_events = filter_bank_holidays(data);

                        if (filitered_events === null) {
                                bank_holiday_store.set_bank_holidays([])
                        } else {
                                const store_events = filitered_events.map(event => ({
                                        ...event,
                                        slug: slugify(event.title)
                                })) as StoreCountryEvent[];

                                bank_holiday_store.set_bank_holidays(store_events);
                        }
                },

                onSuccess: () => {
                },
        })
}