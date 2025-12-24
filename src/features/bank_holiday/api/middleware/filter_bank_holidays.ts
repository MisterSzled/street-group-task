import { BankHolidays, CountryEvent, CountryEvents } from "../../types";

export function filter_bank_holidays(data: BankHolidays | null): CountryEvent[] | null {
        if (data === null) return data;

        let today = new Date();
        let events: Record<string, CountryEvent> = {};
        for (const country of Object.values(data) as CountryEvents[]) {
                for (const event of country.events) {
                        let event_date = new Date(event.date);
                        if (event_date < today) continue;

                        if (events[event.title]) {
                                let previous_entry_date = new Date(events[event.title].date);

                                if (event_date < previous_entry_date) {
                                        events[event.title] = event;
                                }
                        } else {
                                events[event.title] = event
                        }
                }
        }

        let ordered_dates = Object.values(events).sort((a, b) =>
                new Date(a.date).getTime() - new Date(b.date).getTime());

        return ordered_dates.slice(0, 6);
}