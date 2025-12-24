import { ActivityIndicator, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import useButtonContext from '../context';
import { variants } from '../variants';

const Spinner = () => {
        const { variant, isLoading } = useButtonContext();

        const variant_styles = variants[variant];

        if (!isLoading) return;


        return <View style={[
                base_styles.spinner,
                variant_styles.spinner
        ]}>
                <ActivityIndicator color={"black"} />
        </View>
}

const base_styles = StyleSheet.create(({ colors, tokens }) => ({
        spinner: {
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                top: 0,
                justifyContent: "center",
                alignItems: "center"
        }
}));

export default Spinner