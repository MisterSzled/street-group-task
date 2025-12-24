import BankHolidays from "@src/features/bank_holiday/components/BankHolidays";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StyleSheet } from "react-native-unistyles";
import { useBankHolidays } from "../features/bank_holiday/hooks/useBankHolidays";
import { useGetBankHolidays } from "../features/bank_holiday/hooks/useGetBankHolidays";

const index = () => {
        const { t } = useTranslation();

        const bank_holidays = useBankHolidays(s => s.bank_holidays);
        const { mutate: getBankHolidays, isPending } = useGetBankHolidays();

        useEffect(() => {
                getBankHolidays({force_invalidate: false});
        }, []);

        console.log("Bank holidays: ", bank_holidays);

        return (
                <>
                        <View style={styles.container}>
                                <BankHolidays
                                        bank_holidays={bank_holidays}
                                        is_pending={isPending}
                                        refresh={() => getBankHolidays({force_invalidate: true})} />
                        </View>
                </>

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
