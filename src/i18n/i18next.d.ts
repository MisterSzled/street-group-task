import 'i18next';

declare module 'i18next' {
        interface CustomTypeOptions {
                resources: typeof import('./index').resources['en'],
                defaultNS: 'translation'
        }
}