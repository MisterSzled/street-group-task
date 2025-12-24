import { cloneElement, PropsWithChildren } from 'react';
import { ColorValue, StyleProp, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useButtonContext from '../context';
import { variants } from '../variants';

interface ButtonIconProps extends PropsWithChildren {
        children: React.ReactElement<{ color?: ColorValue }>
        style?: StyleProp<ViewStyle>
}

const Icon = ({ children, style }: ButtonIconProps) => {
        const { variant } = useButtonContext();
        const color = variants[variant].icon ? variants[variant].icon.color : "white"

        return <View style={style}>
                {cloneElement(children, {
                        color
                })}
        </View>
}

export default Icon