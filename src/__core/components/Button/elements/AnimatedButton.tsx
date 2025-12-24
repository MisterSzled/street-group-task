import { PropsWithChildren } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { useAnimation } from '../animation/useAnimation';
import { Button } from './Button';

interface Props extends PropsWithChildren {
        animation?: "bounce",
}
const AnimatedButton = ({
        animation = "bounce",
        ...coreProps
}: Props) => {
        const animation_api = useAnimation(animation)

        return <View>
                <Animated.View style={animation_api.animatedStyle}>
                        <Button
                                {...coreProps}
                                onPressIn={animation_api.pressIn}
                                onPressOut={animation_api.pressOut}
                        />
                </Animated.View>
        </View>
}

export default AnimatedButton;