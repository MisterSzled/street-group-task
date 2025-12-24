import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { AnimationInfo } from '../types';

export function bounce(): AnimationInfo {
        const animating = useSharedValue(false);
        const translateY = useSharedValue(0);

        const pressIn = () => {
                animating.value = true;

                translateY.value = withTiming(5, { duration: 50 }, () => {
                        translateY.value = withTiming(0, { duration: 50 }, () => {
                                animating.value = false;
                        })
                })
        }

        const animatedStyle = useAnimatedStyle(() => ({
                transform: [{ translateY: translateY.value }],
        }));

        return {
                animatedStyle,
                pressIn,
                pressOut: undefined,
        }
}