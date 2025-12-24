import { Text, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { CountryEvent } from "../types";


interface Props {
        bank_holiday_event: CountryEvent
}

export const BankHolidayEvent = ({ bank_holiday_event }: Props) => {

        return <View style={styles.container}>
                
                <Text style={styles.text_header}>{bank_holiday_event.title} - {bank_holiday_event.date}</Text>
                <Text>{bank_holiday_event.notes}</Text>
        </View>;
};

const styles = StyleSheet.create(({ tokens, colors }) => ({
        container: {
                flex: 1,
                borderRadius: tokens.radius.lg,
                marginTop: tokens.spacing.lg,
                marginBottom: tokens.spacing.lg,
                padding: tokens.spacing.lg,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: colors.neutral,
                color: colors.neutral_content
        },
        text_header: {
                fontSize: tokens.fontSize.lg,
                color: colors.neutral_content
        }
}));

export default BankHolidayEvent;

