import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import * as Localization from "expo-localization";

import { locales } from "./locales";


async function getInitialLanguage() {
        //todo
        // const LANGUAGE_KEY = 'user-language';
        const locale = Localization.getLocales()[0];

        return locale?.languageCode ?? "en";
}

getInitialLanguage().then(lng => {
        i18n
                .use(initReactI18next)
                .init({
                        resources: locales,
                        lng: lng,
                        fallbackLng: "en",
                        interpolation: {
                                escapeValue: false
                        },
                        ns: ['translation'],
                        defaultNS: 'translation'
                });
})

export default i18n;