import { Link, Redirect } from 'expo-router';
import { ActivityIndicator, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../presentation/auth/store/useAuthStore';
import { useEffect } from 'react';

const Main = () => {
    const { status, checkStatus } = useAuthStore();

    useEffect(() => {
        checkStatus();
    }, []);
    if (status === 'checking') {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                }}
            >
                <Text>asdsa</Text>
                <ActivityIndicator />
            </View>
        );
    }
    if (status === 'unauthenticated') {
        // Guardar la ruta del usuario
        return <Redirect href="/auth/login" />;
    }
    return <Redirect href={'/(stack)/home'} />;
};

export default Main;
