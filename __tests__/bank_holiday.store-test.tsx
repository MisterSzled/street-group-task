import { bankHolidayStore } from "../src/features/bank_holiday/stores/bank_holiday.store";
import { StoreCountryEvent } from "../src/features/bank_holiday/types";

jest.mock("@src/lib/mmkv", () => ({
        storage: {
                getString: jest.fn(),
                set: jest.fn(),
                remove: jest.fn(),
        },
}));

describe("bankHolidayStore", () => {
        beforeEach(() => {
                bankHolidayStore.setState({
                        bank_holidays: [],
                        last_fetched: null,
                });
                jest.clearAllMocks();
        });

        it("should initialize with empty bank_holidays and null last_fetched", () => {
                const state = bankHolidayStore.getState();
                expect(state.bank_holidays).toEqual([]);
                expect(state.last_fetched).toBeNull();
        });

        it("should update bank_holidays and set last_fetched when set_bank_holidays is called", () => {
                const newEvents: StoreCountryEvent[] = [
                        { title: "New Year", date: "2026-01-01", slug: "new-year", notes: "", bunting: false },
                        { title: "Christmas", date: "2026-12-25", slug: "christmas", notes: "", bunting: false },
                ];

                const beforeTime = Date.now();
                bankHolidayStore.getState().set_bank_holidays(newEvents);
                const state = bankHolidayStore.getState();

                expect(state.bank_holidays).toEqual(newEvents);
                expect(state.last_fetched).toBeGreaterThanOrEqual(beforeTime);
        });

        it("should call storage.set when set_bank_holidays is called", async () => {
                const { storage } = require("@src/lib/mmkv");
                const newEvents: StoreCountryEvent[] = [
                        { title: "Test Holiday", date: "2026-07-04", slug: "test-holiday", notes: "", bunting: false },
                ];

                bankHolidayStore.getState().set_bank_holidays(newEvents);

                expect(storage.set).toHaveBeenCalled();
        });

        it("should reset bank_holidays to empty array if set_bank_holidays called with empty array", () => {
                bankHolidayStore.getState().set_bank_holidays([]);
                const state = bankHolidayStore.getState();
                expect(state.bank_holidays).toEqual([]);
        });
});
