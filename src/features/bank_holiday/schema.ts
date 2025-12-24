import { z } from "zod";

export const GetBankHolidayRequestSchema = z.object({});
export type GetBankHolidayRequest = z.infer<typeof GetBankHolidayRequestSchema>;


const EventSchema = z.object({
    title: z.string(),
    date: z.string(),
    notes: z.string(),
    bunting: z.boolean(),
});

const CountryEventsSchema = z.object({
    division: z.string(),
    events: z.array(EventSchema)
});

export const GetBankHolidayResponseSchema = z.object({
    "england-and-wales": CountryEventsSchema,
    "scotland": CountryEventsSchema,
    "northern-ireland": CountryEventsSchema
});
export type GetBankHolidayResponse = z.infer<typeof GetBankHolidayResponseSchema>;