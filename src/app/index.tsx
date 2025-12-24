import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useGetBankHolidays } from "../features/bank_holiday/hooks/useBankHolidays";
import { useEffect } from "react";

const index = () => {
        const { t } = useTranslation();

        const { mutate: getBankHolidays, isPending } = useGetBankHolidays();

        useEffect(() => {
                getBankHolidays()
        }, [])

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
