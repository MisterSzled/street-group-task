import { useSingleMutation } from "@/src/api/hooks/useSingleMutation";
import { StoreCountryEvent } from "../types";
import { useBankHolidays } from "./useBankHolidays";
import { router } from "expo-router";

interface UpdateBankHoliday {
        slug: string;
        title: string;
        date: Date;
}

export function useUpdateBankHoliday() {
        const bank_holiday_store = useBankHolidays((s) => s);

        return useSingleMutation({
                mutationFn: async ({ slug, title, date }: UpdateBankHoliday) => {
                        const events = bank_holiday_store.bank_holidays;

                        if (!events || events.length === 0) return;

                        const updatedEvents: StoreCountryEvent[] = events.map(event => {
                                if (event.slug !== slug) {
                                        return event;
                                }

                                return {
                                        ...event,
                                        title,
                                        date: date.toISOString().split("T")[0],
                                        slug: slug,
                                };
                        });

                        bank_holiday_store.set_bank_holidays(updatedEvents);


                        router.push("/")
                },
        });
}
