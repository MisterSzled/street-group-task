import { View } from "react-native";
import { CountryEvent } from "../types";
import { StyleSheet } from "react-native-unistyles";

interface Props {
        bank_holiday_event: CountryEvent
}

export const BankHolidayEvent = ({ bank_holiday_event }: Props) => {

        return <View style={styles.container}>
                {bank_holiday_event.title}
        </View>;
};

const styles = StyleSheet.create(({ tokens }) => ({
        container: {
                flex: 1,
                marginTop: tokens.spacing.lg,
                marginBottom: tokens.spacing.lg
        },
}));

export default BankHolidayEvent;

