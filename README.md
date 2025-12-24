# React Native Template

A modern React Native template built with a feature-driven domain architecture.

Framework & Routing
- Expo
- Expo Router

UI / Design
- Unistyles

Animations
- Reanimated

State & Data
- React Query (server state)
- Zustand (local state)
- MMKV (high-performance storage)

Forms & Validation
- React Hook Form
- Zod

Internationalization
- i18next

Network & Mocking
- MSW (Mock Service Worker)

Testing
- Jest

------------------------------------------------------------

## Guide

### API

Adding a New API Call in a Feature Domain

- Create a contract describing request/response types: src/features/{domain}/api/{domain}.contract.ts

- Implement the contract: src/features/{domain}/api/{domain}.api.ts

- 
        - Add default mocks: src/features/{domain}/api/{domain}.mock.ts
        - Add specific call mocks: src/features/{domain}/api/mocks/{call_name}.ts
        - Register mocks in the mock registry: src/api/mock/mocks.ts

- Create a hook wrapping your API call: src/features/{domain}/hooks/use{CallName}.ts

- Use the Hook in Your Page/Component const { data, isLoading, error } = useProducts();

------------------------------------------------------------
