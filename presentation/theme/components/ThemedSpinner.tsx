import { ActivityIndicator } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
interface Props {
    color?: string;
}
const ThemedSpinner = ({ color, ...rest }: Props) => {
    return (
        <SafeAreaProvider>
            <SafeAreaView
                style={[
                    {
                        flex: 1,
                        justifyContent: 'center',
                    },
                    {
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        padding: 10,
                    },
                ]}
            >
                <ActivityIndicator size="large" color={color} />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

export default ThemedSpinner;
