import { Stack } from "expo-router";

import { useAuth } from "../features/auth/hooks/useAuth";
import Providers from "../providers/Providers";

export default function RootLayout() {
        const { isAuthenticated } = useAuth((s) => s);

        return <Providers>
                <Stack screenOptions={{ headerShown: false }} >
                        {/* Public */}
                        <Stack.Screen name="index" />
                </Stack>
        </Providers>
}