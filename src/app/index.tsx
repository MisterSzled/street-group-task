import { useAuth } from "@src/features/auth/hooks/useAuth";
import { useLogin } from "@src/features/auth/hooks/useLogin";
import { useTranslation } from "react-i18next";
import { View } from "react-native";
import { StyleSheet, useUnistyles } from "react-native-unistyles";
import Button from "../__core/components/Button";

const index = () => {
        const { t } = useTranslation();
        const { isAuthenticated } = useAuth((s) => s);
        const { mutate: login, isPending } = useLogin();
        const { theme } = useUnistyles()

        const handleLogin = () => {
                return
        }

        return (
                <View
                        style={styles.container}
                >
                        <Button.Root onPress={handleLogin} >
                                <Button.Text>Login</Button.Text>
                        </Button.Root>
                </View>
        )
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
