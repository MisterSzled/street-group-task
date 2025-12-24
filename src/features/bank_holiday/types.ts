export interface CountryEvent {
    title: string;
    date: string;
    notes: string;
    bunting: boolean;
}

export interface CountryEvents {
    division: string;
    events: CountryEvent[];
}

export interface BankHolidays {
    "england-and-wales": CountryEvents;
    "scotland": CountryEvents;
    "northern-ireland": CountryEvents;
}