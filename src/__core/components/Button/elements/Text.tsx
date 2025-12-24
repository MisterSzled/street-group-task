import { PropsWithChildren } from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useButtonContext from '../context';
import { variants } from '../variants';

interface ButtonTextProps extends PropsWithChildren {
        style?: StyleProp<TextStyle>;
}

const ButtonText = ({ children, style }: ButtonTextProps) => {
        const { variant } = useButtonContext();

        return <Text style={[base_styles.text, variants[variant].text, style]} selectable={false}>
                {children}
        </Text>
}

const base_styles = StyleSheet.create(({ colors, tokens }) => ({
        text: {
                fontSize: tokens.fontSize.lg,
                fontWeight: tokens.fontWeight.semibold,
                alignItems: "center",
                justifyContent: "center",
                bottom: 1,
        },
}));

export default ButtonText