# React Native Task - Street Group

A modern React Native stack with feature-driven domain architecture.

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

### Comments

I was given 96h on the 23rd of December to do this.
I was travelling on the 23rd and obviously am busy 25/26 - so I could only give this a day.
Additionally I'm away from my normal setup so I've been on my laptop without my device integrations so i've only been able to develop on web.

## Task Spec

### Bank Holiday List Screen
        Main page calls and displays the bank holiday API
        API is setup with mocks and you can change .env to run the real call if you wish
        API uses a mock setup with MSW where each feature defines an API contract that the real and mock engine implement.
        Filtering middleware for response is placed in the use hook instead of the actual API contract. "useGetBankHolidays"

### Edit Functionality
        Tap on any holiday to route to the dynamic /events/[slug] route for that listed holiday.
        Each slug is used dynamically and non-existing keys are handled.
        Note that changes are local only, when the cache refreshes (manually of if stale time > 7 days) it will over write all changes made.

### Calendar Integration
        Had to develop on web but making use of standard RN api calls.

### Styling
        Minimal - mainly showcasing my implementation of theming using UniStyles.
        Each theme implements a standardized 'theme' type and the various style tokens under tokens and colors are consumed by each style sheet.

### Testing
        Minimal - Demonstrate standard testing capacity of the store and main fetching hook. 

## Bonus (Optional)

### Pull-to-refresh
        Developed on web - used standard refresh api and implemented a button for web

### Offline support with cached data
        Main Bank holiday call is cached locally and checked each time at call time.
        Pull to refresh and the web only refresh button will force invalidate this and do a new call.

### Confirmation modal before saving
        Not done.

### Swipe gestures to edit or delete holidays
        Not done.

### Subtle animations or transitions
        No transitions but to demonstrate my capacity i've left in my animated bounce component from my template and used it on the Calendar api calls