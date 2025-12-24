import type { Tokens } from "./tokens";

export function theme_builder<
        P extends Record<string, string>,
        T extends Tokens
>(palette: P, tokens: T) {
        return {
                colors: palette,
                tokens,
        } as const
};

export type BuiltTheme = ReturnType<typeof theme_builder>;