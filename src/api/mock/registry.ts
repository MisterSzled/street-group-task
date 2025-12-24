import { HttpHandler } from "msw";

type MockProvider = () => HttpHandler[];
const registry: MockProvider[] = [];

export const register_mocks = (provider: MockProvider) => {
        registry.push(provider);
}

export const get_mocks = (): HttpHandler[] => {
        return registry.flatMap((provider) => provider());
}