import { PropsWithChildren } from "react";
import { ButtonVariant } from "./variants";
import { StyleProp, ViewStyle } from "react-native";

export interface ButtonProps extends PropsWithChildren {
        isLoading?: boolean,
        disabled?: boolean,
        onPress?: () => void,
        onPressIn?: () => void,
        onPressOut?: () => void,
        variant?: ButtonVariant,
        styles?: StyleProp<ViewStyle>
};

export interface RootProps extends ButtonProps {
        animation?: "bounce" | null,
};