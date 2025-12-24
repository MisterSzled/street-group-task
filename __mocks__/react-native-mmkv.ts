export const createMMKV = jest.fn(() => ({
        getString: jest.fn(() => null),
        set: jest.fn(),
        remove: jest.fn(),
}));