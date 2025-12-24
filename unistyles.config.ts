import { StyleSheet } from 'react-native-unistyles';
import { themes } from './src/unistyles';

StyleSheet.configure({
        themes,
        settings: {
                initialTheme: () => 'dracula',
        },
});