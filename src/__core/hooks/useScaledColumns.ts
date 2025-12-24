import { useWindowDimensions } from "react-native";

export function useScaledColumns() {
        const {width} = useWindowDimensions();

        if (width < 500) return 1;
        if (width < 900) return 2;
        if (width < 1400) return 3;
        return 4;
}