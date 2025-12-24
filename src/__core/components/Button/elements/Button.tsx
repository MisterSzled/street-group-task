import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ButtonContext } from '../context';
import { ButtonProps } from '../types';
import { variants } from '../variants';
import Spinner from './Spinner';

export const Button = ({
        children,
        isLoading = false,
        disabled = false,
        onPress,
        onPressIn,
        onPressOut,
        variant = "primary",
        styles
}: ButtonProps) => {
        const variant_styles = variants[variant];

        const container_styles = [
                base_styles.container,
                variant_styles.container,
                disabled && base_styles.disabled,
                styles,
        ];
        const children_styles = [
                base_styles.children,
                variant_styles.children,
                { opacity: isLoading ? 0 : 1 }
        ];

        return <ButtonContext.Provider value={{ isLoading, disabled, variant }}>
                <Pressable
                        onPress={onPress}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        disabled={disabled || isLoading}
                >
                        <View style={container_styles}>
                                <Spinner />
                                <View style={children_styles}>
                                        {children}
                                </View>
                        </View>
                </Pressable>
        </ButtonContext.Provider>
}

const base_styles = StyleSheet.create(({ tokens }) => ({
        container: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
        },
        children: {
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
        },
        disabled: {
                opacity: tokens.opacity.disabled
        },
}));

export default Button;