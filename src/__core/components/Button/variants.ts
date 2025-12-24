import { TextStyle, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

export type ButtonVariantStyles = {
        container?: ViewStyle;
        children?: ViewStyle;
        spinner?: ViewStyle;
        text?: TextStyle;
        icon?: TextStyle;
}

export const primary: ButtonVariantStyles = StyleSheet.create(({ colors, tokens }) => ({
        container: {
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
                backgroundColor: colors.neutral,
                borderRadius: tokens.radius.md,
        },
        text: {
                color: colors.neutral_content
        },
        icon: {
                color: "white",
        }
}));

export const secondary: ButtonVariantStyles = StyleSheet.create(({ colors, tokens }) => ({
        container: {
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                backgroundColor: colors.error
        },
        text: {
                color: colors.neutral_content,
        },
        icon: {
                color: "white",
        }
}));

export const ghost: ButtonVariantStyles = StyleSheet.create(({ colors, tokens }) => ({
        container: {
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                backgroundColor: "transparent",
        },
        text: {
                color: colors.neutral_content
        },
        icon: {
                color: "white",
        }
}));

export const neobrutalism: ButtonVariantStyles = StyleSheet.create(({ colors, tokens }) => ({
        container: {
                backgroundColor: colors.primary,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.lg,
                borderWidth: tokens.borderWidth.regular,
        },
        text: {
                color: colors.primary_content,
                fontWeight: tokens.fontWeight.black
        },
        icon: {
                color: colors.primary_content,
        },
}));

export const variants = {
        primary: primary,
        secondary: secondary,
        ghost: ghost,
        neobrutalism: neobrutalism,
}

export type ButtonVariant = keyof typeof variants;
