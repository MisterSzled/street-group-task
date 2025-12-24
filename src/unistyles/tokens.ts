// src/unistyles/tokens.ts
export const tokens = {
        spacing: {
                '0': 0,
                xs: 4,
                sm: 8,
                md: 12,
                lg: 16,
                xl: 20,
                '2xl': 24,
                '3xl': 32,
                '4xl': 40,
                '5xl': 48,
        },

        size: {
                xs: 8,
                sm: 12,
                md: 16,
                lg: 24,
                xl: 32,
                '2xl': 40,
                '3xl': 48,
                '4xl': 64,
        },

        fontSize: {
                xs: 12,
                sm: 14,
                base: 16,
                lg: 18,
                xl: 20,
                '2xl': 24,
                '3xl': 28,
                '4xl': 34,
                '5xl': 40,
        },

        lineHeight: {
                xs: 16,
                sm: 18,
                base: 20,
                lg: 22,
                xl: 24,
                '2xl': 28,
                '3xl': 32,
                '4xl': 40,
        },

        letterSpacing: {
                tight: -0.35,
                normal: 0,
                wide: 0.2,
        },

        fontWeight: {
                thin: '100',
                light: '300',
                normal: '400',
                medium: '500',
                semibold: '600',
                bold: '700',
                black: '900',
        },

        radius: {
                none: 0,
                sm: 4,
                md: 8,
                lg: 12,
                xl: 16,
                pill: 9999,
        },

        borderWidth: {
                hairline: 0.5,
                thin: 1,
                regular: 2,
                thick: 4,
        },

        elevation: {
                0: 0,
                1: 1,
                2: 2,
                3: 4,
                4: 6,
                6: 8,
                8: 12,
        },

        shadow: {
                sm: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 1 },
                        shadowOpacity: 0.06,
                        shadowRadius: 2,
                        elevation: 1,
                },
                md: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.08,
                        shadowRadius: 6,
                        elevation: 3,
                },
                lg: {
                        shadowColor: '#000',
                        shadowOffset: { width: 0, height: 6 },
                        shadowOpacity: 0.10,
                        shadowRadius: 12,
                        elevation: 8,
                },
        },

        zIndex: {
                background: -1,
                content: 1,
                dropdown: 100,
                modal: 1000,
                toast: 2000,
        },

        opacity: {
                disabled: 0.35,
                low: 0.5,
                medium: 0.75,
                high: 1,
        },


        icon: {
                stroke_width: {
                        sm: 1,
                        md: 2,
                        lg: 2.5,
                },
                sizes: {
                        xs: 12,
                        sm: 16,
                        md: 20,
                        lg: 24,
                        xl: 28,
                }
        },

        touchable: {
                minSize: 44,
        },

        container: {
                padding: 16,
                maxWidth: 1200,
                contentWidth: 960,
        },


        button: {
                paddingY: 10,
                paddingX: 16,
                borderRadius: 8,
                height: 48,
                smallHeight: 40,
                iconGap: 8,
        },

        input: {
                height: 44,
                paddingX: 12,
                gap: 8,
                borderRadius: 8,
        },

        breakpoints: {
                xs: 0,
                sm: 360,
                md: 768,
                lg: 1024,
                xl: 1280,
        },

        type: {
                body: {
                        size: 16,
                        lineHeight: 20,
                        weight: '400',
                },
                label: {
                        size: 14,
                        lineHeight: 18,
                        weight: '500',
                },
                h1: {
                        size: 34,
                        lineHeight: 40,
                        weight: '700',
                },
                h2: {
                        size: 28,
                        lineHeight: 34,
                        weight: '600',
                },
        },
} as const;

export type Tokens = typeof tokens;
export type TokenKeys = keyof Tokens;
