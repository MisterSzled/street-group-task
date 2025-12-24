// __tests__/useGetBankHolidays.test.ts
import { bankHolidayAPI } from '@/src/features/bank_holiday/api/bank_holiday.api';
import { filter_bank_holidays } from '@/src/features/bank_holiday/api/middleware/filter_bank_holidays';
import { useBankHolidays } from '@/src/features/bank_holiday/hooks/useBankHolidays';
import { useGetBankHolidays } from '@/src/features/bank_holiday/hooks/useGetBankHolidays';
import { StoreCountryEvent } from '@/src/features/bank_holiday/types';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react-hooks';

jest.mock('@/src/features/bank_holiday/api/bank_holiday.api');
jest.mock('@/src/features/bank_holiday/api/middleware/filter_bank_holidays');
jest.mock('@/src/features/bank_holiday/hooks/useBankHolidays');
jest.mock('react-native-mmkv');

describe('useGetBankHolidays', () => {
        const mockSetBankHolidays = jest.fn();

        const fakeStore: {
                bank_holidays: StoreCountryEvent[];
                last_fetched: number | null;
                set_bank_holidays: jest.Mock;
        } = {
                bank_holidays: [],
                last_fetched: null,
                set_bank_holidays: mockSetBankHolidays,
        };

        const wrapper = ({ children }: { children: React.ReactNode }) => {
                const queryClient = new QueryClient();
                return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
        };

        beforeEach(() => {
                jest.clearAllMocks();
                (useBankHolidays as jest.Mock).mockReturnValue(fakeStore);
        });

        it('fetches bank holidays when store is empty', async () => {
                const apiData = [{ title: 'New Year', date: '2025-01-01' }];
                (bankHolidayAPI.get_bank_holidays as jest.Mock).mockResolvedValue(apiData);
                (filter_bank_holidays as jest.Mock).mockReturnValue(apiData);

                const { result } = renderHook(() => useGetBankHolidays(), { wrapper });
                await result.current.mutateAsync({});

                expect(bankHolidayAPI.get_bank_holidays).toHaveBeenCalled();
                expect(filter_bank_holidays).toHaveBeenCalledWith(apiData);
                expect(mockSetBankHolidays).toHaveBeenCalledWith(
                        expect.arrayContaining([
                                expect.objectContaining({ title: 'New Year', slug: 'new-year' }),
                        ])
                );
        });

        it('returns cached bank holidays if within stale time', async () => {
                const now = Date.now();
                fakeStore.bank_holidays = [
                        { title: 'Cached', date: '2025-02-01', slug: 'cached', notes: '', bunting: false },
                ];
                fakeStore.last_fetched = now;

                const { result } = renderHook(() => useGetBankHolidays(), { wrapper });
                const data = await result.current.mutateAsync({});

                expect(data).toEqual(fakeStore.bank_holidays);
                expect(bankHolidayAPI.get_bank_holidays).not.toHaveBeenCalled();
        });

        it('forces refresh when force_invalidate is true', async () => {
                const apiData = [{ title: 'Force Refresh', date: '2025-03-01' }];
                (bankHolidayAPI.get_bank_holidays as jest.Mock).mockResolvedValue(apiData);
                (filter_bank_holidays as jest.Mock).mockReturnValue(apiData);

                const { result } = renderHook(() => useGetBankHolidays(), { wrapper });
                await result.current.mutateAsync({ force_invalidate: true });

                expect(bankHolidayAPI.get_bank_holidays).toHaveBeenCalled();
                expect(mockSetBankHolidays).toHaveBeenCalledWith(
                        expect.arrayContaining([
                                expect.objectContaining({ title: 'Force Refresh', slug: 'force-refresh' }),
                        ])
                );
        });
});
