export interface CountryEvent {
    title: string;
    date: string;
    notes: string;
    bunting: boolean;
}

export interface StoreCountryEvent extends CountryEvent {
    slug: string
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