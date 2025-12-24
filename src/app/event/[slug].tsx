import { useBankHolidays } from "@/src/features/bank_holiday/hooks/useBankHolidays";
import { useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";

const index = () => {
        const bank_holidays = useBankHolidays(s => s.bank_holidays);
        const { slug } = useLocalSearchParams<{ slug: string }>();

        return (
                <View style={styles.container}>
                        {slug}
                </View>
        );
}

const styles = StyleSheet.create(({ tokens, colors }) => ({
        container: {
                backgroundColor: colors.base_100,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                overflow: "hidden"
        },
        text_header: {
                fontSize: tokens.fontSize.lg,
                color: colors.neutral_content
        }
}));

export default index
