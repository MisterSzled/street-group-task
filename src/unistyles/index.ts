import { dracula } from "./palettes/dracula";
import { bumblebee } from "./palettes/bumblebee";
import { tokens } from "./tokens";
import { theme_builder } from "./theme_builder";

export const themes = {
        dracula: theme_builder(dracula, tokens),
        bumblebee: theme_builder(bumblebee, tokens),
};

export type Themes = typeof themes;