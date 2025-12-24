import Button from "@/src/__core/components/Button";
import { Refresh } from "iconoir-react-native";
import { useState } from "react";
import { FlatList, Platform, RefreshControl, View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { StoreCountryEvent } from "../types";
import BankHolidayEvent from "./BankHolidayEvent";

interface Props {
        bank_holidays: StoreCountryEvent[],
        is_pending: boolean,
        refresh: () => void
}

export const BankHolidays = ({ bank_holidays, is_pending, refresh }: Props) => {
        const [refreshing, setRefreshing] = useState(false);

        const handleRefresh = async () => {
                setRefreshing(true);
                try {
                        refresh()
                } finally {
                        setRefreshing(false)
                }
        }

        return <View style={styles.container}>

                {Platform.OS === "web" &&
                        <Button.Root onPress={handleRefresh} styles={[{ marginBottom: 20 }]}>
                                <Button.Icon>
                                        <Refresh color={"black"} />
                                </Button.Icon>
                        </Button.Root>
                }

                <FlatList
                        data={bank_holidays}
                        keyExtractor={(item) => item.title}
                        renderItem={({ item }) => <BankHolidayEvent bank_holiday_event={item} />}
                        refreshControl={<RefreshControl
                                refreshing={refreshing || is_pending}
                                onRefresh={handleRefresh}
                        />}
                />
        </View>;
};

const styles = StyleSheet.create(({ tokens }) => ({
        container: {
                flex: 1,
                width: 400,
                maxWidth: 400,
                flexDirection: "column",
        },
}));

export default BankHolidays;

