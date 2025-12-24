import { FlatList, View } from "react-native";
import { CountryEvent } from "../types";
import BankHolidayEvent from "./BankHolidayEvent";
import { StyleSheet } from "react-native-unistyles";

interface Props {
        bank_holidays: CountryEvent[]
}

export const BankHolidays = ({ bank_holidays }: Props) => {

        return <View style={styles.container}>
                <FlatList
                        data={bank_holidays}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => <BankHolidayEvent bank_holiday_event={item} />}
                />
        </View>;
};

const styles = StyleSheet.create(({ tokens }) => ({
        container: {
                flex: 1,
                width: 400,
                maxWidth: 400,
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "blue"
        },
}));

export default BankHolidays;

