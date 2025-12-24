import type { themes } from "../unistyles";

declare module 'react-native-unistyles' {
        export interface UnistylesThemes {
                dracula: typeof themes.dracula;
                bumblebee: typeof themes.bumblebee;
        }
}
