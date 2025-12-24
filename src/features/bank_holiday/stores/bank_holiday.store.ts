import { storage } from "@src/lib/mmkv";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { CountryEvent } from "../types";

export type BankHolidayState = {
    bank_holidays: CountryEvent[] | null,
    last_fetched: number | null
};

export type BankHolidayActions = {
    set_bank_holidays: (bank_holidays: CountryEvent[] | null) => void;
};

export type BankHolidayStore = BankHolidayState & BankHolidayActions;

const storageAdapter = {
    getItem: async (key: string): Promise<string | null> => storage.getString(key) ?? null,
    setItem: async (key: string, value: string): Promise<void> => storage.set(key, value),
    removeItem: async (key: string): Promise<void> => {
        storage.remove(key)
        return Promise.resolve();
    },
};

export const bankHolidayStore = create<BankHolidayStore>()(
    persist(
        (set) => ({
            bank_holidays: null,
            last_fetched: null,

            set_bank_holidays: (bank_holidays: CountryEvent[] | null) => {
                set({
                    bank_holidays,
                    last_fetched: new Date().getTime()
                })
            }
        }),
        {
            name: "bank_holiday-storage",
            storage: createJSONStorage(() => storageAdapter)
        }
    )
);