import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useEffect } from "react";
import { useGetBankHolidays } from "../features/bank_holiday/hooks/useGetBankHolidays";
import { useBankHolidays } from "../features/bank_holiday/hooks/useBankHolidays";

const index = () => {
        const { t } = useTranslation();

        const bank_holidays = useBankHolidays(s => s.bank_holidays);
        const { mutate: getBankHolidays, isPending } = useGetBankHolidays();

        useEffect(() => {
                getBankHolidays();
        }, []);

        console.log(bank_holidays)

        return (
                <View style={styles.container}>
                        {/* {t("bank_holiday.header")} */}
                </View>
        );
}

const styles = StyleSheet.create(({ colors }) => ({
        container: {
                backgroundColor: colors.base_100,
                justifyContent: "center",
                alignItems: "center",
                flex: 1,
                overflow: "hidden"
        },
}));

export default index
