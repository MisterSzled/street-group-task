import Button from "@/src/__core/components/Button";
import * as CalendarAPI from "expo-calendar";
import { Calendar, Refresh } from "iconoir-react-native";
import { useState } from "react";
import { Alert, FlatList, Platform, RefreshControl, View } from "react-native";
import Toast from "react-native-toast-message";
import { StyleSheet } from "react-native-unistyles";
import { StoreCountryEvent } from "../types";
import BankHolidayEvent from "./BankHolidayEvent";

interface Props {
        bank_holidays: StoreCountryEvent[];
        is_pending: boolean;
        refresh: () => void;
}

export const BankHolidays = ({ bank_holidays, is_pending, refresh }: Props) => {
        const [refreshing, setRefreshing] = useState(false);

        const handleRefresh = async () => {
                setRefreshing(true);
                try {
                        refresh();
                } finally {
                        setRefreshing(false);
                }
        };

        const addToCalendar = async (event: StoreCountryEvent) => {
                const showToast = (type: "success" | "error" | "info", text1: string, text2?: string) => {
                        Toast.show({
                                type,
                                text1,
                                text2,
                                position: "bottom",
                                visibilityTime: 4000,
                        });
                };

                if (Platform.OS === "web") {
                        showToast("info", "Not Supported", "Adding to native calendar is not supported on web.");
                        return;
                }

                try {
                        const { status } = await CalendarAPI.requestCalendarPermissionsAsync();
                        if (status !== "granted") {
                                showToast("error", "Permission Denied", "Cannot add event without calendar permission.");
                                return;
                        }

                        const defaultCalendars = await CalendarAPI.getCalendarsAsync(CalendarAPI.EntityTypes.EVENT);
                        const calendar = defaultCalendars.find(cal => cal.allowsModifications) || defaultCalendars[0];

                        if (!calendar) {
                                showToast("error", "No Calendar Found", "No editable calendar available.");
                                return;
                        }

                        await CalendarAPI.createEventAsync(calendar.id, {
                                title: event.title,
                                startDate: new Date(event.date),
                                endDate: new Date(event.date),
                                timeZone: CalendarAPI.getDefaultCalendarAsync ? (await CalendarAPI.getDefaultCalendarAsync()).timeZone : undefined,
                        });
                } catch {
                        Alert.alert("Failed to add to calendar");
                }
        };

        return (
                <View style={styles.container}>
                        {Platform.OS === "web" && (
                                <Button.Root onPress={handleRefresh} styles={[{ marginBottom: 20 }]}>
                                        <Button.Icon>
                                                <Refresh color={"black"} />
                                        </Button.Icon>
                                </Button.Root>
                        )}

                        <FlatList
                                data={bank_holidays}
                                keyExtractor={(item) => item.title}
                                renderItem={({ item }) => (
                                        <View style={styles.wrapper}>
                                                <BankHolidayEvent bank_holiday_event={item} />

                                                <Button.Root styles={styles.button} onPress={() => addToCalendar(item)} animation={"bounce"}>
                                                        <Button.Icon>
                                                                <Calendar />
                                                        </Button.Icon>
                                                </Button.Root>
                                        </View>
                                )}
                                refreshControl={
                                        <RefreshControl refreshing={refreshing || is_pending} onRefresh={handleRefresh} />
                                }
                        />
                </View>
        );
};

const styles = StyleSheet.create(({ tokens }) => ({
        container: {
                flex: 1,
                width: 400,
                maxWidth: 400,
                flexDirection: "column",
        },
        wrapper: {
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "row",
        },
        button: {
                marginLeft: tokens.spacing.md,
                alignSelf: "center",
                backgroundColor: "none",
        },
}));

export default BankHolidays;
