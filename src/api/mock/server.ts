import { setupServer } from "msw/native";
import { get_mocks } from "./registry";

// Trigger registers
import "@src/features/bank_holiday/api/bank_holiday.mocks";

export const allMockApi = get_mocks();

export const mockServer = setupServer(...allMockApi);