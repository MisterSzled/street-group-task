import { bankHolidayStore } from "../stores/bank_holiday.store";

export const useBankHolidays = <T>(selector: (s: ReturnType<typeof bankHolidayStore.getState>) => T): T => {
        return bankHolidayStore(selector);
}